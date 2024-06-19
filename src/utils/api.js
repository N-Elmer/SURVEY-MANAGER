import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchQuestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/questions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};

export const addQuestion = async (question) => {
  try {
    const response = await axios.post(`${API_URL}/questions`, question);
    return response.data;
  } catch (error) {
    console.error('Error adding question:', error);
  }
};

export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting question:', error);
  }
};

export const submitResponses = async (surveyId, responses) => {
  try {
    const response = await axios.post(`${API_URL}/responses`, { surveyId, responses });
    return response.data;
  } catch (error) {
    console.error('Error submitting responses:', error);
  }
};

export const fetchResults = async () => {
  try {
    const response = await axios.get(`${API_URL}/results`);
    return response.data;
  } catch (error) {
    console.error('Error fetching results:', error);
  }
};
