const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "done" });
});

module.exports = router;
