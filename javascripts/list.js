"use strict";


/********************************************
**          Browserify Dependencies        **
********************************************/
let $ = require("jquery"),
    deleteMem = require("./delete.js"),
    editMem = require("./edit.js");


function populateDom(data) {
let buildString = "";
let cardClass;
for (var member in data) {
    let familyMem = data[member];

    //Deciding whether or not user gets "child" class or "adult" class
    familyMem.age = parseInt(familyMem.age);
    let isAdult = false;
    if (familyMem.age >= 18) {
        isAdult = true;
    }

    if (isAdult) {
        cardClass = "adult";
    } else {
        cardClass = "child";
    }

    //Building the String
    buildString += `<section class="col-md-3 myFamCard ${cardClass}" data-key=${member}> <div class="row headerRow">`;
    buildString += `<div class="col-md-2"><button class="btn editButton" data-toggle="modal" data-target="#editMemberModal"><span class="glyphicon glyphicon-pencil"></span></button></div>`;
    buildString += `<div class="col-md-8"><h2>${familyMem.name} </h2></div>`;
    buildString += `<div class="col-md-2"><button class="btn deleteButton"><span class="glyphicon glyphicon-trash"></span></button></div></div>`;
    buildString += `<div class="memMoreInfo"><h5>Age: ${familyMem.age} </h5>`;
    buildString += `<h5>Gender: ${familyMem.gender}</h5></div>`;
    buildString += `<ul> <h4>Skills: </h4>`;
    for (var skill in familyMem.skills) {
        skill = familyMem.skills[skill];
        buildString += `<li> ${skill} </li>`;
        }
    buildString += `</ul></section>`;
    }
    $("#famMemContainer").html(buildString);
    hideEditAndDeleteButtons();
    activateFamCardHover();
    deleteMem.activateDeleteButtonEvents();
    editMem.activateEditButtonEvents();
}

function activateFamCardHover(){
    $(".myFamCard").hover(function(e){
        let mySelectedCard = e.currentTarget;
        showEditAndDeleteButtons(mySelectedCard);
    }, hideEditAndDeleteButtons);
}

function hideEditAndDeleteButtons() {
    $(".editButton").hide();
    $(".deleteButton").hide();
}

function showEditAndDeleteButtons(cardID) {
    $(cardID).find(".btn").show();
}

/********************************************
**             Browserify Exports          **
********************************************/
module.exports = {
    populateDom
};