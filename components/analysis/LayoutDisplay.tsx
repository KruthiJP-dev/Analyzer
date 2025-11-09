import React from 'react';
import type { AnalysisReport } from '../../types';

interface LayoutDisplayProps {
  layout: AnalysisReport['layout'];
}

export const LayoutDisplay: React.FC<LayoutDisplayProps> = ({ layout }) => {
  return (
    <div className="space-y-2">
      <p className="text-purple-400 font-semibold bg-purple-900/30 rounded-full px-3 py-1 text-sm inline-block">{layout.type}</p>
      <p className="text-gray-300 leading-relaxed">{layout.description}</p>
    </div>
  );
};
