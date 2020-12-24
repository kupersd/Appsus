import { utilService } from "../../../services/utilService.js";
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
    loadEmail() {
        const { emailId } = this.props.match.params;
        emailService.getById(emailId).then(email => this.setState({ email }));
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
        if (!email) return <div>No mails to show...</div>
        const strDateTime = utilService.stringifyTimestamp(email.sentAt);
        return (
            <article className="email-details">
                <div className="email-details-top">
                    <button onClick={this.props.onBack}>Back</button>
                    <button onClick={this.onPrevEmail}>Prev</button>
                    <button onClick={this.onNextEmail}>Next</button>
                    <button onClick={this.props.onRemove}>Delete</button>
                </div>
                <h2>{email.subject}</h2>
                <div className="flex space-between">
                    <div className="to-from">
                        <h6>from: <span className="bold">{email.fromName || email.from}</span></h6>
                        <h6>to: <span className="bold">{email.to}</span></h6>
                    </div>
                    <div>
                        <span>{strDateTime}</span>
                    </div>
                </div>
                <pre>{email.body}</pre>
            </article>
        )
    }
}
export const EmailDetails = withRouter(_EmailDetails);
