"use strict";

let express = require("express");
let app = express();
let pg = require('pg');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function createNewClient() {
	/*
    return new pg.Client({
        user: 'postgres',
        host: 'localhost',
        database: 'my_db_1',
        password: '123',
        port: 5432
    });
	*/
	
	return new pg.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true
    });
}

function sendQuery (queryString, answerObj, callback) {
    const client = createNewClient();
    // open connection
    client.connect();

    client.query(queryString.toString(), (err, res) => {
        answerObj.arr = res.rows;
        // close connection
        client.end();
        callback();
    });
}

function writeAnswer(response, answerParam) {
    const answer = answerParam.toString();
    console.log(answer);
    response.end(answer);
}

app.get('/create_tables', function(request, response) {
    let queryString = "";
    queryString += " CREATE TABLE IF NOT EXISTS people (man_id SERIAL PRIMARY KEY, man_login TEXT, man_password TEXT);  ";
    queryString += " CREATE TABLE IF NOT EXISTS records (record_id SERIAL PRIMARY KEY, record_header TEXT, record_body TEXT, record_link TEXT, author TEXT);  ";
    sendQuery(queryString, {}, () => {
        writeAnswer(response, "CREATE_TABLES_OK");
    });
});



app.post('/*', function(request, response) {
    console.log(request.url);
    let my_arr = request.url.split("/");
    const operation = my_arr[1].toString();

    if (operation === "registration") {
        let aaa = {
            arr: []
        };

        let bbb = {
            arr: []
        };

        request.on('data', function (data) {
            let dataObj = JSON.parse(data.toString());
            let login = dataObj.login.toString();
            let password = dataObj.password.toString();

            sendQuery(" SELECT * FROM people WHERE man_login = '" + login + "'; ", aaa, () => {
                if (aaa.arr.length > 0) {
                    writeAnswer(response, "REGISTRATION_NO");
                } else {
                    sendQuery(" INSERT INTO people (man_login, man_password) VALUES ('" + login + "', '" + password + "'); ", bbb, () => {
                        writeAnswer(response, "REGISTRATION_YES");
                    });
                }
            });
        });
    }


    if (operation === "authorization") {
        let aaa = {
            arr: []
        };

        request.on('data', function (data) {
            let dataObj = JSON.parse(data.toString());
            let login = dataObj.login.toString();
            let password = dataObj.password.toString();

            sendQuery(" SELECT * FROM people WHERE man_login = '" + login + "' AND man_password = '" + password + "';  ", aaa, () => {
                if (aaa.arr.length > 0) {
                    writeAnswer(response, "AVTORIZ_YES");
                } else {
                    writeAnswer(response, "AVTORIZ_NO");
                }
            });
        });
    }


    if (operation === "adding_record") {
        request.on('data', function (data) {
            let dataObj = JSON.parse(data.toString());

            const c1 = dataObj.c1.toString();
            const c2 = dataObj.c2.toString();
            const c3 = dataObj.c3.toString();
            const user = dataObj.user.toString();

            sendQuery("INSERT INTO records (record_header,  record_body, record_link, author) VALUES('" + c1 + "', '" + c2 + "', '" + c3 + "', '" + user + "')", {}, () => {
                writeAnswer(response, "ADD_RECORD_OK");
            });
        });
    }

    if (operation === "get_records_of_user") {
        request.on('data', function (data) {
            let dataObj = JSON.parse(data.toString());
            const userName = dataObj.userName.toString();
            let aaa = {
                arr: []
            };

            sendQuery(" SELECT * FROM records WHERE author = '" + userName + "' ORDER BY record_id; ", aaa, () => {
                writeAnswer(response, JSON.stringify(aaa.arr));
            });
        });
    }
});



let port = process.env.PORT || 5005;
app.listen(port);
console.log("Server works on port " + port);

