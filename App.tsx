import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UrlInputForm } from './components/ImageUpload';
import { AnalysisDisplay } from './components/ImageEditor';
import { analyzeUrlWithGemini } from './services/geminiService';
import type { AnalysisReport } from './types';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (submittedUrl: string) => {
    setUrl(submittedUrl);
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      let fullUrl = submittedUrl;
      if (!/^https?:\/\//i.test(fullUrl)) {
        fullUrl = 'https://' + fullUrl;
      }
      const result = await analyzeUrlWithGemini(fullUrl);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. The AI might have had trouble analyzing this specific URL.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStartOver = () => {
    setUrl('');
    setAnalysis(null);
    setError(null);
    setIsLoading(false);
  };

  const hasStarted = url || isLoading || analysis || error;

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        {!hasStarted ? (
          <UrlInputForm onAnalyze={handleAnalyze} isLoading={isLoading} />
        ) : (
          <AnalysisDisplay
            url={url}
            analysis={analysis}
            isLoading={isLoading}
            error={error}
            onStartOver={handleStartOver}
          />
        )}
      </main>
    </div>
  );
};

export default App;
