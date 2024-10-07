import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginPage.module.css'; // Import the CSS module

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      if (data.token) {
        localStorage.setItem('token', data.token); 

        if (data.userType === 'agent') {
          navigate('/agent-home');
        } else if (data.userType === 'student') {
          navigate('/home');
        }
      } else {
        alert('Login failed');
      }
    } else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <div className={styles.loginPage}>
     <div className={styles.backgroundBlur}></div>
      <div className={styles.loginwrapper}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.logininputBox}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.logininputBox}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginbtn}>Login</button>
        </form>
        <div className={styles.signupLink}>
          <p>Not a registered user? <Link to="/register" className={styles.signUp}>Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
