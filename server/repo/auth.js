const bcrypt = require("bcrypt");
const User = require("./../models/user");
const jwt = require('jsonwebtoken');
const moment = require("moment");


const cryptPassword =  password => {
  const salt =  bcrypt.genSaltSync(10);
  const hash  =  bcrypt.hashSync(password,salt);
  return hash;
};

const comparePassword = (plainPass, hash) => {
  const flag = bcrypt.compareSync(plainPass, hash);
  return flag;
};

module.exports = {
  getUserFromToken: async token => {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!!decoded) {
      console.log("🚀 ~ file: auth.js ~ line 22 ~ decoded", decoded)
      let expired = moment().diff(moment(decoded.expiry, "x"), 'days') > 0;
      if (expired) { throw new Error('Auth token expired please renew it.'); }
      let user = await User.findByPk(decoded.uid);
      if (user === null) throw new Error('Invalid Authorization token');
      return user;
    } else {
      throw new Error('Invalid Authorization token');
    }
  },
  login : async data => {
    const user = await User.findOne({ where: { email: data.email } });
    if (user === null) throw new Error("User not found with provided email.");
    const isPasswordMatch =  comparePassword(data.password, user.password);
    if (isPasswordMatch === false) throw new Error("Incorrect password.");

    const expiry = moment().add(5, "days").format("x"); 
    const token = jwt.sign({ uid: user.id, expiry }, process.env.JWT_SECRET);

    return {
      user,
      token
    };
  },
  registerUser: async data => {
    const encPass =  cryptPassword(data.password.toString());
    
    const [user, created] = await User.findOrCreate({ 
      where: { email: data.email},
      defaults: { 
        first_name: data.firstName,
        last_name: data.lastName,
        type: "user",
      }
    });
    
    if(!created) {
      throw new Error(`User with ${data.email} email exist.`);
    }

    user.password = encPass;
    await user.save();
    
    const expiry = moment().add(30, "day").format("x");
    const token =  jwt.sign({ uid: user.id, expiry }, process.env.JWT_SECRET);
    return {
      user,
      token
    };
  },
}