const express = require("express");
const router = express.Router();
const Publications = require("..//models/Publications");

router.post("/publications", async (req, res) => {
  try {
    const newPublications = new Publications({
      title: req.fields.title,
      description: req.fields.decription,
      price: req.fields.price
    });
    await newPublications.save();
    res.json({
      _id: newPublications._id,
      title: newPublications.title,
      description: newPublications.description,
      price: newPublications.price,
      //   created: newPublications,
      creator: {
        account: newPublications.user
        // _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
      }
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
