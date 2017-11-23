"use strict";

import UserInfoGetter from "./UserInfoGetter";
import InputController from "./InputController";

export default class Authorization {
    constructor(pageWorker, ajaxSender, alert) {
        this.controller = new InputController();
        this.pageWorker = pageWorker;
        this.ajaxSender = ajaxSender;
        this.alert = alert;
        this.userLabel = document.getElementById("userLabel");
        this.addEventToLinkBtn();
        this.addEventToAuthBtn();

        this.tryAuthorizeInStart();
    }

    addEventToLinkBtn() {
        document.getElementById("authMoveBtn").onclick = () => {
            this.pageWorker.showPage("authorization");
        }
    }

    tryAuthorizeInStart() {
        const login = localStorage.getItem("LOGIN");
        const password = localStorage.getItem("PASSWORD");

        function normal(s) {
            if(s === null) {
                return false;
            }

            if(s === undefined) {
                return false;
            }

            if(s === "") {
                return false;
            }

            return true;
        }

        if(normal(login) === false) {
            return;
        }

        if(normal(password) === false) {
            return;
        }

        let obj = {
            login: login,
            password: password
        };

        let resultObj = {
            result: ""
        };

        this.ajaxSender.sendPost("authorization", JSON.stringify(obj), resultObj, () => {
            const answer = resultObj.result.toString();

            if(answer === "AVTORIZ_YES"){
                localStorage.setItem("LOGIN", login);
                localStorage.setItem("PASSWORD", password);
                this.pageWorker.showPage("recordspage");

                this.userLabel.innerHTML = "Пользователь <b>" + login + "</b>";
                new UserInfoGetter(this.ajaxSender);
            }
        });
    }

    addEventToAuthBtn() {
        this.loginField = document.getElementById("t11");
        this.passwordField = document.getElementById("t22");


        document.getElementById("auth").onclick = () => {
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

            this.ajaxSender.sendPost("authorization", JSON.stringify(obj), resultObj, () => {
                const answer = resultObj.result.toString();

                if(answer === "AVTORIZ_NO"){
                    this.alert.showMessage("Неверный логин или пароль.", () => {});
                }

                if(answer === "AVTORIZ_YES"){
                    this.alert.showMessage("Авторизация прошла успешно.", () => {
                        localStorage.setItem("LOGIN", login);
                        localStorage.setItem("PASSWORD", password);
                        this.pageWorker.showPage("recordspage");
                        this.userLabel.innerHTML = "Пользователь <b>" + login + "</b>";
                        new UserInfoGetter(this.ajaxSender);
                    });
                }
            });
        }
    }
}