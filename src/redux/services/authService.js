import api from '../api';

const signup = async (userData) => {
  const response = await api.post('/signup', userData);
  if (response.data.success) {
    // Merge userData (which has name, mobile etc) with response data (tokens)
    const userToStore = { ...userData, ...response.data.data };
    localStorage.setItem('user', JSON.stringify(userToStore));
    localStorage.setItem('accessToken', response.data.data.accessToken);
    localStorage.setItem('refreshToken', response.data.data.refreshToken);
    
    // Return updated data structure so slice receives full user info
    return {
      ...response.data,
      data: userToStore
    };
  }
  return response.data;
};

const login = async (userData) => {
  const response = await api.post('/login', userData);
  if (response.data.success) {
    // Merge userData (at least mobileNumber) with response data
    const userToStore = { ...userData, ...response.data.data };
    localStorage.setItem('user', JSON.stringify(userToStore));
    localStorage.setItem('accessToken', response.data.data.accessToken);
    localStorage.setItem('refreshToken', response.data.data.refreshToken);
    
     // Return updated data structure
    return {
      ...response.data,
      data: userToStore
    };
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const authService = {
  signup,
  login,
  logout,
};

export default authService;
