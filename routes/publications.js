const express = require("express");
const router = express.Router();
const Publications = require("..//models/Publications");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/publications", isAuthenticated, async (req, res) => {
  try {
    const newPublications = new Publications({
      title: req.fields.title,
      description: req.fields.description,
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
        account: req.user.account,
        _id: req.user._id
      }
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

const createFilters = req => {
  const filters = {};
  if (req.query.priceMin) {
    filters.price = {};
    filters.price.$gte = req.query.priceMin;
  }
  if (req.query.priceMax) {
    if (filters.price === undefined) {
      filters.price = {};
    }
    filters.price.$lte = req.query.priceMax;
  }

  if (req.query.title) {
    filters.title = new RegExp(req.query.title, "i");
  }
  return filters;
};
router.get("/publications/with_count", async (req, res) => {
  const filters = createFilters(req);

  const search = Publications.find(filters).populate("category");
  if (req.query.sort === "price-asc") {
    search.sort({ price: 1 });
  } else if (req.query.sort === "price-desc") {
    search.sort({ price: -1 });
  }

  if (req.query.page) {
    const page = req.query.page;
    const limit = 4;
    search.limit(limit).skip(limit * (page - 1));
  }

  const products = await search;
  res.json(products);
});

module.exports = router;
