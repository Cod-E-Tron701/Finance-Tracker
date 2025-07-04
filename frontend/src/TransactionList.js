import React from 'react';

function TransactionList({ transactions, onClear }) {
  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleClear = () => {
    if (window.confirm("Are you sure you want to delete all transactions?")) {
      fetch("/transactions", { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            alert("All transactions cleared.");
            onClear();
          } else {
            alert("Failed to clear transactions.");
          }
        });
    }
  };

  return (
    <div>
      <h2>Finance Summary</h2>
      <div style={{ marginBottom: '15px' }}>
        <strong>Balance:</strong> ₹{balance.toFixed(2)} <br />
        <strong>Total Income:</strong> ₹{totalIncome.toFixed(2)} <br />
        <strong>Total Expense:</strong> ₹{totalExpense.toFixed(2)}
      </div>

      <button onClick={handleClear} style={{ marginBottom: '10px' }}>Clear All</button>

      <h3>All Transactions</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No transactions found.</td></tr>
          ) : (
            transactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.id}</td>
                <td>{txn.category}</td>
                <td>{txn.type}</td>
                <td>₹{txn.amount}</td>
                <td>{txn.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;

