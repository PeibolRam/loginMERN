const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
require('dotenv').config({ path: './env' });

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, (err) => {
	if (err) {
		console.log('Conectate a mongo primero');
		return err;
	}
	console.log('Conectado a MongoDB');
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
