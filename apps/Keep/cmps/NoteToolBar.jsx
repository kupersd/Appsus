export function NoteToolBar({ noteId, onPin, onSetBgc, onCopy, onDelete }) {
    return <div className="note-tool-bar flex">
        <img onClick={() => { onPin(noteId) }} src="apps/Keep/assets/img/pin.png" />
        <div className="colors">
            <img onClick={() => { onSetBgc(noteId) }} src="apps/Keep/assets/img/color-picker.png" />
            <div className="color-picker flex">
                <div onClick={() => { onSetBgc(noteId, '#ffffff') }} style={{ backgroundColor: "#ffffff" }}></div>
                <div onClick={() => { onSetBgc(noteId, '#ffc0cb') }} style={{ backgroundColor: "#ffc0cb" }}></div>
                <div onClick={() => { onSetBgc(noteId, '#ffa07a') }} style={{ backgroundColor: "#ffa07a" }}></div>
                <div onClick={() => { onSetBgc(noteId, '#ffffe0') }} style={{ backgroundColor: "#ffffe0" }}></div>
                <div onClick={() => { onSetBgc(noteId, '#90ee90') }} style={{ backgroundColor: "#90ee90" }}></div>
                <div onClick={() => { onSetBgc(noteId, '#87cefa') }} style={{ backgroundColor: "#87cefa" }}></div>
                <div onClick={() => { onSetBgc(noteId, '#add8e6') }} style={{ backgroundColor: "#add8e6" }}></div>
                <div onClick={() => { onSetBgc(noteId, '#0000ff') }} style={{ backgroundColor: "#0000ff" }}></div>
                <div onClick={() => { onSetBgc(noteId, '#800080') }} style={{ backgroundColor: "#800080" }}></div>
                <div onClick={() => { onSetBgc(noteId, '#d3d3d3') }} style={{ backgroundColor: "#d3d3d3" }}></div>
            </div>
        </div>
        <img onClick={() => { onCopy(noteId) }} src="apps/Keep/assets/img/copy.png" />
        <img onClick={() => { onDelete(noteId) }} src="apps/Keep/assets/img/trash.png" />
    </div>
}

