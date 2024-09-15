import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
