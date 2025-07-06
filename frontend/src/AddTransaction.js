import React, { useState } from 'react';

function AddTransaction({ onAdd, balance }) {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    type: 'Expense',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);

    if (formData.type === 'Expense' && amount > balance) {
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
          setFormData({ category: '', amount: '', type: 'Expense', date: '' });
          onAdd(); // Refresh parent data
        } else {
          alert("Failed to add transaction");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Add Transaction</h3>
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTransaction;

