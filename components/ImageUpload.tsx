import React, { useState } from 'react';

interface UrlInputFormProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

const LinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/>
  </svg>
);

const WandSparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/><path d="m19 3-9 9"/><path d="m5 15 9 9"/><path d="m21 21-9-9"/><path d="M3 3l9 9"/>
    </svg>
);

export const UrlInputForm: React.FC<UrlInputFormProps> = ({ onAnalyze, isLoading }) => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if(url && !isLoading) {
            try {
                // A simple check for a valid-looking URL structure
                let fullUrl = url;
                if (!/^https?:\/\//i.test(fullUrl)) {
                    fullUrl = 'https://' + fullUrl;
                }
                new URL(fullUrl);
                onAnalyze(url);
            } catch (_) {
                setError('Please enter a valid URL.');
            }
        }
    };

    return (
        <div className="w-full max-w-2xl text-center">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-2 text-white">Analyze Web Design with AI</h2>
                <p className="text-gray-400 mb-8">Enter a website URL to generate a complete product design analysis.</p>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                    <div className="relative">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"/>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="example.com"
                            className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all text-gray-200"
                            disabled={isLoading}
                            aria-label="Website URL"
                        />
                    </div>
                     {error && <p className="text-red-400 text-sm">{error}</p>}
                     <button
                        type="submit"
                        disabled={isLoading || !url}
                        className="flex items-center justify-center w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        <WandSparklesIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Analyzing...' : 'Generate Analysis'}
                    </button>
                </form>
            </div>
        </div>
    );
};
