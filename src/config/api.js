const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      REFRESH: '/api/auth/refresh',
      LOGOUT: '/api/auth/logout'
    },
    USER: {
      PROFILE: '/api/user/profile',
      UPDATE: '/api/user/update'
    },
    VOCABULARY: {
      WORDS: '/api/vocabulary/words',
      DECKS: '/api/vocabulary/decks',
      STUDY: '/api/vocabulary/study'
    }
  },
  TIMEOUT: 10000
};

export default API_CONFIG;