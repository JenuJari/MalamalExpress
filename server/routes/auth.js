const express = require('express');
const router = express.Router();

const authRepo = require("./../repo/auth");

router.post("/register", async (req,res) => {
  try {
    const { token, user } = await authRepo.registerUser(req.body);
    req.apiResp(res,null,{ token, user });
  } catch (error) {
    req.apiResp(res,error,null);
  }
});

router.post("/login", async (req,res) => {
  try {
    const { token, user } = await authRepo.login(req.body);
    req.apiResp(res,null,{ token, user });
  } catch (error) {
    req.apiResp(res,error,null);
  }
});

module.exports = router;