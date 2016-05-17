"use strict";


/********************************************
**          Browserify Dependencies        **
********************************************/
let $ = require("jquery");


let readDatabase;

function activateDeleteButtonEvents(){
    $(".deleteButton").click(function(e){
        let familyMemberKey = $($(e.currentTarget).closest("section")[0]).data("key");
        deleteFamilyMemFromFirebase(familyMemberKey);
    });
}

function deleteFamilyMemFromFirebase(myKey) {
    $.ajax({
        url: `https://callan-family.firebaseio.com/family/${myKey}/.json`,
        type: "DELETE"
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
    getLoadFunctionFromMain,
    activateDeleteButtonEvents
};