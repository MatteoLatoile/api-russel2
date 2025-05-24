const express = require("express");
const {
  setReservation,
  getReservation,
  editReservation,
  deleteReservation,
} = require("../controllers/reservation.controller");
const router = express.Router();

router.get("/", getReservation);
router.get("/:id", getReservation);
router.post("/", setReservation);
router.put("/:id", editReservation);
router.delete("/:id", deleteReservation);

module.exports = router;