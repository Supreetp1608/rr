import { useMemo } from "react";
import { InputValues, CalculationResults } from "../types";
 
export const useCalculations = (inputs: InputValues): CalculationResults => {
  return useMemo(() => {
    const getWorkloadScore = (description: string): number => {
      switch (description) {
        case "almost_all":
          return 100;
        case "most_cloud":
          return 90;
        case "balanced":
          return 75;
        case "early_adoption":
          return 60;
        case "mostly_onprem":
          return 40;
        default:
          return 30;
      }
    };
 
    const getUsageHoursScore = (hours: number): number => {
      if (hours > 160) return 95;
      if (hours >= 130) return 80;
      if (hours >= 100) return 70;
      if (hours >= 70) return 60;
      return 45;
    };
 
    const getServiceModelScore = (model: {
      saas: number;
      paas: number;
      iaas: number;
    }): number => {
      const saasContribution = (model.saas / 100) * 90;
      const paasContribution = (model.paas / 100) * 80;
      const iaasContribution = (model.iaas / 100) * 60;
      return saasContribution + paasContribution + iaasContribution;
    };
 
    const getSpendTrendScore = (trend: string): number => {
      switch (trend) {
        case "decreasing":
          return 80;
        case "stable":
          return 50;
        case "increasing":
          return 30;
        default:
          return 50;
      }
    };
 
    const getIndustryScore = (industry: string): number => {
      switch (industry) {
        case "tech":
          return 90;
        case "healthcare":
          return 80;
        case "retail":
          return 70;
        case "government":
          return 60;
        default:
          return 70;
      }
    };
 
    const getTimeOnOpsScore = (percentage: number): number => {
      // if (percentage >= 50) return 90;
      // if (percentage >= 30) return 80;
      // if (percentage >= 20) return 70;
      // if (percentage >= 10) return 60;
      // return 40;
      return percentage;
    };
 
    const getManualToilScore = (percentage: number): number => {
      // if (percentage >= 80) return 90;
      // if (percentage >= 60) return 70;
      // if (percentage >= 40) return 50;
      // if (percentage >= 20) return 40;
      // return 30;
      return percentage;
    };
 
    const getPricingModelScore = (model: string): number => {
      switch (model) {
        case "spot":
          return 85;
        case "reserved":
          return 75;
        case "ondemand":
          return 60;
        default:
          return 60;
      }
    };
 
    const getComputeSpendScore = (percentage: number): number => {
      // if (percentage < 20) return 30;
      // if (percentage <= 40) return 45;
      // if (percentage <= 60) return 60;
      // if (percentage <= 80) return 75;
      // return 90;
            return percentage;
 
    };
 
    const getCostSensitiveScore = (percentage: number): number => {
      // if (percentage >= 80) return 90;
      // if (percentage >= 60) return 80;
      // if (percentage >= 40) return 70;
      // if (percentage >= 20) return 60;
      // return 50;
      return percentage;
 
    };
 
    const getContainerWorkloadsScore = (percentage: number): number => {
      // if (percentage >= 80) return 90;
      // if (percentage >= 60) return 75;
      // if (percentage >= 40) return 60;
      // if (percentage >= 20) return 45;
      // return 30;
      return percentage;
 
    };
 
    const getCloudProviderScore = (
      provider: string,
      context: "cost" | "performance" | "availability"
    ): number => {
      switch (provider) {
        case "aws":
          return context === "cost" ? 90 : context === "performance" ? 85 : 95;
        case "azure":
          return context === "cost" ? 80 : context === "performance" ? 80 : 90;
        case "gcp":
          return context === "cost" ? 75 : context === "performance" ? 82 : 85;
        default:
          return context === "cost" ? 60 : context === "performance" ? 70 : 70;
      }
    };
 
    const getGrossMarginScore = (percentage: number): number => {
      // if (percentage >= 80) return 90;
      // if (percentage >= 60) return 75;
      // if (percentage >= 40) return 60;
      // if (percentage >= 20) return 45;
      // return 30;
      return percentage;
 
    };
 
    const getVMCountScore = (category: 'low' | 'medium' | 'high' | 'very_high'): number => {
      switch (category) {
        case 'low':
          return 45;
        case 'medium':
          return 60;
        case 'high':
          return 75;
        case 'very_high':
          return 90;
        default:
          return 45;
      }
    };
 
    const getVMUtilizationScore = (percentage: number): number => {
      // if (percentage >= 90) return 95;
      // if (percentage >= 75) return 85;
      // if (percentage >= 60) return 70;
      // if (percentage >= 40) return 55;
      // return 40;
      return percentage;
 
    };
 
    const getStorageEfficiencyScore = (efficiency: string): number => {
      switch (efficiency) {
        case "high":
          return 90;
        case "moderate":
          return 60;
        case "low":
          return 40;
        default:
          return 60;
      }
    };
 
    const getResponseTimeScore = (ms: number): number => {
      if (ms < 200) return 90;
      if (ms <= 500) return 80;
      if (ms <= 800) return 60;
      if (ms <= 1200) return 40;
      return 30;
    };
 
    const getDepartmentsScore = (count: number): number => {
      if (count >= 15) return 95;
      if (count >= 10) return 85;
      if (count >= 7) return 75;
      if (count >= 4) return 60;
      if (count >= 1) return 45;
      return 30;
    };
 
    const getFailureRateScore = (percentage: number): number => {
      if (percentage < 0.5) return 90;
      if (percentage <= 1) return 80;
      if (percentage <= 2) return 70;
      if (percentage <= 3) return 50;
      return 30;
    };
 
    
    const getCostOfFailureScore = (percentage: number): number => {
      if (percentage < 0.5) return 90;
      if (percentage <= 1) return 70;
      if (percentage <= 2) return 50;
      return 30;
    };
 
    // const getMultiplier = (score: number, min: number, max: number): number => {
    //   return min + (score / 100) * (max - min);
    // };
 
   
    // ---- Rebalanced Scores ----
 
    const productivityScore =
      (3 * getWorkloadScore(inputs.workloadInCloudDescription) +
        3 * getUsageHoursScore(inputs.cloudUsageHours) +
        2 * getServiceModelScore(inputs.serviceModel) +
        1 * getSpendTrendScore(inputs.spendTrend) +
        1 * getIndustryScore(inputs.industryType) +
        2 * getTimeOnOpsScore(inputs.timeOnOps) +
        2 * getManualToilScore(inputs.manualToil) +
        1 * getGrossMarginScore(inputs.grossMargin)) /
      15;
 
    const costSavingsScore =
      (3 * getPricingModelScore(inputs.pricingModel) +
        3 * getComputeSpendScore(inputs.computeSpend) +
        2 * getCostSensitiveScore(inputs.costSensitiveWorkloads) +
        2 * getContainerWorkloadsScore(inputs.containerWorkloads) +
        1 * getCloudProviderScore(inputs.cloudProvider, "cost") ) /
      11;
 
    const performanceScore =
      (3 * getVMCountScore(inputs.numberOfVMs) +
        3 * getVMUtilizationScore(inputs.vmUtilization) +
        2 * getContainerWorkloadsScore(inputs.containerWorkloads) +
        2 * getServiceModelScore(inputs.serviceModel) +
        1 * getCloudProviderScore(inputs.cloudProvider, "performance") +
        1 * getSpendTrendScore(inputs.spendTrend) +
        2 * getStorageEfficiencyScore(inputs.storageEfficiency) +
        2 * getResponseTimeScore(inputs.responseTime)) /
      16;
      
    
 
    const availabilityScore =
      (3 * getCloudProviderScore(inputs.cloudProvider, "availability") +
        3 * getFailureRateScore(inputs.failureRate) +
        2 * getCostOfFailureScore(inputs.costOfFailure) +
        3 * getDepartmentsScore(inputs.departmentsServed) +
        2 * getWorkloadScore(inputs.workloadInCloudDescription)) /
      13;
 
    // ---- Multipliers ----
    // const getAmplifiedMultiplier = (
    //   score: number,
    //   min: number,
    //   max: number,
    //   power: number = 2 // 2 = quadratic, can try 1.5, 3, etc.
    // ): number => {
    //   const normalized = Math.pow(score / 100, power);
    //   return min + normalized * (max - min);
    // };
    
 
 
 
    // const productivityMultiplier = getAmplifiedMultiplier(productivityScore, 0.1, 0.2, 2);
    // const costSavingsMultiplier = getAmplifiedMultiplier(costSavingsScore, 0.15, 0.375, 2);
    // const performanceMultiplier = getAmplifiedMultiplier(performanceScore, 0.05, 0.175, 2);
    // const availabilityMultiplier = getAmplifiedMultiplier(availabilityScore, 0.01, 0.02, 2);
    
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
    
 
    const getMultiplier1 = (score: number, min: number, max: number): number => {
      const normalized = Math.log10(score + 1) / Math.log10(101); // log-based scaling
      return min + normalized * (max - min);
    };
    
     const getMultiplier = (
      score: number,
      min: number,
      max: number,
      power: number = 3 // 2 = quadratic, can try 1.5, 3, etc.
    ): number => {
      const normalized = Math.pow(score / 100, power);
      return min + normalized * (max - min);
    };
 
    const productivityMultiplier = getMultiplier(productivityScore, 0.1, 0.2);
    const costSavingsMultiplier = getMultiplier(costSavingsScore, 0.1, 0.3);
    const performanceMultiplier = getMultiplier(performanceScore, 0.02, 0.05);
    const availabilityMultiplier = getMultiplier(
      availabilityScore,
      0.01,
      0.03
    );
 
    // ---- Gain Calculations (Annual) ----
 
    // const revenueCloud = inputs.revenuePerYear * (getWorkloadScore(inputs.workloadInCloudDescription) / 100);
    const revenueCloud = inputs.revenuePerYear * Math.min(getWorkloadScore(inputs.workloadInCloudDescription) / 100, 0.7); // max 70% impact
 
    
    
    // const revenueCloud = inputs.revenuePerYear;
    const productivityGain =
      inputs.engineers * inputs.engineerCostPerYear * productivityMultiplier;
    const costSavings = inputs.cloudSpendPerYear * costSavingsMultiplier;
    const performanceGain = revenueCloud * performanceMultiplier * getGrossMarginScore(inputs.grossMargin) / 100;
    const availabilityGain = revenueCloud * availabilityMultiplier * getGrossMarginScore(inputs.grossMargin) / 100;
 
    const totalROI =
      productivityGain + costSavings + performanceGain + availabilityGain;
 
    // Migration Cost Logic (Annualized)
    const migrationCost = 120000;
    const amortizationPeriod = 12;
    const annualMigrationCostImpact = migrationCost;
 
    // ROI Formula - ANNUAL
    // const roiPercentage =
    //   ((totalROI - inputs.cloudSpendPerYear - annualMigrationCostImpact) /
    //     (inputs.cloudSpendPerYear + annualMigrationCostImpact)) *
    //   100;
 
    const roiPercentage =
      ((totalROI - annualMigrationCostImpact) /
        (inputs.cloudSpendPerYear + annualMigrationCostImpact)) *
      100;
 
    return {
      productivityGain,
      costSavings,
      performanceGain,
      availabilityGain,
      totalROI,
      roiPercentage,
      monthlyGains: totalROI / 12,
      scores: {
        productivity: productivityScore,
        costSavings: costSavingsScore,
        performance: performanceScore,
        availability: availabilityScore,
      },
    };
  }, [inputs]);
};