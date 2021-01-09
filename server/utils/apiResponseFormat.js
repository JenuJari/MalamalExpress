module.exports = (res, err,data) => {
  
  if(!!err) {
    console.log(err);
    
    res.status(400);
    res.send(err.message || "");
  }

  res.send({data});
};