import React, { useEffect } from 'react';
import { HomePage } from './components/templates/home/HomePage';
import useStore from './stores/store';

const App: React.FC = () => {
  const { loadInitialData } = useStore();
  useEffect(() => {
    loadInitialData()

  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <HomePage />
    </div>
  );
};

export default App;