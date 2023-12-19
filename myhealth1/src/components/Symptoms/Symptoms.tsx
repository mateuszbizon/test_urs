import React, { useState, useEffect } from 'react';
import './symptoms.css'


interface Symptom {
  _id: number; 
  name: string;
  description: string;
}

interface SymptomRecorded {
  _id: string;
  name: string;
  description: string;
  date: string;
}

  const symptomsData: Symptom[] = [
    {
        _id: 1,
        name: "Anxiety",
        description: "Feeling anxious and restless.",
      },
      {
        _id: 2,
        name: "Depression",
        description: "Feeling sad and unmotivated."
      },
      {
        _id: 3,
        name: "Angry",
        description: "Feeling sad and unmotivated."
      },
      {
        _id: 4,
        name: "Tired",
        description: "Feeling sad and unmotivated."
      },
      {
        _id: 5,
        name: "Happy",
        description: "Feeling sad and unmotivated."
      },
      {
        _id: 6,
        name: "Bored",
        description: "Feeling sad and unmotivated."
      },
  ];
  
  function Symptoms() {
    // const [symptomsData, setSymptomsData] = useState<Symptom[]>(symptomsDataInit);
    const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
    const [recordedSymptoms, setRecordedSymptoms] = useState<SymptomRecorded[]>([]);
    const [recordedSymptomsToday, setRecordedSymptomsToday] = useState<SymptomRecorded[]>([]);
    const [searchDate, setSearchDate] = useState<string>('');
    const [searchedSymptoms, setSearchedSymptoms] = useState<SymptomRecorded[]>([]);
    // const [groupedSymptoms, setGroupedSymptoms] = useState<Record<string, { symptom: Symptom; date: string }[]>>({});
  
    const userToken: string | null = localStorage.getItem("token")

    const getAllSymptoms = async () => {
      try {
        const response = await fetch('http://localhost:8080/symptom/getAllSymptoms', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${userToken}`
          },
        })

        if (response.ok) {
          console.log('symptoms get');
          const data = await response.json();
          setRecordedSymptoms([...data.content])
          setRecordedSymptomsToday([...data.todayContent])
          console.log(data)
         
        } else {
          console.error('calorie not added');
        }

        }
        catch (error) {
          console.error('Error occurred:', error);
        }
    }

    const addNewSymptom = async () => {
      try {
        const response = await fetch('http://localhost:8080/symptom/addSymptom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${userToken}`
          },
          body: JSON.stringify({name: selectedSymptom?.name, description: selectedSymptom?.description})
        })

        if (response.ok) {
          console.log('symptoms added');
          const data = await response.json();
          console.log(data)
          setRecordedSymptomsToday([...recordedSymptomsToday, data.content]);
          setSelectedSymptom(null);
         
        } else {
          console.error('calorie not added');
        }

        }
        catch (error) {
          console.error('Error occurred:', error);
        }
    }

    const deleteSymptom = async (index: number, id: string) => {
      try {
        const response = await fetch(`http://localhost:8080/symptom/deleteSymptom/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${userToken}`
          },
        })

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          const updatedSymptoms = [...recordedSymptomsToday];
          updatedSymptoms.splice(index, 1);
          setRecordedSymptomsToday(updatedSymptoms);
         
        } else {
          console.error('calorie not added');
        }

        }
        catch (error) {
          console.error('Error occurred:', error);
        }
    }

    useEffect(() => {
      getAllSymptoms()
    }, []);
  
    // useEffect(() => {
    //   const grouped = recordedSymptoms.reduce((acc: Record<string, { symptom: Symptom; date: string }[]>, record) => {
    //     if (!acc[record.date]) {
    //       acc[record.date] = [];
    //     }
    //     acc[record.date].push(record);
    //     return acc;
    //   }, {});
    //   setGroupedSymptoms(grouped);
    // }, [recordedSymptoms]);
  
    const handleSymptomSelect = (symptom: Symptom) => {
      setSelectedSymptom(symptom);
    };
  
    const isSymptomAlreadyRecorded = (selectedSymptom: Symptom | null) => {
      const currentDate = new Date().toISOString().split('T')[0];

      return recordedSymptomsToday.some(
        (record) => record.name === selectedSymptom?.name && record.date === currentDate
      );
    };
  
    const handleRecordSymptom = () => {
      if (selectedSymptom && !isSymptomAlreadyRecorded(selectedSymptom)) {
        addNewSymptom();
        // const currentDate = new Date().toISOString().split('T')[0];
        // const newRecord = {
        //   symptom: selectedSymptom,
        //   date: currentDate,
        // };
        // setRecordedSymptoms([...recordedSymptoms, newRecord]);
        // setSelectedSymptom(null);
      } else if (isSymptomAlreadyRecorded(selectedSymptom)) {
        alert('You have already recorded this symptom today.');
      }
    };
  
    const handleDeleteSymptom = (index: number, id: string) => {
      deleteSymptom(index, id);
    };
  
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!searchDate.length) return;
      
      const formattedSearchDate = new Date(searchDate).toISOString().split('T')[0];
      const filteredSymptoms = recordedSymptoms.filter((record) => record.date === formattedSearchDate);
      setSearchedSymptoms(filteredSymptoms);
    };
  
    return (
      <div className="App">
        <h1>Mental Health Symptom Tracker</h1>
  
        <div className="symptom-list">
          {symptomsData.map((symptom) => (
            <div
              key={symptom._id}
              className={`symptom-item ${selectedSymptom === symptom ? 'selected' : ''}`}
              onClick={() => handleSymptomSelect(symptom)}
            >
              <div className="symptom-info">
                <strong>{symptom.name}</strong>
                <p>{symptom.description}</p>
              </div>
            </div>
          ))}
        </div>
  
        <div className="button-container">
          <button onClick={handleRecordSymptom}>Record Symptom</button>
        </div>
  
        <h2>Recorded Symptoms</h2>
        {/* {Object.keys(groupedSymptoms).map((date) => ( */}
          <div>
            {/* <h3>{date}</h3> */}
            <ul className="recorded-symptoms">
              {recordedSymptomsToday.map((record, index) => (
                <li key={index}>
                  <div>
                    <strong>{record.name}</strong>
                    <button onClick={() => handleDeleteSymptom(index, record._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        {/* ))} */}
  
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <button type="submit">Search Symptoms</button>
          </form>
        </div>
  
        {searchedSymptoms.length > 0 && (
          <div className="search-results">
            <h2>Search Results</h2>
            <ul className="recorded-symptoms">
              {searchedSymptoms.map((record, index) => (
                <li key={index}>
                  <div>
                    <strong>{record.name}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  
  export default Symptoms;