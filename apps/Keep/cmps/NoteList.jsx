import { DynamicNoteCmp } from "./DynamicNoteCmp.jsx";
import { NoteToolBar } from "./NoteToolBar.jsx";

export function NoteList({ notes, onNoteChosen, onPin, onSetBgc, onCopy, onDelete, onTodoDone }) {
    if (!notes.length) return <div className="inline"></div>
    return (
        <ul className="note-list clean-list">
            {notes.map((note, idx) => <li className="note" key={idx}>               
                    <DynamicNoteCmp note={note} onTodoDone={(todoIdx) => { onTodoDone(note.id, todoIdx) }} onNoteChosen={(ev, todoIdx) => {
                        ev.preventDefault(); onNoteChosen(ev, note.id, todoIdx)
                    }} />
                    {note.isPinned && <img src="apps/Keep/assets/img/pin2.png"/>}
                    <NoteToolBar noteId={note.id} onPin={onPin} onSetBgc={onSetBgc} onCopy={onCopy} onDelete={onDelete} /> 
            </li>)}
        </ul>


    );
}


