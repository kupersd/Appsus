import { DynamicNoteCmp } from "./DynamicNoteCmp.jsx";
import { NoteToolBar } from "./NoteToolBar.jsx";

export function NoteList({ notes, onAns, onDelete }) {
    if (!notes.length) return <h1>Loading....</h1>
    return (
        
            <ul className="note-list clean-list flex">
                {notes.map((note, idx) => <li key={idx}>
                    <div className="note">
                        <DynamicNoteCmp currCmp={note.type} info={note.info} onAns={(ans) => {
                            onAns(idx, ans);
                        }} />
                    </div>
                    <NoteToolBar noteId={note.id} onDelete={onDelete}/>
                </li>)}
            </ul>

        
    );
}


