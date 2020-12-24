export function NoteImg({ info, onNoteChosen}) {
    return (
        <div className="note-img">
            <img src={info.url} onClick={onNoteChosen} />
            <h2>{info.title}</h2>
            <img src="apps/Keep/assets/img/img.png"/>
        </div>
    )
}