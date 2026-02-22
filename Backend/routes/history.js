const router = require('express').Router();


router.get("/", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const history = [];
  if (fs.existsSync("data/history.json")) {
    const history = fs.readFileSync("data/history.json"); 
  }

  const userHistory = history.filter(
    h => h.userId === userId
  );
  res.json(userHistory);
});

module.exports = router;