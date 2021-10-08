import classNames from "classnames";
import { FC, useCallback, useMemo, useState } from "react";
import { useKey } from "rooks";
import { CalculatorButton } from "./CalculatorButton";
import { CalculatorHistory } from "./CalculatorHistory";

const operators = {
    plus: "+",
    minus: "-",
    times: "×",
    divide: "/",
};

type CalculatorProps = {};
type Operator = keyof typeof operators;

export const Calculator: FC<CalculatorProps> = () => {
    const [inputValue, setInputValue] = useState("0");
    const [storedValue, setStoredValue] = useState<string | null>(null);
    const [currentOperator, setCurrentOperator] = useState<Operator | null>(null);
    const [history, setHistory] = useState<string[]>([]);

    const [showStoredValue, setShowStoredValue] = useState(false);

    const displayFontSize = useMemo(() => {
        const value = (showStoredValue ? storedValue : inputValue) ?? "0";

        if (value.length > 19) {
            return "text-md";
        }
        if (value.length > 15) {
            return "text-lg";
        }

        if (value.length > 10) {
            return "text-2xl";
        }

        return "text-4xl";
    }, [inputValue, storedValue, showStoredValue]);

    const handleNumber = useCallback(
        (number: number) => {
            if (inputValue === "0") {
                setInputValue(`${number}`);
            } else {
                setInputValue(`${inputValue}${number}`);
            }

            if (storedValue !== null && showStoredValue) {
                setShowStoredValue(false);
            }
        },
        [inputValue, storedValue, showStoredValue]
    );

    const handleAllClear = useCallback(() => {
        setInputValue("0");
        setStoredValue(null);
        setCurrentOperator(null);
        setShowStoredValue(false);
    }, []);

    const handlePercent = useCallback(() => {
        setInputValue(String(Number(inputValue.replace(",", ".")) / 100));
    }, [inputValue]);

    const handleComa = useCallback(() => {
        if (!inputValue.includes(",")) {
            setInputValue(`${inputValue},`);
        }
    }, [inputValue]);

    const handleOppose = useCallback(() => {
        if (inputValue.startsWith("-")) {
            setInputValue(inputValue.substring(1));
        } else {
            setInputValue(`-${inputValue}`);
        }
    }, [inputValue]);

    const handleCompute = useCallback(() => {
        if (currentOperator === null || storedValue === null || inputValue === null) {
            return;
        }

        const storedValueAsNumber = Number(storedValue.replace(",", "."));
        const inputValueAsNumber = Number(inputValue.replace(",", "."));

        const result = (() => {
            if (currentOperator === "plus") {
                return String(parseFloat((storedValueAsNumber + inputValueAsNumber).toFixed(10))).replace(".", ",");
            } else if (currentOperator === "times") {
                return String(parseFloat((storedValueAsNumber * inputValueAsNumber).toFixed(10))).replace(".", ",");
            } else if (currentOperator === "divide") {
                return String(parseFloat((storedValueAsNumber / inputValueAsNumber).toFixed(10))).replace(".", ",");
            } else if (currentOperator === "minus") {
                return String(parseFloat((storedValueAsNumber - inputValueAsNumber).toFixed(10))).replace(".", ",");
            } else {
                return "Unknown";
            }
        })();

        setStoredValue(result);

        setHistory([`${storedValue} ${operators[currentOperator]} ${inputValue} = ${result}`, ...history]);

        setShowStoredValue(true);
    }, [inputValue, storedValue, currentOperator, history]);

    const handleOperator = useCallback(
        (operator: Operator) => {
            if (storedValue === null) {
                setStoredValue(inputValue);
            } else {
                handleCompute();
            }
            setInputValue("0");
            setCurrentOperator(operator);
            setShowStoredValue(true);
        },
        [inputValue, storedValue, handleCompute]
    );

    useKey("%", handlePercent);
    useKey("c", handleAllClear);
    useKey([",", "."], handleComa);
    useKey(["Enter", "="], handleCompute);
    useKey("+", (e) => handleOperator("plus"));
    useKey("-", (e) => handleOperator("minus"));
    useKey("/", (e) => handleOperator("divide"));
    useKey(["*", "x"], (e) => handleOperator("times"));
    useKey(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], (e) => handleNumber(parseInt(e.key)));

    return (
        <>
            <div className="w-64 overflow-hidden shadow-xl rounded-xl bg-gray-50 dark:bg-gray-700">
                <div className={classNames("p-3 h-16 flex items-center justify-end font-semibold text-right text-white bg-gradient-to-tr from-purple-500 to-blue-600 tracsking-wide", displayFontSize)}>
                    <div>{showStoredValue ? storedValue : inputValue}</div>
                </div>
                <div className="grid grid-cols-4 gap-1 p-3">
                    <CalculatorButton color="lightIndigo" onClick={handleAllClear}>
                        AC
                    </CalculatorButton>
                    <CalculatorButton color="lightIndigo" onClick={handleOppose}>
                        +-
                    </CalculatorButton>
                    <CalculatorButton color="lightIndigo" onClick={handlePercent}>
                        %
                    </CalculatorButton>
                    <CalculatorButton color="indigo" active={currentOperator === "divide"} onClick={() => handleOperator("divide")}>
                        ÷
                    </CalculatorButton>

                    <CalculatorButton onClick={() => handleNumber(7)}>7</CalculatorButton>
                    <CalculatorButton onClick={() => handleNumber(8)}>8</CalculatorButton>
                    <CalculatorButton onClick={() => handleNumber(9)}>9</CalculatorButton>
                    <CalculatorButton onClick={() => handleOperator("times")} active={currentOperator === "times"} color="indigo">
                        &times;
                    </CalculatorButton>

                    <CalculatorButton onClick={() => handleNumber(4)}>4</CalculatorButton>
                    <CalculatorButton onClick={() => handleNumber(5)}>5</CalculatorButton>
                    <CalculatorButton onClick={() => handleNumber(6)}>6</CalculatorButton>
                    <CalculatorButton color="indigo" active={currentOperator === "minus"} onClick={() => handleOperator("minus")}>
                        –
                    </CalculatorButton>

                    <CalculatorButton onClick={() => handleNumber(1)}>1</CalculatorButton>
                    <CalculatorButton onClick={() => handleNumber(2)}>2</CalculatorButton>
                    <CalculatorButton onClick={() => handleNumber(3)}>3</CalculatorButton>
                    <CalculatorButton color="indigo" active={currentOperator === "plus"} onClick={() => handleOperator("plus")}>
                        +
                    </CalculatorButton>

                    <CalculatorButton className="col-span-2" onClick={() => handleNumber(0)}>
                        0
                    </CalculatorButton>
                    <CalculatorButton onClick={handleComa}>,</CalculatorButton>
                    <CalculatorButton color="indigo" onClick={handleCompute}>
                        =
                    </CalculatorButton>
                </div>
            </div>
            <CalculatorHistory entries={history} />
        </>
    );
};
