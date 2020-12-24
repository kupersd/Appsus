export function NoteToolBar({ noteId, onPin, onSetBgc, onDelete }) {
    return <div className="note-tool-bar flex">
        <img onClick={() => { onPin(noteId) }} src="apps/Keep/assets/img/pin.png" />
        <div className="colors">
            <img onClick={() => { onSetBgc(noteId) }} src="apps/Keep/assets/img/color-picker.png" />
            <div className="color-picker flex">
                <div style={{backgroundColor: "#ffffff"}}></div>
                <div style={{backgroundColor: "#ffc0cb"}}></div>
                <div style={{backgroundColor: "#ffa07a"}}></div>
                <div style={{backgroundColor: "#ffffe0"}}></div>
                <div style={{backgroundColor: "#90ee90"}}></div>
                <div style={{backgroundColor: "#87cefa"}}></div>
                <div style={{backgroundColor: "#add8e6"}}></div>
                <div style={{backgroundColor: "#0000ff"}}></div>
                <div style={{backgroundColor: "#800080"}}></div>
                <div style={{backgroundColor: "#d3d3d3"}}></div>
            </div>
        </div>
        <img onClick={() => { onPin(noteId) }} src="apps/Keep/assets/img/copy.png" />
        <img onClick={() => { onDelete  (noteId) }} src="apps/Keep/assets/img/trash.png"/>
        {/* <button onClick={() => { onPin(noteId) }}><img src="apps/Keep/assets/img/pin.png" /></button>
        <button onClick={() => { onSetBgc(noteId) }}><img src="apps/Keep/assets/img/color-picker.png" /></button>
        <button onClick={() => { onPin(noteId) }}><img src="apps/Keep/assets/img/copy.png" /></button>
        <button onClick={() => { onDelete(noteId) }}><img src="apps/Keep/assets/img/trash.png" /></button> */}
        {/* <input name="fill" onChange={(ev) => { onSetBgc(ev, noteId) }} type="color" /> */}
    </div>
}

