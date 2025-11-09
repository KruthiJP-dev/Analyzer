import React from 'react';
import type { AnalysisReport } from '../../types';

interface UXAnalysisDisplayProps {
  ux: AnalysisReport['uxAnalysis'];
}

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    // FIX: Corrected the malformed viewBox attribute from '0 0 24" 24"' to '0 0 24 24'.
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
    </svg>
);

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
    </svg>
);

export const UXAnalysisDisplay: React.FC<UXAnalysisDisplayProps> = ({ ux }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-md font-semibold text-green-400 mb-3 flex items-center">
            <CheckCircleIcon className="w-5 h-5 mr-2" />
            Strengths
        </h3>
        <ul className="space-y-2 list-disc list-inside text-gray-300">
          {(ux?.strengths || []).map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
      <div>
        <h3 className="text-md font-semibold text-yellow-400 mb-3 flex items-center">
            <LightbulbIcon className="w-5 h-5 mr-2" />
            Areas for Improvement
        </h3>
        <ul className="space-y-2 list-disc list-inside text-gray-300">
          {(ux?.improvements || []).map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
};