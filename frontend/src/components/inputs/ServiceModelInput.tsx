import React from 'react';

interface ServiceModelInputProps {
  value: {
    saas: number;
    paas: number;
    iaas: number;
  };
  onChange: (value: { saas: number; paas: number; iaas: number }) => void;
}

export const ServiceModelInput: React.FC<ServiceModelInputProps> = ({ value, onChange }) => {
  const updateValue = (key: 'saas' | 'paas' | 'iaas', newValue: number) => {
    const total = Object.values(value).reduce((sum, val) => sum + val, 0);
    const otherKeys = Object.keys(value).filter(k => k !== key) as ('saas' | 'paas' | 'iaas')[];
    
    if (newValue >= 100) {
      onChange({ saas: 0, paas: 0, iaas: 0, [key]: 100 });
      return;
    }
    
    const remaining = 100 - newValue;
    const otherTotal = otherKeys.reduce((sum, k) => sum + value[k], 0);
    
    if (otherTotal === 0) {
      const split = remaining / otherKeys.length;
      const newState = { [key]: newValue } as any;
      otherKeys.forEach(k => newState[k] = split);
      onChange(newState);
    } else {
      const ratio = remaining / otherTotal;
      const newState = { [key]: newValue } as any;
      otherKeys.forEach(k => newState[k] = Math.round(value[k] * ratio));
      
      // Ensure total is exactly 100
      const actualTotal = Object.values(newState).reduce((sum: number, val: number) => sum + val, 0);
      if (actualTotal !== 100) {
        const diff = 100 - actualTotal;
        newState[otherKeys[0]] += diff;
      }
      
      onChange(newState);
    }
  };

  return (
    <div className="space-y-4">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
        <span>🏗️</span>
        <span>Cloud Service Model Distribution</span>
      </label>
      
      <div className="space-y-3">
        {[
          { key: 'saas', label: 'SaaS', color: 'bg-blue-500' },
          { key: 'paas', label: 'PaaS', color: 'bg-green-500' },
          { key: 'iaas', label: 'IaaS', color: 'bg-purple-500' }
        ].map(({ key, label, color }) => (
          <div key={key} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">{label}</span>
              <span className="text-white font-semibold bg-white/10 px-2 py-1 rounded text-xs">
                {value[key as keyof typeof value]}%
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={value[key as keyof typeof value]}
                onChange={(e) => updateValue(key as keyof typeof value, Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${color === 'bg-blue-500' ? '#3B82F6' : color === 'bg-green-500' ? '#10B981' : '#8B5CF6'} 0%, ${color === 'bg-blue-500' ? '#3B82F6' : color === 'bg-green-500' ? '#10B981' : '#8B5CF6'} ${value[key as keyof typeof value]}%, rgba(255,255,255,0.2) ${value[key as keyof typeof value]}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-gray-400 text-center">
        Total: {Object.values(value).reduce((sum, val) => sum + val, 0)}%
      </div>
    </div>
  );
};