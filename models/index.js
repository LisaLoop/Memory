// DATABASE JS
var mongoose = require("mongoose"); //connects to mongoose
mongoose.connect("mongodb://localhost/project-one"); //to database

/* jc - for heroku deployment, make sure to include the location 'mongodb://localhost/project-one' to the below code */
// mongoose.connect( process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || mongodb://localhost/project-one )

module.exports.User = require("./user"); //export to book


