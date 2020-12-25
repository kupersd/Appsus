export function NoteToolBar({ noteId, onPin, onSetBgc, onCopy, onDelete }) {
    const colors = ['white', 'lightpink', 'lightsalmon', 'yellow', 'lightgreen', 'lightblue', 'lightskyblue', 'blue', 'purple', 'lightgray']
    return <div className="note-tool-bar flex">
        <img onClick={() => { onPin(noteId) }} src="apps/Keep/assets/img/pin.png" />
        <div className="colors">
            <img onClick={() => { onSetBgc(noteId) }} src="apps/Keep/assets/img/color-picker.png" />
            <div className="color-picker flex">
                {colors.map( (color, idx) => 
                <div key={idx} className={`${color} pointer`} onClick={() => { onSetBgc(noteId, color) }}></div>)}            
            </div>
        </div>
        <img onClick={() => { onCopy(noteId) }} src="apps/Keep/assets/img/copy.png" />
        <img onClick={() => { onDelete(noteId) }} src="apps/Keep/assets/img/trash.png" />
    </div>
}

