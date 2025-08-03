import React from 'react';

interface HeaderProps {
  isAdvancedMode: boolean;
  onModeToggle: (mode: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isAdvancedMode, onModeToggle }) => {
  return (
    <header className="bg-black/30 backdrop-blur-sm border-b border-gray-700/30 relative z-10">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-400">
                Cloud ROI Calculator
              </h1>
              <p className="text-gray-300 text-sm">Optimize your cloud infrastructure investment with intelligent cost analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-1 flex border border-gray-700/50">
              <button
                onClick={() => onModeToggle(false)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  !isAdvancedMode
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Easy Mode
              </button>
              <button
                onClick={() => onModeToggle(true)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isAdvancedMode
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Advanced Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};