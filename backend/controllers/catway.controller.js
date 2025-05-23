const CatwayModel = require("../models/catway");

module.exports.getCatway = async (req, res) => {
  const catways = await CatwayModel.find();
  res.status(200).json(catways);
};

module.exports.setCatway = async (req, res) => {
  if (!req.body.message) {
    res.status(400).json({ message: "Merci d'ajouter un message" });
  }

  const catway = await PostModel.create({
    catwayNumber: req.body.catwayNumber,
    catwayType: req.body.catwayType,
    catwayState: req.body.catwayState
  });
  res.status(200).json(catway);
};

module.exports.editCatway = async (req, res) => {
  const catway = await CatwayModel.findById(req.params.id);

  if (!catway) {
    res.status(400).json({ message: "Ce catway n'existe pas" });
  }

  const updateCatway = await PostModel.findByIdAndUpdate(post, req.body, {
    new: true,
  });

  res.status(200).json(updateCatway);
};

module.exports.deleteCatway = async (req, res) => {
  const catway = await CatwayModel.findById(req.params.id);

  if (!catway) {
    res.status(400).json({ message: "Ce catway n'existe pas" });
  }
  await catway.deleteOne({ _id: catway })
  res.status(200).json("catway supprimé " + req.params.id);
};

module.exports.likePost = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.status(200).send(data));
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.dislikePost = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.status(200).send(data));
  } catch (err) {
    res.status(400).json(err);
  }
};