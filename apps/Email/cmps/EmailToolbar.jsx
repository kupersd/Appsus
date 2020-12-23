export class EmailToolbar extends React.Component {

    render() {
        return (
            <section className="email-toolbar">
                <button onClick={this.props.onCompose}>Compose</button>
                <ul className="clean-list">
                    <li onClick={this.props.onAll}>ALL</li>
                    <li className="disabled">Inbox</li>
                    <li onClick={this.props.onUnread}>Unread</li>
                    <li className="disabled">Sent</li>
                    <li className="disabled">Drafts</li>
                </ul>
            </section>
        )
    }
}