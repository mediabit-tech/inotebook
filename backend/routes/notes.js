const express = require('express');
const Note = require('../models/Note');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Get All the Note using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }
})





// ROUTE 2 : Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    // Field validator
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        // Create a destructure of an array with title, description & tag for add the note into db
        const { title, description, tag } = req.body;
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        // Create a validation for error display
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Create and Save a note into db
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }
})





// ROUTE 3 : Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    // Create a destructure of an array with title, description & tag for update the existsing note of same user into db
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        // Here params.id is pass by user id like '/updatenote/:id'
        let note = await Note.findById(req.params.id);
        // If note is not available
        if (!note) { return res.status(404).send("Not found") };
        // If unauthorised access is done (only for authorised user)
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed!") }

        // Update note
        // Help of {new:true} if any new content is coming then it's insert directly into db
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }
})





// ROUTE 4 : Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        // Here params.id is pass by user id like '/deletenote/:id'
        let note = await Note.findById(req.params.id);
        // If note is not available
        if (!note) { return res.status(404).send("Not found") };
        // If unauthorised access is done (only for authorised user)
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed!") }

        // Update note
        // Help of {new:true} if any new content is coming then it's insert directly into db
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted!", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }
})

module.exports = router;