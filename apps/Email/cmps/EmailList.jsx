import { EmailPreview } from "./EmailPreview.jsx"

export function EmailList({ emails, onRemove, onToggleIsRead }) {
    if (!emails || emails.length === 0) return <div>No emails to show...</div>;

    return (
        <section className="emails-list">
            <table>
                <thead>
                    <tr><th>Place Holder Deluxe (.. tdb: unread section)</th></tr>
                </thead>
                <tbody>
                    {emails.map(email => {
                        return <EmailPreview key={email.id} email={email}
                            onRemove={onRemove} onToggleIsRead={onToggleIsRead}/>
                    })}
                </tbody>

            </table>
        </section>
    )
}