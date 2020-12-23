const { NavLink } = ReactRouterDOM;

export function EmailPreview({ email, onRemove }) {
    return (
        <article className="email-preview">
            <NavLink>
                <h4 className="inline">{email.subject.substr(0, 40)}</h4>
                <p className="inline">{email.body.substr(0, 150)}</p>
                <button onClick={() => onRemove(email.id)}>X</button>
            </NavLink>
        </article>
    )
}