import React from 'react';
import saveAs from 'file-saver';
import { Spinner } from './Spinner';
import type { AnalysisReport } from '../types';
import { ReportSection } from './analysis/ReportSection';
import { ColorPaletteDisplay } from './analysis/ColorPaletteDisplay';
import { TypographyDisplay } from './analysis/TypographyDisplay';
import { LayoutDisplay } from './analysis/LayoutDisplay';
import { UIComponentsDisplay } from './analysis/UIComponentsDisplay';
import { UXAnalysisDisplay } from './analysis/UXAnalysisDisplay';
import { ColorDistributionChart } from './analysis/ColorDistributionChart';
import { ComponentHierarchyDisplay } from './analysis/ComponentHierarchyDisplay';


interface AnalysisDisplayProps {
  analysis: AnalysisReport | null;
  isLoading: boolean;
  error: string | null;
  onStartOver: () => void;
  url: string;
}

const RefreshCcwIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/><path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/>
  </svg>
);

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
);


export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, isLoading, error, onStartOver, url }) => {

    const handleSaveReport = () => {
        if (!analysis) return;
        
        const blob = new Blob(
            [JSON.stringify(analysis, null, 2)], 
            { type: "application/json;charset=utf-8" }
        );

        let hostname = 'report';
        try {
           hostname = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
        } catch (e) {
            console.warn("Could not parse URL for filename, using default.");
        }
        
        const filename = `analysis-${hostname.replace(/\./g, '_')}.json`;
        saveAs(blob, filename);
    };

    const LoadingState = () => (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-900/50 border border-gray-800 rounded-xl max-w-md">
            <Spinner />
            <p className="mt-4 text-lg font-semibold text-white">Analyzing {url}...</p>
            <p className="text-gray-400">This may take a moment. The AI is visiting the site and preparing your report.</p>
        </div>
    );

    const ErrorState = () => (
        <div className="p-8 text-center text-red-400 bg-red-900/20 border border-red-800 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold text-red-300 mb-2">Analysis Failed</h3>
            <p>{error}</p>
        </div>
    );

    const ResultState = () => analysis && (
        <div className="w-full space-y-6">
            <ReportSection title="Design Overview">
                <p className="text-gray-300 leading-relaxed">{analysis.overview || 'No overview available.'}</p>
            </ReportSection>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-1">
                    <ReportSection title="Color Palette">
                        <ColorPaletteDisplay palette={analysis.colorPalette} />
                    </ReportSection>
                 </div>
                 <div className="lg:col-span-2">
                    <ReportSection title="Typography">
                        <TypographyDisplay typography={analysis.typography} />
                    </ReportSection>
                </div>
            </div>

            <ReportSection title="Color Distribution">
                <ColorDistributionChart palette={analysis.colorPalette} />
            </ReportSection>

            <ReportSection title="Layout & Structure">
                <LayoutDisplay layout={analysis.layout} />
            </ReportSection>

             {analysis.componentTree && (
                <ReportSection title="Component Hierarchy">
                    <ComponentHierarchyDisplay tree={analysis.componentTree} />
                </ReportSection>
            )}

            <ReportSection title="Key UI Components">
                <UIComponentsDisplay components={analysis.uiComponents} />
            </ReportSection>
            
            <ReportSection title="UX Analysis">
                <UXAnalysisDisplay ux={analysis.uxAnalysis} />
            </ReportSection>
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
            {isLoading && <LoadingState />}
            {error && !isLoading && <ErrorState />}
            {analysis && !isLoading && <ResultState />}
            
            <div className="flex items-center justify-center space-x-4 text-center mt-8">
                {analysis && !isLoading && (
                     <button onClick={handleSaveReport} className="flex items-center mx-auto px-4 py-2 text-gray-400 bg-gray-800/50 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors">
                        <DownloadIcon className="w-4 h-4 mr-2" />
                        Save Report
                    </button>
                )}
                <button onClick={onStartOver} className="flex items-center mx-auto px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors">
                    <RefreshCcwIcon className="w-4 h-4 mr-2" />
                    Analyze Another Site
                </button>
            </div>
        </div>
    );
};