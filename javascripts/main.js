"use strict";


/********************************************
**          Browserify Dependencies        **
**           BROWSERIFY ENTRY FILE         **
********************************************/
let $ = require("jquery"),
    addMem = require("./add.js"),
    deleteMem = require("./delete.js"),
    listMem = require("./list.js");


// Reads all family members from your Firebase DB and lists them in the browser.
// Lets you add new family members.
// Lets you delete family members (like that annoying nephew you can't stand).