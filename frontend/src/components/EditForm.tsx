import React, { useState } from 'react';
import './EditForm.css';
import { EditUserFormProps } from '../interface/users';


const EditUserForm: React.FC<EditUserFormProps> = ({ user, show, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    age: user.age,
    hobbies: user.hobbies.join(', ')
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:8081/rest/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          hobbies: formData.hobbies.split(',').map(hobby => hobby.trim())
        })
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'aggiornamento');
      }

      const updatedUser = await response.json();
      if (confirm("Sei sicuro di voler confermare?")) {
        alert('Dati modificati con successo');
      }

      onSave(updatedUser);
      onClose();
    } catch (error) {
      console.error('Errore:', error);
      alert('Si è verificato un errore durante il salvataggio');
    }
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Modifica Profilo</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <label>Età</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
          />

          <label>Hobbies (separati da virgola)</label>
          <input
            type="text"
            value={formData.hobbies}
            onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
          />

          <button type="submit">Salva</button>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
