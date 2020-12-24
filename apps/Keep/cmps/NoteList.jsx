import { DynamicNoteCmp } from "./DynamicNoteCmp.jsx";
import { NoteToolBar } from "./NoteToolBar.jsx";

export function NoteList({ notes, onNoteChosen, onDelete }) {
    if (!notes.length) return <h1>Loading....</h1>
    return (
        
            <ul className="note-list clean-list flex">
                {notes.map((note, idx) => <li key={idx}>
                    <div className="note">
                        <DynamicNoteCmp note={note} onNoteChosen={(ev, todoIdx)=>{
                            ev.preventDefault();onNoteChosen(ev, note.id, todoIdx)}} />
                    </div>
                    <NoteToolBar noteId={note.id} onDelete={onDelete}/>
                </li>)}
            </ul>

        
    );
}


