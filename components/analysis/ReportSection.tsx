import React from 'react';

interface ReportSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ReportSection: React.FC<ReportSectionProps> = ({ title, children }) => {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
      <h2 className="text-lg font-semibold text-white px-6 py-4 border-b border-gray-800">
        {title}
      </h2>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
