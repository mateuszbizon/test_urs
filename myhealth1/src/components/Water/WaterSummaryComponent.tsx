import React, { useEffect, useState } from 'react';

interface WaterSummaryComponentProps {
  userId: string;
}

interface WaterData {
  date: string;
  amount: number;
}

const WaterSummaryComponent: React.FC<WaterSummaryComponentProps> = ({ userId }) => {
  const [waterData, setWaterData] = useState<WaterData[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const fetchWaterData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`/api/water/all/${userId}/${today}`);
        
        if (response.ok) {
          const data = await response.json();
          setWaterData(data.waterData);
          setTotalAmount(data.totalAmount);
        } else {
          console.error('Error fetching water data');
        }
      } catch (error) {
        console.error('Error fetching water data: ', error);
      }
    };

    fetchWaterData();
  }, [userId]);

  return (
    <div>
      <h2>Podsumowanie wypitej wody:</h2>
      <p>Suma wypitej wody dzisiaj: {totalAmount} ml</p>
      <h3>Lista dawek wypitej wody:</h3>
      <ul>
        {waterData.map((item, index) => (
          <li key={index}>
            Data: {new Date(item.date).toLocaleTimeString()}, Ilość: {item.amount} ml
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaterSummaryComponent;
