import { emailService } from "../services/emailService.js";

const { withRouter } = ReactRouterDOM;

export class _EmailToolbar extends React.Component {

    state = {
        filterBy: {
            currMailBox: ''
        },
        mailBoxes: null
    }
    
    componentDidMount() {
        emailService.getMailBoxes()
            .then(mailBoxes => this.setState({mailBoxes}));
    }

    setMailbox = (mailBox) => {
        const callback = () => {
            this.props.onSetFilter('currMailBox', this.state.filterBy.currMailBox);
        }
        this.setState({ filterBy: { currMailBox: mailBox } }, callback);
        this.props.history.push('/email')
    }

    render() {
        const { currMailBox } = this.props;
        const { mailBoxes } = this.state;

        if (!mailBoxes) return <div>Loading...</div>

        return (
            <section className="email-toolbar shadow fit-content">
                <button onClick={this.props.onCompose} className="fast-trans">Compose</button>
                <ul className="clean-list">

                    {mailBoxes.map(box => {
                        const addCount = (box.toLowerCase() === 'inbox') ? ` (${this.props.unreadCount})` : ''
                        const isActiveClass = (box.toLowerCase() === currMailBox) ? 'active' : ''
                        return <li key={box} className={isActiveClass + ' fast-trans'} onClick={() => { this.setMailbox(`${box.toLowerCase()}`) }}>
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
