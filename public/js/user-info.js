let this_id = $("#1").data().value;
let risk_factor = $("#2").data().value;
let diet_option = $("#3").data().value;
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
    console.log(diet_option);
    console.log(diet_restriction);
    console.log(fave_recipe);
    $.ajax({
        url: `https://api.edamam.com/search?q=${userQ}&app_id=76461587&app_key=b829a690de0595f2fa5b7cb02db4cd99&from=0&to=5&calories=591-722&Diet=${risk_factor}&Health=${diet_option}`,
        method: "GET"
    }).done(function (response) 
    {

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
        // let activeCaption = $("<h3>").text(response.hits[0].recipe.label);

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
        // addFavBttn.addClass("btn btn default fav-this");
        addFavBttn.attr({
            "id": saveLink,
            "class": "btn btn-info fave-this",
            "role": "button"
        });
        addFavBttn.text("Fave This!");
        // make function
        var addSaveBttn = $("<a>");
        // addSaveBttn.addClass("btn btn default save-this");
        addSaveBttn.attr({
            "id": saveLink,
            "class": "btn btn-info save-this",
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

        createPlots(responseObject, 0);
        // populate our slider with text content

      
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

        var itemCaption = $(`<a>`);
        itemCaption.attr({
            "href": response.hits[i].recipe.url,
            "class": "btn btn-info",
            "role": "button"
        });
        itemCaption.text(response.hits[i].recipe.label);


        var saveLink = response.hits[i].recipe.uri;

        // make function
        var addFavBttn = $("<a>");
        // addFavBttn.addClass("btn btn default fav-this");
        addFavBttn.attr({
            "id": saveLink,
            "class": "btn btn-info fav-this",
            "role": "button"
        });
        addFavBttn.text("Fave This!");


        // make function
        var addSaveBttn = $("<a>");
        // addSaveBttn.addClass("btn btn default save-this");
        addSaveBttn.attr({
            "id": saveLink,
            "class": "btn btn-info save-this",
            "role": "button"
        });
        addSaveBttn.text("Save This!");

        itemDiv.append(itemCaption);
        itemDiv.append(itemImg);

        itemDiv.append(addSaveBttn);

        itemDiv.append(addFavBttn);

        $("#item-list").append(itemDiv);


    });
    // let activeDiv = $(".item active");
    console.log($(`#item-active`).hasClass("active"));
});
    

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

// $("#0").addClass("active");

$(".fav-this").on('click', function (event) {
    uri = event.currentTarget.id;
    console.log(uri);
    console.log(thisId);
    var id = thisId;
    $.ajax({
        url: "api/patient/fav-recipe/" + id,
        method: "PUT",
        data: { fave_recipe: uri }
    }).done(function (response) {
        console.log(response);
    });

});

$(".save-this").on('click', function (event) {
    uri = event.currentTarget.id;
    console.log(uri);
    console.log(thisId);
    var id = thisId;
    $.ajax({
        url: "api/patient/save-recipe/" + id,
        method: "POST",
        data: { save_recipe: uri }
    }).done(function (response) {
        console.log(response);
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
    }
    let thirdPlot = {
        values: [],
        labels: []
    }
    let fourthPlot = {
        values: [],
        labels: []
    }

    arrayDigest.forEach((nutrient, i) => {
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
        }

        // else if (nutrient.label != "Cholesterol" & nutrient.label != "Folate equivalent (total)" & nutrient.label != "Folate (food)") {
        //     console.log(nutrient);
        //     console.log(arrayDigest.slice(1, 5));
        //     thirdPlot.values.push(nutrient.daily / reciYield);
        //     thirdPlot.labels.push(nutrient.label);

        // }
        else if (i > 3 & i < 11) {
            console.log(nutrient, i);
            // console.log(arrayDigest.slice(1, 5));
            thirdPlot.values.push(nutrient.daily / reciYield);
            thirdPlot.labels.push(nutrient.label);

        }
        else if (i > 10 & i < 24) {
            console.log(nutrient, i);
            // console.log(arrayDigest.slice(1, 5));
            fourthPlot.values.push(nutrient.daily / reciYield);
            fourthPlot.labels.push(nutrient.label);

        }

    });
    // console.log(secondPlot);
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
    }, {
        values: thirdPlot.values,
        labels: thirdPlot.labels,
        domain: {
            x: [.3, .48]
        },
        name: 'GHG Emissions',
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
    }, {
        values: fourthPlot.values,
        labels: fourthPlot.labels,
        text: 'CO2',
        textposition: 'inside',
        domain: { x: [.52, 1] },
        name: 'CO2 Emissions',
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
    }];

    var data2 = [{
        values: thirdPlot.values,
        labels: thirdPlot.labels,
        domain: {
            x: [0, .48]
        },
        name: 'GHG Emissions',
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
    }, {
        values: fourthPlot.values,
        labels: fourthPlot.labels,
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
        height: 800,
        width: 600,
        grid: {
            ygap: 0.8
        }
    };

    var layout2 = {
        title: 'Macros and Fat Distribution',
        legend: {
            "orientation": "h"
        },
        height: 600,
        width: 550,
        grid: {
            ygap: 0.8
        }
    };


    Plotly.newPlot('tester', data, layout);
    // Plotly.newPlot('tester-2', data2, layout2);

}

