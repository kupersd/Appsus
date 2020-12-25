export function NoteText({ note, onNoteChosen }) {
    return (
        <div contentEditable style={note.style} className="note-text shadow" onInput={onNoteChosen} suppressContentEditableWarning={true}>
            <p>{note.info.text}</p>
            <img src="apps/Keep/assets/img/text.png"/>
        </div>
    )
}
