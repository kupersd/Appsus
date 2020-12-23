import { storageService } from "../../../services/storageService.js";

export const keepService = {
    query
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

function _saveNotesToStorage() {
    storageService.save(KEY, gNotes);
}

function _getDemoNotes() {

    const demoNotes = [
        {
            type: 'noteText',
            info: {
                text: 'Text Note - Got to love dynamic components'
            }
        },
        {
            type: 'noteTodos',
            info: {
                todos: [{text:'Todo for Dudi'}, {text:'Todo for Ori'}]
            }
        },
        {
            type: 'noteImg',
            info: {
                url: 'https://rabamnetee.com/wp-content/uploads/Funny-Going-To-Hell-In-Every-Religion-Cool-Crazy-Joke-Shirt-ladies-tee.jpg'
            }
        }
    ]
    return demoNotes;

}