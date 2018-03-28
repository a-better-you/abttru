
$(document).ready(function () {
    $(function() {
        $.ajax({
            url: `/api/nutriModel`,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            response.forEach(element => {
                var recipeName = "This recipe";
                var row = $("<div>");
                row.addClass("patient-data");
                row.append("<p> Name: " + element.patient_name + "</p>");
                row.append("<p> Health Concerns: " + element.risk_factor + "</p>");
                row.append("<p> Dietary Recommendations: " + element.diet_option + "</p>");
                row.append("<p> Dietary Restrictions: " + element.diet_restriction + "</p>" + "<br>");
                $(".patient-info").append(row);
            });
        });
    });
});