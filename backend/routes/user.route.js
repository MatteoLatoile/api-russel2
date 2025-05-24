const express = require("express");
const {
  setUser,
  getUser,
  editUser,
  deleteUser,
} = require("../controllers/user.controller");
const router = express.Router();
router.get("/", getUser);
router.get("/:id", getUser);
router.post("/", setUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

module.exports = router;