import { DynamicNoteCmp } from "./DynamicNoteCmp.jsx";
import { NoteToolBar } from "./NoteToolBar.jsx";

export function NoteList({ notes, onAns, onDelete }) {
    if (!notes.length) return <h1>Loading....</h1>
    return (
        <section className="note-list">
            <h1>Note list</h1>
            <ul className="clean-list flex">
                {notes.map((note, idx) => <li key={idx}>
                    <div className="note">
                        <DynamicNoteCmp currCmp={note.type} info={note.info} onAns={(ans) => {
                            onAns(idx, ans);
                        }} />
                    </div>
                    <NoteToolBar noteId={note.id} onDelete={onDelete}/>
                </li>)}
            </ul>

            <button onClick={(ev) => {
                ev.preventDefault();
            }}> Send</button>


        </section>
    );
}


