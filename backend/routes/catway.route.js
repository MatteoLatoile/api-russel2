const express = require("express");
const {
  setCatway,
  getCatway,
  editCatway,
  deleteCatway,
} = require("../controllers/catway.controller");
const router = express.Router();

router.get("/", getCatway);
router.get("/:id", getCatway);
router.post("/", setCatway);
router.put("/:id", editCatway);
router.delete("/:id", deleteCatway);

module.exports = router;