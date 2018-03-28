const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

const app = express();

var db = require("./models");
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
// const exphbs = require("express-handlebars");

// app.engine("hbs", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "hbs");
// // app.use(routes);
// require('./controllers/recipeController.js')(app);
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);
// Start our server so that it can begin listening to client requests.
// 

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
});
