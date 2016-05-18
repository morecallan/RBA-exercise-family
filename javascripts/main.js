"use strict";


/********************************************
**          Browserify Dependencies        **
**           BROWSERIFY ENTRY FILE         **
********************************************/
let $ = require("jquery"),
    addMem = require("./add.js"),
    deleteMem = require("./delete.js"),
    listMem = require("./list.js"),
    editMem = require("./edit.js");




// Reads all family members from your Firebase DB and lists them in the browser.
// Lets you add new family members.
// Lets you delete family members (like that annoying nephew you can't stand).
function loadUpMySongsFromFirebase() {
    $.ajax({
        url: `https://callan-family.firebaseio.com/family/.json`
    }).done(function(data){
        listMem.populateDom(data);
    });
}

loadUpMySongsFromFirebase();
addMem.getLoadFunctionFromMain(loadUpMySongsFromFirebase);
deleteMem.getLoadFunctionFromMain(loadUpMySongsFromFirebase);
editMem.getLoadFunctionFromMain(loadUpMySongsFromFirebase);

//When user first lands on the page, show member list and add button in top nav
//Clicking on the add button brings up modal

