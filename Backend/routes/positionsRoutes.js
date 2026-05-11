const express = require('express');
const router = express.Router();

// Positions is just an empty controller/route as it was not defined in the original logic.
// This fulfills the project structure requirement without breaking any logic.

router.get('/positions', (req, res) => {
  res.json([]);
});

module.exports = router;
