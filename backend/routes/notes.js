const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

//ROUTE 1: To fetch all the notes of the user using his user-id and GET '/api/notes/fetchallnotes' request. User is obviously logged in before hand.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try{
        //finding all the notes of the user, using his id = req.user.id. This id has been derived from the 'auth-token' in the 'fetchuser' function.
        const notes = await Note.find({user: req.user.id});
        res.send(notes);
    }
    catch(error){
        //Inplace of error.message you can also use error, but then you will get plenty of unnecessary stuff along with the error, therefore, to keep the console clean we can prefer using error.message.
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 2: To all notes of the user using his user-id and POST '/api/notes/allnotes' request. User is obviously logged in before hand.
router.post('/addnotes', fetchuser, [
        body('title', 'Title should be atleast 3 character long').isLength({min: 3}),
        body('description', 'Description should be atleat 5 characters long.').isLength({min: 5}),
        body('tag', 'tag should not be empty').exists()
    ],
    async (req, res) => {
        //validating whether the checks applied above result in error or not.
        const errors = validationResult(req);
        //unpacking the required keys.
        const {title, description, tag} = req.body;
        if(!errors.isEmpty())
            return res.status(400).json(errors.array());
        try{
            //creating a new Note object that will automatically have an immutable _id.
            const note = new Note({
                user: req.user.id,
                title,
                description,
                tag
            });
            //saving the note using '.save' method.
            const savedNotes = await note.save();
            res.json(savedNotes);
        }
        catch(error){
            console.log(error.message);
            res.status(500).send("Internal Server Error!");
        }
    }
);

//ROUTE 3: To update an existing note belonging to same user, and adding it back to the DB; using PUT '/api/notes/updatenote/:id' request. Login required. You can even use a POST request, but preferred in PUT.
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try{
        const {title, description, tag} = req.body;
        //finding the note throught the id provided by user.
        let note = await Note.findById(req.params.id);
        //if note does not exists then return error.
        if(!note)
            return res.status(404).send("Note Not Found!");
        //check if the note belongs to the user who wants to update it.
        if(note.user.toString() != req.user.id)
            return res.status(401).send("You aren't authorized to do so!");
        //here we are creating an empty object that will store the updated title, description, tag if provided.
        //we don't do 'const newNode = new Note({})' because then it would create an object of type 'Note' which will have it's own _id. Therefore, we will not be able to update the existing note in this case, as updating will change the _id with the new _id, and _id is immutable.
        const newNote = {};
        if(title) newNote.title = title;
        if(description) newNote.description = description;
        if(tag) newNote.tag = tag;
        //updating the note.
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.send(note);
    }
    catch(error){
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

//ROUTE 4: To delete an existing node belonging to same user, using DELETE '/api/notes/deletenode/:id' request. Login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try{
        //finding the note throught the id provided by user.
        let note = await Note.findById(req.params.id);
        //if note does not exists then return error.
        if(!note)
            return res.status(404).send("Note doesn't exists!");
        //check if the note belongs to the user who wants to delete it.
        if(note.user.toString() != req.user.id){
            console.log("You aren't authorized to do so!");
            return res.status(401).send("You aren't authorized to do so!");
        }
        //deleting the note.
        note = await Note.findByIdAndDelete(req.params.id);
        //this will also work res.send({"Success": "Note Deleted", note: note});
        res.send({"Success": "Note Deleted", "note": note});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error!");
    }
});

module.exports = router;