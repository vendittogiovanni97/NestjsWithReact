// src/services/api.js

// Funzione base per le richieste HTTP
const fetchData = async (url:string) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Errore HTTP! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Errore durante il fetch da ${url}:`, error);
    throw error;
  }
};

// API per i dati storici
export const getHistoricalData = () => {
  return fetchData('http://localhost:3000/sensor/historical');
};

// API per i dati in tempo reale
export const getRealtimeData = () => {
  return fetchData('http://localhost:3000/sensor/realtime');
};