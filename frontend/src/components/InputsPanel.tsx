import React from "react";
import { InputValues } from "../types";
import { CompanyInput } from "./inputs/CompanyInput";
import { SliderInput } from "./inputs/SliderInput";
import { SelectInput } from "./inputs/SelectInput";
import { ServiceModelInput } from "./inputs/ServiceModelInput";

interface InputsPanelProps {
  inputs: InputValues;
  isAdvancedMode: boolean;
  onInputChange: (key: keyof InputValues, value: any) => void;
  isLoading: boolean;
}

export const InputsPanel: React.FC<InputsPanelProps> = ({
  inputs,
  isAdvancedMode,
  onInputChange,
  isLoading,
}) => {
  const formatCurrency = (value: number) => `$${(value / 1000000).toFixed(1)}M`;
  const formatPercentage = (value: number) => `${value}%`;
  const formatNumber = (value: number) => value.toString();
  const formatHours = (value: number) => `${value}h/week`;
  const formatMs = (value: number) => `${value}ms`;

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 h-fit shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">ROI Estimation</h2>
          <p className="text-gray-400 text-sm">
            Configure your cloud infrastructure parameters
          </p>
        </div>
        {isLoading && (
          <div className="flex items-center space-x-2 text-blue-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
            <span className="text-sm">Saving...</span>
          </div>
        )}
      </div>

      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
        {/* Company Name - Always visible */}
        <CompanyInput
          value={inputs.companyName}
          onChange={(value) => onInputChange("companyName", value)}
        />

        {/* Basic inputs - Always visible */}
        <div className="grid grid-cols-1 gap-6">
          <SliderInput
            label="Annual Revenue"
            value={inputs.revenuePerYear}
            min={1000000}
            max={1000000000}
            step={1000000}
            format={formatCurrency}
            onChange={(value) => onInputChange("revenuePerYear", value)}
            icon="💰"
          />

          <SliderInput
            label="Annual Infrastructure Spend"
            value={inputs.cloudSpendPerYear}
            min={100000}
            max={100000000}
            step={100000}
            format={formatCurrency}
            onChange={(value) => onInputChange("cloudSpendPerYear", value)}
            icon="☁️"
          />

          <SliderInput
            label="Number of Engineers"
            value={inputs.engineers}
            min={1}
            max={1000}
            step={1}
            format={formatNumber}
            onChange={(value) => onInputChange("engineers", value)}
            icon="👥"
          />
        </div>

        {/* Advanced Mode Inputs */}
        {isAdvancedMode && (
          <>
            <div className="border-t border-gray-700/50 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                CLOUD CONFIGURATION
              </h3>
              <div className="space-y-6">
                <SelectInput
                  label="Cloud Workload Description"
                  value={inputs.workloadInCloudDescription}
                  options={[
                    {
                      value: "almost_all",
                      label:
                        "Almost all workloads are cloud-based (fully cloud-native)",
                    },
                    {
                      value: "most_cloud",
                      label: "Most workloads in cloud, some legacy on-prem",
                    },
                    {
                      value: "balanced",
                      label: "Balanced between cloud and on-prem",
                    },
                    {
                      value: "early_adoption",
                      label: "Early cloud adoption, few workloads migrated",
                    },
                    {
                      value: "mostly_onprem",
                      label: "Mostly on-prem/private datacenters",
                    },
                  ]}
                  onChange={(value) =>
                    onInputChange("workloadInCloudDescription", value)
                  }
                  icon="☁️"
                />

                <SliderInput
                  label="Cloud Usage Hours"
                  value={inputs.cloudUsageHours}
                  min={0}
                  max={168}
                  step={1}
                  format={formatHours}
                  onChange={(value) => onInputChange("cloudUsageHours", value)}
                  icon="⏰"
                />

                <ServiceModelInput
                  value={inputs.serviceModel}
                  onChange={(value) => onInputChange("serviceModel", value)}
                />

                <SelectInput
                  label="Spend Trend"
                  value={inputs.spendTrend}
                  options={[
                    { value: "decreasing", label: "Decreasing" },
                    { value: "stable", label: "Stable" },
                    { value: "increasing", label: "Increasing" },
                  ]}
                  onChange={(value) => onInputChange("spendTrend", value)}
                  icon="📈"
                />

                <SelectInput
                  label="Industry Type"
                  value={inputs.industryType}
                  options={[
                    { value: "tech", label: "Technology / SaaS" },
                    { value: "healthcare", label: "Healthcare" },
                    { value: "retail", label: "Retail" },
                    { value: "government", label: "Government" },
                  ]}
                  onChange={(value) => onInputChange("industryType", value)}
                  icon="🏢"
                />
              </div>
            </div>

            <div className="border-t border-gray-700/50 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                OPERATIONS & PRODUCTIVITY
              </h3>
              <div className="space-y-6">
                <SliderInput
                  label="Engineer Cost Per Year"
                  value={inputs.engineerCostPerYear}
                  min={30000}
                  max={400000}
                  step={5000}
                  format={(value) => `$${(value / 1000).toFixed(0)}k`}
                  onChange={(value) =>
                    onInputChange("engineerCostPerYear", value)
                  }
                  icon="👨‍💻"
                />

                <SliderInput
                  label="Time on Operations"
                  value={inputs.timeOnOps}
                  min={0}
                  max={100}
                  step={5}
                  format={formatPercentage}
                  onChange={(value) => onInputChange("timeOnOps", value)}
                  icon="⚙️"
                />

                <SliderInput
                  label="Manual Toil"
                  value={inputs.manualToil}
                  min={0}
                  max={100}
                  step={5}
                  format={formatPercentage}
                  onChange={(value) => onInputChange("manualToil", value)}
                  icon="🔧"
                />

                <SliderInput
                  label="Container Workloads"
                  value={inputs.containerWorkloads}
                  min={0}
                  max={100}
                  step={5}
                  format={formatPercentage}
                  onChange={(value) =>
                    onInputChange("containerWorkloads", value)
                  }
                  icon="📦"
                />
              </div>
            </div>

            <div className="border-t border-gray-700/50 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                COST MANAGEMENT
              </h3>
              <div className="space-y-6">
                <SelectInput
                  label="Pricing Model"
                  value={inputs.pricingModel}
                  options={[
                    { value: "spot", label: "Spot Instances" },
                    { value: "reserved", label: "Reserved Instances" },
                    { value: "ondemand", label: "On-Demand" },
                  ]}
                  onChange={(value) => onInputChange("pricingModel", value)}
                  icon="💳"
                />

                <SliderInput
                  label="Compute Spend"
                  value={inputs.computeSpend}
                  min={0}
                  max={100}
                  step={5}
                  format={formatPercentage}
                  onChange={(value) => onInputChange("computeSpend", value)}
                  icon="🖥️"
                />

                <SliderInput
                  label="Cost-Sensitive Workloads"
                  value={inputs.costSensitiveWorkloads}
                  min={0}
                  max={100}
                  step={5}
                  format={formatPercentage}
                  onChange={(value) =>
                    onInputChange("costSensitiveWorkloads", value)
                  }
                  icon="💡"
                />

                <SelectInput
                  label="Cloud Provider"
                  value={inputs.cloudProvider}
                  options={[
                    { value: "aws", label: "Amazon Web Services" },
                    { value: "azure", label: "Microsoft Azure" },
                    { value: "gcp", label: "Google Cloud Platform" },
                    { value: "others", label: "Others" },
                  ]}
                  onChange={(value) => onInputChange("cloudProvider", value)}
                  icon="☁️"
                />

                <SliderInput
                  label="Gross Margin"
                  value={inputs.grossMargin}
                  min={1}
                  max={100}
                  step={1}
                  format={formatPercentage}
                  onChange={(value) => onInputChange("grossMargin", value)}
                  icon="📊"
                />
              </div>
            </div>

            <div className="border-t border-gray-700/50 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                PERFORMANCE & AVAILABILITY
              </h3>
              <div className="space-y-6">
                {/* Number of VMs - now a select input */}
                <SelectInput
                  label="Number of VMs"
                  value={inputs.numberOfVMs}
                  options={[
                    { value: 'low', label: 'Low (100–200)' },
                    { value: 'medium', label: 'Medium (200–400)' },
                    { value: 'high', label: 'High (400–600)' },
                    { value: 'very_high', label: 'Very High (>600)' },
                  ]}
                  onChange={(value) => onInputChange("numberOfVMs", value)}
                  icon="🖥️"
                />

                <SliderInput
                  label="VM Utilization"
                  value={inputs.vmUtilization}
                  min={0}
                  max={100}
                  step={5}
                  format={formatPercentage}
                  onChange={(value) => onInputChange("vmUtilization", value)}
                  icon="📈"
                />

                <SelectInput
                  label="Storage Efficiency"
                  value={inputs.storageEfficiency}
                  options={[
                    { value: "high", label: "High" },
                    { value: "moderate", label: "Moderate" },
                    { value: "low", label: "Low" },
                  ]}
                  onChange={(value) =>
                    onInputChange("storageEfficiency", value)
                  }
                  icon="💾"
                />

                <SliderInput
                  label="Average Response Time"
                  value={inputs.responseTime}
                  min={50}
                  max={5000}
                  step={50}
                  format={formatMs}
                  onChange={(value) => onInputChange("responseTime", value)}
                  icon="⚡"
                />

                <SliderInput
                  label="Departments Served"
                  value={inputs.departmentsServed}
                  min={1}
                  max={20}
                  step={1}
                  format={formatNumber}
                  onChange={(value) =>
                    onInputChange("departmentsServed", value)
                  }
                  icon="🏢"
                />

                <SliderInput
                  label="Failure Rate"
                  value={inputs.failureRate}
                  min={0}
                  max={10}
                  step={0.1}
                  format={formatPercentage}
                  onChange={(value) => onInputChange("failureRate", value)}
                  icon="⚠️"
                />

                <SliderInput
                  label="Cost of Failure"
                  value={inputs.costOfFailure}
                  min={0}
                  max={10}
                  step={0.1}
                  format={formatPercentage}
                  onChange={(value) => onInputChange("costOfFailure", value)}
                  icon="💸"
                />
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
};
