// Import seed accounts from frontend
const seedAccounts = [
  // Admin Accounts
  {
    id: 'ADMIN001',
    name: 'Dr. Rajesh Kumar',
    email: 'admin@bharat-livestock.gov.in',
    password: 'admin123',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    lastLogin: '2024-01-20T09:30:00Z'
  },
  {
    id: 'ADMIN002',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@bharat-livestock.gov.in',
    password: 'admin456',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-16T11:00:00Z',
    lastLogin: '2024-01-19T14:20:00Z'
  },
  {
    id: 'ADMIN003',
    name: 'Dr. Amit Patel',
    email: 'amit.patel@bharat-livestock.gov.in',
    password: 'admin789',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-17T12:00:00Z',
    lastLogin: '2024-01-18T16:45:00Z'
  },

  // FLW (Field Level Worker) Accounts
  {
    id: 'FLW001',
    name: 'Raj Kumar Singh',
    aadhaar: '123456789012',
    mobile: '9876543210',
    password: 'flw123',
    role: 'flw',
    area: 'Ahmedabad District, Gujarat',
    status: 'active',
    createdAt: '2024-01-10T08:00:00Z',
    lastLogin: '2024-01-20T08:15:00Z'
  },
  {
    id: 'FLW002',
    name: 'Priya Patel',
    aadhaar: '246813579024',
    mobile: '8765432109',
    password: 'flw456',
    role: 'flw',
    area: 'Surat District, Gujarat',
    status: 'active',
    createdAt: '2024-01-11T09:00:00Z',
    lastLogin: '2024-01-19T10:30:00Z'
  },
  {
    id: 'FLW003',
    name: 'Amit Sharma',
    aadhaar: '357924681035',
    mobile: '7654321098',
    password: 'flw789',
    role: 'flw',
    area: 'Vadodara District, Gujarat',
    status: 'active',
    createdAt: '2024-01-12T10:00:00Z',
    lastLogin: '2024-01-18T15:20:00Z'
  },
  {
    id: 'FLW004',
    name: 'Sunita Devi',
    aadhaar: '468135792046',
    mobile: '6543210987',
    password: 'flw101',
    role: 'flw',
    area: 'Panipat District, Haryana',
    status: 'active',
    createdAt: '2024-01-13T11:00:00Z',
    lastLogin: '2024-01-17T12:45:00Z'
  },
  {
    id: 'FLW005',
    name: 'Vijay Kumar',
    aadhaar: '579246813057',
    mobile: '5432109876',
    password: 'flw202',
    role: 'flw',
    area: 'Bangalore Rural, Karnataka',
    status: 'active',
    createdAt: '2024-01-14T12:00:00Z',
    lastLogin: '2024-01-16T14:10:00Z'
  },
  {
    id: 'FLW006',
    name: 'Meera Singh',
    aadhaar: '680357924068',
    mobile: '4321098765',
    password: 'flw303',
    role: 'flw',
    area: 'Pune District, Maharashtra',
    status: 'pending',
    createdAt: '2024-01-15T13:00:00Z'
  },
  {
    id: 'FLW007',
    name: 'Ravi Kumar',
    aadhaar: '791468035079',
    mobile: '3210987654',
    password: 'flw404',
    role: 'flw',
    area: 'Coimbatore District, Tamil Nadu',
    status: 'inactive',
    createdAt: '2024-01-16T14:00:00Z',
    lastLogin: '2024-01-10T11:30:00Z'
  }
];

// In-memory storage (in production, this would be a database)
let users = [...seedAccounts];

// Helper functions
const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

const findUserByAadhaar = (aadhaar) => {
  return users.find(user => user.aadhaar === aadhaar);
};

const findUserByMobile = (mobile) => {
  return users.find(user => user.mobile === mobile);
};

const findUserById = (id) => {
  return users.find(user => user.id === id);
};

const authenticateUser = (credentials) => {
  const { email, aadhaar, mobile, password, role } = credentials;
  let user;

  if (role === 'admin' && email) {
    user = findUserByEmail(email);
  } else if (role === 'flw') {
    if (aadhaar) {
      user = findUserByAadhaar(aadhaar);
    } else if (mobile) {
      user = findUserByMobile(mobile);
    }
  }

  if (user && user.password === password && user.status === 'active') {
    // Update last login
    user.lastLogin = new Date().toISOString();
    return user;
  }

  return null;
};

const getAllUsers = (filters = {}, page = 1, limit = 10) => {
  let filteredUsers = [...users];

  // Apply filters
  if (filters.role) {
    filteredUsers = filteredUsers.filter(user => user.role === filters.role);
  }

  if (filters.status) {
    filteredUsers = filteredUsers.filter(user => user.status === filters.status);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredUsers = filteredUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm) ||
      user.aadhaar?.includes(searchTerm) ||
      user.mobile?.includes(searchTerm) ||
      user.area?.toLowerCase().includes(searchTerm)
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Remove passwords from response
  const usersWithoutPasswords = paginatedUsers.map(({ password, ...user }) => user);

  return {
    users: usersWithoutPasswords,
    total: filteredUsers.length
  };
};

const createUser = (userData) => {
  users.push(userData);
  return userData;
};

const updateUser = (id, updateData) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;

  users[userIndex] = { ...users[userIndex], ...updateData };
  return users[userIndex];
};

const deleteUser = (id) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return false;

  users.splice(userIndex, 1);
  return true;
};

const getUserStats = () => {
  const totalUsers = users.length;
  const adminCount = users.filter(user => user.role === 'admin').length;
  const flwCount = users.filter(user => user.role === 'flw').length;
  const activeCount = users.filter(user => user.status === 'active').length;
  const pendingCount = users.filter(user => user.status === 'pending').length;
  const inactiveCount = users.filter(user => user.status === 'inactive').length;

  return {
    total: totalUsers,
    byRole: {
      admin: adminCount,
      flw: flwCount
    },
    byStatus: {
      active: activeCount,
      pending: pendingCount,
      inactive: inactiveCount
    }
  };
};

module.exports = {
  findUserByEmail,
  findUserByAadhaar,
  findUserByMobile,
  findUserById,
  authenticateUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserStats
};