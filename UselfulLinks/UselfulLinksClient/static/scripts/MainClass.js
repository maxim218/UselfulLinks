"use strict";

import PageWorker from "./PageWorker";
import AjaxSender from "./AjaxSender";
import Registration from "./Registration";
import Authorization from "./Authorization";
import AlertClass from "./AlertClass";
import RecordAdder from "./RecordAdder";

class MainClass {
    static getElement(elementNameParam) {
        const elementName = elementNameParam.toString();
        return document.getElementById(elementName);
    }

    constructor() {
        this.pageWorker = new PageWorker();
        this.addPagesToPageWorker();
        this.pageWorker.showPage("authorization");

        this.ajaxSender = new AjaxSender("http://my-links-server.herokuapp.com/");
        this.alert = new AlertClass();

        new Registration(this.pageWorker, this.ajaxSender, this.alert);
        new Authorization(this.pageWorker, this.ajaxSender, this.alert);
        new RecordAdder(this.pageWorker, this.ajaxSender, this.alert);
    }

    addPagesToPageWorker() {
        this.pageWorker.addPage("authorization");
        this.pageWorker.addPage("registration");
        this.pageWorker.addPage("recordspage");
    }
}


window.onload = function() {
    new MainClass();
};