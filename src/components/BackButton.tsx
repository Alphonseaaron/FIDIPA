import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-8 left-8 z-50 bg-white dark:bg-dark-lighter hover:bg-light-darker dark:hover:bg-dark-accent p-4 rounded-lg transition-all duration-300 group shadow-lg"
    >
      <ArrowLeft size={24} className="text-primary group-hover:scale-110 transition-transform" />
    </button>
  );
}