/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class InputController {
    constructor() {
        this.normalChars = "abcdefghijklmnopqrstuvwxyz_0123456789";
    }

    isNormalChar(c) {
        c = c.toLowerCase();
        for(let i = 0; i < this.normalChars.length; i++) {
            if(c === this.normalChars.charAt(i)) {
                return true;
            }
        }
        return false;
    }

    typeString(s) {
        if(s.length === 0) {
            return "EMPTY";
        }

        for(let i = 0; i < s.length; i++) {
            const c = s.charAt(i);
            if(this.isNormalChar(c) === false) {
                return "NO_CORRECT";
            }
        }

        return "OK";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InputController;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class UserInfoGetter {
    constructor(ajaxSender) {

        function htmlentities(s){
            s = s + "";
            let div = document.createElement('div');
            let text = document.createTextNode(s);
            div.appendChild(text);
            return div.innerHTML;
        }

        this.ajaxSender = ajaxSender;

        this.recordsContentBox = document.getElementById("recordsContentBox");

        const userInfo = {
            userName: localStorage.getItem("LOGIN").toString()
        };

        let resultObj = {
            result: ""
        };

        let mass = [];

        this.ajaxSender.sendPost("get_records_of_user", JSON.stringify(userInfo), resultObj, () => {
            const result = resultObj.result.toString();
            let arr = JSON.parse(result);

            for(let i = 0; i < arr.length; i++) {
                let s = "<div class = 'listClass'>";
                s += "<h3>Запись " + (i + 1) + "</h3>";
                s += "<b>Краткое описание</b><br>";
                s += htmlentities(arr[i].record_header.toString());
                s += "<br><br><b>Ссылка</b><br>";
                const link = arr[i].record_body.toString();
                s += "<span class = 'myLink' id = '" + link + "' onclick = 'openLink(this)'>Открыть ссылку в новой вкладке</span>";
                s += "<br><br><b>Подробное описание</b><br>";
                s += htmlentities(arr[i].record_link.toString());
                s += "<br><br>";
                s += "</div>";
                s += "<br><br>";

                mass.push(s.toString());
            }

            mass = mass.reverse();
            const contentString = mass.join("");

            this.recordsContentBox.innerHTML = contentString.toString();
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserInfoGetter;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PageWorker__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AjaxSender__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Registration__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Authorization__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AlertClass__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__RecordAdder__ = __webpack_require__(8);









class MainClass {
    static getElement(elementNameParam) {
        const elementName = elementNameParam.toString();
        return document.getElementById(elementName);
    }

    constructor() {
        this.pageWorker = new __WEBPACK_IMPORTED_MODULE_0__PageWorker__["a" /* default */]();
        this.addPagesToPageWorker();
        this.pageWorker.showPage("authorization");

        this.ajaxSender = new __WEBPACK_IMPORTED_MODULE_1__AjaxSender__["a" /* default */]("http://my-links-server.herokuapp.com/");
        this.alert = new __WEBPACK_IMPORTED_MODULE_4__AlertClass__["a" /* default */]();

        new __WEBPACK_IMPORTED_MODULE_2__Registration__["a" /* default */](this.pageWorker, this.ajaxSender, this.alert);
        new __WEBPACK_IMPORTED_MODULE_3__Authorization__["a" /* default */](this.pageWorker, this.ajaxSender, this.alert);
        new __WEBPACK_IMPORTED_MODULE_5__RecordAdder__["a" /* default */](this.pageWorker, this.ajaxSender, this.alert);
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

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class PageWorker {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = PageWorker;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class AjaxSender {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = AjaxSender;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InputController__ = __webpack_require__(0);




class Registration {
    constructor(pageWorker, ajaxSender, alert) {
        this.controller = new __WEBPACK_IMPORTED_MODULE_0__InputController__["a" /* default */]();
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Registration;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UserInfoGetter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__InputController__ = __webpack_require__(0);





class Authorization {
    constructor(pageWorker, ajaxSender, alert) {
        this.controller = new __WEBPACK_IMPORTED_MODULE_1__InputController__["a" /* default */]();
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
                new __WEBPACK_IMPORTED_MODULE_0__UserInfoGetter__["a" /* default */](this.ajaxSender);
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
                        new __WEBPACK_IMPORTED_MODULE_0__UserInfoGetter__["a" /* default */](this.ajaxSender);
                    });
                }
            });
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Authorization;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class AlertClass {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = AlertClass;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UserInfoGetter__ = __webpack_require__(1);




class RecordAdder {
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
                new __WEBPACK_IMPORTED_MODULE_0__UserInfoGetter__["a" /* default */](this.ajaxSender);
                this.alert.showMessage("Запись успешно добавлена в БД.", () => {
                    this.c1.value = "";
                    this.c2.value = "";
                    this.c3.value = "";
                });
            });
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RecordAdder;


/***/ })
/******/ ]);