export function NoteText({ info, style, onNoteChosen }) {
    return (
        <div contentEditable style={style} className="note-text" onInput={onNoteChosen} suppressContentEditableWarning={true}>
            <p>{info.text}</p>
            <img src="apps/Keep/assets/img/text.png"/>
        </div>
    )
}
