export function NoteToolBar ({noteId, onDelete}) {
    return <button onClick={()=>{onDelete(noteId)}}>Delete</button>
}