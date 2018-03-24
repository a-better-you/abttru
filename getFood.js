
var user;
var ingredient = [];
var calories = [];
var diet = [];
var health = [];

$(function() {
    function getFoodInfo(WhatTheCallerSaysTheFoodIs) {
        $.ajax({
            url: 'https://api.edamam.com/search?q=chicken&app_id=de3dbbb9&app_key=6634bfb343a14731acccaea9e1d029bd&from=0&to=3&calories=591-722&Diet=low-carb',
            method: "GET"
        }).done(function(response) {
           console.log(response);
        });
    }

    getFoodInfo();

});