export function NoteTodos({ info, onAns }) {
    return (
        <section className="note-todos">
            {info.todos.map((todo,idx) => <div key={idx}>{todo.text}</div>)}
        </section>
    )
}