import React from 'react';
import { PortfolioAnalysis as AnalysisType, AssetRecommendation } from '../types/portfolio';
import { ArrowUp, ArrowDown, Shield, Target } from 'lucide-react';

interface PortfolioAnalysisProps {
  analysis: AnalysisType;
}

export default function PortfolioAnalysis({ analysis }: PortfolioAnalysisProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold mb-4">Portfolio Analysis</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScoreCard
          title="Risk Score"
          value={analysis.riskScore}
          icon={<Shield className="h-6 w-6" />}
          description="Overall portfolio risk level"
        />
        <ScoreCard
          title="Diversification Score"
          value={analysis.diversificationScore}
          icon={<Target className="h-6 w-6" />}
          description="Asset allocation spread"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HealthPanel
          title="Strengths"
          items={analysis.strengths}
          icon={<ArrowUp className="h-5 w-5 text-green-500" />}
          className="border-green-100 bg-green-50"
        />
        <HealthPanel
          title="Vulnerabilities"
          items={analysis.vulnerabilities}
          icon={<ArrowDown className="h-5 w-5 text-red-500" />}
          className="border-red-100 bg-red-50"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Recommendations</h3>
        {analysis.recommendations.map((rec, index) => (
          <RecommendationCard key={index} recommendation={rec} />
        ))}
      </div>
    </div>
  );
}

function ScoreCard({ title, value, icon, description }: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="text-3xl font-bold mb-1">{value.toFixed(1)}</div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function HealthPanel({ title, items, icon, className }: {
  title: string;
  items: string[];
  icon: React.ReactNode;
  className: string;
}) {
  return (
    <div className={`p-4 border rounded-lg ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecommendationCard({ recommendation }: { recommendation: AssetRecommendation }) {
  return (
    <div className="border rounded-lg p-4 bg-blue-50 border-blue-100">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-lg capitalize">{recommendation.type}</h4>
        <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
          {recommendation.allocation}% suggested
        </span>
      </div>
      <p className="text-gray-700 mb-3">{recommendation.reason}</p>
      <div className="space-y-2">
        <div>
          <span className="text-sm font-medium">Expected Return: </span>
          <span className="text-sm text-gray-600">{recommendation.expectedReturn}%</span>
        </div>
        <div>
          <span className="text-sm font-medium">Risk Mitigation: </span>
          <span className="text-sm text-gray-600">{recommendation.riskMitigation}</span>
        </div>
        <div>
          <span className="text-sm font-medium block mb-1">Suggested Assets:</span>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            {recommendation.suggestedAssets.map((asset, index) => (
              <li key={index}>{asset}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}