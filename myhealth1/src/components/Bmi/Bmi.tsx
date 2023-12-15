"use client"
import React, { useState } from 'react';
import './bmi.css'

const Bmi = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBMIResult] = useState<string | null>(null);

  const calculateBMI = () => {
    if (height === '' || weight === '') {
      alert('Please enter both height and weight.');
      return;
    }

    const heightInMeters = parseFloat(height) / 100; // Convert height to meters
    const weightInKg = parseFloat(weight); // Convert weight to kg
    const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2); // Calculate BMI

    setBMIResult(bmi.toString()); // Ensure that bmi is a string when setting the state
  };

  const resetCalculator = () => {
    setHeight('');
    setWeight('');
    setBMIResult(null);
  };

  return (
    <div className='bmi'>
      <div className='card'>
      <h1>BMI Calculator</h1>
      <div>
        <label>
          Height (in cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Weight (in kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={calculateBMI}>Calculate BMI</button>
        <button onClick={resetCalculator}>Reset</button>
      </div>
      {bmiResult && (
        <div>
          <h2>Your BMI: {bmiResult}</h2>
          <p>
            Interpretation:
            {parseFloat(bmiResult) < 18.5
              ? ' Underweight'
              : parseFloat(bmiResult) < 25
              ? ' Normal weight'
              : parseFloat(bmiResult) < 30
              ? ' Overweight'
              : ' Obese'}
          </p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Bmi;

