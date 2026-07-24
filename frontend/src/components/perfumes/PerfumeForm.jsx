import { useState, useEffect } from "react";

const emptyForm = {
  name: "",
  brand: "",
  concentration: "",
  bottle_size_ml: "",
  remaining_percent: "",
  purchase_price: "",
  label: "",
  notes: "",
  image_url: "",
};

const PerfumeForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...emptyForm, ...initialData });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <h2>{initialData ? "Edit Perfume" : "Add Perfume"}</h2>

      <label>
        Name *
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Brand
        <input name="brand" value={formData.brand} onChange={handleChange} />
      </label>

      <label>
        Concentration
        <select
          name="concentration"
          value={formData.concentration}
          onChange={handleChange}
        >
          <option value="">Select concentration</option>
          <option value="EDT">EDT</option>
          <option value="EDP">EDP</option>
          <option value="Parfum">Parfum</option>
          <option value="Cologne">Cologne</option>
        </select>
      </label>

      <label>
        Bottle Size (ml)
        <input
          type="number"
          name="bottle_size_ml"
          value={formData.bottle_size_ml}
          onChange={handleChange}
        />
      </label>

      <label>
        Remaining (%)
        <input
          type="number"
          name="remaining_percent"
          min="0"
          max="100"
          value={formData.remaining_percent}
          onChange={handleChange}
        />
      </label>

      <label>
        Purchase Price
        <input
          type="number"
          name="purchase_price"
          value={formData.purchase_price}
          onChange={handleChange}
        />
      </label>

      <label>
        Label
        <select name="label" value={formData.label} onChange={handleChange}>
          <option value="">None</option>
          <option value="Favorite">Favorite</option>
          <option value="For Sale">For Sale</option>
          <option value="Currently Using">Currently Using</option>
        </select>
      </label>

      <label>
        Image URL
        <input
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
        />
      </label>

      <label>
        Notes
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </label>

      <div className="form-actions">
        <button type="submit">
          {initialData ? "Save Changes" : "Add Perfume"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PerfumeForm;
