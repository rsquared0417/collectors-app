const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  getAllSneakers,
  getSneakerById,
  createSneaker,
  updateSneaker,
  deleteSneaker,
} = require("../controllers/sneakersController");

router.use(verifyToken);

router.get("/", getAllSneakers);
router.get("/:id", getSneakerById);
router.post("/", createSneaker);
router.put("/:id", updateSneaker);
router.delete("/:id", deleteSneaker);

module.exports = router;
