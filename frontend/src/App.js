import React, { useState, useEffect } from 'react';
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0
  });

  const fetchTransactions = () => {
    fetch("http://localhost:9191/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);

        const income = data
          .filter(t => t.type.toLowerCase() === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
        const expense = data
          .filter(t => t.type.toLowerCase() === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);

        setSummary({
          income,
          expense,
          balance: income - expense
        });
      })
      .catch((err) => console.error("Failed to fetch transactions:", err));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
          💰 Personal Finance Tracker
        </h1>

        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-green-800 font-semibold">Income</h2>
            <p className="text-xl font-bold">₹{summary.income}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow">
            <h2 className="text-red-800 font-semibold">Expense</h2>
            <p className="text-xl font-bold">₹{summary.expense}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h2 className="text-blue-800 font-semibold">Balance</h2>
            <p className="text-xl font-bold">₹{summary.balance}</p>
          </div>
        </div>

        <AddTransaction onAdd={fetchTransactions} balance={summary.balance} />
        <TransactionList
          transactions={transactions}
          onClear={fetchTransactions}
        />
      </div>
    </div>
  );
}

export default App;

