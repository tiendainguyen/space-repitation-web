import apiClient from './apiClient';
import API_CONFIG from '../config/api';

class AuthService {
  async login(usernameOrEmail, password) {
    try {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        usernameOrEmail,
        password
      });

      console.log('Login response:', response.data);
      
      // Check different possible response structures
      let token, user;
      
      if (response.data.token) {
        token = response.data.token;
        user = response.data.user;
      } else if (response.data.data && response.data.data.token) {
        token = response.data.data.token;
        user = response.data.data.user;
      } else if (response.data.accessToken) {
        token = response.data.accessToken;
        user = response.data.user;
      }
      
      console.log('Extracted token:', token);
      console.log('Extracted user:', user);
      
      if (token) {
        localStorage.setItem('vocabmaster_token', token);
        if (user) {
          localStorage.setItem('vocabmaster_user', JSON.stringify(user));
          console.log('User saved to localStorage:', user);
        } else {
          console.warn('No user data found in response, using minimal user object');
          localStorage.setItem('vocabmaster_user', JSON.stringify({ authenticated: true }));
        }
        console.log('Token saved to localStorage:', localStorage.getItem('vocabmaster_token'));
      } else {
        console.error('No token found in response:', response.data);
      }

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Login error:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Login failed. Please check your credentials.';
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  async register(userData) {
    try {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
      
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem('vocabmaster_token', token);
        localStorage.setItem('vocabmaster_user', JSON.stringify(user));
      }

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Register error:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Registration failed. Please try again.';
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  async logout() {
    try {
      const token = localStorage.getItem('vocabmaster_token');
      if (token) {
        await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('vocabmaster_token');
      localStorage.removeItem('vocabmaster_user');
    }
  }

  async refreshToken() {
    try {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH);
      const { token } = response.data;
      
      if (token) {
        localStorage.setItem('vocabmaster_token', token);
        return { success: true, token };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Token refresh error:', error);
      return { success: false };
    }
  }

  getToken() {
    return localStorage.getItem('vocabmaster_token');
  }

  getUser() {
    const user = localStorage.getItem('vocabmaster_user');
    if (!user || user === 'undefined' || user === 'null') {
      return null;
    }
    try {
      return JSON.parse(user);
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      localStorage.removeItem('vocabmaster_user');
      return null;
    }
  }

  isAuthenticated() {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }
}

export default new AuthService();