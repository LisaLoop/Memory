// DATABASE JS
// var mongoose = require("mongoose"); //connects to mongoose
// mongoose.connect( process.env.MONGOLAB_URI ||
                      // process.env.MONGOHQ_URL || 
                      // "YOUR OWN LOCAL URL HERE" )

// mongoose.connect( process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "YOUR OWN LOCAL URL HERE" )
// module.exports.User = require("./user"); //export to book


//####################################################################################

// DATABASE JS
var mongoose = require("mongoose"); //connects to mongoose
mongoose.connect("mongodb://localhost/project-one"); //to database

// mongoose.connect( process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "YOUR OWN LOCAL URL HERE" )
module.exports.User = require("./user"); //export to book