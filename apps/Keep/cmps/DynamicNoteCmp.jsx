import { NoteImg } from "./NoteImg.jsx";
import { NoteText } from "./NoteText.jsx";
import { NoteTodos } from "./NoteTodos.jsx";
import { NoteVideo } from "./NoteVideo.jsx";

export function DynamicNoteCmp({ note , onTodoDone, onNoteChosen }) {
    switch (note.type) {
        case 'noteText':
            return <NoteText info={note.info} style={note.style} onNoteChosen={onNoteChosen} />
        case 'noteImg':
            return <NoteImg info={note.info} style={note.style} onNoteChosen={onNoteChosen} />
        case 'noteVideo':
            return <NoteVideo info={note.info} style={note.style} onNoteChosen={onNoteChosen} />
        case 'noteTodos':
            return <NoteTodos info={note.info} style={note.style} onTodoDone={onTodoDone} onNoteChosen={(ev, todoIdx) => {onNoteChosen(ev, todoIdx)}} />
    }
    return <p>UNKNWON</p>
}