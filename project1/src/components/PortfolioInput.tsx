import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Asset } from '../types/portfolio';
import { lakhsToNumber, numberToLakhs } from '../utils/currency';

interface PortfolioInputProps {
  assets: Asset[];
  totalValue: number;
  onAssetChange: (assets: Asset[]) => void;
  onTotalValueChange: (value: number) => void;
}

export default function PortfolioInput({
  assets,
  totalValue,
  onAssetChange,
  onTotalValueChange,
}: PortfolioInputProps) {
  const handleAddAsset = () => {
    const newAsset: Asset = {
      id: crypto.randomUUID(),
      name: '',
      allocation: 0,
      risk: 1,
      type: 'stocks',
    };
    onAssetChange([...assets, newAsset]);
  };

  const handleRemoveAsset = (id: string) => {
    onAssetChange(assets.filter(asset => asset.id !== id));
  };

  const handleAssetChange = (id: string, field: keyof Asset, value: any) => {
    onAssetChange(
      assets.map(asset =>
        asset.id === id ? { ...asset, [field]: value } : asset
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Portfolio Composition</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Total Portfolio Value (Lakhs ₹)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">₹</span>
          </div>
          <input
            type="number"
            value={numberToLakhs(totalValue)}
            onChange={(e) => onTotalValueChange(lakhsToNumber(e.target.value))}
            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter value in lakhs"
            step="0.01"
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Example: 10.00 = ₹10 Lakhs (₹1,000,000)
        </p>
      </div>

      <div className="space-y-4">
        {assets.map((asset) => (
          <div key={asset.id} className="flex gap-4 items-center">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Asset Name"
                value={asset.name}
                onChange={(e) => handleAssetChange(asset.id, 'name', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="w-32">
              <input
                type="number"
                placeholder="Allocation %"
                value={asset.allocation}
                onChange={(e) => handleAssetChange(asset.id, 'allocation', Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="w-40">
              <select
                value={asset.type}
                onChange={(e) => handleAssetChange(asset.id, 'type', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="stocks">Stocks</option>
                <option value="bonds">Bonds</option>
                <option value="cash">Cash</option>
                <option value="commodities">Commodities</option>
                <option value="crypto">Crypto</option>
              </select>
            </div>
            <button
              onClick={() => handleRemoveAsset(asset.id)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddAsset}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        <Plus size={20} className="mr-2" /> Add Asset
      </button>
    </div>
  );
}