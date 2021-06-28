const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const calcNotesStats = require('../helpers/calcNotesStats');

const notesPath = path.join(__dirname, '..', '..', 'data', 'db.json');

async function getAllNotes() {
  return fs
    .readFile(notesPath, { encoding: 'utf-8' })
    .then(data => JSON.parse(data));
}

async function getStats() {
  const notes = await getAllNotes();
  const noteStats = calcNotesStats(notes);
  return noteStats;
}

async function getNoteById(id) {
  const notes = await getAllNotes();
  const note = notes.find(note => note.id === id);
  return note;
}

async function addNote(body) {
  const notes = await getAllNotes();
  const id = uuidv4();

  const newNote = {
    id,
    ...body,
    archived: false,
    date: new Date().toLocaleDateString(),
  };
  notes.push(newNote);

  return await fs.writeFile(notesPath, JSON.stringify(notes, null, 2));
}

async function editNote(body, id) {
  const notes = await getAllNotes();
  const note = await getNoteById(id);

  const newNote = { ...note, ...body };
  const newArr = notes.map(note => (note.id === id ? newNote : note));

  fs.writeFile(notesPath, JSON.stringify(newArr, null, 2));
}

async function removeNote(id) {
  const notes = await getAllNotes();
  const newNotes = notes.filter(note => note.id !== id);
  fs.writeFile(notesPath, JSON.stringify(newNotes, null, 2));
}

module.exports = {
  getAllNotes,
  getNoteById,
  addNote,
  editNote,
  removeNote,
  getStats,
};
