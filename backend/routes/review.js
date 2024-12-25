const express = require("express");
const { getReviews, getReview, addReview, deleteReview } = require("../controller/review");
const {verifyToken} = require("../middleware/auth");
const router = express.Router();

router.get("/", getReviews); 
router.get("/:userId", getReview); 
router.post("/", verifyToken, addReview); 
router.delete("/:userId", deleteReview);

module.exports = router;
