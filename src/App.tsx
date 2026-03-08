import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Research from './components/Research';
import Teaching from './components/Teaching';
import Students from './components/Students';
import Outreach from './components/Outreach';
import CV from './components/CV';
import ErrorPage from './components/ErrorPage';
import { Sun, Moon, Menu, X } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const path = location.pathname.slice(1) || 'home';
    setActiveTab(path);
    // Close sidebar on route change for mobile
    setIsSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isSidebarOpen]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-primary-800 transition-colors duration-300">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-primary-900 shadow-lg"
        aria-label="Toggle menu"
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? (
          <X size={24} className="text-primary-600 dark:text-primary-300" />
        ) : (
          <Menu size={24} className="text-primary-600 dark:text-primary-300" />
        )}
      </button>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden={!isSidebarOpen}
        />
      )}

      {/* Sidebar - Hidden on mobile by default */}
      <div className={`
        fixed inset-y-0 left-0 z-40 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:block
        max-w-xs w-full
      `}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-10 pt-16 lg:pt-10 overflow-y-auto">
        <div className="flex justify-end mb-6">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-primary-100 dark:bg-primary-700 text-primary-600 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-600 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <main className="max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/teaching" element={<Teaching />} />
            <Route path="/students" element={<Students />} />
            <Route path="/outreach" element={<Outreach />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/50x.html" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;