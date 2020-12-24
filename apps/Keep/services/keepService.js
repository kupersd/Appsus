import { storageService } from "../../../services/storageService.js";
import { utilService } from "../../../services/utilService.js";

export const keepService = {
    query,
    getNoteById,
    save,
    deleteNote
}

const KEY = 'notesDB';
var gNotes;
_createNotes();

function _createNotes() {
    gNotes = storageService.load(KEY);
    if (!gNotes || !gNotes.length) {
        gNotes = _getDemoNotes()
        _saveNotesToStorage();
    }
}
function query() {
    return Promise.resolve(gNotes);
}

function getNoteById(noteId) {
    return Promise.resolve(gNotes.find(note => note.id === noteId))
}
function save(note) {
    if (note.id) {
        return _update(note);
    } else {
        return _add(note);
    }
}
function _add(note) {
    note.id = utilService.makeId();
    const notes = [...gNotes, note]
    gNotes = notes;
    _saveNotesToStorage();
    return Promise.resolve(note)
}

function _update(note) {
    const noteToUpdate = {
        ...note
    };
    const notesCopy = [...gNotes];
    const noteIdx = notesCopy.findIndex(note => note.id === noteToUpdate.id);
    notesCopy[noteIdx] = noteToUpdate;
    gNotes = notesCopy;
    _saveNotesToStorage();
    return Promise.resolve(note)
}


function deleteNote(noteId) {
    const notes = gNotes.filter(note => note.id !== noteId)
    gNotes = notes
    _saveNotesToStorage();
}

function _saveNotesToStorage() {
    storageService.save(KEY, gNotes);
}

function _getDemoNotes() {

    const demoNotes = [
        {
            type: 'noteText',
            isPinned: true,
            info: {
                text: 'Text Note - Got to love dynamic components'
            },
            id: utilService.makeId()
        },
        {
            type: 'noteTodos',
            info: {
                todos: [{ text: 'Todo for Dudi' }, { text: 'Todo for Ori' }]
            },
            id: utilService.makeId()
        },
        {
            type: 'noteImg',
            info: {
                url: 'https://rabamnetee.com/wp-content/uploads/Funny-Going-To-Hell-In-Every-Religion-Cool-Crazy-Joke-Shirt-ladies-tee.jpg',
                title: 'My Cool shirt'
            },
            id: utilService.makeId()
        },
        {
            type: 'noteVideo',
            info: {
                url: 'https://www.youtube.com/embed/I3qvi4wHNns',
                title: 'my first Video'
            },
            id: utilService.makeId()
        }
    ]
    return demoNotes;

}