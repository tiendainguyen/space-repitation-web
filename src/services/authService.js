import apiClient from './apiClient';
import API_CONFIG from '../config/api';

class AuthService {
  async login(usernameOrEmail, password) {
    try {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        usernameOrEmail,
        password
      });

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
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }
}

export default new AuthService();