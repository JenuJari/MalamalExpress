const express = require('express');
const router = express.Router();

router.post("/", (_, res) => {
  res.send("hello world");
});

module.exports = router;