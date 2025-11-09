import React from 'react';
import type { AnalysisReport } from '../../types';

interface ColorPaletteDisplayProps {
  palette: AnalysisReport['colorPalette'];
}

const ColorSwatch: React.FC<{ hex: string, name: string }> = ({ hex, name }) => (
  <div className="flex items-center space-x-3">
    <div
      className="w-8 h-8 rounded-md border-2 border-gray-700"
      style={{ backgroundColor: hex }}
      title={hex}
    />
    <div>
      <p className="font-mono text-sm text-gray-300 uppercase">{hex}</p>
      <p className="text-xs text-gray-500">{name}</p>
    </div>
  </div>
);

export const ColorPaletteDisplay: React.FC<ColorPaletteDisplayProps> = ({ palette }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Primary</h3>
        <div className="flex flex-wrap gap-4">
          {(palette?.primary || []).map(color => <ColorSwatch key={color.hex} {...color} />)}
        </div>
      </div>
       <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Secondary</h3>
        <div className="flex flex-wrap gap-4">
          {(palette?.secondary || []).map(color => <ColorSwatch key={color.hex} {...color} />)}
        </div>
      </div>
       <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Accent</h3>
        <div className="flex flex-wrap gap-4">
          {(palette?.accent || []).map(color => <ColorSwatch key={color.hex} {...color} />)}
        </div>
      </div>
    </div>
  );
};