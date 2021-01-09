require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const apiRespFn = require("./utils/apiResponseFormat");
const dbConn = require("./db/index");
const getUserFromToken = require("./repo/auth").getUserFromToken;

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const webRoot = require('./routes/webRoot');


const app = express()
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", (req,_,next) => {
  req.apiResp = apiRespFn;
  next();
});

app.use('/apis', async (req, res, next) => {
  try {
    let user = await getUserFromToken(req.headers.authorization);
    if (user && user.id) {
      req.user = user;
      req.apiResp = apiRespFn;
      next();
    }
  } catch (e) {
    apiRespFn(res,e,null);
  }
});

app.use('/', webRoot);
app.use('/api/auth', authRouter);
app.use('/apis/user', userRouter);

app.use(function (_, __, next) {
  next(createError(404));
});

app.listen(port, async () => {
  // dbConn.testConn();
  await dbConn.getConnection().sync();
  console.log(`Example app listening at http://localhost:${port}`)
})