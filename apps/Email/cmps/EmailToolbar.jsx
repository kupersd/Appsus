export class EmailToolbar extends React.Component {

    render() {
        return (
            <section className="email-toolbar">
                <button>Compose</button>
                <ul className="clean-list">
                    <li>ALL</li>
                    <li>Inbox</li>
                    <li>Starred</li>
                    <li>Sent</li>
                    <li>Drafts</li>
                </ul>
            </section>
        )
    }
}