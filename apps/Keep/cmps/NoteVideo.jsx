export function NoteVideo({ info, onNoteChosen }) {
    console.log(info.url)
    return <div onClick={onNoteChosen}>
        <iframe width="273" height="205" src={info.url}></iframe>
    </div>
    // return <video src={info.url} onClick={onAns} />
}