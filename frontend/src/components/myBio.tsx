import React, { useState, useEffect } from "react";
import "./MyBio.css"; // Importiamo il file CSS separato
import EditUserForm from "./EditForm.tsx";
import { IUser } from "../interface/users";


const MyBio: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const response = await fetch("http://localhost:3000/users")
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: IUser[] = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="user-grid">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-card-image">
              <img
                src={"/DC9E2D93-81AA-4879-999E-8B384DD81AD2.jpg"}
                alt={`${user.name}'s profile`}
              />
            </div>
            <div className="user-card-content">
              <h2 className="user-name">{user.name}</h2>
              <div className="user-details">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Age:</strong> {user.age}
                </p>
              </div>
              <div className="hobbies-section">
                <strong>Hobbies:</strong>
                <div className="hobbies-tags">
                  {user.hobbies.map((hobby, index) => (
                    <span key={index} className="hobby-tag">
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
              <button
                className="edit-button"
                onClick={() => {
                  setSelectedUser(user);
                  setShowEditModal(true);
                }}
              >
                Modifica
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <EditUserForm
          user={selectedUser}
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedUser) => {
            setUsers(
              users.map((u) => (u._id === updatedUser._id ? updatedUser : u))
            );
          }}
        />
      )}
    </div>
  );
};

export default MyBio;
