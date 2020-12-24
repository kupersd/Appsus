const { NavLink } = ReactRouterDOM;

export class EmailToolbar extends React.Component {

    state = {
        filterBy: {
            currMailBox: ''
        }
    }
    
    componentDidMount() {
        console.log('Email Toolbar Loaded')
    }

    setMailbox = (mailBox) => {
        const callback = () => {
            this.props.onSetMailbox(this.state.filterBy.currMailBox);
        }
        this.setState({ filterBy: { currMailBox: mailBox} }, callback);
    }

    // TODO :: Map for li, class for active
    render() {
        return (
            <section className="email-toolbar">
                <button onClick={this.props.onCompose}>Compose</button>
                <ul className="clean-list">
                    <li onClick={() => { this.setMailbox('all') }}>ALL</li>
                    <li onClick={() => { this.setMailbox('inbox') }}>Inbox</li>
                    <li onClick={() => { this.setMailbox('unread') }}>Unread</li>
                    <li onClick={() => { this.setMailbox('sent') }}>Sent</li>
                    <li onClick={() => { this.setMailbox('drafts') }}>Drafts</li>
                </ul>
            </section>
        )
    }
}