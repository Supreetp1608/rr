import React from 'react';

interface PieChartData {
  label: string;
  value: number;
  color: string;
  icon: string;
}

interface PieChartProps {
  data: PieChartData[];
  totalROI: number;
  roiPercentage: number;
  isLoading: boolean;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  totalROI,
  roiPercentage,
  isLoading
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  if (total === 0 || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse"></div>
        </div>
      </div>
    );
  }

  const createPieSlice = (value: number, startAngle: number, color: string, index: number) => {
    const percentage = (value / total) * 100;
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    
    const x1 = 50 + 35 * Math.cos((startAngle * Math.PI) / 180);
    const y1 = 50 + 35 * Math.sin((startAngle * Math.PI) / 180);
    const x2 = 50 + 35 * Math.cos((endAngle * Math.PI) / 180);
    const y2 = 50 + 35 * Math.sin((endAngle * Math.PI) / 180);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const pathData = [
      'M', 50, 50,
      'L', x1, y1,
      'A', 35, 35, 0, largeArcFlag, 1, x2, y2,
      'Z'
    ].join(' ');

    return (
      <path
        key={index}
        d={pathData}
        fill={color}
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="1"
        className="transition-all duration-500 hover:opacity-80 cursor-pointer"
        style={{
          animation: `slideIn 0.8s ease-out ${index * 0.1}s both`,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
        }}
      />
    );
  };

  let currentAngle = -90; // Start from top
  const slices = data.map((item, index) => {
    const slice = createPieSlice(item.value, currentAngle, item.color, index);
    currentAngle += ((item.value / total) * 360);
    return slice;
  });

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  return (
    <div className="space-y-6">
      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-72 h-72 transform -rotate-90">
          {/* Outer glow effect */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glow)">
            {slices}
          </g>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-gray-900/90 backdrop-blur-sm rounded-full w-28 h-28 flex flex-col items-center justify-center border border-gray-700/50">
            <div className="text-lg font-bold text-white">
              {formatCurrency(totalROI)}
            </div>
            <div className="text-xs text-gray-400 font-medium">
              Total Annual Benefit
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};