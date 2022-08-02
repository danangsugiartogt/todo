const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const { isNotesEmpty, isTitleValid } = require('./noteHelper');
const messages = require('./messages');
const Note = require('../models/note');

// get note by id
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const query = Note.where({ id: id });
    query.findOne((err, note) => {
        if(err){
            console.log(err);
            return res.status(404).json({ status: 'fail', message: messages.noteNotFound(id) });
        }

        if(note === null){
            return res.status(404).json({ status: 'fail', message: messages.noteNotFound(id) });
        }

        return res.status(200).json({ status: 'success', note: ({ id: note.id, title: note.title, description: note.description }) });
    });
});

// get notes 
router.get('/', (req, res) => {

    Note.find({}, (err, notes) => {
        if(err){
            console.log(err);
            return res.status(404).json({ status: 'fail', message: messages.emptyNotes() });
        }

        const data = notes.map( note => ({ id: note.id, title: note.title}));
        return res.status(200).json({ status: 'success', notes: data });
    })
});

// add note
router.post('/', async (req, res) => {

    const { title, description } = req.body;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    if(!isTitleValid(title)){
        return res.status(401).json({ status: 'fail', message: messages.titleNotValid() });
    }

    const newNote = new Note({
        id, title, description, createdAt, updatedAt
    });

    try{
        const note = await newNote.save();
        const response = { status: 'success', message: messages.noteAdded(id), id };
        return res.status(201).json(response);
    }catch (error){
        console.log(err);
        return res.status(500).json({ status: 'fail', message: messages.unknownError() });
    };
});

// update note
router.put('/', (req, res) => {

    const { id, title, description } = req.body;
    const updatedAt = new Date().toISOString();

    const condition = { id: id };
    const update = { title, description };
    Note.findOneAndUpdate(condition, update, (err, note) => {
        if(err){
            console.log(err);
            return res.status(500).json({ status: 'fail', message: messages.unknownError() });
        }

        if(note === null){
            return res.status(404).json({ status: 'fail', message: messages.noteNotFound(id) });
        }

        return res.status(201).json({ status: 'success', message: messages.noteUpdated(id) });
    });
});

// delete note
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const condition = { id: id };
    Note.findOneAndDelete(condition, (err, note) => {
        if(err){
            console.log(err);
            return res.status(500).json({ status: 'fail', message: messages.unknownError() });
        }

        if(note === null)
            return res.status(404).json({ status: 'fail', message: messages.noteNotFound(id) });
        else
            return res.status(200).json({ status: 'success', message: messages.noteDeleted(id) });
    });
});

module.exports = router;