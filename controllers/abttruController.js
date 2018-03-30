var path = require("path");
var db = require("../models");
var expressValidator = require("express-validator");
let hbsObj;
module.exports = function (app) {


    app.get("/home", function (req, res) {
        res.render(path.join(__dirname, "../views/main-page.handlebars"));
    });

    app.post("/profile", function (req, res) {
        console.log(req.body);
        var userName = req.body.patient_name;
        req.session.user_name = userName;

        res.redirect('/profile');

    });



    app.get("/profile", function (req, res) {
        console.log("--------------------------");
        console.log(req);

        db.patient.belongsTo(db.healthStats, { foreignKey: 'id', constraints: false });
        db.patient.belongsTo(db.savedRecipes, { foreignKey: 'id', constraints: false });
        db.patient.findAll({
            where: { user_name: "JohnDoe" },
            include: [{ model: db.healthStats }, { model: db.savedRecipes }], // load all healthStats 
        }).then(patient => {
            // console.log(patient.map(x => x.dataValues));
            // console.log(patient.map(x => x.healthStat.dataValues))
            // console.log(patient.map(x => x.savedRecipe.dataValues))
            console.log(patient);
            let hbsPatient = { patients: patient.map(x => x.dataValues) };
            // console.log(hbsPatient);
            res.render("user-info", hbsPatient);
        }).catch(function (error) {
            console.log(error);
        });;
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

    app.get("/api/profile/fave-recipe/:id", function (req, res) {
        // Save a recipe with the data available to us in req.body
        db.savedRecipes.findAll({
            attributes: ['uri'],
            where: { patient_id: req.params.id }
        }).then(function (savedRecipe) {
            console.log(savedRecipe);
            $.ajax({
                url: req.body.recipe,
                method: "GET"
            }).done(function (res) {
                res.json()
            });
        });
    });

    // ******* DOCTOR ROUTES ******* //

    app.get("/doctor", function (req, res) {
        db.patient.belongsTo(db.healthStats, { foreignKey: 'id', constraints: false });
        db.patient.belongsTo(db.savedRecipes, { foreignKey: 'id', constraints: false });
        db.patient.findAll({
            include: [{ model: db.healthStats }, { model: db.savedRecipes }], // load all healthStats 
        }).then(patient => {
            let hbsPatient = { patients: patient.map(x => x.dataValues) };
            res.render("patient", hbsPatient);
        })
    });

    app.get("/patient/list", function (req, res) {
        db.patient.findAll({
        }).then(patient => {
            hbsObj = { patients: patient.map(x => x.dataValues) };
            console.log(hbsObj);
            res.render("patient", hbsObj);
        });
    });

    app.get("/api/patient/:patient_name", function (req, res) {
        db.patient.belongsTo(db.healthStats, { foreignKey: 'id', constraints: false });
        db.patient.belongsTo(db.savedRecipes, { foreignKey: 'id', constraints: false });
        db.patient.findAll({
            where: { user_name: "JohnDoe" },
            include: [{ model: db.healthStats }, { model: db.savedRecipes }], // load all healthStats 
        }).then(patient => {
            let hbsPatient = { patients: patient.map(x => x.dataValues) };
            res.render("patient", hbsPatient);
        })
    });

    app.post("/api/patient", function (req, res) {

        req.checkBody('patient_name', 'Username field cannot be empty.').notEmpty();
        req.checkBody('patient_name', 'Username must be between 4-15 characters long.').len(4, 15);
        const errors = req.validationErrors();

        if (errors) {
            console.log(`errors: ${JSON.stringify(errors)}`);
            res.render('patient', { errors: errors });
        } else {

            const patientName = req.body.patient_name;
            console.log('-------------------------------------------');
            console.log(req.body);

            // Create an patient with the data available to us in req.body
            db.patient.belongsTo(db.healthStats, { foreignKey: 'id', constraints: false });
            console.log("Patient Data:");
            console.log(JSON.stringify(req.body, null, 2));
            db.patient.create({
                patient_name: req.body.patient_name,
                user_name: 'default_username',
                password: 'default_password'
            }),
                db.healthStats.create({
                    patient_id: db.patient.id,
                    risk_factor: req.body.risk_factor,
                    diet_recommendation: req.body.diet_recommendation,
                    diet_restriction: req.body.diet_restriction
                }).then(() => {
                    res.redirect('/doctor')
                });
        }

    });

};