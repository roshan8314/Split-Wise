import React from 'react';
import { Receipt } from 'lucide-react';
import { Expense, Person } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  people: Person[];
}

export function ExpenseList({ expenses, people }: ExpenseListProps) {
  const getPerson = (id: string) => people.find(p => p.id === id)?.name || 'Unknown';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Expense History</h2>
      
      <div className="space-y-4">
        {expenses.map((expense) => (
          <div key={expense.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Receipt className="w-5 h-5 text-blue-500 mr-2" />
                <div>
                  <h3 className="font-semibold">{expense.description}</h3>
                  <p className="text-sm text-gray-600">
                    Paid by {getPerson(expense.paidBy)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">₹{expense.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-600">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                Split between: {expense.participants.map(id => getPerson(id)).join(', ')}
              </p>
            </div>
          </div>
        ))}
        
        {expenses.length === 0 && (
          <p className="text-center text-gray-500 py-4">No expenses yet</p>
        )}
      </div>
    </div>
  );
}