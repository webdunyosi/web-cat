import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaUserShield, FaUsers as FaUsersIcon } from 'react-icons/fa';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'admin', 'user'

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    // Load admin users from users.json
    import('../../data/users.json')
      .then(module => {
        const adminUsers = (module.default || []).map(user => ({
          ...user,
          id: `admin-${user.id}`
        }));
        
        // Load regular users from registrants.json
        import('../../data/registrants.json')
          .then(registrantsModule => {
            const registrants = (registrantsModule.default || []).map(user => ({
              ...user,
              id: `user-${user.id}`
            }));
            
            // Combine both arrays
            const allUsers = [...adminUsers, ...registrants];
            setUsers(allUsers);
          })
          .catch(error => {
            console.error('Failed to load registrants:', error);
            setUsers(adminUsers);
          });
      })
      .catch(error => {
        console.error('Failed to load users:', error);
        setUsers([]);
      });
  };

  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    return user.role === filter;
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
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 flex items-center space-x-1">
          <FaUserShield />
          <span>Admin</span>
        </span>
      );
    }
    return (
      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 flex items-center space-x-1">
        <FaUser />
        <span>Foydalanuvchi</span>
      </span>
    );
  };

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    regularUsers: users.filter(u => u.role === 'user').length
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Foydalanuvchilarni boshqarish</h1>
        <p className="text-gray-600">Tizimda ro'yxatdan o'tgan barcha foydalanuvchilar</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <FaUsersIcon className="text-3xl" />
            <span className="text-sm opacity-80">Jami</span>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.total}</div>
          <div className="text-sm opacity-90">Foydalanuvchi</div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <FaUserShield className="text-3xl" />
            <span className="text-sm opacity-80">Jami</span>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.admins}</div>
          <div className="text-sm opacity-90">Administrator</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <FaUser className="text-3xl" />
            <span className="text-sm opacity-80">Jami</span>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.regularUsers}</div>
          <div className="text-sm opacity-90">Oddiy foydalanuvchi</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          Hammasi ({stats.total})
        </button>
        <button
          onClick={() => setFilter('admin')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'admin'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          Adminlar ({stats.admins})
        </button>
        <button
          onClick={() => setFilter('user')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'user'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          Foydalanuvchilar ({stats.regularUsers})
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <FaUsersIcon className="text-5xl mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Foydalanuvchilar topilmadi</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Foydalanuvchi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Aloqa ma'lumotlari
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ro'yxatdan o'tgan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-500">#{user.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                          {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.fullName || user.username}</div>
                          <div className="text-sm text-gray-500">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {user.email && (
                          <div className="flex items-center space-x-2 text-sm text-gray-700">
                            <FaEnvelope className="text-gray-400" />
                            <span>{user.email}</span>
                          </div>
                        )}
                        {user.phone && (
                          <div className="flex items-center space-x-2 text-sm text-gray-700">
                            <FaPhone className="text-gray-400" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
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
