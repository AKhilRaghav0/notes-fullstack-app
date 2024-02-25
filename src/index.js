const express = require('express');
const fs = require('fs');

require('./db/mongoose');
const Note = require('./models/notes');

const app = express();
 // Import the Note model from models folder.

app.use(express.json());


// CRUD Application 


//Create
app.post('/notes', async (req, res) => {
    const note = new Note(req.body);

    try {
        await note.save();
        res.status(201).send(note);
    
    }
    catch(err) {
        res.status(400).send(err);
    }
 
    
  
});

// READ 
app.get('/notes', async (req, res) => {
    try{
        const notes = await Note.find({});
        res.status(200).send(notes);
    }
    catch (err) {
        res.status(500).send(err);
    }

    });

// Update
app.patch('/notes/:id', async (req, res) => {
        try {
            const note = await Note.findById(req.params.id);
            note.note = req.body.note;
            await note.save();

            res.status(200).send(note);
        
        }
        catch (err) {
            res.status(404).send(err);
        }
    }); 
   
    // Delete
    app.delete('/notes/:id', async (req, res) => {
        try {
            const note = await Note.findByIdAndDelete(req.params.id);
            if (!note) {
                return res.status(404).send('Note not found');
            }
            res.send('This note has been deleted');
        }
        catch (err) {
            res.status(500).send(err);
        }
    });


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
