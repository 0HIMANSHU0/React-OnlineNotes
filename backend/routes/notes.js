const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Getting all the notes using: GET "/api/notes/fetchallnotes" . login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
});
//ROUTE 2: Adding a new note using: POST "/api/notes/addnote" . login required
router.post(
  "/addnote",
  [
    body("title", "Enter the title").isLength({ min: 3 }),
    body("description", "Description must be at least of 8 character").isLength(
      { min: 8 }
    ),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors, return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await note.save();
      res.json(savedNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);
//ROUTE 3: Updating an existing note using: PUT "/api/notes/updatenote" . login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
  // Create a newNote
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  // Find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("NOT FOUND");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("NOT ALLOWED");
  }
  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json(note);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error!");
}
});
//ROUTE 4: Deleting an existing note using: DELETE "/api/notes/deletenote" . login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
  // Find the note to be deleted and delete it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("NOT FOUND");
  }
  // Allowed deletion only if user owns this note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("NOT ALLOWED");
  }
  note = await Note.findByIdAndDelete(req.params.id);
  res.json({ "Success!": "Note has been deleted.", note: note });
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error!");
}
});
module.exports = router;
