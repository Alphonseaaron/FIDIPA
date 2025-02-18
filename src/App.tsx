import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import BlogPage from './pages/Blog';
import ProjectsPage from './pages/Projects';
import WriteForUsPage from './pages/WriteForUs';
import AdminPanel from './pages/admin/AdminPanel';
import ProgramsPage from './pages/Programs';
import BlogPostPage from './pages/BlogPost';
import ProgramDetailPage from './pages/ProgramDetail';
import ProjectDetailPage from './pages/ProjectDetail';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname === '/';
  const isAdmin = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark text-dark dark:text-white">
      {showNavbar && <Navbar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:slug" element={<ProgramDetailPage />} />
          <Route path="/write-for-us" element={<WriteForUsPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;