import { useState, useEffect } from "react";
import {
  getPerfumes,
  createPerfume,
  updatePerfume,
  deletePerfume,
} from "../services/perfumesApi";
import PerfumeCard from "../components/perfumes/PerfumeCard";
import PerfumeForm from "../components/perfumes/PerfumeForm";

const PerfumesPage = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState(null);
  const [error, setError] = useState("");

  const loadPerfumes = async () => {
    try {
      const data = await getPerfumes();
      setPerfumes(data.perfumes);
    } catch (err) {
      setError("Failed to load perfumes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPerfumes();
  }, []);

  const handleAddClick = () => {
    setEditingPerfume(null);
    setShowForm(true);
  };

  const handleEditClick = (perfume) => {
    setEditingPerfume(perfume);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingPerfume) {
        await updatePerfume(editingPerfume.id, formData);
      } else {
        await createPerfume(formData);
      }
      setShowForm(false);
      setEditingPerfume(null);
      loadPerfumes();
    } catch (err) {
      setError("Failed to save perfume");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this perfume? This cannot be undone.")) return;

    try {
      await deletePerfume(id);
      loadPerfumes();
    } catch (err) {
      setError("Failed to delete perfume");
    }
  };

  if (loading) return <p>Loading perfumes...</p>;

  return (
    <div className="collection-page">
      <div className="page-header">
        <h1>Perfumes</h1>
        <button onClick={handleAddClick}>+ Add Perfume</button>
      </div>

      {error && <p className="auth-error">{error}</p>}

      {showForm && (
        <PerfumeForm
          initialData={editingPerfume}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {perfumes.length === 0 ? (
        <p>No perfumes yet. Add your first one!</p>
      ) : (
        <div className="item-grid">
          {perfumes.map((perfume) => (
            <PerfumeCard
              key={perfume.id}
              perfume={perfume}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PerfumesPage;
