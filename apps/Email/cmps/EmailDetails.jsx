import { emailService } from "../services/email-service.js";

const { withRouter } = ReactRouterDOM;

class _EmailDetails extends React.Component {

    state = {
        email: null
    }
    
    componentDidMount() {
        this.loadEmail();
    }

    loadEmail() {
        const { emailId } = this.props.match.params;
        emailService.getById(emailId).then(email => this.setState({ email }));
    }

    render() {
        const { email } = this.state;
        if (!email) return <div>No mails to show...</div>
        return (
            <article className="email-details">
                <h2>{email.subject}</h2>
                <p>{email.body}</p>
                <button onClick={this.props.onBack}>Back</button>
            </article>
        )
    }
}

export const EmailDetails = withRouter(_EmailDetails);