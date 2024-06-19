import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ManageQuestions from './pages/ManageQuestions';
import AnswerQuestions from './pages/AnswerQuestions';
import Dashboard from './pages/Dashboard';
import logo from './assets/logo.png'; // Adjust the path according to your directory structure
import './App.css'; // Import the custom CSS file for background effects

const App = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
        <img src={logo} alt="Logo" className="h-12" />
        <nav className="flex space-x-4">
          <Link to="/" className="bg-white text-blue-600 py-2 px-5  hover:bg-gray-100 transition">
            Home
          </Link>
          <Link to="/manage-questions" className="bg-white text-blue-600 py-2 px-5 hover:bg-gray-100 transition">
            Manage Questions
          </Link>
          <Link to="/answer-questions" className="bg-white text-blue-600 py-2 px-5 hover:bg-gray-100 transition">
            Answer Questions
          </Link>
          <Link to="/dashboard" className="bg-white text-blue-600 py-2 px-5 hover:bg-gray-100 transition">
            Dashboard
          </Link>
        </nav>
      </header>
      <main className="flex-grow bg-gradient-animation relative">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/manage-questions" element={<ManageQuestions />} />
          <Route path="/answer-questions" element={<AnswerQuestions />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
        >
          Back to Top
        </button>
      </main>
      <footer className="bg-blue-600 text-white p-4 text-center sticky bottom-0 z-50">
        &copy; 2024 Survey App. All rights reserved.
      </footer>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="center-content text-center">
      <h1 className="text-4xl font-bold mb-4">SURVEY MANAGER</h1>
      <div className="space-x-4">
      <h1 className="text-4xl font-bold mb-4">SURVEY MANAGER</h1>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <Link to="/manage-questions" className="button-large">
          Manage Questions
        </Link>
        <Link to="/answer-questions" className="button-large">
          Answer Questions
        </Link>
        <Link to="/dashboard" className="button-large">
          View Dashboard
        </Link>
      </div>
    </div>
  );
};

export default App;
