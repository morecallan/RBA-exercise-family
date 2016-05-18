"use strict";


/********************************************
**          Browserify Dependencies        **
********************************************/
let $ = require("jquery");


let readDatabase;

function activateEditButtonEvents(){
    $(".editButton").click(function(e){
        let familyMemberKey = $($(e.currentTarget).closest("section")[0]).data("key");
        $("#editFamilyMemberComplete").data("memkey", familyMemberKey);
        getOneFamilyMemFromFirebase(familyMemberKey);
    });
}


function getOneFamilyMemFromFirebase(myKey) {
    $.ajax({
        url: `https://callan-family.firebaseio.com/family/${myKey}/.json`
    }).done(function(data){
        fillEditValues(data);
    });
}

function fillEditValues(data){
    $("#memberNameEdit").val(data.name);
    $("#memberAgeEdit").val(data.age);
    $("#memberGenderEdit").val(data.gender);
    $("#memberSkillsEdit").val(data.skills.join(",\ "));
}

//When the user types in any field, check to see if all have something other than an empty string in them.
$("#editFamilyMemberComplete").addClass("disabled");
$("#memberNameEdit").keyup(checkToSeeIfFieldsHaveBeenFilledOut);
$("#memberAgeEdit").keyup(checkToSeeIfFieldsHaveBeenFilledOut);
$("#memberSkillsEdit").keyup(checkToSeeIfFieldsHaveBeenFilledOut);

//If all fields are filled out, show "Edit" button
function checkToSeeIfFieldsHaveBeenFilledOut() {
    if ($("#memberNameEdit").val() !== "" && $("#memberAgeEdit").val() !== "" && $("#memberSkillsEdit").val() !== "") {
        $("#editFamilyMemberComplete").removeClass("disabled");
    }
}

$("#editFamilyMemberComplete").click(createEditedFamilyMemberObject);

//When the user clicks on the "Edit - Done" button, all their values are passed into a JSON object and sent to Firebase.
function createEditedFamilyMemberObject(e) {
    let myKey = $(e.currentTarget).data("memkey");
    let memberNameEdited = $("#memberNameEdit").val();
    let memberAgeEdited = $("#memberAgeEdit").val();
    let memberGenderEdited = $("#memberGenderEdit").val();
    let memberSkillsArrayEdited = $("#memberSkillsEdit").val().split(", ");

    let newFamilyMemberObject = JSON.stringify({
      "name": memberNameEdited,
      "age": memberAgeEdited,
      "gender": memberGenderEdited,
      "skills": memberSkillsArrayEdited
    });

    editFamilyMemInFirebase(myKey, newFamilyMemberObject);
    $("#editFamilyMemberComplete").data("memkey", "");
    clearModalFields();
}

function editFamilyMemInFirebase(myKey, myDataObj) {
    $.ajax({
        url: `https://callan-family.firebaseio.com/family/${myKey}/.json`,
        type: "PUT",
        data: myDataObj
    }).done(function(data){
        readDatabase();
    });
}

//Fields are cleared out when user submits form on modal.
function clearModalFields() {
    $("#memberNameEdit").val("");
    $("#memberAgeEdit").val("");
    $("#memberGenderEdit").val("");
    $("#memberSkillsEdit").val("");
    $("#editFamilyMemberComplete").addClass("disabled");
}

function getLoadFunctionFromMain(callbackFunc) {
    readDatabase = callbackFunc;
}

/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
    getLoadFunctionFromMain,
    activateEditButtonEvents
};