const SneakerCard = ({ sneaker, onEdit, onDelete }) => {
  return (
    <div className="item-card">
      {sneaker.image_url && (
        <img
          src={sneaker.image_url}
          alt={sneaker.name}
          className="item-image"
        />
      )}
      <div className="item-info">
        <h3>{sneaker.name}</h3>
        <p className="item-brand">{sneaker.brand}</p>
        <p className="item-detail">Size: {sneaker.size || "—"}</p>
        <p className="item-detail">{sneaker.colorway}</p>
        {sneaker.label && <span className="item-label">{sneaker.label}</span>}
      </div>
      <div className="item-actions">
        <button onClick={() => onEdit(sneaker)}>Edit</button>
        <button onClick={() => onDelete(sneaker.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default SneakerCard;
