const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  getAllPerfumes,
  getPerfumeById,
  createPerfume,
  updatePerfume,
  deletePerfume,
} = require("../controllers/perfumesController");

router.use(verifyToken);

router.get("/", getAllPerfumes);
router.get("/:id", getPerfumeById);
router.post("/", createPerfume);
router.put("/:id", updatePerfume);
router.delete("/:id", deletePerfume);

module.exports = router;
