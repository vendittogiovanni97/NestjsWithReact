export interface IUser {
  _id: string;
  name: string;
  email: string;
  age: number;
  hobbies: string[];
  img: string;
}



// Props che il componente si aspetta di ricevere
export interface EditUserFormProps {
  user: IUser;         // i dati dell'utente da modificare
  show: boolean;       // controlla se il modal è visibile
  onClose: () => void; // funzione per chiudere il modal
  onSave: (user: IUser) => void; // funzione che gestisce il salvataggio
}