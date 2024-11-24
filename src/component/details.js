import React, { useState, useEffect } from 'react';
import './Table.css'; // Include a CSS file for styling

const ABCTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend API
  useEffect(() => {
    fetch('/api/abc-categories') // Replace with your backend API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="table-container">
      <h2>ABC Categories Generated</h2>
      <p>
        Below are the ABC categories generated. After clicking Done, you will
        be redirected to the home page where you can see the cycle counts
        generated.
      </p>
      <table>
        <thead>
          <tr>
            <th>Part Number</th>
            <th>Annual Units Sold</th>
            <th>Cost per Unit</th>
            <th>Annual Consumption Value</th>
            <th>Consumption %</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.Part_Number}</td>
              <td>{row.Annual_Units_Sold}</td>
              <td>${row.Cost_Per_Unit}</td>
              <td>${row.Annual_Consumption_Value.toLocaleString()}</td>
              <td>{row.Consumption_Percentage} %</td>
              <td>
                <span className={`category-badge ${row.Category.toLowerCase()}`}>
                  {row.Category}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="done-button">Done</button>
    </div>
  );
};

export default ABCTable;
