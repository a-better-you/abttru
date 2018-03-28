// // *********************************************************************************
// // html-routes.js - this file offers a set of routes for sending users to the various html pages
// // *********************************************************************************

// // Dependencies
// // =============================================================
var path = require("path");

// // Routes
// // =============================================================
module.exports = function (app) {

    //     // Each of the below routes just handles the HTML page that the user gets sent to.

    //     // index route loads view.html

    // admin route loads admin.html
    app.get("/admin", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/patient.html"));
    });

    //    recipe route loads recipes.html
    app.get("/recipes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/recipes.html"));
    });

    app.get("/patient", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/patient.html"));
    });

    app.get("/profile", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/user-info.html"));
    });
};