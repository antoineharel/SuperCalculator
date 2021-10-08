import React, { FC, useState } from "react";
import { useKey } from "rooks";

type CalculatorHistoryProps = {
    entries: string[];
};

export const CalculatorHistory: FC<CalculatorHistoryProps> = ({ entries }) => {
    const [expanded, setExpanded] = useState(false);

    useKey("h", () => setExpanded((expanded) => !expanded));

    if (expanded) {
        return (
            <div className="fixed z-50 p-4 space-y-2 bg-white shadow-xl dark:bg-gray-700 bottom-5 right-5 w-80 md:w-96 rounded-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-white">Historique de calculs</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700 rounded-full cursor-pointer dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setExpanded(false)}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className="h-64 overflow-y-auto text-sm">
                    {(entries.length > 0 && (
                        <ul className="list-disc list-inside">
                            {entries.map((entry, i) => (
                                <li key={`${entry}-${i}`} className="dark:text-gray-200">
                                    {entry}
                                </li>
                            ))}
                        </ul>
                    )) || (
                        <div>
                            <div className="text-gray-400">Aucune entrée</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="fixed z-10 flex items-center justify-center w-12 h-12 text-3xl text-gray-700 bg-white rounded-full shadow-xl cursor-pointer dark:hover:bg-gray-600 dark:text-white dark:bg-gray-700 bottom-5 right-5 hover:bg-gray-100" onClick={() => setExpanded(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            </div>
        </>
    );
};
