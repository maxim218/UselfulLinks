"use strict";

export default class AjaxSender {
    constructor(basicUrlParam) {
        this.basicUrl = basicUrlParam.toString();
    }

    sendGet(urlTail, resultObj, callback) {
        let randNumber = Math.random();
        if(randNumber < 0) {
            randNumber = randNumber * (-1);
        }
        urlTail += ("/" + randNumber.toString());

        console.log("GET");
        console.log("URL: " + this.basicUrl + urlTail.toString());
        console.log("____________________________");

        let r = new XMLHttpRequest();
        r.open("GET", this.basicUrl + urlTail.toString(), true);
        r.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        r.send(null);
        r.onreadystatechange = function() {
            if(r.readyState === 4 && r.status === 200) {
                resultObj.result = r.responseText + "";
                r = null;
                callback();
            }
        }
    }

    sendPost(urlTail, bodyString, resultObj, callback) {
        let randNumber = Math.random();
        if(randNumber < 0) {
            randNumber = randNumber * (-1);
        }
        urlTail += ("/" + randNumber.toString());

        console.log("POST");
        console.log("URL: " + this.basicUrl + urlTail.toString());
        console.log("BODY: " + bodyString.toString());
        console.log("____________________________");

        let r = new XMLHttpRequest();
        r.open("POST", this.basicUrl + urlTail.toString(), true);
        r.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        r.send(bodyString.toString());
        r.onreadystatechange = function() {
            if(r.readyState === 4 && r.status === 200) {
                resultObj.result = r.responseText + "";
                r = null;
                callback();
            }
        }
    }
}
