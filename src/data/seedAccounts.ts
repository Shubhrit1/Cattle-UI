export interface User {
  id: string;
  name: string;
  email?: string;
  aadhaar?: string;
  mobile?: string;
  password: string;
  role: 'admin' | 'flw';
  area?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin?: string;
}

export const seedAccounts: User[] = [
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

// Helper functions for authentication
export const findUserByEmail = (email: string): User | undefined => {
  return seedAccounts.find(user => user.email === email);
};

export const findUserByAadhaar = (aadhaar: string): User | undefined => {
  return seedAccounts.find(user => user.aadhaar === aadhaar);
};

export const findUserByMobile = (mobile: string): User | undefined => {
  return seedAccounts.find(user => user.mobile === mobile);
};

export const authenticateUser = (credentials: {
  email?: string;
  aadhaar?: string;
  mobile?: string;
  password: string;
  role: 'admin' | 'flw';
}): User | null => {
  let user: User | undefined;

  if (credentials.role === 'admin' && credentials.email) {
    user = findUserByEmail(credentials.email);
  } else if (credentials.role === 'flw') {
    if (credentials.aadhaar) {
      user = findUserByAadhaar(credentials.aadhaar);
    } else if (credentials.mobile) {
      user = findUserByMobile(credentials.mobile);
    }
  }

  if (user && user.password === credentials.password && user.status === 'active') {
    // Update last login
    user.lastLogin = new Date().toISOString();
    return user;
  }

  return null;
};

export const getUsersByRole = (role: 'admin' | 'flw'): User[] => {
  return seedAccounts.filter(user => user.role === role);
};

export const getUserById = (id: string): User | undefined => {
  return seedAccounts.find(user => user.id === id);
};
