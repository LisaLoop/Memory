  //dependencies
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

  // score schema 
  var Score = new Schema({
    points: Number,
    time: Number,
    user: object_id
    createdAt: {type: Date, default: Date.now()}
  });