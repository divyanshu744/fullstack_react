import React, { useEffect, useState } from "react";
import "./App.css"; // Import the CSS file


const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="app-container">
      <h1>Inventory Data</h1>
      {error && <p className="error">Error: {error}</p>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Part Number</th>
            <th>Annual Unit Sold</th>
            <th>Cost Per Unit</th>
            <th>Annual Consumption Value</th>
            <th>Consumption Percentage</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Part_Number}</td>
              <td>{item.Annual_Unit_Sold}</td>
              <td>{item.Cost_Per_Unit}</td>
              <td>{item.Annual_Consumption_Value}</td>
              <td>{item.Consumption_Percentage}%</td>
              <td>{item.Category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
