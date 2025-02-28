import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ColDef, provideGlobalGridOptions } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// 📌 Registra il modulo richiesto
ModuleRegistry.registerModules([ClientSideRowModelModule]);

provideGlobalGridOptions({ theme: "legacy"});

const AgGridComponent: React.FC = () => {
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29000, electric: false },
  ]);

  const [colDefs] = useState<ColDef[]>([
    { field: "make", headerName: "Marca" },
    { field: "model", headerName: "Modello" },
    { field: "price", headerName: "Prezzo" },
    { field: "electric", headerName: "Elettrico" },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
};

export default AgGridComponent;