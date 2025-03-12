import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Settlement, Person } from '../types';

interface SettlementSummaryProps {
  settlements: Settlement[];
  people: Person[];
}

export function SettlementSummary({ settlements, people }: SettlementSummaryProps) {
  const getPerson = (id: string) => people.find(p => p.id === id)?.name || 'Unknown';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Settlements</h2>
      
      <div className="space-y-4">
        {settlements.map((settlement, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{getPerson(settlement.from)}</span>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <span className="font-medium">{getPerson(settlement.to)}</span>
            </div>
            <span className="font-semibold">₹{settlement.amount.toFixed(2)}</span>
          </div>
        ))}
        
        {settlements.length === 0 && (
          <p className="text-center text-gray-500 py-4">No settlements needed</p>
        )}
      </div>
    </div>
  );
}