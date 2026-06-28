import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Download = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/downloads');
    }, 1000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white transition-colors duration-500">
      <div className="text-center">
        <p className="text-xl mb-6">Mungkin Maksudmu</p>
        <h3 className="text-3xl font-bold mb-4">Downloads?</h3>
        <p className="text-slate-500 dark:text-slate-400">Redirecting to Downloads page...</p>
        <div className="mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
      </div>
    </div>
  );
};

export default Download;