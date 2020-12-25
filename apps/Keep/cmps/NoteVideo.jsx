export function NoteVideo({ note, onNoteChosen }) {
    return <div style={note.style} className="note-video">
        <iframe allowFullScreen={true} width="280" height="210" src={note.info.url}></iframe>
        <h2 placeholder="Enter Title" contentEditable onInput={onNoteChosen} suppressContentEditableWarning={true}>{note.info.title}</h2>
        <img src="apps/Keep/assets/img/youtube.png" />
    </div>
}