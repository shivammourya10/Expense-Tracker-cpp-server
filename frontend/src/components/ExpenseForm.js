import React, { useState } from 'react';
import './ExpenseForm.css'; // Import the CSS file

function ExpenseForm({ onAddExpense }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/add-expense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, amount: parseFloat(amount) }),
    });
    if (response.ok) {
      onAddExpense();
      setCategory('');
      setAmount('');
    } else {
      console.error('Failed to add expense');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;