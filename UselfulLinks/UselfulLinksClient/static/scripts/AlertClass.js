"use strict";

export default class AlertClass {
    constructor() {
        this.btn = document.getElementById("okBtn");
        this.text = document.getElementById("alertWindowText");
        this.w1 = document.getElementById("fonBox");
        this.w2 = document.getElementById("messageBox");
    }

    showMessage(messageParam, callback) {
        messageParam.toString();
        this.text.innerHTML = messageParam.toString();
        this.w1.hidden = false;
        this.w2.hidden = false;
        this.btn.onclick = () => {
            this.w1.hidden = true;
            this.w2.hidden = true;
            callback();
        };
    }
}