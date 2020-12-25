export function NoteTodos({ note, onNoteChosen, onTodoDone }) {
    return (
        <section style={note.style} className="note-todos shadow">
            {note.info.todos.map((todo, idx) =>
                <div key={idx} className={`${todo.isDone && 'todo-done'} flex space-between`} onInput={(ev) => { onNoteChosen(ev, idx) }}>
                    <p contentEditable suppressContentEditableWarning={true}>{todo.text}</p>
                    <img className={`${!todo.isDone && 'my-active'} pointer`} onClick={()=> {onTodoDone(idx)}} src="apps/Keep/assets/img/V.png"/>    
                </div>)}
            <img src="apps/Keep/assets/img/todo.png" />
        </section>
    )
}

