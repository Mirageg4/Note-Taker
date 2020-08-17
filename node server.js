//Require express, path modules

const express = require("express");
const path = require("path");
const fs = require ("fs");

let db = require("./db/db.json");

const app = express();

//Defined Port
const port = process.env.port || 8080;

//Express handling/parsing of POST/PUT Routes

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

//File Paths
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});







//Server request to listen
app.get('/', (req, res) =>{
    res.json("It's working")
});


app.listen(8080, () => {
    console.log("App is running at port ", 8080);
});