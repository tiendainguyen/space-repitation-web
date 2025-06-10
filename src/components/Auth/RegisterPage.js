import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
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
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!formData.agreeToTerms) {
      alert('Please agree to the Terms of Service');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await register(formData);
      if (!result.success) {
        alert(result.error);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration');
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
          <h2>Start your vocabulary mastery journey</h2>
          <p>Join over 100,000 learners who have improved their vocabulary using our proven spaced repetition system.</p>
          
          <div className="auth-stats">
            <div className="stat-item">
              <div className="stat-number">100K+</div>
              <div className="stat-label">Active Learners</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10M+</div>
              <div className="stat-label">Words Learned</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Languages</div>
            </div>
          </div>
          
          <div className="testimonial">
            <div className="testimonial-text">
              "VocabMaster helped me improve my English vocabulary by 200% in just 3 months!"
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">M</div>
              <div>
                <div className="author-name">Maria Rodriguez</div>
                <div className="author-title">IELTS Student</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-form-container">
          <div className="form-header">
            <h3>Create Account</h3>
            <p>Get started with your free account today</p>
          </div>
          
          <button className="social-login-btn">
            <span>🔍</span>
            <span>Sign up with Google</span>
          </button>
          
          <div className="form-divider">
            <span>or create account with email</span>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  required
                  className="form-input"
                />
              </div>
            </div>
            
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
                  placeholder="Create a strong password"
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
            
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                />
                <span className="checkbox-custom"></span>
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>
            
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="form-footer">
            <p>Already have an account? <a href="#" onClick={onSwitchToLogin}>Sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
