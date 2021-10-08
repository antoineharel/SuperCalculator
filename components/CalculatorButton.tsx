import classNames from "classnames";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type ButtonColor = "gray" | "indigo" | "lightIndigo";

type CalculatorButtonProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    color?: ButtonColor;
    active?: boolean;
};

export const CalculatorButton: FC<CalculatorButtonProps> = ({ className, color = "gray", active = false, ...props }) => {
    const conditionalClassNames = classNames({
        // Color
        "text-white bg-indigo-400 active:bg-indigo-600": color === "indigo",
        "bg-indigo-100 text-gray-700 active:bg-indigo-400 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800": color === "lightIndigo",
        "bg-gray-200 text-gray-700 active:bg-indigo-400 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600": color === "gray",

        // Active state
        "ring-2 ring-indigo-500": active,
    });
    return <div className={classNames("flex cursor-pointer transition-colors duration-200 hover:bg-indigo-200 active:text-white items-center justify-center min-w-[3rem] h-12 text-lg font-semibold text-center rounded-xl", conditionalClassNames, className)} {...props} />;
};
