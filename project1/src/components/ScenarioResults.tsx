import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ScenarioResult } from '../types/portfolio';
import { formatINR } from '../utils/currency';

interface ScenarioResultsProps {
  results: ScenarioResult[];
}

export default function ScenarioResults({ results }: ScenarioResultsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Scenario Analysis Results</h2>
      
      <div className="h-80 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={results}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis label={{ value: 'Impact (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="impact" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <div
            key={result.name}
            className={`p-4 rounded-lg border ${
              result.riskLevel === 'high'
                ? 'border-red-200 bg-red-50'
                : result.riskLevel === 'medium'
                ? 'border-yellow-200 bg-yellow-50'
                : 'border-green-200 bg-green-50'
            }`}
          >
            <h3 className="font-semibold text-lg mb-2">{result.name}</h3>
            <div className="space-y-1">
              <p>Impact: <span className="font-medium">{result.impact.toFixed(1)}%</span></p>
              <p>New Value: <span className="font-medium">{formatINR(result.newValue)}</span></p>
              <p>Risk Level: <span className="font-medium capitalize">{result.riskLevel}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}