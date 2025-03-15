import { ColDef } from "ag-grid-community";

// Definizione delle colonne per la tabella storica
export const historicalColumns: ColDef[] = [
  { 
    headerName: 'MAC Address', 
    field: 'macAddress', 
    sortable: true, 
    filter: true,
    flex: 1 
  },
  { 
    headerName: 'Temperature (°C)', 
    field: 'temperature', 
    sortable: true, 
    filter: true,
    valueFormatter: (params: { value: unknown; }) => Number(params.value).toFixed(1),
    flex: 1 
  },
  { 
    headerName: 'Humidity (%)', 
    field: 'humidity', 
    sortable: true, 
    filter: true,
    valueFormatter: (params: { value: unknown; }) => Number(params.value).toFixed(1),
    flex: 1 
  },
  { 
    headerName: 'Pressure (hPa)', 
    field: 'pressure', 
    sortable: true, 
    filter: true,
    valueFormatter: (params: { value: unknown; }) => Number(params.value).toFixed(1),
    flex: 1 
  },
  { 
    headerName: 'Timestamp', 
    field: 'timestamp', 
    sortable: true, 
    filter: true,
    valueFormatter: (params: { value: string | number | Date; }) => new Date(params.value).toLocaleString(),
    flex: 1.5 
  },
];

// Definizione delle colonne per la tabella in tempo reale
export const realtimeColumns: ColDef[] = [
  { 
    headerName: 'MAC Address', 
    field: 'macAddress', 
    sortable: true, 
    filter: true,
    flex: 1 
  },
  { 
    headerName: 'Temperature (°C)', 
    field: 'temperature', 
    sortable: true, 
    filter: true,
    valueFormatter: (params: { value: unknown; }) => Number(params.value).toFixed(1),
    flex: 1,
    cellStyle: (params: { value: number; }) => ({
      backgroundColor: params.value > 30 ? '#ffcccc' : params.value < 10 ? '#ccccff' : 'white'
    })
  },
  { 
    headerName: 'Humidity (%)', 
    field: 'humidity', 
    sortable: true, 
    filter: true,
    valueFormatter: (params: { value: unknown; }) => Number(params.value).toFixed(1),
    flex: 1,
    cellStyle: (params: { value: number; }) => ({
      backgroundColor: params.value > 80 ? '#ccffcc' : params.value < 30 ? '#ffffcc' : 'white'
    })
  },
  { 
    headerName: 'Pressure (hPa)', 
    field: 'pressure', 
    sortable: true, 
    filter: true,
    valueFormatter: (params: { value: unknown; }) => Number(params.value).toFixed(1),
    flex: 1 
  },
  { 
    headerName: 'Last Update', 
    field: 'timestamp', 
    sortable: true, 
    filter: true,
    valueFormatter: (params: { value: string | number | Date; }) => new Date(params.value).toLocaleString(),
    flex: 1.5 
  },
];

// Opzioni di default per le griglie
export const defaultColDef = {
  resizable: true,
};

// Configurazione delle opzioni per agGrid
export const gridOptions = {
  animateRows: true,
  pagination: true,
  paginationPageSize: 10,
};