const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1 :-Get all the notes using GET "api/auth/fetchnotes" login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
        
    }  
    //catch error
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal error occurred")
    }
});

//ROUTE 2 :-Add notes using POST "api/auth/addnote" login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 10 characters").isLength({ min: 10 }),
  ],
  async (req, res) => {
      try {
        const {title, description, tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote  = await note.save();
        res.json(saveNote)
    }  //catch error
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal error occurred")
    }
  }
);


//ROUTE 3 :-Update notes using PUT "api/auth/updatenote" login required

router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
        try {
          const {title, description, tag} = req.body;
        //Create a newnote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated 
        let note = await Notes.findById(req.params.id);
        // Checking for user
        if(note.user.toString() !== req.user.id)
        {
            return res.status(401).send("Not Allowed")
        }

        // checking for specific note id
        if(!note)
        {
            return res.status(404).send("Not Found")
        }

        // updating the notes
        note = await Notes.findByIdAndUpdate(req.params.id,{$set : newNote},{new : true})
        res.send({note})
      }  //catch error
      catch (error) {
          console.log(error.message)
          res.status(500).send("Internal error occurred")
      }
    }
  );


//ROUTE 4 :-Delete notes using delete "api/auth/deletenote" login required

router.delete(
    "/deletenote/:id",
    fetchuser,
    async (req, res) => {
        try {

        //Find the note to be deleted 
        let note = await Notes.findById(req.params.id);
        // Checking for user
        if(note.user.toString() !== req.user.id)
        {
            return res.status(401).send("Not Allowed")
        }

        // checking for specific note id
        if(!note)
        {
            return res.status(404).send("Not Found")
        }

        // delete the notes
        note = await Notes.findByIdAndDelete(req.params.id)
        res.send({"sucess":"successfully delete the notes",note: note})
      }  //catch error
      catch (error) {
          console.log(error.message)
          res.status(500).send("Internal error occurred")
      }
    }
  );
module.exports = router;
