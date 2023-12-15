"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string | null;
  email: string | null;
  password: string | null;
  weight: number | null;
  height: number | null;
  goal: string;
  gender: string;
  activityLevel: string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: null,
    email: null,
    password: null,
    weight: null,
    height: null,
    goal: 'weightLoss',
    gender: 'male',
    activityLevel: 'sedentary',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'weight' || name === 'height') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data received from backend:', data);

        // Redirect to the login page after successful registration
        window.location.href = '/Login';
      } else {
        throw new Error('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={handleInputChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handleInputChange} />
        </div>
        <div>
          <label>Weight (in kg):</label>
          <input type="number" name="weight" onChange={handleInputChange} />
        </div>
        <div>
          <label>Height (in cm):</label>
          <input type="number" name="height" onChange={handleInputChange} />
        </div>
        <div>
          <label>Goal:</label>
          <select name="goal" onChange={handleInputChange}>
            <option value="weightLoss">Lose</option>
            <option value="weightMaintain">Maintain</option>
            <option value="weightGain">Gain</option>
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" onChange={handleInputChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Activity Level:</label>
          <select name="activityLevel" onChange={handleInputChange}>
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
            <option value="veryActive">Very Active</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
