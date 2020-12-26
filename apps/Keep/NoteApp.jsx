import { NoteFilter } from "./cmps/NoteFilter.jsx";
import { NoteAdd } from "./cmps/NoteAdd.jsx";
import { NoteList } from "./cmps/NoteList.jsx";
import { noteService } from "./services/noteService.js";

export class NoteApp extends React.Component {

    state = {
        notes: [],
        filterBy: {
            freeText: '',
            type: ''
        }
    };

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query()
            .then(notes => { console.log(notes); this.setState({ notes }); })
    }

    onUpdateNote = (ev, noteId, todoIdx) => {
        if (!ev) return
        const text = ev.target.innerText
        noteService.getNoteById(noteId)
            .then(noteToEdit => {
                switch (noteToEdit.type) {
                    case 'noteText':
                        noteToEdit.info.text = text;
                        noteService.save(noteToEdit)
                        break
                    case 'noteTodos':
                        noteToEdit.info.todos[todoIdx].text = text;
                        noteService.save(noteToEdit)
                        break;
                    case 'noteImg':
                    case 'noteVideo':
                        noteToEdit.info.title = text;
                        noteService.save(noteToEdit)
                }
            })
    }

    get notesForDisplay() {
        const { filterBy, notes } = this.state;
        const notesByType = (filterBy.type) ? notes.filter(note => note.type === filterBy.type) : notes
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
        noteService.deleteNote(noteId).
            then(this.loadNotes())
    }

    onPin = (noteId) => {
        noteService.pinToggle(noteId)
            .then(this.loadNotes())
    }

    onSetBgc = (noteId, bgc) => {
        noteService.setBgc(noteId, bgc)
            .then(this.loadNotes())

    }

    onCopy = (noteId) => {
        noteService.copyNote(noteId)
            .then(this.loadNotes())
    }

    onTodoDone = (noteId, todoIdx) => {
        noteService.toggleTodo(noteId, todoIdx)
            .then(this.loadNotes())

    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy });
    }

    getPinned = (notes) => {
        return notes.filter(note => note.isPinned)
    }
    getUnPinned = (notes) => {
        return notes.filter(note => !note.isPinned)
    }

    render() {
        const pinnedNotes = this.getPinned(this.notesForDisplay)
        const unPinnedNotes = this.getUnPinned(this.notesForDisplay)
        return (

            <section className="keep-app">
                <header className="keep-header mrg-bottom">
                    <NoteFilter setFilter={this.onSetFilter} />
                </header>
                    <NoteAdd showAddedNote={this.loadNotes} />
                {pinnedNotes.length && <h4>Pinned</h4>}
                <NoteList notes={pinnedNotes} onTodoDone={this.onTodoDone} onNoteChosen={this.onUpdateNote}
                    onPin={this.onPin} onSetBgc={this.onSetBgc} onCopy={this.onCopy} onDelete={this.onDelete} />
                {pinnedNotes.length && <h4>Other Notes</h4>}
                <NoteList notes={unPinnedNotes} onTodoDone={this.onTodoDone} onNoteChosen={this.onUpdateNote}
                    onPin={this.onPin} onSetBgc={this.onSetBgc} onCopy={this.onCopy} onDelete={this.onDelete} />
            </section>
        );
    }
}

