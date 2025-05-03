import React from 'react';
import { motion } from 'framer-motion';
import { UserProvider } from './context/UserContext';
import PageLayout from './components/Layout/PageLayout';
import UserInputForm from './components/Form/UserInputForm';
import ResultsGrid from './components/Results/ResultsGrid';
import ComparisonSection from './components/Comparison/ComparisonSection';
import ScalingSection from './components/Future/ScalingSection';

function App() {
  return (
    <UserProvider>
      <PageLayout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="max-w-screen-lg mx-auto"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Find the Perfect GPU for Your Needs
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our intelligent recommendation system helps you find the ideal GPU instance based on your specific requirements, budget, and future scaling needs.
              </p>
            </motion.div>

            <UserInputForm />
            <ResultsGrid />
            <ComparisonSection />
            <ScalingSection />
          </motion.div>
        </motion.div>
      </PageLayout>
    </UserProvider>
  );
}

export default App;