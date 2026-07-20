const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  createUsageLog,
  getLogsByItem,
  getAllLogs,
  deleteUsageLog,
} = require("../controllers/usageLogsController");

router.use(verifyToken);

router.get("/", getAllLogs);
router.get("/item/:type/:id", getLogsByItem);
router.post("/", createUsageLog);
router.delete("/:id", deleteUsageLog);

module.exports = router;
