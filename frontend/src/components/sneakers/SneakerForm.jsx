import { useState, useEffect } from "react";

const emptyForm = {
  name: "",
  brand: "",
  size: "",
  colorway: "",
  condition: "",
  purchase_price: "",
  label: "",
  notes: "",
  image_url: "",
};

const SneakerForm = ({ initialData, onSubmit, onCancel }) => {
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
      <h2>{initialData ? "Edit Sneaker" : "Add Sneaker"}</h2>

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
        Size
        <input
          name="size"
          value={formData.size}
          onChange={handleChange}
          placeholder="e.g. US 9"
        />
      </label>

      <label>
        Colorway
        <input
          name="colorway"
          value={formData.colorway}
          onChange={handleChange}
        />
      </label>

      <label>
        Condition
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
        >
          <option value="">Select condition</option>
          <option value="New">New</option>
          <option value="Worn">Worn</option>
          <option value="Beat">Beat</option>
        </select>
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
          {initialData ? "Save Changes" : "Add Sneaker"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SneakerForm;
