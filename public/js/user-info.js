// $(document).ready(function () {
    // let isModalShowing = false;
    // const loginModal = $("#login-modal");
    // $(function () {
    //     event.preventDefault();
    //     if (isModalShowing) return;
    //     isModalShowing = true;
    //     loginModal.attr({
    //         "class": "modal fade in",
    //         "style": "display: block"});
    // });
// });

let this_id = $("#1").data().value;
let risk_factor = $("#2").data().value;
let diet_option = $("#3").data().value;
let diet_restriction = $("#4").data().value;

$(".search").on('click', function(event) {
    event.preventDefault();
    userQ = $("#user-input").val().trim();
    console.log(userQ);
    console.log(risk_factor);
    console.log(diet_option);
    console.log(diet_restriction);
    $.ajax({
        url: `https://api.edamam.com/search?q=${userQ}&app_id=76461587&app_key=b829a690de0595f2fa5b7cb02db4cd99&from=0&to=5&calories=591-722&Diet=${risk_factor}&Health=${diet_option}`,
        method: "GET"
    }).done(function (response) {
        for (var i = 0; i < response.hits.length; i++) {
            console.log(response.hits[i])
            console.log(this_id);
            var row = $("<div class='col-md-4 recipe'>");
            var img = $("<img class='img-responsive'>");
            img.attr("src", response.hits[i].recipe.image);
            // row.append("<a class='btn' href=" + response.hits[i].recipe.url + ">" + 'Get Recipe' + "</a>");
            var recipeLink = $(`<a>`);
            recipeLink.attr("href", response.hits[i].recipe.url);
            recipeLink.text("Get Recipe");
            var saveLink = response.hits[i].recipe.uri;


            // make function
            var addFaveBttn = $("<a>");
            addFaveBttn.addClass("btn btn default fave-this");
            addFaveBttn.attr("id", saveLink);
            addFaveBttn.text("Fave This!");
            

            // make function
            var addSaveBttn = $("<a>");
            addSaveBttn.addClass("btn btn default save-this");
            addSaveBttn.attr("id", saveLink);
            addSaveBttn.text("Save This!");
            


            row.append(img);
            row.append("<p>" + response.hits[i].recipe.label + "</p>");
            row.append(addFaveBttn);
            row.append(addSaveBttn);
            row.append(recipeLink);
            $("#recipe-area").prepend(row);
        }

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

});