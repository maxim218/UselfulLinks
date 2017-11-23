"use strict";

import InputController from "./InputController";

export default class Registration {
    constructor(pageWorker, ajaxSender, alert) {
        this.controller = new InputController();
        this.pageWorker = pageWorker;
        this.ajaxSender = ajaxSender;
        this.alert = alert;
        this.addEventToLinkBtn();
        this.addEventToRegBtn();
    }

    addEventToLinkBtn() {
        document.getElementById("regMoveBtn").onclick = () => {
            this.pageWorker.showPage("registration");
        };
    }

    addEventToRegBtn() {
        this.loginField = document.getElementById("t111");
        this.passwordField = document.getElementById("t222");

        document.getElementById("reg").onclick = () => {
            const login = this.loginField.value.toString();
            const password = this.passwordField.value.toString();

            let resultControl = "";

            const logRes = this.controller.typeString(login);
            switch (logRes) {
                case "EMPTY":
                    resultControl += "Поле ввода логина пусто.<br>";
                    break;
                case "NO_CORRECT":
                    resultControl += "Поле ввода логина содержит запретные символы.<br>";
            }

            const pasRes = this.controller.typeString(password);
            switch(pasRes) {
                case "EMPTY":
                    resultControl += "Поле ввода пароля пусто.<br>";
                    break;
                case "NO_CORRECT":
                    resultControl += "Поле ввода пароля содержит запретные символы.<br>";
            }

            if(resultControl !== "") {
                this.alert.showMessage(resultControl, () => {});
                return;
            }

            let obj = {
                login: login,
                password: password
            };

            let resultObj = {
                result: ""
            };

            this.ajaxSender.sendPost("registration", JSON.stringify(obj), resultObj, () => {
                const answer = resultObj.result;

                if(answer === "REGISTRATION_YES") {
                    this.alert.showMessage("Регистрация прошла успешно.", () => {
                        this.pageWorker.showPage("authorization");
                    });
                }

                if(answer === "REGISTRATION_NO") {
                    this.alert.showMessage("Пользователь с таким логином уже есть в БД.", () => { });
                }
            });
        }
    }
}