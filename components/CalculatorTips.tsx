import { FC, useState } from "react";
import { useKey } from "rooks";

type CalculatorTipsProps = {};

export const CalculatorTips: FC<CalculatorTipsProps> = () => {
    const [expanded, setExpanded] = useState(true);

    useKey(["a"], () => setExpanded((expanded) => !expanded));

    if (expanded) {
        return (
            <div className="fixed z-50 p-4 space-y-2 bg-white shadow-xl dark:bg-gray-700 bottom-5 right-20 w-72 md:w-96 rounded-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-white">Quelques conseils ?</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700 rounded-full cursor-pointer dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setExpanded(false)}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className="space-y-2 overflow-y-scroll text-sm leading-snug text-gray-500 max-h-64">
                    <p>
                        Bienvenue sur SuperCalculator ! <span className="ml-1 wave">👋</span>
                    </p>
                    <p>Vous pouvez utiliser votre clavier pour taper des chiffres ou des opérateurs ! ⌨️</p>
                    <p>
                        La touche <span className="code">A</span> vous permet d&apos;afficher/masquer ce panneau d&apos;aide et de conseils.
                    </p>
                    <p>
                        La touche <span className="code">H</span> vous permet d&apos;afficher/masquer le panneau listant les opérations passées.
                    </p>
                    <p>
                        La touche <span className="code">C</span> vous permet d&apos;effacer le contenu de la calculatrice.
                    </p>
                    <p>Un mode sombre de l&apos;application est disponible et s&apos;active automatiquement avec le mode sombre du système ! 🌙</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="fixed z-10 flex items-center justify-center w-12 h-12 text-3xl text-gray-700 bg-white rounded-full shadow-xl cursor-pointer dark:hover:bg-gray-600 dark:text-white dark:bg-gray-700 bottom-5 right-20 hover:bg-gray-100" onClick={() => setExpanded(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        </>
    );
};
