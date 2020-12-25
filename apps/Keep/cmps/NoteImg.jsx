export function NoteImg({ note, onNoteChosen }) {
    return (
        <div style={note.style} className="note-img shadow">
            <img src={note.info.url} />
            <h2 contentEditable suppressContentEditableWarning={true} onInput={onNoteChosen}>{note.info.title}</h2>
            <img src="apps/Keep/assets/img/img.png" />
        </div>
    )
}