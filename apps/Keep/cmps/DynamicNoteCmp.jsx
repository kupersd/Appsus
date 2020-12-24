import { NoteImg } from "./NoteImg.jsx";
import { NoteText } from "./NoteText.jsx";
import { NoteTodos } from "./NoteTodos.jsx";
import { NoteVideo } from "./NoteVideo.jsx";

export function DynamicNoteCmp({ note , onNoteChosen }) {
    switch (note.type) {
        case 'noteText':
            return <NoteText info={note.info} onNoteChosen={onNoteChosen} />
        case 'noteImg':
            return <NoteImg info={note.info} onNoteChosen={onNoteChosen} />
        case 'noteVideo':
            return <NoteVideo info={note.info} onNoteChosen={onNoteChosen} />
        case 'noteTodos':
            return <NoteTodos info={note.info} onNoteChosen={(ev, todoIdx) => {onNoteChosen(ev, todoIdx)}} />
    }
    return <p>UNKNWON</p>
}