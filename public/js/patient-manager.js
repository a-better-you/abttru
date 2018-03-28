$(document).ready(function () {
    console.log("patient-manager working!");
    var patientList = $(".patient-container");
    var patientContainer = $(".patient-container");
    var currentURL = window.location.origin;
    getPatients();

    $(document).on('click', ".add-patient", function (event) {
        alert('patient added!');
        event.preventDefault();

        patientName = $("#patient-name").val().trim();
        riskOption = $("#risk-factor").val().toLowerCase().trim();
        dietOption = $("#diet-factor").val().toLowerCase().trim();
        dietRestriction = $("#diet-restriction").val().toLowerCase().trim();
        addNewPatient();
    });


    function addNewPatient(event) {
        if (!patientName) {
            return;
        }
        createPatient({
            patient_name: patientName,
            fav_recipe: "",
            diet_option: dietOption,
            risk_factor: riskOption,
            diet_restriction: dietRestriction,
        });
    }


    function createPatient(patientInfo) {
        $.post("/api/patient", patientInfo)
            // .then(getPatients);
    }

    function createPatientRow(patientData) {
        console.log(patientData);

        var newDiv = $("<div>");
        newDiv.data("patient", patientData);
        newDiv.append("<div>" + patientData.patient_name + "</div>");
        newDiv.append("<div>" + patientData.risk_factor + "</div>");
        newDiv.append("<div>" + patientData.diet_restriction + "</div>");
        newDiv.append("<br>");

        return newDiv;
    }


    function getPatients() {
        $.get("/doctor", function (data) {
        });
    }

    function renderPatients(rows) {
        if (rows.length) {
            console.log(rows);
            patientList.prepend(rows);
        }
        else {
            renderEmpty();
        }
    }

    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must create a Patient before you can create a Post.");
        patientContainer.append(alertDiv);
    }
});
