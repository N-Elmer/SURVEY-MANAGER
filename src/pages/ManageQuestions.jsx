import React, { useState, useEffect } from 'react';
import { fetchQuestions, addQuestion, deleteQuestion } from '../utils/api';

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('text');
  const [options, setOptions] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await fetchQuestions();
        setQuestions(questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const handleAddQuestion = async () => {
    const newQuestion = {
      questionText,
      questionType,
      options: questionType === 'multiple-choice' ? options.split(',') : [],
    };
    const addedQuestion = await addQuestion(newQuestion);
    setQuestions([...questions, addedQuestion]);
    setQuestionText('');
    setQuestionType('text');
    setOptions('');
  };

  const handleDeleteQuestion = async (id) => {
    await deleteQuestion(id);
    setQuestions(questions.filter((q) => q.id !== id));
  };

  if (loading) {
    return <p>Loading questions...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 shadow-md rounded-lg w-full md:w-4/5 lg:w-3/5">
        <h1 className="text-2xl font-bold mb-4">Manage Questions</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter question text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="border p-2 mr-2 w-full"
          />
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="border p-2 mr-2 w-full"
          >
            <option value="text">Text</option>
            <option value="multiple-choice">Multiple Choice</option>
          </select>
          {questionType === 'multiple-choice' && (
            <input
              type="text"
              placeholder="Enter options (comma separated)"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
              className="border p-2 mr-2 w-full"
            />
          )}
          <button
            onClick={handleAddQuestion}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition w-full"
          >
            Add Question
          </button>
        </div>
        <ul>
          {questions.map((question) => (
            <li key={question.id} className="mb-2">
              <div className="border p-2 flex justify-between items-center">
                <div>
                  <p>{question.questionText}</p>
                  {question.questionType === 'multiple-choice' && (
                    <ul className="list-disc list-inside">
                      {question.options.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageQuestions;
