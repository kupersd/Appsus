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
                if (noteToEdit.type === 'noteText') {
                    noteToEdit.info.text = text;
                    keepService.save(noteToEdit)

                } else if (noteToEdit.type === 'noteTodos') {
                    keepService.save(noteToEdit)
                } else this.setState({ noteToEdit, isUpdateNote: true })
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
                    return filterRegex.test(note.info.url)
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

    onSetBgc = (ev, noteId) => {
        keepService.setBgc(noteId, ev.target.value)
        this.loadNotes()
    }

    onTodoDone = (noteId, todoIdx) => {
        keepService.toggleTodo(noteId, todoIdx)
        this.loadNotes()
    }

    onSetFilter = (filterBy) => {
        console.log('filterBy:', filterBy);
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
                <h2>Pinned Notes</h2>
                <NoteList notes={keepService.getPinned(this.notesForDisplay)} onTodoDone={this.onTodoDone} onNoteChosen={this.onUpdateNote}
                    onPin={this.onPin} onSetBgc={this.onSetBgc} onDelete={this.onDelete} />
                <h2>Other Notes</h2>
                <NoteList notes={keepService.getUnPinned(this.notesForDisplay)} onTodoDone={this.onTodoDone} onNoteChosen={this.onUpdateNote}
                    onPin={this.onPin} onSetBgc={this.onSetBgc} onDelete={this.onDelete} />
                {this.state.isUpdateNote && <NoteEdit note={this.state.noteToEdit} onUpdateNote={this.onUpdateNoteDone} />}
                {/* <Switch>
                        <Route path="/pet/edit/:petId?" component={PetEdit} />
                        <Route path="/pet/:petId" component={PetDetails} />
                        <Route path="/pet" component={PetApp} />
                        <Route path="/about" component={About} />
                        <Route path="/survey" component={Survey} />
                        <Route path="/keep" render = {() => return <NoteList props={kkk}/>} />
                    </Switch> */}
                {/* <footer className="animate__animated animate__jello">coffeerights 2020</footer> */}
            </section>
        );
    }
}

