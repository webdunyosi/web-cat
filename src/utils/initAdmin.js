// Initialize admin user if it doesn't exist
export const initializeAdmin = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Check if admin already exists
  const adminExists = users.some(user => user.isAdmin);
  
  if (!adminExists) {
    const adminUser = {
      id: 1,
      name: 'Admin',
      email: 'admin@webcat.uz',
      password: 'admin123',
      isAdmin: true,
      createdAt: new Date().toISOString()
    };
    
    users.push(adminUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Admin user created: admin@webcat.uz / admin123');
  }
};
