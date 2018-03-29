// $(".add-patient").on('click', function (event) {
//     event.preventDefault();
//     var newPatient = {
//         patient_name: $("#patient-name").val().trim(),
//         password: "",
//         fave_recipe: "",
//         diet_option: $("#diet-factor").val().toLowerCase().trim(),
//         risk_factor: $("#risk-factor").val().toLowerCase().trim(),
//         diet_restriction: $("#diet-restriction").val().toLowerCase().trim(),
//     };
//     // Send the POST request.
//     $.ajax("/api/patient", {
//         type: "POST",
//         data: newPatient
//     }).then(function () {
//         // Reload the page to get the updated list
//         location.reload();
//     });
// });