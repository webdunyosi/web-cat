import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCat } from 'react-icons/fa';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(username, password);
    if (result.success) {
      // Check if admin
      if (username === 'admin') {
        navigate('/admin');
      } else {
        navigate('/mahsulotlar');
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-2 flex items-center justify-center gap-2">
            <FaCat /> Web Cat
          </h1>
          <p className="text-gray-600">Mushuklarning Onlayn Do'koni</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Foydalanuvchi nomi
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Username"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Parol
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Parol"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Kirish
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Hali ro'yxatdan o'tmaganmisiz?{' '}
            <Link to="/register" className="text-purple-600 hover:underline font-medium">
              Ro'yxatdan o'tish
            </Link>
          </p>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            <strong>Demo:</strong> admin / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;