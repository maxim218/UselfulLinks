"use strict";

import UserInfoGetter from "./UserInfoGetter";

export default class RecordAdder {
    constructor(pageWorker, ajaxSender, alert) {
        this.pageWorker = pageWorker;
        this.ajaxSender = ajaxSender;
        this.alert = alert;

        this.c1 = document.getElementById("t444");
        this.c2 = document.getElementById("t555");
        this.c3 = document.getElementById("t666");

        this.addEventToAddingRecordBtn();
    }

    addEventToAddingRecordBtn() {
        document.getElementById("addRecordBtn").onclick = () => {
            const c1 = this.c1.value.toString();
            const c2 = this.c2.value.toString();
            const c3 = this.c3.value.toString();

            let obj = {
                c1: c1,
                c2: c2,
                c3: c3,
                user: localStorage.getItem("LOGIN").toString()
            };

            this.ajaxSender.sendPost("adding_record", JSON.stringify(obj), {}, () => {
                new UserInfoGetter(this.ajaxSender);
                this.alert.showMessage("Запись успешно добавлена в БД.", () => {
                    this.c1.value = "";
                    this.c2.value = "";
                    this.c3.value = "";
                });
            });
        }
    }
}