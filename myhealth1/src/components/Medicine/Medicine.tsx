import React, { useState, useEffect } from 'react';

interface Medicine {
  name: string;
  dosage: string;
  taken: boolean;
}

const Medicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [newMedicine, setNewMedicine] = useState('');
  const [newDosage, setNewDosage] = useState('');

  const handleAddMedicine = () => {
    if (newMedicine.trim() !== '' && newDosage.trim() !== '') {
      const newMedicineObj: Medicine = {
        name: newMedicine,
        dosage: newDosage,
        taken: false,
      };
      setMedicines([...medicines, newMedicineObj]);
      setNewMedicine('');
      setNewDosage('');
    }
  };

  const handleDeleteMedicine = (index: number) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
  };

  const handleEditMedicine = (index: number, field: keyof Medicine, value: string) => {
    const updatedMedicines = medicines.map((medicine, i) =>
      i === index ? { ...medicine, [field]: value } : medicine
    );
    setMedicines(updatedMedicines);
  };

  const handleToggleTaken = (index: number) => {
    const updatedMedicines = medicines.map((medicine, i) =>
      i === index ? { ...medicine, taken: !medicine.taken } : medicine
    );
    setMedicines(updatedMedicines);
  };

  useEffect(() => {
    const resetTakenStatus = () => {
      const currentDate = new Date();
      const midnight = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1, // Ustawiamy na następny dzień
        0, 0, 0 // Godzina 00:00:00
      );

      const timeUntilMidnight = midnight.getTime() - currentDate.getTime();

      // Ustawienie timera na czas do północy
      const timer = setTimeout(() => {
        // Zmiana statusu wszystkich leków na "not taken"
        const updatedMedicines = medicines.map(medicine => ({
          ...medicine,
          taken: false
        }));
        setMedicines(updatedMedicines);
      }, timeUntilMidnight);

      return () => clearTimeout(timer); // Czyszczenie timera po odświeżeniu komponentu
    };

    resetTakenStatus(); // Wywołanie funkcji resetowania statusu leków
  }, [medicines]); // Dodanie zależności, aby useEffect wywoływał się przy zmianie leków

  return (
    <div>
      <h2>Medicines</h2>
      <div>
        <input
          type="text"
          placeholder="Medicine Name"
          value={newMedicine}
          onChange={(e) => setNewMedicine(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dosage"
          value={newDosage}
          onChange={(e) => setNewDosage(e.target.value)}
        />
        <button onClick={handleAddMedicine}>Add Medicine</button>
      </div>
      <ul>
        {medicines.map((medicine, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={medicine.taken}
              onChange={() => handleToggleTaken(index)}
            />
            <input
              type="text"
              value={medicine.name}
              onChange={(e) => handleEditMedicine(index, 'name', e.target.value)}
            />
            <input
              type="text"
              value={medicine.dosage}
              onChange={(e) => handleEditMedicine(index, 'dosage', e.target.value)}
            />
            <button onClick={() => handleDeleteMedicine(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Medicines;
