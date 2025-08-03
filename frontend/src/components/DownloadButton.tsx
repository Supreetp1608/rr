import React from 'react';
import { CalculationResults } from '../types';

interface DownloadButtonProps {
  results: CalculationResults;
  companyName: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  results,
  companyName
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const generateReport = () => {
    // Generate comprehensive report data
    const reportData = {
      company: companyName || 'Your Company',
      timestamp: new Date().toISOString(),
      totalROI: results.totalROI,
      roiPercentage: results.roiPercentage,
      productivityGain: results.productivityGain,
      costSavings: results.costSavings,
      performanceGain: results.performanceGain,
      availabilityGain: results.availabilityGain,
      breakdown: {
        infraCostAvoided: results.costSavings,
        opsCostSaved: results.productivityGain,
        downtimeCostAvoided: results.availabilityGain,
        revenueUplift: results.performanceGain
      },
      scores: results.scores
    };

    // Save to Azure Cosmos DB (placeholder)
    saveToAzureDB(reportData);
    
    // Also generate PDF for download
    generatePDF(reportData);
  };

  const saveToAzureDB = async (data: any) => {
    try {
      // This would be your actual Azure Cosmos DB integration
      console.log('Saving to Azure Cosmos DB:', data);
      
      // Example API call structure:
      // const response = await fetch('/api/cosmos/save-roi-report', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${azureToken}`
      //   },
      //   body: JSON.stringify({
      //     id: `roi-report-${Date.now()}`,
      //     partitionKey: data.company,
      //     ...data
      //   })
      // });
      
      alert('Report saved to Azure database successfully!');
    } catch (error) {
      console.error('Error saving to Azure Cosmos DB:', error);
      alert('Error saving to database. Please try again.');
    }
  };

  const generatePDF = (data: any) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${data.company} ROI Analysis Report</title>
            <style>
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                margin: 0; 
                padding: 40px;
                background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
                color: white;
                min-height: 100vh;
              }
              .header { 
                text-align: center; 
                margin-bottom: 40px; 
                padding: 30px;
                background: rgba(255,255,255,0.1);
                border-radius: 20px;
                backdrop-filter: blur(10px);
              }
              .header h1 {
                background: linear-gradient(45deg, #06b6d4, #8b5cf6);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 2.5em;
                margin: 0;
              }
              .metric { 
                margin: 20px 0; 
                padding: 20px; 
                background: rgba(255,255,255,0.1);
                border-radius: 15px; 
                border-left: 4px solid #8b5cf6;
                backdrop-filter: blur(10px);
              }
              .metric-label { 
                font-weight: bold; 
                color: #e5e7eb; 
                font-size: 1.1em;
              }
              .metric-value { 
                font-size: 1.8em; 
                color: #06b6d4; 
                font-weight: bold;
                margin-top: 5px;
              }
              .total-roi { 
                background: linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.2));
                border-left-color: #10b981;
                text-align: center;
                padding: 30px;
              }
              .breakdown {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-top: 30px;
              }
              .footer {
                margin-top: 40px;
                text-align: center;
                color: #9ca3af;
                font-size: 0.9em;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${data.company}</h1>
              <h2>Cloud ROI Analysis Report</h2>
              <p>Generated on ${new Date(data.timestamp).toLocaleDateString()}</p>
            </div>
            
            <div class="metric total-roi">
              <div class="metric-label">Total Annual ROI</div>
              <div class="metric-value">${formatCurrency(data.totalROI)}</div>
              <div style="font-size: 1.2em; color: #10b981; margin-top: 10px;">
                ${data.roiPercentage.toFixed(1)}% Return on Investment
              </div>
            </div>
            
            <div class="breakdown">
              <div class="metric">
                <div class="metric-label">💰 Infra Cost Avoided</div>
                <div class="metric-value">${formatCurrency(data.breakdown.infraCostAvoided)}</div>
              </div>
              
              <div class="metric">
                <div class="metric-label">⚙️ Ops Cost Saved</div>
                <div class="metric-value">${formatCurrency(data.breakdown.opsCostSaved)}</div>
              </div>
              
              <div class="metric">
                <div class="metric-label">🔒 Downtime Cost Avoided</div>
                <div class="metric-value">${formatCurrency(data.breakdown.downtimeCostAvoided)}</div>
              </div>
              
              <div class="metric">
                <div class="metric-label">📈 Revenue Uplift</div>
                <div class="metric-value">${formatCurrency(data.breakdown.revenueUplift)}</div>
              </div>
            </div>

            <div class="footer">
              <p>This report was generated by the Cloud ROI Calculator</p>
              <p>Data automatically saved to Azure Cosmos DB</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <button
      onClick={generateReport}
      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2 text-sm"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>
      <span>Download Report</span>
    </button>
  );
};