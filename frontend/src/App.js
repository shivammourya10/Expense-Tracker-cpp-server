import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ChartComponent from './components/Chart';

function App() {
  const [summary, setSummary] = useState({});

  const fetchSummary = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/summary');
      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={fetchSummary} />
      <ExpenseList summary={summary} />
      <ChartComponent summary={summary} />
    </div>
  );
}

export default App;