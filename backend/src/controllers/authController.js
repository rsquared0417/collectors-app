const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide all required fields" });
  }

  try {
    //Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(409)
        .json({ success: false, error: "User already exists" });
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Insert new user
    const newUser = await pool.query(
      `INSERT INTO users (name, email, password_hash) 
            VALUES ($1, $2, $3) 
            RETURNING id, name, email`,
      [name, email, hashedPassword],
    );

    const user = newUser.rows[0];

    // Create JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ success: true, user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

//Login

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide all required fields" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE onboarding choices
const updateOnboarding = async (req, res) => {
  const { collects_sneakers, collects_perfumes } = req.body;

  if (!collects_sneakers && !collects_perfumes) {
    return res.status(400).json({
      success: false,
      message: "Select at least one collection type",
    });
  }

  try {
    const result = await pool.query(
      `UPDATE users 
       SET collects_sneakers = $1, collects_perfumes = $2 
       WHERE id = $3
       RETURNING id, name, email, collects_sneakers, collects_perfumes`,
      [!!collects_sneakers, !!collects_perfumes, req.userId],
    );

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { register, login, updateOnboarding };
