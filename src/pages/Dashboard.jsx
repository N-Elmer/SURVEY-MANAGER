import React, { useState, useEffect } from 'react';
import { fetchResults } from '../utils/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const results = await fetchResults();
        setResults(results);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };
    loadResults();
  }, []);

  const countResponses = (responses) => {
    const counts = {};
    responses.forEach((response) => {
      counts[response] = (counts[response] || 0) + 1;
    });
    return counts;
  };

  const data = {
    labels: results.map(result => result.questionText),
    datasets: [
      {
        label: 'Number of Responses',
        data: results.map(result => result.responses.length),
        backgroundColor: results.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`),
        borderColor: results.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 shadow-md rounded-lg w-full md:w-4/5 lg:w-3/5">
        <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
        <h2 className="text-2xl font-bold mb-4">Visual Data</h2>
        <div className="h-96"> {/* Increased height */}
          <Bar data={data} options={options} />
        </div>
        {results.map((result, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-2xl font-bold mb-4">Response Data</h2>
            <h2 className="text-xl font-semibold mb-2">{result.questionText}</h2>
            {result.questionType === 'text' && (
              <ul className="list-disc list-inside">
                {result.responses.map((response, idx) => (
                  <li key={idx}>{response}</li>
                ))}
              </ul>
            )}
            {result.questionType === 'multiple-choice' && (
              <ul className="list-disc list-inside">
                {Object.entries(countResponses(result.responses)).map(([option, count], idx) => (
                  <li key={idx}>
                    {option}: {count}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
