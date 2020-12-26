import { emailService } from "../services/email-service.js";

const { withRouter } = ReactRouterDOM;

class _EmailDetails extends React.Component {

    state = {
        email: null
    }

    componentDidMount() {
        this.loadEmail();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.emailId !== this.props.match.params.emailId) {
            this.loadEmail();
        }
    }
    loadEmail = () => {
        const { emailId } = this.props.match.params;
        emailService.getById(emailId).then(email => this.setState({ email }))
            .then(this.props.onToggleIsRead(null, emailId, true));
                                                    //true: set as read, not toggle
    }

    onPrevEmail = () => {
        emailService.getNextPrev(this.state.email.id)
            .then(negs => this.props.history.push(`/email/${negs.prevEmailId}`));
    }

    onNextEmail = () => {
        emailService.getNextPrev(this.state.email.id)
            .then(negs => this.props.history.push(`/email/${negs.nextEmailId}`));
    }

    render() {
        const { email } = this.state;
        if (!email) return <div>No mail to display...</div>

        const strDateTime = moment(email.sentAt).format('MMMM Do YYYY, h:mm a')

        return (
            <article className="email-details shadow">
                <div className="email-details-top flex space-between fast-trans">
                    <div>
                        <button onClick={this.props.onBack}>Back</button>
                        <button onClick={this.onPrevEmail}>Prev</button>
                        <button onClick={this.onNextEmail}>Next</button>
                        <button onClick={(ev) => { this.props.onRemove(ev, email.id) }}>Delete</button>
                    </div>
                    <button onClick={() => { this.props.onReply(email) }}>Reply</button>
                </div>
                <div className="flex space-between">
                    <div className="to-from">
                        <h6>from: <span className="bold">{email.fromName || email.from}</span></h6>
                        <h6>to: <span className="bold">{email.to}</span></h6>
                    </div>
                    <div>
                        <h6>{strDateTime}</h6>
                    </div>
                </div>
                <h2>{email.subject}</h2>
                <pre>{email.body}</pre>
            </article>
        )
    }
}
export const EmailDetails = withRouter(_EmailDetails);
