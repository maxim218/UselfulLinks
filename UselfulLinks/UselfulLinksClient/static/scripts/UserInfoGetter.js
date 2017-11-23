"use strict";

export default class UserInfoGetter {
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
