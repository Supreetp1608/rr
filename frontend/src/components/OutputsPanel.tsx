import React from "react";
import { CalculationResults } from "../types";
import { PieChart } from "./charts/PieChart";
import { DownloadButton } from "./DownloadButton";
 
interface OutputsPanelProps {
  results: CalculationResults;
  companyName: string;
  isLoading: boolean;
}
 
export const OutputsPanel: React.FC<OutputsPanelProps> = ({
  results,
  companyName,
  isLoading,
}) => {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };
 
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;
 
  const resultItems = [
    {
      label: "Cost Saving",
      value: results.costSavings,
      color: "#00D4FF",
    },
    {
      label: "Productivity Gain",
      value: results.productivityGain,
      color: "#8B5CF6",
    },
    {
      label: "Availability Gain",
      value: results.availabilityGain,
      color: "#FF8C00",
    },
    {
      label: "Performance Gain",
      value: results.performanceGain,
      color: "#00FF88",
    },
  ];
 
  return (
    <div className="space-y-8">
      {/* ROI Analysis Box */}
      <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">ROI Analysis</h2>
            <p className="text-gray-400 text-sm">Annual Impact Assessment</p>
          </div>
          <DownloadButton results={results} companyName={companyName} />
        </div>
 
        {/* Middle Section: PieChart + Savings Breakdown */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Left Side: Pie Chart */}
          <div className="flex-1 flex justify-center items-center">
            <PieChart
              data={resultItems}
              totalROI={results.totalROI}
              roiPercentage={results.roiPercentage}
              isLoading={false}
            />
          </div>
 
          {/* Right Side: Savings Breakdown */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-4">
              Savings Breakdown
            </h3>
            <div className="space-y-4">
              {resultItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 bg-gray-900/40 rounded-xl border border-gray-700/50"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-300 font-medium">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-white font-bold text-md">
                    {formatCurrency(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* Bottom Summary: Total Savings and ROI */}
 
       
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-gray-900/60 rounded-lg p-3 border border-green-500/20">
            <p className="text-gray-400 text-xs mb-1">Total Annual Savings</p>
            <p className="text-lg font-bold text-green-400">
              {formatCurrency(results.totalROI)}
            </p>
          </div>
          <div className="bg-gray-900/60 rounded-lg p-3 border border-purple-500/20">
            <p className="text-gray-400 text-xs mb-1">Return on Investment</p>
            <p className="text-lg font-bold text-purple-400">
              {formatPercentage(results.roiPercentage)}
            </p>
          </div>
        </div>
      </div>
 
      {/* Individual Gains Section */}
    </div>
  );
};
 