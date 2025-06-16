import apiClient from './apiClient';
import API_CONFIG from '../config/api';

class DataService {
  async getUserProfile() {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.USER.PROFILE);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Get user profile error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch user profile'
      };
    }
  }

  async updateUserProfile(userData) {
    try {
      const response = await apiClient.put(API_CONFIG.ENDPOINTS.USER.UPDATE, userData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Update user profile error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update user profile'
      };
    }
  }

  async getVocabularyWords() {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.VOCABULARY.WORDS);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Get vocabulary words error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch vocabulary words'
      };
    }
  }

  async getDecks() {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.VOCABULARY.DECKS);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Get decks error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch decks'
      };
    }
  }

  async searchDecks(page = 1, limit = 10, search = '') {
    try {
      const token = localStorage.getItem('vocabmaster_token');
      if (!token) {
        console.error('No authentication token found');
        return {
          success: false,
          error: 'Authentication required. Please log in again.'
        };
      }

      const params = {
        page,
        limit
      };
      
      if (search && search.trim() !== '') {
        params.search = search.trim();
      }

      const response = await apiClient.get('/api/v1/decks/search', { params });
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Search decks error:', error);
      if (error.response?.status === 401) {
        return {
          success: false,
          error: 'Unauthorized: Please log in again'
        };
      }
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to search decks'
      };
    }
  }

  async getStudySession() {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.VOCABULARY.STUDY);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Get study session error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch study session'
      };
    }
  }
}

export default new DataService();