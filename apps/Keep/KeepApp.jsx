import { KeepFilter } from "./cmps/KeepFilter.jsx";
import { NoteAdd } from "./cmps/NoteAdd.jsx";
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
        }
    };

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        keepService.query()
            .then(notes => { console.log(notes); this.setState({ notes }); })
    }

    onAns = () => { console.log('Answer........') }

    get notesForDisplay() {
        const { filterBy, notes } = this.state;
        const notesByType = filterBy.type ? notes.filter(note => note.type === filterBy.type) : notes
        const filterRegex = new RegExp(filterBy.freeText, 'i');
        return notesByType.filter(note => {
            switch (note.type) {
                case 'noteText':
                    return filterRegex.test(note.info.text)
                case 'noteImg':
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

    onSetFilter = (filterBy) => {
        console.log('filterBy:', filterBy);
        this.setState({ filterBy });
    }

    render() {
        return (
            <section className="keep-app">
                <header className="flex space-around mrg-bottom">
                    <h1>Keep App</h1>
                    <KeepFilter setFilter={this.onSetFilter} />
                </header>
                <NoteAdd showAddedNote={this.loadNotes} />
                <NoteList notes={this.notesForDisplay} onAns={this.onAns} onDelete={this.onDelete} />
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

