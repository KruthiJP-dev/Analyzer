import React from 'react';
import type { AnalysisReport, FontInfo } from '../../types';

interface TypographyDisplayProps {
  typography: AnalysisReport['typography'];
}

const FontDisplay: React.FC<{ title: string, font: FontInfo }> = ({ title, font }) => (
    <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</h3>
        <div className="bg-gray-800/50 p-4 rounded-lg">
            <p 
                className="text-2xl text-gray-200"
                style={{ fontFamily: font.fontFamily, fontWeight: font.fontWeight }}
            >
                {font.exampleText}
            </p>
            <p className="text-sm text-gray-400 mt-2">{font.fontFamily}, {font.fontWeight}</p>
        </div>
    </div>
);


export const TypographyDisplay: React.FC<TypographyDisplayProps> = ({ typography }) => {
  const headingFont = typography?.heading;
  const bodyFont = typography?.body;

  if (!headingFont && !bodyFont) {
    return <p className="text-gray-400">Typography information not available.</p>;
  }
  
  return (
    <div className="space-y-4">
       {headingFont && <FontDisplay title="Heading" font={headingFont} />}
       {bodyFont && <FontDisplay title="Body" font={bodyFont} />}
    </div>
  );
};