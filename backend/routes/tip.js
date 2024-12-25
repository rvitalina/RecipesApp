const express = require("express");
const { getTips, getTip, addTip, deleteTip } = require("../controller/tip");
const {verifyToken} = require("../middleware/auth");
const router = express.Router();

router.get("/", getTips); 
router.get("/:id", getTip); 
router.post("/", verifyToken, addTip); 
router.delete("/:id", deleteTip);

module.exports = router;