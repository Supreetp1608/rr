import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { InputsPanel } from "./components/InputsPanel";
import { OutputsPanel } from "./components/OutputsPanel";
import { AIAssistant } from "./components/AIAssistant";
import { useCalculations } from "./hooks/useCalculations";
import { InputValues, CalculationResults } from "./types";
import {
  saveToDatabase,
  loadFromDatabase,
  type DatabaseRecord,
} from "./lib/cosmos-db";
import { Message } from "./components/AIAssistant";

const defaultInputs: InputValues = {
  companyName: "",
  revenuePerYear: 457000000,
  cloudSpendPerYear: 8080000,
  engineers: 416,
  engineerCostPerYear: 150000,
  workloadInCloudDescription: "almost_all",
  cloudUsageHours: 84,
  serviceModel: { saas: 40, paas: 30, iaas: 30 },
  spendTrend: "increasing",
  industryType: "healthcare",
  timeOnOps: 30,
  manualToil: 60,
  containerWorkloads: 50,
  pricingModel: "spot",
  computeSpend: 45,
  costSensitiveWorkloads: 50,
  cloudProvider: "azure",
  grossMargin: 47,
  numberOfVMs: 'medium',
  vmUtilization: 65,
  storageEfficiency: "moderate",
  responseTime: 1280,
  departmentsServed: 8,
  failureRate: 1.5,
  costOfFailure: 2,
};

function App() {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [inputs, setInputs] = useState<InputValues>(defaultInputs);
  const [showAI, setShowAI] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Chat messages state lifted up from AIAssistant
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      type: "ai",
      content: `Hello! I'm your Cloud Optimization Assistant. Your current ROI is $${(
        useCalculations(defaultInputs).totalROI / 1_000_000
      ).toFixed(1)}M with a ${useCalculations(defaultInputs).roiPercentage.toFixed(1)}% return. How can I help you optimize your cloud infrastructure today?`,
    },
  ]);

  const results = useCalculations(inputs);

  const updateInput = (key: keyof InputValues, value: any) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  // Save to Azure Cosmos DB
  const handleSaveToDatabase = async (data: DatabaseRecord) => {
    try {
      setIsLoading(true);
      await saveToDatabase(data);
    } catch (error) {
      console.error("Error saving to database:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load from database on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await loadFromDatabase();
        if (savedData) {
          setInputs(savedData.inputs);
        }
      } catch (error) {
        console.error("Error loading from database:", error);
      }
    };

    loadData();
  }, []);

  // Auto-save when inputs change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSaveToDatabase({
        inputs: inputs,
        outputs: results,
        timestamp: new Date().toISOString(),
      });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [inputs, results]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse animation-delay-4000"></div>
      </div>

      <Header
        isAdvancedMode={isAdvancedMode}
        onModeToggle={setIsAdvancedMode}
      />

      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-full">
          {/* Inputs Panel - 60% */}
          <div className="lg:col-span-3">
            <InputsPanel
              inputs={inputs}
              isAdvancedMode={isAdvancedMode}
              onInputChange={updateInput}
              isLoading={isLoading}
            />
          </div>

          {/* Outputs Panel - 40% */}
          <div className="lg:col-span-2">
            <OutputsPanel
              results={results}
              companyName={inputs.companyName}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      {/* AI Assistant Button */}
      <button
        onClick={() => setShowAI(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/25 z-50"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>

      {/* AI Assistant Modal */}
      {showAI && (
        <AIAssistant
          inputs={inputs}
          results={results}
          onClose={() => setShowAI(false)}
          onSuggestInput={updateInput}
          messages={chatMessages}
          setMessages={setChatMessages}
        />
      )}

      <style>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default App;
