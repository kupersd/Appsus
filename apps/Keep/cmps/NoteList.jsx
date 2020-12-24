import { DynamicNoteCmp } from "./DynamicNoteCmp.jsx";
import { NoteToolBar } from "./NoteToolBar.jsx";

export function NoteList({ notes, onNoteChosen, onPin, onSetBgc, onDelete, onTodoDone }) {
    if (!notes.length) return <h3>No Data...</h3>
    return (

        <ul className="note-list clean-list">
            {notes.map((note, idx) => <li className="note-container" key={idx}>
                <div className="note">
                    <DynamicNoteCmp note={note} onTodoDone={ (todoIdx) => {onTodoDone(note.id, todoIdx)}} onNoteChosen={(ev, todoIdx) => {
                        ev.preventDefault(); onNoteChosen(ev, note.id, todoIdx)
                    }} />
                    <NoteToolBar noteId={note.id} onPin={onPin} onSetBgc={onSetBgc} onDelete={onDelete} />
                </div>
            </li>)}
        </ul>


    );
}


