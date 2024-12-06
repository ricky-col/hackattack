import { Portfolio, ScenarioResult } from '../types/portfolio';

const SCENARIO_IMPACTS = {
  marketCrash: { stocks: -0.40, bonds: -0.15, cash: 0, commodities: -0.20, crypto: -0.60 },
  inflationSpike: { stocks: -0.15, bonds: -0.20, cash: -0.10, commodities: 0.20, crypto: -0.25 },
  interestRateHike: { stocks: -0.10, bonds: -0.25, cash: 0.05, commodities: -0.15, crypto: -0.20 },
  geopoliticalCrisis: { stocks: -0.25, bonds: -0.10, cash: 0, commodities: 0.30, crypto: -0.35 },
  techSectorCrash: { stocks: -0.30, bonds: -0.05, cash: 0, commodities: 0.10, crypto: -0.45 },
};

export const runScenarioAnalysis = (portfolio: Portfolio): ScenarioResult[] => {
  return Object.entries(SCENARIO_IMPACTS).map(([scenario, impacts]) => {
    const totalImpact = portfolio.assets.reduce((acc, asset) => {
      const assetImpact = impacts[asset.type] * (asset.allocation / 100);
      return acc + assetImpact;
    }, 0);

    const newValue = portfolio.totalValue * (1 + totalImpact);
    
    return {
      name: formatScenarioName(scenario),
      impact: totalImpact * 100,
      newValue,
      riskLevel: getRiskLevel(totalImpact),
    };
  });
};

const formatScenarioName = (scenario: string): string => {
  return scenario
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getRiskLevel = (impact: number): 'low' | 'medium' | 'high' => {
  if (impact < -0.2) return 'high';
  if (impact < -0.1) return 'medium';
  return 'low';
};