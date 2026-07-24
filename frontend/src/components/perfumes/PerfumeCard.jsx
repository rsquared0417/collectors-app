const PerfumeCard = ({ perfume, onEdit, onDelete }) => {
  return (
    <div className="item-card">
      {perfume.image_url && (
        <img
          src={perfume.image_url}
          alt={perfume.name}
          className="item-image"
        />
      )}
      <div className="item-info">
        <h3>{perfume.name}</h3>
        <p className="item-brand">{perfume.brand}</p>
        <p className="item-detail">
          {perfume.concentration} — {perfume.bottle_size_ml}ml
        </p>
        {perfume.remaining_percent != null && (
          <p className="item-detail">{perfume.remaining_percent}% remaining</p>
        )}
        {perfume.label && <span className="item-label">{perfume.label}</span>}
      </div>
      <div className="item-actions">
        <button onClick={() => onEdit(perfume)}>Edit</button>
        <button onClick={() => onDelete(perfume.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default PerfumeCard;
