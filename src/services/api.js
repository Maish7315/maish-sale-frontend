const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to get auth token
const getAuthToken = () => localStorage.getItem('token');

// Helper function to handle API responses
const handleResponse = async (response) => {
  console.log('API Response:', response.status, response.statusText, response.url);

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      // Token expired or invalid, clear it and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Authentication required');
    }

    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      console.log('Error response data:', errorData);
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      console.log('Could not parse error response:', e);
      const text = await response.text().catch(() => '');
      if (text) {
        console.log('Error response text:', text);
        errorMessage = text;
      }
    }

    throw new Error(errorMessage);
  }

  return response.json();
};

// Helper function to make authenticated requests
const authRequest = (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  }).then(handleResponse);
};

// API functions
export const signup = async (data) => {
  // Temporarily using mock data for testing - backend connection issues
  console.log('Using mock signup - backend not available');
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a proper JWT-like token that can be decoded
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      const payload = btoa(JSON.stringify({
        id: Date.now(),
        username: data.username,
        role: 'staff',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600
      })).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      const signature = 'mock_signature';
      const mockToken = `${header}.${payload}.${signature}`;

      localStorage.setItem('token', mockToken);
      resolve({ token: mockToken, user: { id: Date.now(), username: data.username, role: 'staff' } });
    }, 1000);
  });
};

export const login = async (data) => {
  // Temporarily using mock data for testing - backend connection issues
  console.log('Using mock login - backend not available');
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a proper JWT-like token that can be decoded
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      const payload = btoa(JSON.stringify({
        id: Date.now(),
        username: data.username,
        role: 'staff',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600
      })).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      const signature = 'mock_signature';
      const mockToken = `${header}.${payload}.${signature}`;

      localStorage.setItem('token', mockToken);
      resolve({ token: mockToken, user: { id: Date.now(), username: data.username, role: 'staff' } });
    }, 1000);
  });
};

export const createSale = async (saleData, receiptFile) => {
  // Temporarily using mock data for testing - CORS issues with backend
  console.log('Using mock createSale - backend CORS issues');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        item_description: saleData.item_description || saleData.itemName,
        amount: saleData.amount,
        commission: saleData.amount * 0.02,
        created_at: new Date().toISOString(),
        receipt_url: receiptFile ? 'mock-receipt-url' : null
      });
    }, 1000);
  });
};

export const getSales = async () => {
  // Temporarily using mock data for testing - CORS issues with backend
  console.log('Using mock getSales - backend CORS issues');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          item_description: 'Sample Dress',
          amount: 2500,
          commission: 50,
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          item_description: 'Blue Jeans',
          amount: 1800,
          commission: 36,
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
    }, 500);
  });
};

export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};