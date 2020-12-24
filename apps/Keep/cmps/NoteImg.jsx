export function NoteImg({ info, style, onNoteChosen }) {
    return (
        <div style={style} className="note-img">
            <img src={info.url} />
            <h2 contentEditable suppressContentEditableWarning={true} onInput={onNoteChosen}>{info.title}</h2>
            <img src="apps/Keep/assets/img/img.png" />
        </div>
    )
}