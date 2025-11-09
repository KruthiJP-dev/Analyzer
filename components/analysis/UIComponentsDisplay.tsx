import React from 'react';
import type { UIComponentInfo } from '../../types';

interface UIComponentsDisplayProps {
  components: UIComponentInfo[];
}

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
    </svg>
);


export const UIComponentsDisplay: React.FC<UIComponentsDisplayProps> = ({ components }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {(components || []).map((component) => (
        <div key={component.name} className="flex flex-col space-y-4 p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-start space-x-4">
            <div
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-purple-900/50 text-purple-400 [&>svg]:w-5 [&>svg]:h-5"
              dangerouslySetInnerHTML={{ __html: component.svgIcon }}
            />
            <div>
                <h3 className="font-semibold text-white">{component.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{component.description}</p>
            </div>
          </div>
          {component.designInsight && (
            <div className="flex items-start space-x-3 text-sm text-yellow-300 bg-yellow-900/20 p-3 rounded-md border border-yellow-800/50">
              <LightbulbIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-400" />
              <p className="leading-relaxed"><span className="font-semibold text-yellow-200">Design Insight:</span> {component.designInsight}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};