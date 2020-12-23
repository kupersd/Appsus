
import { keepService } from "../services/keepService.js";
import { DynamicNoteCmp } from "./DynamicNoteCmp.jsx";
import { NoteToolBar } from "./NoteToolBar.jsx";

export class NoteList extends React.Component {

    state = {
        notes: null,
        filterBy: {
            type: '',
            text: ''
        }
    };

    componentDidMount() {
        keepService.query()
            .then(notes => { console.log(notes); this.setState({ notes }); })
    }

    // onAns = (idx, ans) => {
    //     const copy = [...this.state.answers]
    //     copy[idx] = ans;
    //     this.setState({ answers: copy })
    // }
    get notesForDisplay() {
        return this.state.notes;
    }

    render() { 
        const notesForDisplay  = this.notesForDisplay;
        if (!notesForDisplay) return <h1>Loading....</h1>
        return (
            <section className="note-list">
                <h1>Note list</h1>
                <ul className="clean-list flex">
                    {notesForDisplay.map((note, idx) => <li key={idx}>
                        <div className="note">
                            <DynamicNoteCmp currCmp={note.type} info={note.info} onAns={(ans) => {
                                this.onAns(idx, ans);
                            }} />
                        </div>
                        <NoteToolBar />
                    </li>)}
                </ul>

                <button onClick={(ev) => {
                    ev.preventDefault();
                    console.log('Saving:', answers);
                }}> Send</button>


            </section>
        );
    }
}

