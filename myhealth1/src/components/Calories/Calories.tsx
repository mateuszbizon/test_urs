import React, { useState } from 'react';
import './Calories.css'

const Calories: React.FC = () => {
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<string>('male');
  const [activityLevel, setActivityLevel] = useState<string>('sedentary');
  const [bmr, setBMR] = useState<number | null>(null);
  const [tdee, setTDEE] = useState<number | null>(null);


  const calculateBMR = () => {
    
    let bmrValue = 0;

    if (gender === 'male') {
      bmrValue = 88.362 + 13.397 * Number(weight) + 4.799 * Number(height) - 5.677 * Number(age);
    } else if (gender === 'female') {
      bmrValue = 447.593 + 9.247 * Number(weight) + 3.098 * Number(height) - 4.330 * Number(age);
    }
    

    return bmrValue;
  };


  const calculateTDEE = () => {
    const activityMultipliers: { [key: string]: number } = {
      sedentary: 1.2,
      'lightly active': 1.375,
      'moderately active': 1.55,
      'very active': 1.725,
      'extra active': 1.9,
    };


    const bmrResult = calculateBMR();
    const tdeeValue = bmrResult * activityMultipliers[activityLevel];

    return tdeeValue;
  };

  const resetCalculate = () => {
    setHeight('');
    setWeight('');
    setAge('');
    setGender('');
    setActivityLevel('');
    setBMR(null);
    setTDEE(null);
  };

  const handleCalculate = () => {
    const bmrResult = calculateBMR();
    const tdeeResult = calculateTDEE();

    setBMR(bmrResult);
    setTDEE(tdeeResult);
  };

  return (
    <div className='calories'>
        <div className='card'>
            <h1>Daily Caloric Needs Calculator</h1>
            <label>
                Weight (kg):
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.valueAsNumber || '')} />
            </label>
            <div />
            <label>
                Height (cm):
                <input type="number" value={height} onChange={(e) => setHeight(e.target.valueAsNumber || '')} />
            </label>
            <div />
            <label>
                Age (years):
                <input type="number" value={age} onChange={(e) => setAge(e.target.valueAsNumber || '')} />
            </label>
            <div />
            <label>
                Gender:
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
            </label>
            <div />
            <label>
                Activity Level:
                <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                <option value="sedentary">Sedentary</option>
                <option value="lightly active">Lightly Active</option>
                <option value="moderately active">Moderately Active</option>
                <option value="very active">Very Active</option>
                <option value="extra active">Extra Active</option>
                </select>
            </label>
            <div />
            <button onClick={handleCalculate}>Calculate</button>
            <button onClick={resetCalculate}>Reset</button>
            <div />
            {bmr !== null && tdee !== null && (
                <div>
                <h2>Results:</h2>
                <p>Estimated BMR: {bmr.toFixed(2)} calories/day</p>
                <p>Estimated TDEE: {tdee.toFixed(2)} calories/day</p>
                </div>
            )}
      </div>
    </div>
  );
};

export default Calories;
