const User = require("../Models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers.authorisation) {
      const user = await USer.findOne({
        token: req.headers.authorization.replace("Bearer ", "")
      });
      if (!user) {
        return res.json({ error: "Non autorisé" });
      } else {
        req.user = user;
        next();
      }
    } else {
      return res.json({ message: "Non autorisé" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = isAuthenticated;
