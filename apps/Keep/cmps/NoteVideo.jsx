export function NoteVideo({ info, onNoteChosen }) {
    console.log(info.url)
    return <div className="note-video" onClick={onNoteChosen}>
        <iframe width="273" height="205" src={info.url}></iframe>
        <h2>{info.title}</h2>
    </div>
    // return <video src={info.url} onClick={onAns} />
}