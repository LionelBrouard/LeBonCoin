const User = require("../Models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const user = await User.findOne({
        token: req.headers.authorization.replace("Bearer ", "")
      });
      if (!user) {
        return res.json({ error: "Non autorisé 2" });
      } else {
        req.user = user;
        next();
      }
    } else {
      return res.json({ message: "Non autorisé 3" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = isAuthenticated;
