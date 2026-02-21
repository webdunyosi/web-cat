import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaUserShield, FaUsers as FaUsersIcon, FaSearch } from 'react-icons/fa';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'admin', 'user'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      // Load both data sources in parallel
      const [usersModule, registrantsModule] = await Promise.all([
        import('../../data/users.json'),
        import('../../data/registrants.json')
      ]);

      const adminUsers = (usersModule.default || []).map(user => ({
        ...user,
        id: `admin-${user.id}`
      }));

      const registrants = (registrantsModule.default || []).map(user => ({
        ...user,
        id: `user-${user.id}`
      }));

      // Combine both arrays
      const allUsers = [...adminUsers, ...registrants];
      setUsers(allUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
      setUsers([]);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = filter === 'all' || user.role === filter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query ||
      (user.fullName || '').toLowerCase().includes(query) ||
      (user.username || '').toLowerCase().includes(query) ||
      (user.email || '').toLowerCase().includes(query);
    return matchesRole && matchesSearch;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 ring-1 ring-red-200">
          <FaUserShield className="text-[10px]" />
          Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 ring-1 ring-blue-200">
        <FaUser className="text-[10px]" />
        Foydalanuvchi
      </span>
    );
  };

  const stats = [
    {
      label: 'Jami foydalanuvchilar',
      value: users.length,
      icon: FaUsersIcon,
      gradient: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-50',
      text: 'text-violet-600',
    },
    {
      label: 'Administratorlar',
      value: users.filter(u => u.role === 'admin').length,
      icon: FaUserShield,
      gradient: 'from-red-400 to-rose-500',
      bg: 'bg-red-50',
      text: 'text-red-600',
    },
    {
      label: 'Oddiy foydalanuvchilar',
      value: users.filter(u => u.role === 'user').length,
      icon: FaUser,
      gradient: 'from-blue-400 to-indigo-500',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
    },
  ];

  const filterTabs = [
    { key: 'all', label: 'Hammasi', count: users.length },
    { key: 'admin', label: 'Adminlar', count: users.filter(u => u.role === 'admin').length },
    { key: 'user', label: 'Foydalanuvchilar', count: users.filter(u => u.role === 'user').length },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <FaUsersIcon /> Foydalanuvchilarni boshqarish
          </h1>
          <p className="text-purple-200 mt-1 text-sm">Tizimda ro'yxatdan o'tgan barcha foydalanuvchilar</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${stat.bg} rounded-xl p-4 flex items-center gap-4 shadow-sm border border-white`}>
              <div className={`bg-gradient-to-br ${stat.gradient} text-white w-11 h-11 rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                <Icon className="text-lg" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className={`text-xs font-medium ${stat.text}`}>{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Ism, foydalanuvchi nomi yoki email bo'yicha qidiring..."
            aria-label="Foydalanuvchilarni qidirish"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filterTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                filter === tab.key
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                filter === tab.key ? 'bg-white/20 text-white' : 'bg-white text-gray-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Foydalanuvchilar ro'yxati
          </span>
          <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-full">
            {filteredUsers.length} ta
          </span>
        </div>
        <div className="overflow-x-auto">
          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center gap-3 text-gray-400">
              <FaUsersIcon className="text-5xl text-gray-200" />
              <p className="text-sm font-medium">Foydalanuvchilar topilmadi</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <th className="hidden md:table-cell px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Foydalanuvchi</th>
                  <th className="hidden md:table-cell px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Aloqa ma'lumotlari</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Rol</th>
                  <th className="hidden md:table-cell px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Ro'yxatdan o'tgan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`transition-colors duration-150 hover:bg-purple-50/50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}
                  >
                    <td className="hidden md:table-cell px-6 py-3.5 whitespace-nowrap">
                      <span className="text-sm font-mono font-semibold text-gray-500">#{user.id}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-2 sm:py-3.5">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div
                          className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-violet-600 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0"
                          aria-label={`Avatar for ${user.fullName || user.username}`}
                        >
                          {(user.fullName || user.username).charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{user.fullName || user.username}</p>
                          <p className="text-xs text-gray-400">@{user.username}</p>
                          {user.email && (
                            <p className="text-xs text-gray-400 truncate md:hidden">{user.email}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-3.5">
                      <div className="space-y-1">
                        {user.email && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaEnvelope className="text-gray-400 flex-shrink-0" />
                            <span className="truncate">{user.email}</span>
                          </div>
                        )}
                        {user.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaPhone className="text-gray-400 flex-shrink-0" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-2 sm:py-3.5 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="hidden md:table-cell px-6 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCalendar className="text-gray-400" />
                        <span>{formatDate(user.registrationDate)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;