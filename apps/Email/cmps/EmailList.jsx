import { EmailPreview } from "./EmailPreview.jsx"

export function EmailList({ emails, onRemove, onToggleIsRead }) {
    if (!emails || emails.length === 0) return <div>No emails to show...</div>;

    return (
        <section className="email-list shadow fit-content">
            <div className="emails-list-top">
                <h5>Messages</h5>
            </div>
            <div className="emails-list-row">
                {emails.map(email => {
                    return <EmailPreview key={email.id} email={email}
                        onRemove={onRemove} onToggleIsRead={onToggleIsRead} />
                })}
            </div>

        </section>
    )
}