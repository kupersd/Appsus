import { storageService } from "../../../services/storageService.js";
import { utilService } from "../../../services/utilService.js";

export const keepService = {
    query,
    getNoteById,
    save,
    copyNote,
    deleteNote,
    pinToggle,
    setBgc,
    toggleTodo
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

function copyNote(noteId) {
    const noteToCopy = gNotes.find(note => note.id===noteId)
    const noteToAdd = {...noteToCopy}
    noteToAdd.id = utilService.makeId();
    const notes = [...gNotes, noteToAdd]
    noteToAdd.isPinned = false
    gNotes = notes;
    _saveNotesToStorage();
    return Promise.resolve(noteToAdd)
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
    return Promise.resolve()
}

function pinToggle(noteId) {
    const notes = [...gNotes]
    const noteToTogglePinIdx = notes.findIndex(note => note.id === noteId)
    const noteToTogglePin = notes[noteToTogglePinIdx];
    noteToTogglePin.isPinned = !noteToTogglePin.isPinned
    gNotes = notes;
    _saveNotesToStorage()
    return Promise.resolve(noteToTogglePin)
}
function toggleTodo(noteId, todoIdx) {
    const notes = [...gNotes]
    const noteToUpdateIdx = notes.findIndex(note => note.id === noteId)
    const noteToUpdate = notes[noteToUpdateIdx]
    noteToUpdate.info.todos[todoIdx] = {...noteToUpdate.info.todos[todoIdx], isDone:!noteToUpdate.info.todos[todoIdx].isDone}
    gNotes = notes;
    _saveNotesToStorage()
    return Promise.resolve(noteToUpdate)
}

function setBgc(noteId, bgc) {
    const notes = [...gNotes]
    const noteToUpdateIdx = notes.findIndex(note => note.id === noteId)
    const noteToUpdate = notes[noteToUpdateIdx]
    if (!noteToUpdate.style) noteToUpdate.style={} 
    noteToUpdate.style = {backgroundColor:bgc}
    gNotes = notes;
    _saveNotesToStorage()
    return Promise.resolve(noteToUpdate)
}

function _saveNotesToStorage() {
    storageService.save(KEY, gNotes);
}

function _getDemoNotes() {

    const demoNotes = [
        {
            type: 'noteVideo',
            info: {
                url: 'https://www.youtube.com/embed/I3qvi4wHNns',
                title: 'my first Video'
            },
            id: utilService.makeId()
        },
        {
            type: 'noteVideo',
            isPinned: true,
            info: {
                url: 'https://www.youtube.com/embed/2cH5htm6T4E',
                title: 'Queen'
            },
            style: {
                backgroundColor: 'lightblue'
            },
            id: utilService.makeId()
        },
        {
            type: 'noteVideo',
            isPinned: true,
            info: {
                url: 'https://www.youtube.com/embed/rV6bdhPgH1o',
                title: 'Yes!!!!'
            },
            style: {
                backgroundColor: 'lightgreen'
            },
            id: utilService.makeId()
        },
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
            isPinned: true,
            info: {
                todos: [
                    { text: 'Todo for Dudi', isDone:false}, 
                    { text: 'Todo for Ori',  isDone:false }
                ]
            },
            style: {
                backgroundColor: 'lightsalmon'
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
            
            type: 'noteImg',
            isPinned: true,
            info: {
                url: 'https://images.pexels.com/photos/41315/africa-african-animal-cat-41315.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                title: 'Great Lion'
            },
            id: utilService.makeId()
        }
        
    ]
    return demoNotes;

}