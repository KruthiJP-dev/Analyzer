import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, TooltipProps } from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import type { AnalysisReport } from '../../types';

interface ColorDistributionChartProps {
  palette: AnalysisReport['colorPalette'];
}

export const ColorDistributionChart: React.FC<ColorDistributionChartProps> = ({ palette }) => {
  const chartData = [
    ...(palette?.primary || []).map(c => ({ name: c.name, prominence: c.prominence, hex: c.hex, type: 'Primary' })),
    ...(palette?.secondary || []).map(c => ({ name: c.name, prominence: c.prominence, hex: c.hex, type: 'Secondary' })),
    ...(palette?.accent || []).map(c => ({ name: c.name, prominence: c.prominence, hex: c.hex, type: 'Accent' })),
  ].filter(c => c.prominence > 0).sort((a, b) => b.prominence - a.prominence);

  if (chartData.length === 0) {
    return <p className="text-gray-400">No color prominence data available to display a chart.</p>;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-700 p-2 rounded-md shadow-lg">
          <p className="font-semibold text-white">{`${label}`}</p>
          <p className="text-gray-300">{`Prominence: ${payload[0].value}%`}</p>
          <p className="text-xs text-gray-500">{`Type: ${data.type}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}/>
                <Bar dataKey="prominence" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.hex} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};