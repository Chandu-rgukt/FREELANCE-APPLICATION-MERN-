import React, { useState, useContext } from 'react';
import '../styles/Login.css';
import { GeneralContext } from '../context/GeneralContext';

const Login = ({ setAuthType }) => {
  const { login } = useContext(GeneralContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login({ email, password });
    if (!result.success) {
      setError(result.error || 'Login failed');
    } else {
      // Optionally clear form or redirect here
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Sign in
        </button>
        <p className="register-text">
          Not registered? <span onClick={() => setAuthType('register')}>Register</span>
        </p>
      </form>
    </div>
  );
};

export default Login;