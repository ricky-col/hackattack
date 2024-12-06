export interface Asset {
  id: string;
  name: string;
  allocation: number;
  risk: number;
  type: 'stocks' | 'bonds' | 'cash' | 'commodities' | 'crypto';
}

export interface Portfolio {
  assets: Asset[];
  totalValue: number;
}

export interface ScenarioResult {
  name: string;
  impact: number;
  newValue: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface AssetRecommendation {
  type: Asset['type'];
  allocation: number;
  reason: string;
  expectedReturn: number;
  riskMitigation: string;
  suggestedAssets: string[];
}

export interface PortfolioAnalysis {
  riskScore: number;
  diversificationScore: number;
  recommendations: AssetRecommendation[];
  vulnerabilities: string[];
  strengths: string[];
}