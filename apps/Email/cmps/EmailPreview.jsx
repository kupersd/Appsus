const { NavLink } = ReactRouterDOM;

export function EmailPreview({ email, onRemove }) {
    const isReadClass = (email.isRead) ? 'read' : '';
    const isReadIcon = (email.isRead) ? 'env-open' : 'env-closed';
    return (
        <tr className={`email-preview ${isReadClass}`}>
            <NavLink to={`/email/${email.id}`}>
                <td className="from">{email.fromName || email.from}</td>
                <td className="subject">{email.subject.substr(0, 40)}</td>
                <td className="snippet">{email.body.substr(0, 130)}</td>
                <td><i onClick={() => onRemove(email.id)}>
                    <img src={`apps/Email/assets/icons/${isReadIcon}.png`} alt="" className="icon"/>   
                    </i></td>
                <td><i onClick={() => onMarkAsRead(email.id)}>
                     <img src="apps/Email/assets/icons/trash.png" alt="" className="icon"/>   
                    </i></td>
            </NavLink>
        </tr>
    )
}