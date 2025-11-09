import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.93 2.55a2 2 0 0 0-1.86 0L6.53 4.09a2 2 0 0 1-2.4 0L2.58 2.55a2 2 0 0 0-1.86 0L.27 4.09a2 2 0 0 0 0 3.42l1.54 1.46a2 2 0 0 1 0 2.4l-1.54 1.46a2 2 0 0 0 0 3.42l.45.43a2 2 0 0 0 1.86 0l1.54-1.46a2 2 0 0 1 2.4 0l1.54 1.46a2 2 0 0 0 1.86 0l.45-.43a2 2 0 0 0 0-3.42L5.07 11.3a2 2 0 0 1 0-2.4l1.54-1.46a2 2 0 0 0 0-3.42Z" />
    <path d="m21.27 10.5-1.54-1.46a2 2 0 0 0-2.4 0l-1.54 1.46a2 2 0 0 1-1.86 0l-.45.43a2 2 0 0 0 0 3.42l1.54 1.46a2 2 0 0 1 0 2.4l-1.54 1.46a2 2 0 0 0 0 3.42l.45.43a2 2 0 0 0 1.86 0l1.54-1.46a2 2 0 0 1 2.4 0l1.54 1.46a2 2 0 0 0 1.86 0l.45-.43a2 2 0 0 0 0-3.42l-1.54-1.46a2 2 0 0 1 0-2.4Z" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="w-full p-4 border-b border-gray-700/50 flex items-center justify-center">
      <div className="flex items-center space-x-3 text-white">
        <SparklesIcon className="w-7 h-7 text-purple-400" />
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          AI Web Design Analyzer
        </h1>
      </div>
    </header>
  );
};
