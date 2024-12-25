const express = require("express");
const router = express.Router();
const { getUser, userSignUp, userLogIn, updateUser, getUsers, deleteUser } = require("../controller/user");
const { verifyToken,checkAdmin } = require("../middleware/auth");

router.post("/signUp", userSignUp)
router.post("/login", userLogIn)
router.get("/user/:id", getUser)
router.put("/user/:id", updateUser)
router.get('/users', verifyToken, checkAdmin, getUsers);
router.delete('/user/:id', verifyToken, checkAdmin, deleteUser);

module.exports = router;
