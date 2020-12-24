import { DynamicNoteCmp } from "./cmps/DynamicNoteCmp.jsx";
import { KeepFilter } from "./cmps/KeepFilter.jsx";
import { NoteAdd } from "./cmps/NoteAdd.jsx";
import { NoteEdit } from "./cmps/NoteEdit.jsx";
import { NoteList } from "./cmps/NoteList.jsx";
import { keepService } from "./services/keepService.js";

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

// Simple React Component
export class KeepApp extends React.Component {

    state = {
        notes: [],
        filterBy: {
            freeText: '',
            type: ''
        },
        noteToEdit: { type: '', info: {} },
        isUpdateNote: false
    };

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        keepService.query()
            .then(notes => { console.log(notes); this.setState({ notes }); })
    }

    onUpdateNote = (ev, noteId, todoIdx) => {
        if (!ev) return
        const text = ev.target.innerText
        keepService.getNoteById(noteId)
            .then(noteToEdit => {
                switch (noteToEdit.type) {
                    case 'noteText':
                        noteToEdit.info.text = text;
                        keepService.save(noteToEdit)
                        break
                    case 'noteTodos':
                        noteToEdit.info.todos[todoIdx].text = text;
                        keepService.save(noteToEdit)
                        break;
                    case 'noteImg':
                    case 'noteVideo':
                        noteToEdit.info.title = text;
                        keepService.save(noteToEdit)
            }
            })
}

get notesForDisplay() {
    const { filterBy, notes } = this.state;
    const notesByType = filterBy.type ? notes.filter(note => note.type === filterBy.type) : notes
    const filterRegex = new RegExp(filterBy.freeText, 'i');
    return notesByType.filter(note => {
        switch (note.type) {
            case 'noteText':
                return filterRegex.test(note.info.text)
            case 'noteImg':
            case 'noteVideo':
                return filterRegex.test(note.info.title)
            case 'noteTodos':
                return note.info.todos.some(todo => filterRegex.test(todo.text))
        }
    });
}

onDelete = (noteId) => {
    keepService.deleteNote(noteId)
    this.loadNotes()
}

onPin = (noteId) => {
    keepService.pinToggle(noteId)
    this.loadNotes()
}

onSetBgc = (noteId, bgc) => {
    keepService.setBgc(noteId, bgc)
    this.loadNotes()
}

onCopy = (noteId) => {
    keepService.copyNote(noteId)
        .then(() => { this.loadNotes() })
}

onTodoDone = (noteId, todoIdx) => {
    keepService.toggleTodo(noteId, todoIdx)
    this.loadNotes()
}

onSetFilter = (filterBy) => {
    this.setState({ filterBy });
}

onUpdateNoteDone = () => {
    this.setState({ isUpdateNote: false })
    this.loadNotes()
}

render() {
    return (
        <section className="keep-app">
            <header className="flex space-around mrg-bottom">
                <h1>Keep App</h1>
                <KeepFilter setFilter={this.onSetFilter} />
            </header>
            <NoteAdd showAddedNote={this.loadNotes} />
            {keepService.getPinned(this.notesForDisplay).length && <h4>Pinned</h4>}
            <NoteList notes={keepService.getPinned(this.notesForDisplay)} onTodoDone={this.onTodoDone} onNoteChosen={this.onUpdateNote}
                onPin={this.onPin} onSetBgc={this.onSetBgc} onCopy={this.onCopy} onDelete={this.onDelete} />
            {keepService.getPinned(this.notesForDisplay).length && <h4>Other Notes</h4>}
            <NoteList notes={keepService.getUnPinned(this.notesForDisplay)} onTodoDone={this.onTodoDone} onNoteChosen={this.onUpdateNote}
                onPin={this.onPin} onSetBgc={this.onSetBgc} onCopy={this.onCopy} onDelete={this.onDelete} />
            {this.state.isUpdateNote && <NoteEdit note={this.state.noteToEdit} onUpdateNote={this.onUpdateNoteDone} />}
        </section>
    );
}
}

