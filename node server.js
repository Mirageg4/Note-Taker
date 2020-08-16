const express = require("express");

const app = express();


app.get('/', (req, res) =>{

    res.json("It's working")
});



app.listen(8080, () => {
    console.log("App is running at port ", 8080);
})