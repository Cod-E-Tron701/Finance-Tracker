import React from 'react';

function TransactionList({ transactions, onClear }) {
  const totalIncome = transactions
    .filter((t) => t.type.toLowerCase() === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type.toLowerCase() === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleClear = () => {
    if (window.confirm("Are you sure you want to delete all transactions?")) {
      fetch("http://localhost:9191/transactions", { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            alert("All transactions cleared.");
            onClear();
          } else {
            res.text().then(msg => alert("Failed to clear:\n" + msg));
          }
        })
        .catch((err) => {
          alert("Error: " + err.message);
        });
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Finance Summary</h2>

      <div className="mb-4">
        <p><strong>Balance:</strong> ₹{balance.toFixed(2)}</p>
        <p><strong>Total Income:</strong> ₹{totalIncome.toFixed(2)}</p>
        <p><strong>Total Expense:</strong> ₹{totalExpense.toFixed(2)}</p>
      </div>

      <button
        onClick={handleClear}
        className="mb-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Clear All
      </button>

      <h3 className="text-lg font-medium mb-2">All Transactions</h3>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 p-4">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <tr key={txn.id} className="text-center">
                  <td className="border p-2">{txn.id}</td>
                  <td className="border p-2">{txn.category}</td>
                  <td className="border p-2 capitalize">{txn.type}</td>
                  <td className="border p-2">₹{txn.amount}</td>
                  <td className="border p-2">{txn.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;

