import React from 'react';
import CalculatorForm from './Components/CalculatorForm';
import SummaryCards from './Components/SummaryCards';
import EMIAnalytics from './Components/EMIAnalytics';
import Principle from './Components/Principle';
import CoverageAnalysis from './Components/CoverageAnalysis';

const EMICalculator = () => {
    return (
        <div className="max-w-[95%] mx-auto">
            <CalculatorForm></CalculatorForm>
            <SummaryCards></SummaryCards>
            <EMIAnalytics></EMIAnalytics>
            <Principle></Principle>
            <CoverageAnalysis></CoverageAnalysis>
        </div>
    );
};

export default EMICalculator;