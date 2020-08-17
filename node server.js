//Require express, path modules

const express = require("express");
const path = require("path");

const app = express();

//Defined Port
const port = process.env.port || 8080;

//Routes

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));





app.get('/', (request, res) =>{

    res.json("It's working")
});


// Log started server
app.listen(8080, () => {
    console.log("App is running at port ", 8080);
});