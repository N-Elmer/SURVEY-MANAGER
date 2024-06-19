import React, { useState, useEffect } from 'react';
import { fetchQuestions, submitResponses } from '../utils/api';

const AnswerQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const loadQuestions = async () => {
      const questions = await fetchQuestions();
      setQuestions(questions);
    };
    loadQuestions();
  }, []);

  const handleChange = (id, value) => {
    setResponses({
      ...responses,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitResponses(1, responses); // Assuming surveyId is 1 for simplicity
    console.log('Responses:', responses);
    // Reset responses state to clear the form
    setResponses({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 shadow-md rounded-lg w-full md:w-4/5 lg:w-3/5">
        <h1 className="text-2xl font-bold mb-4">Answer Questions</h1>
        <form onSubmit={handleSubmit}>
          {questions.map((q) => (
            <div key={q.id} className="mb-4">
              <label className="block mb-2">{q.questionText}</label>
              {q.questionType === 'text' && (
                <input
                  type="text"
                  value={responses[q.id] || ''}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  className="border p-2 w-full"
                />
              )}
              {q.questionType === 'multiple-choice' && (
                <select
                  value={responses[q.id] || ''}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  className="border p-2 w-full"
                >
                  <option value="">Select an option</option>
                  {q.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnswerQuestions;
