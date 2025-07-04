import React, { useState, useEffect } from 'react';
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = () => {
    fetch("/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Failed to fetch transactions:", err));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>💰 Personal Finance Tracker</h1>
      <AddTransaction onAdd={fetchTransactions} balance={balance} />
      <TransactionList transactions={transactions} onClear={fetchTransactions} />
    </div>
  );
}

export default App;

