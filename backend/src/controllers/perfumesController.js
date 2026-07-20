const pool = require("../config/db");

// Get all perfumes for logged-in user
const getAllPerfumes = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * from perfumes WHERE user_id = $1 ORDER BY created_at DESC",
      [req.userId],
    );
    res.json({ success: true, perfumes: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single perfume by ID
const getPerfumeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM perfumes WHERE id = $1 AND user_id = $2",
      [id, req.userId],
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Perfume not found" });
    }
    res.json({ success: true, perfume: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create a new perfume
const createPerfume = async (req, res) => {
  const {
    name,
    brand,
    concentration,
    bottle_size_ml,
    remaining_percent,
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
      `INSERT INTO perfumes
            (user_id, name, brand, concentration, bottle_size_ml, remaining_percent, 
            purchase_price, label, notes, image_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *`,
      [
        req.userId,
        name,
        brand,
        concentration,
        bottle_size_ml,
        remaining_percent,
        purchase_price,
        label,
        notes,
        image_url,
      ],
    );
    res.status(201).json({ success: true, perfume: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE a perfume
const updatePerfume = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    brand,
    concentration,
    bottle_size_ml,
    remaining_percent,
    purchase_price,
    label,
    notes,
    image_url,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE perfumes
            SET name = $1, brand = $2, concentration = $3, bottle_size_ml = $4,
            remaining_percent = $5, purchase_price = $6, label = $7, notes = $8, image_url = $9
            WHERE id = $10 AND user_id = $11
            RETURNING *`,
      [
        name,
        brand,
        concentration,
        bottle_size_ml,
        remaining_percent,
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
        .json({ success: false, error: "Perfume not found" });
    }
    res.json({ success: true, perfume: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE a perfume
const deletePerfume = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM perfumes WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.userId],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Perfume not found" });
    }
    res.json({ success: true, message: "Perfume deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllPerfumes,
  getPerfumeById,
  createPerfume,
  updatePerfume,
  deletePerfume,
};
