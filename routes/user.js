const express = require("express");
const router = express.Router();

const User = require("../Models/User");

// Pack pour coder les MDP
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// Creation d'un compte
router.post("/create/user/sign_up", async (req, res) => {
  const salt = uid2(64);
  const hash = SHA256(req.fields.password + salt).toString(encBase64);
  const token = uid2(64);

  try {
    const email = req.fields.email;
    const presentMail = await User.find({ email: email });
    if (!req.fields.username) {
      res.json({ message: "Merci de renseigner votre Username" });
    } else if (presentMail.length === 0) {
      const newUser = new User({
        email: req.fields.email,
        token: token,
        salt: salt,
        hash: hash,
        account: { username: req.fields.username, phone: req.fields.phone }
      });

      await newUser.save();
      res.json({
        _id: newUser._id,
        token: newUser.token,
        account: newUser.account
      });
    } else {
      res.json({ message: "eMail deja existant" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Connexion a un compte existant
router.post("/create/user/log_in", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });
    if (user) {
      if (
        SHA256(req.fields.password + user.salt).toString(encBase64) ===
        user.hash
      ) {
        res.json({
          _id: user._id,
          token: user.token,
          account: user.account
        });
      } else {
        res.json({ error: "Non autorisé" });
      }
    } else {
      res.json({ error: "User not found" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
