import React, { useState } from 'react';

function AddTransaction({ onAdd, balance }) {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    type: 'expense',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);

    if (!formData.amount || isNaN(amount)) {
      alert("Please enter a valid amount.");
      return;
    }

    if (formData.type === 'expense' && amount > balance) {
      alert("Insufficient balance for this expense.");
      return;
    }

    fetch("http://localhost:9191/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, amount })
    })
      .then((res) => {
        if (res.ok) {
          alert("Transaction added!");
          setFormData({ category: '', amount: '', type: 'expense', date: '' });
          onAdd();
        } else {
          res.text().then(msg => alert("Failed to add transaction:\n" + msg));
        }
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded shadow space-y-4">
      <h3 className="text-xl font-semibold">Add Transaction</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Add
      </button>
    </form>
  );
}

export default AddTransaction;

