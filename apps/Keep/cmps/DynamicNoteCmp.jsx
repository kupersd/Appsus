import { NoteImg } from "./NoteImg.jsx";
import { NoteText } from "./NoteText.jsx";
import { NoteTodos } from "./NoteTodos.jsx";
import { NoteVideo } from "./NoteVideo.jsx";

export function DynamicNoteCmp({ note , onTodoDone, onNoteChosen }) {
    // TODO change to send note and not parts
    switch (note.type) {
        case 'noteText':
            return <NoteText note={note} onNoteChosen={onNoteChosen} />
        case 'noteImg':
            return <NoteImg note={note} onNoteChosen={onNoteChosen} />
        case 'noteVideo':
            return <NoteVideo note={note} onNoteChosen={onNoteChosen} />
        case 'noteTodos':
            return <NoteTodos note={note} onTodoDone={onTodoDone} onNoteChosen={(ev, todoIdx) => {onNoteChosen(ev, todoIdx)}} />
    }
    return <p>UNKNWON</p>
}