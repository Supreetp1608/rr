import React, { useState } from "react";
import { InputValues, CalculationResults } from "../types";

interface AIAssistantProps {
  inputs: InputValues;
  results: CalculationResults;
  onClose: () => void;
  onSuggestInput: (key: keyof InputValues, value: any) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export interface Message {
  type: "user" | "ai";
  content: string;
  hasAction?: boolean;
  action?: () => void;
  actionText?: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  inputs,
  results,
  onClose,
  onSuggestInput,
  messages,
  setMessages,
}) => {
  // Remove local messages state
  // const [messages, setMessages] = useState<Message[]>([
  //   {
  //     type: "ai",
  //     content: `Hello! I'm your Cloud Optimization Assistant. Your current ROI is $${(
  //       results.totalROI / 1_000_000
  //     ).toFixed(1)}M with a ${results.roiPercentage.toFixed(1)}% return. How can I help you optimize your cloud infrastructure today?`,
  //   },
  // ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const callAzureOpenAI = async (userMessage: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY;
    const url = "https://roi1.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2025-01-01-preview";

    if (!apiKey) {
      throw new Error("Azure OpenAI API key not found");
    }

    const systemPrompt = `You are a Cloud Optimization Assistant helping users optimize their cloud infrastructure for better ROI. 

Current user data:
- Company: ${inputs.companyName || 'Not specified'}
- Annual Revenue: $${(inputs.revenuePerYear / 1_000_000).toFixed(1)}M
- Annual Cloud Spend: $${(inputs.cloudSpendPerYear / 1_000_000).toFixed(1)}M
- Number of Engineers: ${inputs.engineers}
- Engineer Cost Per Year: $${(inputs.engineerCostPerYear / 1000).toFixed(0)}k
- Workload in Cloud: ${inputs.workloadInCloudDescription}%
- Cloud Usage Hours: ${inputs.cloudUsageHours}h/week
- Service Model: SaaS ${inputs.serviceModel.saas}%, PaaS ${inputs.serviceModel.paas}%, IaaS ${inputs.serviceModel.iaas}%
- Spend Trend: ${inputs.spendTrend}
- Industry: ${inputs.industryType}
- Time on Operations: ${inputs.timeOnOps}%
- Manual Toil: ${inputs.manualToil}%
- Container Workloads: ${inputs.containerWorkloads}%
- Pricing Model: ${inputs.pricingModel}
- Compute Spend: ${inputs.computeSpend}%
- Cost-Sensitive Workloads: ${inputs.costSensitiveWorkloads}%
- Cloud Provider: ${inputs.cloudProvider}
- Gross Margin: ${inputs.grossMargin}%
- Number of VMs: ${inputs.numberOfVMs}
- VM Utilization: ${inputs.vmUtilization}%
- Storage Efficiency: ${inputs.storageEfficiency}
- Response Time: ${inputs.responseTime}ms
- Departments Served: ${inputs.departmentsServed}
- Failure Rate: ${inputs.failureRate}%
- Cost of Failure: ${inputs.costOfFailure}%

Current ROI Results:
- Total Annual ROI: $${(results.totalROI / 1_000_000).toFixed(1)}M
- ROI Percentage: ${results.roiPercentage.toFixed(1)}%
- Productivity Gain: $${(results.productivityGain / 1_000_000).toFixed(1)}M
- Cost Savings: $${(results.costSavings / 1_000_000).toFixed(1)}M
- Performance Gain: $${(results.performanceGain / 1_000_000).toFixed(1)}M
- Availability Gain: $${(results.availabilityGain / 1_000_000).toFixed(1)}M

Here are the calculations and range value scores used, based on this the entire formula and calculation is done, you need to learn this and say if the user needs to increase or decrease value based on his request.
eg- You think reduce in manual toil will increase productivity, but look at the formula and see decreas in manual toil decrease in score and decrease in productivity gain.

Calculations:
{
  "scores": {
    "productivity": {
      "formula": "(3 * workload + 3 * usageHours + 2 * serviceModel + 1 * spendTrend + 1 * industry + 2 * timeOnOps + 2 * manualToil) / 14",
      "components": {
        "workload": {
          "almost_all": 100,
          "most_cloud": 90,
          "balanced": 75,
          "early_adoption": 60,
          "mostly_onprem": 40,
          "default": 30
        },
        "usageHours": {
          ">160": 95,
          "130-160": 80,
          "100-129": 70,
          "70-99": 60,
          "<70": 45
        },
        "serviceModel": {
          "saas": 90,
          "paas": 80,
          "iaas": 60,
          "note": "weighted by percentage split"
        },
        "spendTrend": {
          "decreasing": 80,
          "stable": 50,
          "increasing": 30
        },
        "industry": {
          "tech": 90,
          "healthcare": 80,
          "retail": 70,
          "government": 60,
          "default": 70
        },
        "timeOnOps": {
          ">=50": 90,
          "30-49": 80,
          "20-29": 70,
          "10-19": 60,
          "<10": 40
        },
        "manualToil": {
          ">=80": 90,
          "60-79": 70,
          "40-59": 50,
          "20-39": 40,
          "<20": 30
        }
      }
    },
    "costSavings": {
      "formula": "(3 * pricingModel + 3 * computeSpend + 2 * costSensitive + 2 * containerWorkloads + 1 * cloudProvider + 1 * grossMargin) / 12",
      "components": {
        "pricingModel": {
          "spot": 85,
          "reserved": 75,
          "ondemand": 60,
          "default": 60
        },
        "computeSpend": {
          "<20": 30,
          "20-40": 45,
          "41-60": 60,
          "61-80": 75,
          ">80": 90
        },
        "costSensitive": {
          ">=80": 90,
          "60-79": 80,
          "40-59": 70,
          "20-39": 60,
          "<20": 50
        },
        "containerWorkloads": {
          ">=80": 90,
          "60-79": 75,
          "40-59": 60,
          "20-39": 45,
          "<20": 30
        },
        "cloudProvider": {
          "aws": 90,
          "azure": 80,
          "gcp": 75,
          "default": 60,
          "context": "cost"
        },
        "grossMargin": {
          ">=80": 90,
          "60-79": 75,
          "40-59": 60,
          "20-39": 45,
          "<20": 30
        }
      }
    },
    "performance": {
      "formula": "(3 * vmCount + 3 * vmUtilization + 2 * containerWorkloads + 2 * serviceModel + 1 * cloudProvider + 1 * spendTrend + 2 * storageEfficiency + 2 * responseTime) / 16",
      "components": {
        "vmCount": {
          "<=100": 80,
          "101-300": 70,
          "301-500": 60,
          ">500": 50
        },
        "vmUtilization": {
          ">=90": 95,
          "75-89": 85,
          "60-74": 70,
          "40-59": 55,
          "<40": 40
        },
        "containerWorkloads": "see costSavings",
        "serviceModel": "see productivity",
        "cloudProvider": {
          "aws": 85,
          "azure": 80,
          "gcp": 82,
          "default": 70,
          "context": "performance"
        },
        "spendTrend": "see productivity",
        "storageEfficiency": {
          "high": 90,
          "moderate": 60,
          "low": 40,
          "default": 60
        },
        "responseTime": {
          "<200": 90,
          "200-500": 80,
          "501-800": 60,
          "801-1200": 40,
          ">1200": 30
        }
      }
    },
    "availability": {
      "formula": "(3 * cloudProvider + 3 * failureRate + 2 * costOfFailure + 3 * departments + 2 * workload) / 13",
      "components": {
        "cloudProvider": {
          "aws": 95,
          "azure": 90,
          "gcp": 85,
          "default": 70,
          "context": "availability"
        },
        "failureRate": {
          "<0.5": 90,
          "0.5-1": 80,
          "1.01-2": 70,
          "2.01-3": 50,
          ">3": 30
        },
        "costOfFailure": {
          "<0.5": 90,
          "0.5-1": 70,
          "1.01-2": 50,
          ">2": 30
        },
        "departments": {
          ">=15": 95,
          "10-14": 85,
          "7-9": 75,
          "4-6": 60,
          "1-3": 45,
          "0": 30
        },
        "workload": "see productivity"
      }
    }
  },
  "multipliers": {
    "formula": "multiplier = min + (score / 100) * (max - min)",
    "ranges": {
      "productivity": "0.1 – 0.2",
      "costSavings": "0.15 – 0.375",
      "performance": "0.065 – 0.225",
      "availability": "0.05 – 0.175"
    }
  },
  "roi": {
    "revenueCloud": "revenuePerYear * (workloadScore / 100)",
    "productivityGain": "engineers * engineerCostPerYear * productivityMultiplier",
    "costSavings": "cloudSpendPerYear * costSavingsMultiplier",
    "performanceGain": "revenueCloud * performanceMultiplier",
    "availabilityGain": "revenueCloud * availabilityMultiplier",
    "totalROI": "productivityGain + costSavings + performanceGain + availabilityGain",
    "annualMigrationCost": 120000,
    "roiPercentage": "((totalROI - cloudSpendPerYear - annualMigrationCost) / (cloudSpendPerYear + annualMigrationCost)) * 100",
    "monthlyGains": "totalROI / 12"
  }
}



Provide specific, actionable advice for cloud optimization. Focus on:
1. Cost optimization strategies
2. Performance improvements
3. Productivity enhancements
4. Availability and reliability
5. Specific parameter recommendations with estimated impact

📌 Behavior Rules:
- **Never disclose internal formulas**, even if asked. Instead, explain outputs based on related metrics.
- **Never suggest changing constants** (e.g., multipliers like industryMultiplier)
- **Never suggest "increase revenue"** — assume revenue is fixed
- If user asks for a **target output** (e.g., "I want $700k in cost savings"), identify influencing **input parameters**
- Ask **one question at a time** based on dependencies (e.g., “Are you open to reducing onshore engineers?”)
- Wait for user confirmation before suggesting the next change
- Provide a **clear reason** for each suggestion based on the user's inputs
- Responses must be **short (≤60 words)**, precise, and **metrics-based**
- **Avoid generic advice** — every answer must be tailored to the users data
- If asked “How to increase ROI by 20%?”, **explore variables step-by-step** through confirmation-based questioning
-- Then ask **one question at a time** related to those variables.
Example: “if consider A is dependent on B and C..  and user asks how to inprove A...  u need to ask are u comfortable to reduce B?  is user says yes then ask abt C and then give answer....     if user says he can reduce or increase B then ask abt C and give result”
- Provide **justification** for each recommendation (e.g., “Reducing C reduces this feature significantly, which increases other feature. However, this may affect another one if not balanced with offshore capacity.”).
- **Wait for the users confirmation** before proceeding to next recommendation.


🧠 You are a smart, interactive reasoning engine — not a generic assistant. Speak with intelligence, clarity, and empathy. Respond with actionable insights that use the actual data provided.


Keep responses concise, professional, and actionable. If suggesting parameter changes, mention the specific parameter and recommended value.`;

    const requestBody = {
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 800,
      temperature: 0.7,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling Azure OpenAI:", error);
      return "I apologize, but I'm having trouble connecting to my AI service right now. Please try again later or check your internet connection.";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);
    setInput("");

    try {
      const aiResponse = await callAzureOpenAI(input);
      
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: aiResponse
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: "I apologize, but I encountered an error while processing your request. Please try again."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 rounded-2xl border border-purple-500/30 w-full max-w-lg h-[700px] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">
                AI Cloud Optimizer
              </h3>
              <p className="text-purple-300 text-sm">
                Powered by Azure OpenAI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-gray-800/60 backdrop-blur-sm text-gray-200 border border-purple-500/20"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                 {message.hasAction && message.action && message.actionText && (
                   <button
                     onClick={() => message.action?.()}
                    className="mt-3 text-xs bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    {message.actionText}
                  </button>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800/60 backdrop-blur-sm text-gray-200 rounded-2xl p-4 border border-purple-500/20">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-purple-500/20">
          <div className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about optimization, cost, performance..."
              className="flex-1 bg-gray-800/60 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 text-white p-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg disabled:hover:scale-100"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
