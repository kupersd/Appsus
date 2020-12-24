const { withRouter } = ReactRouterDOM;

export class _EmailToolbar extends React.Component {

    state = {
        filterBy: {
            currMailBox: ''
        }
    }
    
    mailBoxes = ['ALL', 'Inbox', 'Unread', 'Sent', 'Drafts'];       // TODO : ... get from service of course.
    componentDidMount() {
        console.log('Email Toolbar Loaded')
    }

    setMailbox = (mailBox) => {
        const callback = () => {
            this.props.onSetMailbox(this.state.filterBy.currMailBox);
        }
        this.setState({ filterBy: { currMailBox: mailBox } }, callback);
        this.props.history.push('/email')
    }

    // TODO :: Map for li, class for active
    render() {
        const { currMailBox } = this.props;
        console.log(currMailBox)
        return (
            <section className="email-toolbar">
                <button onClick={this.props.onCompose}>Compose</button>
                <ul className="clean-list">

                    {this.mailBoxes.map(box => {
                        const addCount = (box.toLowerCase() === 'inbox') ? ` (${this.props.unreadCount})` : ''
                        const isActiveClass = (box.toLowerCase() === currMailBox) ? 'active' : ''
                        return <li className={isActiveClass} onClick={() => { this.setMailbox(`${box.toLowerCase()}`) }}>
                            {box + addCount}
                        </li>
                    })
                    }
                </ul>
            </section>
        )
    }
}
export const EmailToolbar = withRouter(_EmailToolbar);
