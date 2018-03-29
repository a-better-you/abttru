let this_id = $("#1").data().value;
let risk_factor = $("#2").data().value;
let diet_recommendation = $("#3").data().value;
let diet_restriction = $("#4").data().value;
let fave_recipe = $("#5").data().value;
let responseObject;
let id;
let nextSlide = 0;

$(".search").on('click', function (event) {
    event.preventDefault();
    userQ = $("#user-input").val().trim();
    console.log(userQ);
    console.log(risk_factor);
    console.log(diet_recommendation);
    console.log(diet_restriction);
    console.log(fave_recipe);
    $.ajax({
        url: `https://api.edamam.com/search?q=${userQ}&app_id=76461587&app_key=b829a690de0595f2fa5b7cb02db4cd99&from=0&to=5&calories=591-722&Diet=${risk_factor}&Health=${diet_recommendation}`,
        method: "GET"
    }).done(function (response) {

        responseObject = response;
        // console.log(response);
        // console.log(responseObject);
        // we create indicators - we will target this 
        // in the for loop with <li> items
        let itemActive = $("#item-active");

        var activeImg = $("<img>").attr({
            "src": response.hits[0].recipe.image,
            "data-id": 0,
            "class": "img-responsive"
        });

        var activeCaption = $(`<a>`);
        activeCaption.attr({
            "href": response.hits[0].recipe.uri,
            "class": "btn btn-info",
            "role": "button"
        });
        activeCaption.text(response.hits[0].recipe.label);

        var saveLink = response.hits[0].recipe.uri;

        // make function
        var addFavBttn = $("<a>");
        addFavBttn.addClass("btn btn default fav-this");
        addFavBttn.attr({
            "id": saveLink,
            "class": "btn btn-info",
            "role": "button"
        });
        addFavBttn.text("Fave This!");

        // make function
        var addSaveBttn = $("<a>");
        addSaveBttn.addClass("btn btn default save-this");
        addSaveBttn.attr({
            "id": saveLink,
            "class": "btn btn-info",
            "role": "button"
        });
        addSaveBttn.text("Save This!");

        // let activeImg = $("<img src = 'response.hits[0].recipe.image' alt = 'recipe'>");
        itemActive.append(activeCaption);
        itemActive.append(activeImg);
        itemActive.append(addSaveBttn);
        itemActive.append(addFavBttn);

        $('.carousel').carousel("pause");
        $("#panel-slider").show();

        console.log(response.hits[0].recipe.image);
        console.log(response.hits[1].recipe.image);
        // start of plotly code
        id = 1;
        responseObject = response;
        createPlots(responseObject, 0);

        for (let i = 1; i < response.hits.length; i++) {

            console.log(response.hits[i])
            console.log(this_id);
            // var itemDiv = $("<div class='col-md-4 recipe'>");
            // var img = $("<img class='img-responsive'>");
            // img.attr("src", response.hits[i].recipe.image);
            // itemDiv.append("<a class='btn' href=" + response.hits[i].recipe.url + ">" + 'Get Recipe' + "</a>");
            var recipeLink = $(`<a>`);
            recipeLink.attr("href", response.hits[i].recipe.url);
            recipeLink.text("Get Recipe");

            // console.log(response.hits[i])
            let itemDiv = $("<div class='col-md-4 recipe'>").attr({
                class: "item",
                "data-id": i
            });

            var itemImg = $("<img>").attr({
                "src": response.hits[i].recipe.image,
                "id": "image" + i,
                "class": "img-responsive"
            });

            // let itemCaption = $("<h3>").text(response.hits[0].recipe.label);

            var itemCaption = $(`<a>`);
            itemCaption.attr({
                "href": response.hits[0].recipe.url,
                "class": "btn btn-info",
                "role": "button"
            });
            itemCaption.text(response.hits[0].recipe.label);

            saveLink = response.hits[i].recipe.uri;
            // make function
            addFaveBttn = $("<a>");
            addFaveBttn.addClass("btn btn-default fave-this");
            addFaveBttn.attr("id", saveLink);
            addFaveBttn.text("Fave This!");


            // make function
            addSaveBttn = $("<a>");
            addSaveBttn.addClass("btn btn-default save-this");
            addSaveBttn.attr("id", saveLink);
            addSaveBttn.text("Save This!");

            itemDiv.append(itemCaption);
            itemDiv.append(itemImg);
            // itemDiv.append("<p>" + response.hits[i].recipe.label + "</p>");
            itemDiv.append(addFaveBttn);
            itemDiv.append(addSaveBttn);
            itemDiv.append(recipeLink);
            $("#item-list").prepend(itemDiv);
        }

        // let activeDiv = $(".item active");
        console.log($(`#item-active`).hasClass("active"));

        $(".right").on('click', function (event) {
            console.log('right clicked modafoca!');
            nextSlide++;
            if (nextSlide > 4) {
                nextSlide = 0;
                createPlots(responseObject, nextSlide);
            }
            // console.log(nextSlide);
            createPlots(responseObject, nextSlide);
        });

        $(".left").on('click', function (event) {
            console.log('right clicked modafoca!');
            nextSlide--;
            if (nextSlide < 0) {
                nextSlide = 4;
                createPlots(responseObject, nextSlide);
            }
            // console.log(nextSlide);
            createPlots(responseObject, nextSlide);
        });

        $(".fave-this").on('click', function (event) {
            uri = event.currentTarget.id;
            console.log(uri);
            console.log(this_id);
            var id = this_id;
            $.ajax({
                url: "api/profile/fave-recipe/" + id,
                method: "PUT",
                data: { fav_recipe: uri }
            }).done(function (response) {
                console.log(response);
            });

        });

        $(".save-this").on('click', function (event) {
            uri = event.currentTarget.id;
            console.log(uri);
            console.log(this_id);
            var id = this_id;
            $.ajax({
                url: "api/profile/save-recipe/" + id,
                method: "POST",
                data: { save_recipe: uri }
            }).done(function (response) {
                console.log(response);
            });
        });
    });

    function createPlots(response, i) {
        let arrayDigest = response.hits[i].recipe.digest;
        let reciYield = response.hits[i].recipe.yield;

        let servingArray = [];
        let firstPlot = {
            values: [],
            labels: []
        };

        let secondPlot = {
            values: [],
            labels: []
        };

        let thirdPlot = {
            x: [],
            y: [],
            marker: {
                color: ['#64609A', '#933709', '#14A989', '#469A84', '#D05340', '#436CB9', '#469496', '#3AA8C1', '#353839', '#ABAD48', '#B07080', '#BD559C', '#AA4069', '#2D5DA1', '#832A0D', '#B56917', '#E97451', '#C62D42']
            }
        };

        arrayDigest.forEach(nutrient => {
            // console.log(nutrient);
            // push nutrient servings for each nutrient
            if (nutrient.label === "Fat" || nutrient.label === "Carbs" || nutrient.label === "Protein") {
                firstPlot.values.push(nutrient.total / reciYield);
                firstPlot.labels.push(nutrient.label);

                if (nutrient.label === "Fat") {
                    nutrient.sub.forEach(fat => {
                        secondPlot.values.push(fat.total / reciYield);
                        secondPlot.labels.push(fat.label);
                    })
                }

            } else if (nutrient.label != "Cholesterol" & nutrient.label != "Folate equivalent (total)" & nutrient.label != "Folate (food)") {
                thirdPlot.x.push(nutrient.daily / reciYield);
                thirdPlot.y.push(nutrient.label);
            }
        });
        console.log(secondPlot);
        // console.log(plotObject);

        // process nutrition data
        let totalNutrients = response.hits[1].recipe.digest;

        // calculate totalNutrient per serving for our recipe
        for (var key in totalNutrients) {
            if (totalNutrients.hasOwnProperty(key)) {
                var val = totalNutrients[key];
                var perServing = val.quantity / 8;

            }
        }

        // populate the website with beautiful plots
        var data = [{
            values: firstPlot.values,
            labels: firstPlot.labels,
            domain: {
                x: [0, .48]
            },
            name: 'GHG Emissions',
            hoverinfo: 'label+percent+name',
            hole: .4,
            type: 'pie'
        }, {
            values: secondPlot.values,
            labels: secondPlot.labels,
            text: 'CO2',
            textposition: 'inside',
            domain: { x: [.52, 1] },
            name: 'CO2 Emissions',
            hoverinfo: 'label+percent+name',
            hole: .4,
            type: 'pie'
        }];

        var layout = {
            title: 'Macros and Fat Distribution',
            legend: {
                "orientation": "h"
            },
            height: 375,
            width: 550,
            grid: {
                ygap: 0.8
            }
        };

        Plotly.newPlot('tester', data, layout);
    }
});
