"use strict";


/********************************************
**          Browserify Dependencies        **
********************************************/
let $ = require("jquery");

let readDatabase;

//When the user types in any field, check to see if all have something other than an empty string in them.
$("#addFamilyMemberComplete").addClass("disabled");
$("#memberName").keyup(checkToSeeIfFieldsHaveBeenFilledOut);
$("#memberAge").keyup(checkToSeeIfFieldsHaveBeenFilledOut);
$("#memberSkills").keyup(checkToSeeIfFieldsHaveBeenFilledOut);

//If all fields are filled out, show "Add" button
function checkToSeeIfFieldsHaveBeenFilledOut() {
    if ($("#memberName").val() !== "" && $("#memberAge").val() !== "" && $("#memberSkills").val() !== "") {
        $("#addFamilyMemberComplete").removeClass("disabled");
    }
}

$("#addFamilyMemberComplete").click(createNewFamilyMemberObject);

//When the user clicks on the "Add" button, all their values are passed into a JSON object and sent to Firebase.
function createNewFamilyMemberObject() {
    let memberName = $("#memberName").val();
    let memberAge = $("#memberAge").val();
    let memberGender = $("#memberGender").val();
    let memberSkillsArray = $("#memberSkills").val().split(", ");

    let newFamilyMemberObject = JSON.stringify({
      "name": memberName,
      "age": memberAge,
      "gender": memberGender,
      "skills": memberSkillsArray
    });

    addFamilyMemberToDatabase(newFamilyMemberObject);
    clearModalFields();
    return createNewFamilyMemberObject;
}

//Fields are cleared out when user submits form on modal.
function clearModalFields() {
    $("#memberName").val("");
    $("#memberAge").val("");
    $("#memberGender").val("");
    $("#memberSkills").val("");
    $("#addFamilyMemberComplete").addClass("disabled");
}

//JSON object for new model is sent to database
function addFamilyMemberToDatabase(newFamilyMemberObject) {
    $.ajax({
    type: "POST",
    url: `https://callan-family.firebaseio.com/family/.json`,
    data: newFamilyMemberObject,
    }).done(function(data){
        readDatabase();
    });
}

function getLoadFunctionFromMain(callbackFunc) {
    readDatabase = callbackFunc;
}

/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
    getLoadFunctionFromMain
};