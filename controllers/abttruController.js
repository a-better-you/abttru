var path = require("path");
var db = require("../models");

module.exports = function (app) {
    app.get("/home", function (req, res) {
        res.render(path.join(__dirname, "../views/main-page.handlebars"));
    });

    app.get("/profile", function (req, res) {
        db.nutriModel.findAll({
            where: {id: 2}
        }).then(nutriModel => {
            let hbsPatient = {patients: nutriModel.map(x => x.dataValues)};
            console.log(hbsPatient);
            // res.json(nutriModel.map(x => x.dataValues));
            res.render("user-info", hbsPatient);
        })
    });

    app.get("/api/profile/:id", function (req, res) {
        //User login process
        db.nutriModel.findAll({
            where: {id: req.params.id}
        }).then(nutriModel => {
            const hbsPatient = {patients: nutriModel.map(x => x.dataValues)};
            res.render("user-info", hbsPatient)
        })
    });

    app.put("/api/profile/fave-recipe/:id", function (req, res) {
        // Make a recipe your favorite with the data available to us in req.body
        db.nutriModel.update({
            fav_recipe: req.body.fav_recipe,
        }, {where: {id: req.params.id}
        }).then(function (recipeUpdate) {
            res.send(recipeUpdate);
        });
    });

    app.post("/api/profile/save-recipe/:id", function (req, res) {
        // Save a recipe with the data available to us in req.body
        db.savedRecipes.create({
            recipe: req.body.save_recipe,
            patient_id: req.params.id
        }).then(function (savedRecipe) {
            res.send(savedRecipe);
        });
    });

    app.get("/api/profile/save-recipe/:id", function (req, res) {
        // Save a recipe with the data available to us in req.body
        db.savedRecipes.findAll({
            attributes:['recipe'],
            where: {patient_id: req.params.id}
        }).then(function (savedRecipe){
            console.log(savedRecipe);
            $.ajax({
                url: `https://api.edamam.com/search?q=${userQ}&app_id=76461587&app_key=b829a690de0595f2fa5b7cb02db4cd99&from=0&to=5&calories=591-722&Diet=${risk_factor}&Health=${diet_option}`,
                method: "GET"
            }).done(function(response) {
                res.json()
            });
        });
    });

    // ******* DOCTOR ROUTES ******* //

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

};