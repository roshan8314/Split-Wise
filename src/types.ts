export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  date: string;
  participants: string[];
}

export interface Person {
  id: string;
  name: string;
}

export interface Settlement {
  from: string;
  to: string;
  amount: number;
}