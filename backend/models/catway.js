const mongoose = require("mongoose");

const catwaySchema = mongoose.Schema({
    catwayNumber: {
      type: Number,
      required: true,
      unique: true
    },
    catwayType: {
      type: String,
      required: true,
    },
    catwayState: {
      type: String,
      required: true,
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("catway", catwaySchema);