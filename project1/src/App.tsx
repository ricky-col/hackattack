import React, { useState } from 'react';
import { Asset, Portfolio, ScenarioResult } from './types/portfolio';
import { runScenarioAnalysis } from './utils/scenarios';
import { analyzePortfolio } from './utils/analysis';
import PortfolioInput from './components/PortfolioInput';
import ScenarioResults from './components/ScenarioResults';
import PortfolioAnalysis from './components/PortfolioAnalysis';
import { Briefcase } from 'lucide-react';

function App() {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    assets: [
      { id: '1', name: 'Nifty 50 ETF', allocation: 40, risk: 3, type: 'stocks' },
      { id: '2', name: 'Government Bonds', allocation: 30, risk: 1, type: 'bonds' },
      { id: '3', name: 'Bank FD', allocation: 20, risk: 0, type: 'cash' },
      { id: '4', name: 'Gold ETF', allocation: 10, risk: 2, type: 'commodities' },
    ],
    totalValue: 5000000, // 50 Lakhs
  });

  const [results, setResults] = useState<ScenarioResult[]>([]);
  const [analysis, setAnalysis] = useState(analyzePortfolio(portfolio));

  const handleAnalyze = () => {
    const scenarioResults = runScenarioAnalysis(portfolio);
    const portfolioAnalysis = analyzePortfolio(portfolio);
    setResults(scenarioResults);
    setAnalysis(portfolioAnalysis);
  };

  const handlePortfolioChange = (newPortfolio: Portfolio) => {
    setPortfolio(newPortfolio);
    setAnalysis(analyzePortfolio(newPortfolio));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Stress Test</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <PortfolioInput
            assets={portfolio.assets}
            totalValue={portfolio.totalValue}
            onAssetChange={(assets: Asset[]) => 
              handlePortfolioChange({ ...portfolio, assets })}
            onTotalValueChange={(value: number) => 
              handlePortfolioChange({ ...portfolio, totalValue: value })}
          />

          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Run Stress Test Analysis
            </button>
          </div>

          {results.length > 0 && (
            <>
              <ScenarioResults results={results} />
              <PortfolioAnalysis analysis={analysis} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;