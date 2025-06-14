import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AuthenticationPages from './components/Auth/AuthenticationPages';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './components/Dashboard/Dashboard';
import StudySession from './components/Study/StudySession';
import Quiz from './components/Quiz/Quiz';
import Library from './components/Library/Library';
import AddWords from './components/AddWords/AddWords';
import Analytics from './components/Analytics/Analytics';
import Settings from './components/Settings/Settings';
import './styles/App.css';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading VocabMaster...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {!isAuthenticated ? (
        <AuthenticationPages />
      ) : (
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/study" element={<StudySession />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/library" element={<Library />} />
            <Route path="/add-words" element={<AddWords />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </MainLayout>
      )}
    </div>
  );
}

export default App;
