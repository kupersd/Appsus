export function NoteImg({ info, onNoteChosen}) {
    return (
        <div>
            <h2>{info.title}</h2>
            <img src={info.url} onClick={onNoteChosen} />
        </div>
    )
}