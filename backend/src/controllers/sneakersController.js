const pool = require("../config/db");

// GET all sneakers for logged-in user
const getAllSneakers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM sneakers WHERE user_id = $1 ORDER BY created_at DESC",
      [req.userId],
    );
    res.json({ success: true, sneakers: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET a single sneaker by ID
const getSneakerById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM sneakers WHERE id = $1 AND user_id = $2",
      [id, req.userId],
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Sneaker not found" });
    }
    res.json({ success: true, sneaker: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// CREATE a new sneaker
const createSneaker = async (req, res) => {
  const {
    name,
    brand,
    size,
    colorway,
    condition,
    purchase_price,
    label,
    notes,
    image_url,
  } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO sneakers
            (user_id, name, brand, size, colorway, condition, purchase_price, label, notes, image_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *`,
      [
        req.userId,
        name,
        brand,
        size,
        colorway,
        condition,
        purchase_price,
        label,
        notes,
        image_url,
      ],
    );
    res.status(201).json({ success: true, sneaker: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE a sneaker
const updateSneaker = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    brand,
    size,
    colorway,
    condition,
    purchase_price,
    label,
    notes,
    image_url,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE sneakers
            SET name = $1, brand = $2, size = $3, colorway = $4, condition = $5, 
            purchase_price = $6, label = $7, notes = $8, image_url = $9
            WHERE id = $10 AND user_id = $11
            RETURNING *`,
      [
        name,
        brand,
        size,
        colorway,
        condition,
        purchase_price,
        label,
        notes,
        image_url,
        id,
        req.userId,
      ],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Sneaker not found" });
    }
    res.json({ success: true, sneaker: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE a sneaker
const deleteSneaker = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM sneakers WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.userId],
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Sneaker not found" });
    }
    res.json({ success: true, message: "Sneaker deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllSneakers,
  getSneakerById,
  createSneaker,
  updateSneaker,
  deleteSneaker,
};
