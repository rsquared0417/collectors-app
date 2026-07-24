import { useState, useEffect } from "react";
import {
  getSneakers,
  createSneaker,
  updateSneaker,
  deleteSneaker,
} from "../services/sneakersApi";
import SneakerCard from "../components/sneakers/SneakerCard";
import SneakerForm from "../components/sneakers/SneakerForm";

const SneakersPage = () => {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSneaker, setEditingSneaker] = useState(null);
  const [error, setError] = useState("");

  const loadSneakers = async () => {
    try {
      const data = await getSneakers();
      setSneakers(data.sneakers);
    } catch (err) {
      setError("Failed to load sneakers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSneakers();
  }, []);

  const handleAddClick = () => {
    setEditingSneaker(null);
    setShowForm(true);
  };

  const handleEditClick = (sneaker) => {
    setEditingSneaker(sneaker);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingSneaker) {
        await updateSneaker(editingSneaker.id, formData);
      } else {
        await createSneaker(formData);
      }
      setShowForm(false);
      setEditingSneaker(null);
      loadSneakers(); // refresh the list
    } catch (err) {
      setError("Failed to save sneaker");
    }
  };

  const handleDelete = async (id) => {
    //Placeholder Modal, will change in the future
    if (!window.confirm("Delete this sneaker? This cannot be undone.")) return;

    try {
      await deleteSneaker(id);
      loadSneakers(); // refresh the list
    } catch (err) {
      setError("Failed to delete sneaker");
    }
  };

  if (loading) return <p>Loading sneakers...</p>;

  return (
    <div className="collection-page">
      <div className="page-header">
        <h1>Sneakers</h1>
        <button onClick={handleAddClick}>+ Add Sneaker</button>
      </div>

      {error && <p className="auth-error">{error}</p>}

      {showForm && (
        <SneakerForm
          initialData={editingSneaker}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {sneakers.length === 0 ? (
        <p>No sneakers yet. Add your first one!</p>
      ) : (
        <div className="item-grid">
          {sneakers.map((sneaker) => (
            <SneakerCard
              key={sneaker.id}
              sneaker={sneaker}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SneakersPage;
