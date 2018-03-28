// $(document).ready(function () {
    console.log("patient-manager working!");
    var patientList = $(".patient-container");
    var patientContainer = $(".patient-container");
    var currentURL = window.location.origin;
    // getPatients();

    $(".add-patient").on('click', function(event) {
        event.preventDefault();
        alert("created new patient");
        var newPatient = {
            patient_name: $("#patient-name").val().trim(),
            password: "",
            fav_recipe: "",
            diet_option: $("#diet-factor").val().toLowerCase().trim(),
            risk_factor: $("#risk-factor").val().toLowerCase().trim(),
            diet_restriction: $("#diet-restriction").val().toLowerCase().trim(),
        };
          // Send the POST request.
          $.ajax("/api/patient", {
            type: "POST",
            data: newPatient
          }).then(function() {
 
              // Reload the page to get the updated list
              location.reload();
          });
    });

    function getPatients() {
        $.get("/doctor", function(data) {});
    }

    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must create a Patient before you can create a Post.");
        patientContainer.append(alertDiv);
    }
// });
