import Head from "next/head";
import React, { FC } from "react";
import { Calculator } from "../components/Calculator";
import { CalculatorTips } from "../components/CalculatorTips";

type IndexProps = {};

const Index: FC<IndexProps> = () => {
    return (
        <>
            <Head>
                <title>SuperCalculator</title>
            </Head>
            <div>
                <div className="flex flex-col items-center justify-center h-screen space-y-12">
                    <h1 className="text-3xl font-bold text-indigo-500 md:text-4xl lg:text-5xl">
                        Super<span className="px-3 py-1 ml-2 text-white rounded-md bg-gradient-to-tr from-purple-500 to-blue-600">Calculator</span>
                    </h1>
                    <Calculator />
                    <CalculatorTips />
                    <div className="text-sm font-medium text-gray-400">
                        By <b>Antoine HAREL</b>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
