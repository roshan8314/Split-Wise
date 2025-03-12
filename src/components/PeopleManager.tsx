import React, { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { Person } from '../types';

interface PeopleManagerProps {
  people: Person[];
  onAddPerson: (person: Person) => void;
  onRemovePerson: (id: string) => void;
}

export function PeopleManager({ people, onAddPerson, onRemovePerson }: PeopleManagerProps) {
  const [newName, setNewName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onAddPerson({
      id: Date.now().toString(),
      name: newName.trim()
    });
    setNewName('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Manage People</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter name"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add Person
          </button>
        </div>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {people.map((person) => (
          <div
            key={person.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
          >
            <span className="font-medium">{person.name}</span>
            <button
              onClick={() => onRemovePerson(person.id)}
              className="text-red-600 hover:text-red-800 focus:outline-none"
              title="Remove person"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}