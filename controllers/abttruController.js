var path = require("path");
var db = require("../models");
var expressValidator = require("express-validator");
let hbsObj;
let user_name;
let password;
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
            // $.ajax({
            //     url: recipeUri,
            //     method: "GET"
            // }).done(function (response) {
            //     console.log("Hello");
            // });
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

    app.get("/api/profile/save-recipe/:id", function (req, res) {
        patient.hasMany(savedRecipes)
        patient.belongsTo(savedRecipes, { as: 'patient_id', constraints: false })
        
        user.getRecipes() // gets you all recipes
        user.getFaveRecipe() // gets you only the favorite recipe
        
        patient.findAll({
            where: { user_name: req.params.user_name },
          include: [
            { model: savedRecipes }, // load all recipes
            { model: savedRecipes, as: 'savedRecipes' }, // load the savedRecipes.
            // Notice that the spelling must be the exact same as the one in the association
          ]
          }).then(patient => {
            let hbsPatient = { patients: patient.map(x => x.dataValues) };
            console.log(hbsPatient);
            // res.json(patient.map(x => x.dataValues));
            res.render("user-info", hbsPatient);
          })
        
    });

    // ******* DOCTOR ROUTES ******* //
    app.post("/doctor", function (req, res) {
        console.log(req.body);
        var userName = req.body.doctor_name;
        req.session.user_name = userName;
        console.log("----------------------");
        console.log(userName);
        db.doctor.findAll({
            where: {
                doctor_name: userName
            }
        }).then(function (response) {
            var doctorObj = response;
            console.log(doctorObj.length);
            if (doctorObj.length == 0) {
                res.redirect('/');
            }
            else {
                res.redirect('/doctor/form');
            }

        });


    });

    app.get("/doctor/form", function (req, res) {
        db.patient.belongsTo(db.healthStats, { foreignKey: 'id', constraints: false });
        db.patient.belongsTo(db.savedRecipes, { foreignKey: 'id', constraints: false });
        db.patient.findAll({
            include: [{ model: db.healthStats }, { model: db.savedRecipes }], // load all healthStats 
        }).then(patient => {
            let hbsPatient = { patients: patient.map(x => x.dataValues) };
            res.render("patient", hbsPatient);
        })
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

    app.post("/patient", function (req, res) {

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

            }).then((patients) => {
                let userId = patients.id;
                console.log(userId);
                db.healthStats.create({
                    patient_id: patients.id,
                    risk_factor: req.body.risk_factor,
                    diet_recommendation: req.body.diet_recommendation,
                    diet_restriction: req.body.diet_restriction
                }).then(() => {
                    res.redirect('/doctor/form')
                });
        
            })
        }
    });
};