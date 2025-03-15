// src/components/SensorDataGrid.jsx
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../css/grid.components.css";

// Importa le funzioni API
// Importa configurazioni delle colonne
import { getHistoricalData, getRealtimeData } from "../api/fetch";
import {
  historicalColumns,
  realtimeColumns,
} from "../structurTabColumn/columnOption";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const SensorDataGrid = () => {
  // Stati per i dati
  const [historicalData, setHistoricalData] = useState([]);
  const [realtimeData, setRealtimeData] = useState([]);

  // Opzioni di default per le griglie
  const defaultColDef = {
    resizable: true,
  };

  // Funzione per aggiornare i dati storici
  const updateHistoricalData = () => {
    getHistoricalData()
      .then((data) => setHistoricalData(data))
      .catch((error) =>
        console.error("Errore nel caricamento dei dati storici:", error)
      );
  };

  // Funzione per aggiornare i dati in tempo reale
  const updateRealtimeData = () => {
    getRealtimeData()
      .then((data) => setRealtimeData(data))
      .catch((error) =>
        console.error("Errore nel caricamento dei dati in tempo reale:", error)
      );
  };

  // Gestione del caricamento dati storici
  useEffect(() => {
    updateHistoricalData();
    const historicalInterval = setInterval(updateHistoricalData, 5000);
    return () => clearInterval(historicalInterval);
  }, []);

  // Gestione del caricamento dati in tempo reale
  useEffect(() => {
    updateRealtimeData();
    const realtimeInterval = setInterval(updateRealtimeData, 1000);
    return () => clearInterval(realtimeInterval);
  }, []);

  // Configurazione delle opzioni per agGrid
  const gridOptions = {
    animateRows: true,
    pagination: true,
    paginationPageSize: 200,
  };

  return (
    <div className="sensor-data-container">
      <h1>Sensor Data Monitoring</h1>

      <div className="grid-section">
        <h2>Real-time Data</h2>
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            rowData={realtimeData}
            columnDefs={realtimeColumns}
            defaultColDef={defaultColDef}
            gridOptions={gridOptions}
            domLayout="autoHeight"
          />
        </div>
      </div>

      <div className="grid-section">
        <h2>Historical Data</h2>
        <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
          <AgGridReact
            rowData={historicalData}
            columnDefs={historicalColumns}
            defaultColDef={defaultColDef}
            gridOptions={gridOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default SensorDataGrid;
