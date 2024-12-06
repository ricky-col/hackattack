import { Portfolio, PortfolioAnalysis, Asset, AssetRecommendation } from '../types/portfolio';

const RISK_WEIGHTS = {
  stocks: 0.8,
  bonds: 0.4,
  cash: 0.1,
  commodities: 0.6,
  crypto: 1.0,
};

const SUGGESTED_ASSETS = {
  stocks: [
    'Nifty 50 Index Fund',
    'Sensex Index Fund',
    'Large Cap Mutual Funds',
    'Quality Dividend Stocks',
  ],
  bonds: [
    'Government Securities',
    'AAA Corporate Bonds',
    'Treasury Bills',
    'Public Sector Bonds',
  ],
  cash: [
    'High-Yield Savings Account',
    'Fixed Deposits',
    'Liquid Funds',
    'Money Market Funds',
  ],
  commodities: [
    'Gold ETFs',
    'Silver ETFs',
    'Multi-Commodity Funds',
    'Sovereign Gold Bonds',
  ],
  crypto: [
    'Bitcoin through Indian Exchanges',
    'Top 5 Cryptocurrency Index',
    'Blockchain ETFs',
    'Crypto Mutual Funds',
  ],
};

export const analyzePortfolio = (portfolio: Portfolio): PortfolioAnalysis => {
  const riskScore = calculateRiskScore(portfolio.assets);
  const diversificationScore = calculateDiversificationScore(portfolio.assets);
  const recommendations = generateRecommendations(portfolio.assets, riskScore);
  const { vulnerabilities, strengths } = assessPortfolioHealth(portfolio.assets, riskScore, diversificationScore);

  return {
    riskScore,
    diversificationScore,
    recommendations,
    vulnerabilities,
    strengths,
  };
};

const calculateRiskScore = (assets: Asset[]): number => {
  return assets.reduce((score, asset) => {
    return score + (asset.allocation / 100) * RISK_WEIGHTS[asset.type];
  }, 0) * 100;
};

const calculateDiversificationScore = (assets: Asset[]): number => {
  const typeCount = new Set(assets.map(a => a.type)).size;
  const allocationSpread = Math.max(...assets.map(a => a.allocation)) - 
                          Math.min(...assets.map(a => a.allocation));
  
  return ((typeCount / 5) * 0.5 + (1 - allocationSpread / 100) * 0.5) * 100;
};

const generateRecommendations = (
  assets: Asset[],
  riskScore: number
): AssetRecommendation[] => {
  const recommendations: AssetRecommendation[] = [];
  const currentAllocations = assets.reduce((acc, asset) => {
    acc[asset.type] = (acc[asset.type] || 0) + asset.allocation;
    return acc;
  }, {} as Record<Asset['type'], number>);

  // High risk portfolio recommendations
  if (riskScore > 70) {
    recommendations.push({
      type: 'bonds',
      allocation: 30,
      reason: 'High portfolio risk detected. Consider increasing bond allocation for stability.',
      expectedReturn: 7.5,
      riskMitigation: 'Reduces portfolio volatility and provides steady income',
      suggestedAssets: SUGGESTED_ASSETS.bonds,
    });
  }

  // Low diversification recommendations
  if (!currentAllocations.commodities || currentAllocations.commodities < 10) {
    recommendations.push({
      type: 'commodities',
      allocation: 10,
      reason: 'Add gold/commodities as a hedge against market volatility',
      expectedReturn: 8.0,
      riskMitigation: 'Provides protection against inflation and market uncertainty',
      suggestedAssets: SUGGESTED_ASSETS.commodities,
    });
  }

  // Cash buffer recommendations
  if (!currentAllocations.cash || currentAllocations.cash < 15) {
    recommendations.push({
      type: 'cash',
      allocation: 15,
      reason: 'Maintain adequate emergency fund and cash reserves',
      expectedReturn: 6.0,
      riskMitigation: 'Ensures liquidity and stability during market downturns',
      suggestedAssets: SUGGESTED_ASSETS.cash,
    });
  }

  return recommendations;
};

const assessPortfolioHealth = (
  assets: Asset[],
  riskScore: number,
  diversificationScore: number
) => {
  const vulnerabilities: string[] = [];
  const strengths: string[] = [];

  // Assess vulnerabilities
  if (riskScore > 70) {
    vulnerabilities.push('High portfolio risk exposure');
  }
  if (diversificationScore < 60) {
    vulnerabilities.push('Insufficient diversification across asset classes');
  }
  if (assets.some(a => a.allocation > 40)) {
    vulnerabilities.push('Over-concentration in single asset type');
  }

  // Assess strengths
  if (riskScore < 50) {
    strengths.push('Well-balanced risk profile');
  }
  if (diversificationScore > 80) {
    strengths.push('Excellent asset diversification');
  }
  if (assets.some(a => a.type === 'bonds' && a.allocation >= 20)) {
    strengths.push('Good defensive position with bonds');
  }

  return { vulnerabilities, strengths };
};