import { storageService } from "../../../services/storageService.js";
import { utilService } from "../../../services/utilService.js";

export const keepService = {
    query, 
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

function save (noteToAdd) {
    noteToAdd.id = utilService.makeId();
    const notes = [...gNotes, noteToAdd]
    gNotes = notes;
    _saveNotesToStorage();
    return Promise.resolve(noteToAdd)
}

function deleteNote (noteId) {
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
            info: {
                text: 'Text Note - Got to love dynamic components'
            },
            id: utilService.makeId()
        },
        {
            type: 'noteTodos',
            info: {
                todos: [{text:'Todo for Dudi'}, {text:'Todo for Ori'}]
            },
            id: utilService.makeId()
        },
        {
            type: 'noteImg',
            info: {
                url: 'https://rabamnetee.com/wp-content/uploads/Funny-Going-To-Hell-In-Every-Religion-Cool-Crazy-Joke-Shirt-ladies-tee.jpg'
            },
            id: utilService.makeId()
        }
    ]
    return demoNotes;

}