const pool = require("../config/db");

// Helper: Confirms if item exists AND belongs to user
const verifyItemOwnership = async (itemType, itemId, userId) => {
  const table = itemType === "sneaker" ? "sneakers" : "perfumes";
  const result = await pool.query(
    `SELECT id FROM ${table} WHERE id = $1 AND user_id = $2`,
    [itemId, userId],
  );
  return result.rows.length > 0;
};

// CREATE a usage log
const createUsageLog = async (req, res) => {
  const { item_type, item_id, used_date, notes } = req.body;

  if (!item_type || !item_id || !used_date) {
    return res.status(400).json({
      success: false,
      message: "item_type, item_id, and used_date are required",
    });
  }

  if (item_type !== "sneaker" && item_type !== "perfume") {
    return res.status(400).json({
      success: false,
      message: "item_type must be either 'sneaker' or 'perfume'",
    });
  }

  try {
    const isOwner = await verifyItemOwnership(item_type, item_id, req.userId);
    if (!isOwner) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    const result = await pool.query(
      `INSERT INTO usage_logs (user_id, item_type, item_id, used_date, notes)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [req.userId, item_type, item_id, used_date, notes],
    );

    res.status(201).json({ success: true, usageLog: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET all usage logs for a specific item (with usage count)
const getLogsByItem = async (req, res) => {
  const { type, id } = req.params;

  if (type !== "sneaker" && type !== "perfume") {
    return res
      .status(400)
      .json({ status: false, message: "Invalid item type" });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM usage_logs
        WHERE item_type = $1 AND item_id = $2 AND user_id = $3
        ORDER BY used_date DESC`,
      [type, id, req.userId],
    );
    res.json({
      success: true,
      logs: result.rows,
      totalUses: result.rows.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET all usage logs for the logged-in user
const getAllLogs = async (req, res) => {
  const { type } = req.query;

  try {
    let query = "SELECT * FROM usage_logs WHERE user_id = $1";
    const params = [req.userId];

    if (type === "sneaker" || type === "perfume") {
      query += " AND item_type = $2";
      params.push(type);
    }

    query += " ORDER BY used_date DESC";

    const result = await pool.query(query, params);
    res.json({ success: true, logs: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE a usage log
const deleteUsageLog = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM usage_logs WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.userId],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Log not found" });
    }
    res.json({ success: true, message: "Usage log deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createUsageLog,
  getLogsByItem,
  getAllLogs,
  deleteUsageLog,
};
