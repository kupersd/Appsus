export function NoteImg({ info, onAns }) {
    return <img src={info.url} onClick={onAns} />
}