//Require express, path modules

const express = require("express");
const path = require("path");
const fs = require("fs");
const {
    v4: uuidv4
} = require('uuid');

const DB_PATH = "./db/db.json"
let db = require(DB_PATH);

const app = express();

//Defined Port
const port = process.env.port || 8080;

//Express handling/parsing of POST/PUT Routes

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));

//File Paths 
app.get("/", (req, res) => {
    console.log("Hello!")
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// GET - Retrieve all notes
app.get('/api/notes', (req, res) => {
    res.json({
        ok: true,
        data: db
    })
});

// POST - Create one note
app.post('/api/notes', (req, res) => {
    const {
        title,
        text
    } = req.body

    // Handle Errors
    if (!title || !text) {
        res.status(404).json({
            ok: false,
            data: null,
            error: "To create a new note, please provide a 'title' and 'text' property."
        })

        return;
    }

    // Adding one note to the db file
    const newNote = {
        id: uuidv4(),
        title,
        text
    }

    db.push(newNote)

    // Save to Database
    fs.writeFileSync(DB_PATH, JSON.stringify(db))

    res.json({
        ok: true,
        data: newNote
    })
});

// PUT - Update one note
app.put('/api/notes/:id', (req, res) => {
    const {
        title: newTitle,
        text: newText
    } = req.body

    const {
        id
    } = req.params

    // Handle Errors
    if (!newTitle && !newText) {
        res.status(404).json({
            ok: false,
            data: null,
            error: "To update a note, please provide a 'title' or 'text' property."
        })

        return;
    }

    // Check to see if a note with the specified ID exists

    const noteIndex = db.findIndex(note => id === note.id)

    if (noteIndex === -1) {
        res.status(404).json({
            ok: false,
            data: null,
            error: `A note with an ID of ${id} does not exist. Please provide a valid note ID.`
        })

        return;
    }

    const {
        title: oldTitle,
        text: oldText
    } = db[noteIndex]

    let updatedNote = {
        ...db[noteIndex],
        title: newTitle ? newTitle : oldTitle,
        text: newText ? newText : oldText
    }

    db[noteIndex] = updatedNote

    // Save to Database
    fs.writeFileSync(DB_PATH, JSON.stringify(db))

    res.json({
        ok: true,
        data: updatedNote
    })

})

// DELETE - Delete one note
app.delete('/api/notes/:id', (req, res) => {
    const {
        id
    } = req.params

    // Check to see if a note with the specified ID exists

    const noteIndex = db.findIndex(note => id === note.id)

    if (noteIndex === -1) {
        res.status(404).json({
            ok: false,
            data: null,
            error: `A note with an ID of ${id} does not exist. Please provide a valid note ID.`
        })

        return;
    }

    // Remove the note from the db
    db.splice(noteIndex, 1)

    // Save to Database
    fs.writeFileSync(DB_PATH, JSON.stringify(db))

    res.json({
        ok: true
    })
});

// Read From Database???
fs.readFileSync(DB_PATH, JSON.parse(db))

res.json({
    ok: true
})


app.listen(8080, () => {
    console.log("App is running at port ", 8080);
});