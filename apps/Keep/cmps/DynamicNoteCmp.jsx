import { NoteImg } from "./NoteImg.jsx";
import { NoteText } from "./NoteText.jsx";
import { NoteTodos } from "./NoteTodos.jsx";

export function DynamicNoteCmp({ currCmp, info, onAns }) {
    switch (currCmp) {
        case 'noteText':
            return <NoteText info={info} onAns={onAns} />
        case 'noteImg':
            return <NoteImg info={info} onAns={onAns} />
        case 'noteTodos':
            return <NoteTodos info={info} onAns={onAns} />
    }
    return <p>UNKNWON</p>
}