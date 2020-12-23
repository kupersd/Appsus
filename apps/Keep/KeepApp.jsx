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
            type: '',
            text: ''
        }
    };

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        keepService.query()
        .then(notes => { console.log(notes); this.setState({ notes }); })
    }

    onAns = () => {console.log('Answer........')}
    
    get notesForDisplay() {
        return this.state.notes;
    }

    onDelete = (noteId) => {
        keepService.deleteNote(noteId)
        this.loadNotes()
    }

    render() {
        return (
                <section className="app">
                    <h1>Keep App</h1>
                    <NoteAdd showAddedNote={this.loadNotes}/>
                    <NoteList notes={this.notesForDisplay} onAns={this.onAns} onDelete={this.onDelete}/>
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

