const { NavLink } = ReactRouterDOM;

export function EmailPreview({ email, onRemove }) {
    const isReadClass = (email.isRead) ? 'read' : ''
    return (
        <article className={`email-preview ${isReadClass}`}>
            <NavLink to={`/email/${email.id}`}>
                <h4 className="inline">{email.subject.substr(0, 40)}</h4>
                <p className="inline">{email.body.substr(0, 150)}</p>
            </NavLink>
                <button onClick={() => onRemove(email.id)}>X</button>
        </article>
    )
}