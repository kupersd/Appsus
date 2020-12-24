export function NoteTodos({ info, style, onNoteChosen, onTodoDone }) {
    console.log('style', style)
    return (
        <section style={style} className="note-todos">
            {info.todos.map((todo, idx) => <div key={idx} className={`${todo.isDone && 'todo-done'} flex space-between`} onInput={(ev) => { onNoteChosen(ev, idx) }}
                contentEditable suppressContentEditableWarning={true}><p>{todo.text}</p>
                <input onClick={(ev) => { ev.stopPropagation(); onTodoDone(idx) }} type="checkbox" /></div>)}
            <img src="apps/Keep/assets/img/todo.png" />
        </section>
    )
}
// export function NoteTodos({ info, onNoteChosen }) {
//     return (
//         <section onClick={onNoteChosen} className="note-todos">
//             {info.todos.map((todo,idx) => <div key={idx} contentEditable>{todo.text}</div>)}
//         </section>
//     )
// }