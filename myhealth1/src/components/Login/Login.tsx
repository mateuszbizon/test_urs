"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface LoginData {
  email: string | null;
  password: string | null;
}

const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: null,
    password: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        console.log('Login successful');
        const data = await response.json();
        localStorage.setItem("token", data.token)
        window.location.href = '/'; // Przeniesienie do strony "use client" po udanym logowaniu
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }

    setLoginData({ email: null, password: null });
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={handleInputChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handleInputChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
