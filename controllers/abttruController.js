var path = require("path");
var db = require("../models");

module.exports = function (app) {
    //The following 3 direct page routes
    app.get("/home", function (req, res) {
        res.render(path.join(__dirname, "../views/main-page.handlebars"));
    });

    app.get("/profile", function (req, res) {
        res.render(path.join(__dirname, "../views/user-info.handlebars"));
    });

    app.get("/doctor", function (req, res) {
        db.nutriModel.findAll({
            attributes: ['patient_name', 'risk_factor', 'diet_option', 'diet_restriction', 'fav_recipe']
        }).then(nutriModel => {
            const hbsObj = {patients: nutriModel.map(x => x.dataValues)};
            console.log(hbsObj);
            res.render("patient", hbsObj);
        });
    });

    app.get("/api/nutriModel/:patient_name", function (req, res) {
        //User login process
        db.nutriModel.findAll({
            where: { patient_name: req.params.patient_name }
        }).then(nutriModel => {
            const hbsPatient = {patients: nutriModel.map(x => x.dataValues)};
            res.render("user-info", hbsPatient)
        })
    });

    app.post("/api/patient", function (req, res) {
        // Create an patient with the data available to us in req.body
        console.log("HELLO");
        console.log(req.body.newPatient);
        console.log("Patient Data:");
        console.log(JSON.stringify(req.body,null,2));
        db.nutriModel.create({
            patient_name: req.body.patient_name,
            password: "",
            fav_recipe: "",
            diet_option: req.body.diet_option,
            risk_factor: req.body.risk_factor,
            diet_restriction: req.body.diet_restriction,
        }).then(() => res.end());
    
    });

    app.get("/api/patient", function (req, res) {
        // Getting all the patients for the doctor
        db.nutriModel.findAll({}).then(function (dbPatients) {
            // res.json(dbPatients);
        });
    });

    app.put("/api/patient/fav-recipe/:id", function (req, res) {
        // Make a recipe your favorite with the data available to us in req.body
        db.nutriModel.update({
            fav_recipe: req.body.fav_recipe,
        }, {where: {id: req.params.id}
        }).then(function (recipeUpdate) {
            res.send(recipeUpdate);
        });
    });

    app.post("/api/patient/save-recipe/:id", function (req, res) {
        // Save a recipe with the data available to us in req.body
        db.savedRecipes.create({
            recipe: req.body.save_recipe,
            patient_id: req.params.id
        }).then(function (savedRecipe) {
            res.send(savedRecipe);
        });
    });

};