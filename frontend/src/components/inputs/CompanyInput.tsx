import React from 'react';

interface CompanyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CompanyInput: React.FC<CompanyInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
        <span>🏢</span>
        <span>Company Name</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your company name"
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
      />
    </div>
  );
};