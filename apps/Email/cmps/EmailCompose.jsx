import { emailService } from "../services/emailService.js";

const { withRouter } = ReactRouterDOM;

export class _EmailCompose extends React.Component {

    state = {
        email: {
            to: '',
            cc: '',
            subject: '',
            body: ''
        }
    }

    refInput = React.createRef();

    componentDidMount() {
        this.refInput.current.focus();

        const { emailId } = this.props.match.params;
        if (!emailId) return;
        emailService.getById(emailId)
        .then(this.fillReplyToMail);
        
    }

    fillReplyToMail = (replyEmail) => {
        const email = {
            to: replyEmail.from,
            from: 'ori',
            subject: 'RE: ' + replyEmail.subject,
            body: `----------------------------
                    ${replyEmail.body}
                    ------------------------------`
        }
        this.setState({ email });
    }

    onInputChange = (ev) => {
        const email = { ...this.state.email };
        email[ev.target.name] = ev.target.value;
        this.setState({ email });
    }

    onSendEmail = (ev) => {
        ev.preventDefault();
        emailService.send(this.state.email).then(sentMail => {
            this.props.onSend();
        })
    }

    onCancel = () => {
        this.props.onCancel();
    }

    render() {
        return (
            <section className="email-compose shadow">

                <div className="top-bar flex space-between">
                    <h4>New Message</h4>
                    <button onClick={this.onCancel}>X</button>
                </div>
                <form className="compose-form" onSubmit={this.onSendEmail}>
                    <input value={this.state.email.to || ''}
                        placeholder="To" type="text" ref={this.refInput}
                        name="to" onChange={this.onInputChange} />
                    <input value={this.state.email.cc || ''}
                        placeholder="Cc" type="text"
                        name="cc" onChange={this.onInputChange} />
                    <input value={this.state.email.subject || ''}
                        placeholder="Subject" type="text"
                        name="subject" onChange={this.onInputChange} />
                    <textarea value={this.state.email.body}
                        placeholder="Message..." rows="14" cols="90"
                        name="body" onChange={this.onInputChange}>
                    </textarea>
                    <div className="flex">

                        <button type="submit">Send</button>
                    </div>
                </form>
            </section>
        )
    }
}
export const EmailCompose = withRouter(_EmailCompose);
