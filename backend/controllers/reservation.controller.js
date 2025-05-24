const ReservationModel = require("../models/reservation");

module.exports.getReservation = async (req, res) => {
  const reservation = await ReservationModel.find();
  res.status(200).json(reservation);
};

module.exports.setReservation = async (req, res) => {
  if (!req.body.catwayNumber || !req.body.clientName || !req.body.boatName || !req.body.startDate || !req.body.endDate) { 
   return res.status(400).json({ message: "Merci de remplir les champs" });
  }

  const reservation = await ReservationModel.create({
    catwayNumber: req.body.catwayNumber,
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,

  });
  res.status(200).json(reservation);
};

module.exports.editReservation = async (req, res) => {
  const reservation = await ReservationModel.findById(req.params.id);

  if (!reservation) {
    res.status(400).json({ message: "Cette reservation n'existe pas" });
  }

  const updateReservation = await ReservationModel.findByIdAndUpdate(reservation, req.body, {
    new: true,
  });

  res.status(200).json(updateReservation);
};

module.exports.deleteReservation = async (req, res) => {
  const reservation = await ReservationModel.findById(req.params.id);

  if (!reservation) {
    res.status(400).json({ message: "cette reservation n'existe pas" });
  }
  await reservation.deleteOne({ _id: reservation })
  res.status(200).json("reservation supprimé " + req.params.id);
};
