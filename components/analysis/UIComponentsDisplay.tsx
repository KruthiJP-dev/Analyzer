import React from 'react';
import type { AnalysisReport } from '../../types';

interface UIComponentsDisplayProps {
  components: AnalysisReport['uiComponents'];
}

const ComponentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 12h10"/><path d="M12 7v10"/>
    </svg>
);


export const UIComponentsDisplay: React.FC<UIComponentsDisplayProps> = ({ components }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {components.map((component) => (
        <div key={component.name} className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-purple-900/50 text-purple-400">
                <ComponentIcon className="w-5 h-5"/>
            </div>
            <div>
                <h3 className="font-semibold text-white">{component.name}</h3>
                <p className="text-sm text-gray-400">{component.description}</p>
            </div>
        </div>
      ))}
    </div>
  );
};
