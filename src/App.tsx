import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Category from './components/Category';
import SubCategory from './components/SubCategory';
import Product from './components/Product';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/MainLayout';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes without Sidebar/Header */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes with Sidebar/Header */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="category" element={<Category />} />
            <Route path="subcategory" element={<SubCategory />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
