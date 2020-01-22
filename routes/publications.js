const express = require("express");
const router = express.Router();
const Publications = require("..//models/Publications");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/publications", isAuthenticated, async (req, res) => {
  try {
    const newPublications = new Publications({
      title: req.fields.title,
      description: req.fields.decription,
      price: req.fields.price,
      creator: req.user
    });

    await newPublications.save();

    res.json({
      _id: newPublications._id,
      title: newPublications.title,
      description: newPublications.description,
      price: newPublications.price,
      created: Date(),
      creator: {
        account: { username: req.user.account.username },
        _id: req.user._id
      }
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
