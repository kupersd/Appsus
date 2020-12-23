export function NoteText({ info, onAns }) {
    return <div className="note-text" onClick={onAns}>{info.text}</div>
    // return <label>
    //     {/* {info.label} */}
    //     <input placeholder="info.label" onChange={(ev) => {
    //         onAns(ev.target.value)
    //     }} />
    // </label>
}
