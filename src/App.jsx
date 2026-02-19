import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AboutPage from './pages/AboutPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminUsersPage from './pages/AdminUsersPage';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Yuklanmoqda...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/mahsulotlar" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate to="/login" />} />

            {/* User Routes */}
            <Route
              path="/mahsulotlar"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <ProductsPage />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/savat"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <CartPage />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/buyurtmalar"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <OrdersPage />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/haqida"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <AboutPage />
                  </UserLayout>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/mahsulotlar"
              element={
                <ProtectedRoute adminOnly>
                  <AdminLayout>
                    <AdminProductsPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/buyurtmalar"
              element={
                <ProtectedRoute adminOnly>
                  <AdminLayout>
                    <OrdersPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/foydalanuvchilar"
              element={
                <ProtectedRoute adminOnly>
                  <AdminLayout>
                    <AdminUsersPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;