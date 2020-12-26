const { NavLink, Link } = ReactRouterDOM;

export function EmailPreview({ email, onRemove, onToggleIsRead }) {
    const isReadClass = (email.isRead) ? 'read' : '';
    const isReadIcon = (email.isRead) ? 'env-open' : 'env-closed';
    const dateTime = moment(email.sentAt).format('DD/MM')
    return (
        <Link to={`/email/${email.id}`}>
            <div className="email-preview fast-trans">
                <div className="from">{email.fromName || email.from}</div>
                <div className="subj-snip flex">
                    <div className={`subject bold ${isReadClass}`}>{email.subject.substr(0, 60)}</div>
                    <div className={`snippet ${isReadClass}`}>{email.body.substr(0, 170)}</div>
                </div>
                <div className="right-side">
                    <span className="date-time bold">{dateTime}</span>
                    <div className="hideable buttons flex space-around">
                        <i className="pointer fast-trans" onClick={(ev) => onToggleIsRead(ev, email.id)}>
                            <img src={`apps/Email/assets/icons/${isReadIcon}.png`} alt="" className="icon" />
                        </i>
                        <i className="pointer" onClick={(ev) => onRemove(ev, email.id)}>
                            <img src="apps/Email/assets/icons/trash.png" alt="" className="icon" />
                        </i>
                    </div>
                </div>
            </div>
        </Link>
    )
}