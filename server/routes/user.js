const express = require('express');
const router = express.Router();

// const authRepo = require("./../repo/auth");

router.get("/me", async (req, res) => {
  try {
    req.apiResp(res, null, { user: req.user});
  } catch (error) {
    req.apiResp(res, error, null);
  }
});

module.exports = router;