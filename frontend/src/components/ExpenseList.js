import React from 'react';
import './ExpenseList.css'; // Import the CSS file

function ExpenseList({ summary }) {
  const safeSummary = summary || {}; // Fallback to an empty object if summary is null or undefined

  return (
    <div>
      <h2>Expenses Summary</h2>
      {Object.keys(safeSummary).length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {Object.entries(safeSummary).map(([category, total]) => (
            <li key={category}>
              {category}: ${total.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;