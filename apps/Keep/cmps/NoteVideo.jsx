export function NoteVideo({ info, style, onNoteChosen }) {
    console.log(info.url)
    return <div style={style} className="note-video">
        <iframe width="280" height="210" src={info.url}></iframe>
        <h2 contentEditable onInput={onNoteChosen} suppressContentEditableWarning={true}>{info.title}</h2>
        <img src="apps/Keep/assets/img/youtube.png" />
    </div>
}