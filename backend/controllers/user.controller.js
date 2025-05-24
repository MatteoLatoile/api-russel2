const ReservationModel = require("../models/user");

module.exports.getUser = async (req, res) => {
  const catways = await ReservationModel.find();
  res.status(200).json(catways);
};

module.exports.setUser = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) { 
   return res.status(400).json({ message: "Merci de remplir les champs" });
  }

  const reservation = await ReservationModel.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(200).json(reservation);
};

module.exports.editUser = async (req, res) => {
  const reservation = await ReservationModel.findById(req.params.id);

  if (!reservation) {
    res.status(400).json({ message: "Ce catway n'existe pas" });
  }

  const updateReservation = await ReservationModel.findByIdAndUpdate(reservation, req.body, {
    new: true,
  });

  res.status(200).json(updateReservation);
};

module.exports.deleteUser = async (req, res) => {
  const reservation = await ReservationModel.findById(req.params.id);

  if (!reservation) {
    res.status(400).json({ message: "Ce catway n'existe pas" });
  }
  await reservation.deleteOne({ _id: reservation })
  res.status(200).json("catway supprimé " + req.params.id);
};
