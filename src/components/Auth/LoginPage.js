import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const LoginPage = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: 'daniel@example.com',
    password: 'password123',
    rememberMe: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      if (!result.success) {
        alert(result.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="brand-logo">
            <div className="brand-icon">📚</div>
            <h1>VocabMaster</h1>
          </div>
          <h2>Welcome back to your learning journey</h2>
          <p>Master vocabulary with scientifically-proven spaced repetition techniques. Join thousands of learners worldwide.</p>
          
          <div className="auth-features">
            <div className="feature-item">
              <div className="feature-icon">🧠</div>
              <div>
                <h4>Smart Learning</h4>
                <p>AI-powered spaced repetition algorithm</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div>
                <h4>Track Progress</h4>
                <p>Detailed analytics and performance insights</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <div>
                <h4>Achieve Goals</h4>
                <p>Set and reach your vocabulary targets</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-form-container">
          <div className="form-header">
            <h3>Sign In</h3>
            <p>Enter your credentials to access your account</p>
          </div>
          
          <button className="social-login-btn">
            <span>🔍</span>
            <span>Continue with Google</span>
          </button>
          
          <div className="form-divider">
            <span>or sign in with email</span>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <span className="checkbox-custom"></span>
                Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>
            
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="form-footer">
            <p>Don't have an account? <a href="#" onClick={onSwitchToRegister}>Create account</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
