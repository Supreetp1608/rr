import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  icon?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  options,
  onChange,
  icon,
}) => {
  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-gray-800 text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
