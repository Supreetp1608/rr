export interface InputValues {
  companyName: string;
  workloadInCloudDescription: string;

  revenuePerYear: number;
  cloudSpendPerYear: number;
  engineers: number;
  engineerCostPerYear: number;

  cloudUsageHours: number;
  serviceModel: {
    saas: number;
    paas: number;
    iaas: number;
  };
  spendTrend: "increasing" | "stable" | "decreasing";
  industryType: "tech" | "healthcare" | "retail" | "government";
  timeOnOps: number;
  manualToil: number;
  containerWorkloads: number;
  pricingModel: "spot" | "reserved" | "ondemand";
  computeSpend: number;
  costSensitiveWorkloads: number;
  cloudProvider: "aws" | "azure" | "gcp" | "others";
  grossMargin: number;
  numberOfVMs: 'low' | 'medium' | 'high' | 'very_high';
  vmUtilization: number;
  storageEfficiency: "high" | "moderate" | "low";
  responseTime: number;
  departmentsServed: number;
  failureRate: number;
  costOfFailure: number;
}

export interface CalculationResults {
  productivityGain: number;
  costSavings: number;
  performanceGain: number;
  availabilityGain: number;
  totalROI: number;
  roiPercentage: number;
  monthlyGains: number;
  scores: {
    productivity: number;
    costSavings: number;
    performance: number;
    availability: number;
  };
}

export interface SliderConfig {
  min: number;
  max: number;
  step: number;
  unit?: string;
  format?: (value: number) => string;
}
