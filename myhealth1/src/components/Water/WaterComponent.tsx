import React, { useState, ChangeEvent } from 'react';

interface WaterComponentProps {
  userId: string;
}

const WaterComponent: React.FC<WaterComponentProps> = ({ userId }) => {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const handleAddWater = async () => {
    try {
      const amountValue = Number(amount); // Convert the amount to a number
      if (!isNaN(amountValue)) {
        const response = await fetch('/api/water/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, amount: amountValue }), // Use the converted number
        });

        if (response.ok) {
          setMessage('Dawka wypitej wody dodana pomyślnie!');
        } else {
          setMessage('Wystąpił błąd. Spróbuj ponownie.');
        }
      } else {
        setMessage('Podaj poprawną liczbę.');
      }
    } catch (error) {
      setMessage('Wystąpił błąd. Spróbuj ponownie.');
    }
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  return (
    <div>
      <h2>Dodaj ilość wypitej wody:</h2>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
      />
      <button onClick={handleAddWater}>Dodaj</button>
      <p>{message}</p>
    </div>
  );
};

export default WaterComponent;
