import React, { useState } from 'react';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { SettlementSummary } from './components/SettlementSummary';
import { PeopleManager } from './components/PeopleManager';
import { Expense, Person, Settlement } from './types';
import { SplitSquareVertical as SplitSquare } from 'lucide-react';

function App() {
  const [people, setPeople] = useState<Person[]>([
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddPerson = (person: Person) => {
    setPeople(prev => [...prev, person]);
  };

  const handleRemovePerson = (id: string) => {
    // Remove person only if they're not involved in any expenses
    const isInvolved = expenses.some(
      expense => expense.paidBy === id || expense.participants.includes(id)
    );

    if (isInvolved) {
      alert('Cannot remove this person as they are involved in existing expenses.');
      return;
    }

    setPeople(prev => prev.filter(person => person.id !== id));
  };

  const calculateSettlements = (): Settlement[] => {
    // Calculate how much each person has paid and owes
    const balances = new Map<string, number>();
    
    // Initialize balances
    people.forEach(person => balances.set(person.id, 0));

    // Calculate net amounts for each person
    expenses.forEach(expense => {
      const perPersonShare = expense.amount / expense.participants.length;
      
      // Add the full amount to the payer
      balances.set(
        expense.paidBy, 
        (balances.get(expense.paidBy) || 0) + expense.amount
      );
      
      // Subtract each participant's share
      expense.participants.forEach(participantId => {
        balances.set(
          participantId,
          (balances.get(participantId) || 0) - perPersonShare
        );
      });
    });

    // Convert balances to settlements
    const settlements: Settlement[] = [];
    const debtors = Array.from(balances.entries())
      .filter(([, amount]) => amount < 0)
      .sort((a, b) => a[1] - b[1]);
    const creditors = Array.from(balances.entries())
      .filter(([, amount]) => amount > 0)
      .sort((a, b) => b[1] - a[1]);

    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const [debtorId, debtorBalance] = debtors[i];
      const [creditorId, creditorBalance] = creditors[j];
      
      const amount = Math.min(Math.abs(debtorBalance), creditorBalance);
      
      if (amount > 0) {
        settlements.push({
          from: debtorId,
          to: creditorId,
          amount: Number(amount.toFixed(2))
        });
      }

      if (Math.abs(debtorBalance) === creditorBalance) {
        i++;
        j++;
      } else if (Math.abs(debtorBalance) < creditorBalance) {
        creditors[j][1] -= Math.abs(debtorBalance);
        i++;
      } else {
        debtors[i][1] += creditorBalance;
        j++;
      }
    }

    return settlements;
  };

  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2">
            <SplitSquare className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Expense Splitter</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <PeopleManager
          people={people}
          onAddPerson={handleAddPerson}
          onRemovePerson={handleRemovePerson}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ExpenseForm 
              people={people} 
              onAddExpense={handleAddExpense} 
            />
          </div>
          
          <div className="space-y-8">
            <SettlementSummary 
              settlements={calculateSettlements()} 
              people={people} 
            />
            <ExpenseList 
              expenses={expenses} 
              people={people} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;