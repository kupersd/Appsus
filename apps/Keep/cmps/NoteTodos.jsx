export function NoteTodos({ info, onNoteChosen }) {
    return (
        <section className="note-todos">
            {info.todos.map((todo,idx) => <div key={idx} onInput={(ev) => {onNoteChosen(ev,idx)}} contentEditable suppressContentEditableWarning={true}>{todo.text}</div>)}
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