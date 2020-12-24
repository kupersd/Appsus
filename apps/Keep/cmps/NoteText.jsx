export function NoteText({ info, onNoteChosen }) {
    return <div contentEditable className="note-text" onInput={onNoteChosen} suppressContentEditableWarning={true}>{info.text}</div>
}
