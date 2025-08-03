import React from "react";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
  icon?: string;
}

export const SliderInput: React.FC<SliderInputProps> = ({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  icon,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
          {icon && <span>{icon}</span>}
          <span>{label}</span>
        </label>
        <span className="text-white font-semibold bg-white/10 px-3 py-1 rounded-full text-sm">
          {format(value)}
        </span>
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onInput={(e) => onChange(Number(e.target.value))}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #00D4FF 0%, #8B5CF6 ${percentage}%, rgba(255,255,255,0.2) ${percentage}%, rgba(255,255,255,0.2) 100%)`,
          }}
        />

        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(45deg, #00d4ff, #8b5cf6);
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
          }

          .slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
          }

          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(45deg, #00d4ff, #8b5cf6);
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </div>

      <div className="flex justify-between text-xs text-gray-400">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
};
