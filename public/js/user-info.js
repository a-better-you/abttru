$(document).ready(function () {
    let isModalShowing = false;
    const loginModal = $("#login-modal");
    $(function () {
        event.preventDefault();
        if (isModalShowing) return;
        isModalShowing = true;
        loginModal.attr({
            "class": "modal fade in",
            "style": "display: block"});
    });
});

const loginModal = $("#login-modal");
let isModalShowing = false;
let userName;
let userPw;
let thisId;
let riskOption;
let dietOption;
let dietRestriction;

// Sets a listener for closing the modal and resetting parameters
$(".close").on("click", function () {
    $(".name-input").empty();
    $(".id-input").empty();
    loginModal.attr({
        "class": "modal fade out",
        "style": "display: none"});
    isModalShowing = false;
});

$(".submit").on('click', function (event) {
    userName = $(".name-input").val().trim();
    userPw = $(".pw-input").val().trim();
    $.ajax({
        url: `/api/nutriModel/` + userName,
        method: "GET"
    }).done(function (response) {
        loginModal.attr({
            "class": "modal fade out",
            "style": "display: none"});
        isModalShowing = false;
        //dynamically creates a display of the user's data
        response.forEach(element => {
            var row = $("<div>");
            row.addClass("patient-data");
            row.append("<p> Name: " + element.patient_name + "</p>");
            row.append("<p> Health Concerns: " + element.risk_factor + "</p>");
            row.append("<p> Dietary Recommendations: " + element.diet_option + "</p>");
            row.append("<p> Dietary Restrictions: " + element.diet_restriction + "</p>");
            var recipeLink = $(`<a>`);
            recipeLink.attr({
                "href": element.fav_recipe,
                "target": "_blank"
            });
            recipeLink.text("This Recipe");
            var fav = $("<p> Favorite Recipe: " + "</p>" + "<br>");
            fav.append(recipeLink);
            row.append(fav);

            $(".patient-info").append(row);
            thisId = element.id;
            riskOption = element.risk_factor.toLowerCase().trim();
            dietOption = element.diet_option.toLowerCase().trim();
            dietRestriction = element.diet_restriction.toLowerCase().trim();
        });
    });
});


$(document).on('click', ".ingredient-1", function (event) {
    event.preventDefault();
    userQ = $("#user-input").val().trim();
    console.log(userQ);
    $.ajax({
        url: `https://api.edamam.com/search?q=${userQ}&app_id=76461587&app_key=b829a690de0595f2fa5b7cb02db4cd99&from=0&to=5&calories=591-722&Diet=${riskOption}&Health=${dietOption}`,
        method: "GET"
    }).done(function (response) {
        for (var i = 0; i < response.hits.length; i++) {
            console.log(response.hits[i])
            console.log(thisId);
            var row = $("<div class='col-md-4 recipe'>");
            var img = $("<img class='img-responsive'>");
            img.attr("src", response.hits[i].recipe.image);
            // row.append("<a class='btn' href=" + response.hits[i].recipe.url + ">" + 'Get Recipe' + "</a>");
            var recipeLink = $(`<a>`);
            recipeLink.attr("href", response.hits[i].recipe.url);
            recipeLink.text("Get Recipe");
            var saveLink = response.hits[i].recipe.uri;


            // make function
            var addFavBttn = $("<a>");
            addFavBttn.addClass("btn btn default fav-this");
            addFavBttn.attr("id", saveLink);
            addFavBttn.text("Fave This!");
            

            // make function
            var addSaveBttn = $("<a>");
            addSaveBttn.addClass("btn btn default save-this");
            addSaveBttn.attr("id", saveLink);
            addSaveBttn.text("Save This!");
            


            row.append(img);
            row.append("<p>" + response.hits[i].recipe.label + "</p>");
            row.append(addFavBttn);
            row.append(addSaveBttn);
            row.append(recipeLink);
            $("#recipe-area").prepend(row);
        }

        $(".fav-this").on('click', function (event) {
            uri = event.currentTarget.id;
            console.log(uri);
            console.log(thisId);
            var id = thisId;
            $.ajax({
                url: "api/patient/fav-recipe/" + id,
                method: "PUT",
                data: { fav_recipe: uri }
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
    });

});