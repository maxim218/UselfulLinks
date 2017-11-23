"use strict";

export default class PageWorker {
    constructor() {
        this.pages = {};

        this.textFieldsArray = [];

        this.textFieldsArray.push(document.getElementById("t11"));
        this.textFieldsArray.push(document.getElementById("t22"));
        this.textFieldsArray.push(document.getElementById("t111"));
        this.textFieldsArray.push(document.getElementById("t222"));
        this.textFieldsArray.push(document.getElementById("t444"));
        this.textFieldsArray.push(document.getElementById("t555"));
        this.textFieldsArray.push(document.getElementById("t666"));

        this.clearAllTextFields();
    }

    clearAllTextFields() {
        for(let i = 0; i < this.textFieldsArray.length; i++) {
            this.textFieldsArray[i].value = "";
        }
    }

    addPage(pageNameParam) {
        const pageName = pageNameParam.toString();
        const pageObj = document.getElementById(pageName);
        this.pages[pageName] = pageObj;
    }

    hidePages() {
        for(let key in this.pages) {
            this.pages[key].hidden = true;
        }
    }

    showPage(pageNameParam) {
        const pageName = pageNameParam.toString();
        this.hidePages();
        this.pages[pageName].hidden = false;
        this.clearAllTextFields();
    }
}