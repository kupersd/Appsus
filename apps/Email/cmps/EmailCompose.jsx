import { emailService } from "../services/email-service.js";

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

    componentDidMount() {
        const { pathname } = this.props.history.location;
        const replyToId = pathname.substr(7, 5);
        if (replyToId.length === 5) {
            console.log('Replying to mail:', replyToId);
            emailService.getById(replyToId).then(this.fillReplyToMail)
        }
    }

    fillReplyToMail = (replyEmail) => {
        console.log(replyEmail)
        const email = {
            to: replyEmail.from,
            from: 'ori',
            subject: 'RE: ' + replyEmail.subject,
            body: 'Here is my answer'
        }
        console.log(email)
        this.setState({ email });
        console.log('state after reply:', this.state)
    }

    onInputChange = (ev) => {
        const email = { ...this.state.email };
        email[ev.target.name] = ev.target.value;
        this.setState({ email });
    }

    onSendEmail = (ev) => {
        ev.preventDefault();
        emailService.send(this.state.email).then(sentMail => {
            console.log('email sent:', sentMail);
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
                    <input value={this.state.to}
                        placeholder="To" type="text"
                        name="to" onChange={this.onInputChange} />
                    <input value={this.state.cc}
                        placeholder="Cc" type="text"
                        name="cc" onChange={this.onInputChange} />
                    <input value={this.state.subject}
                        placeholder="Subject" type="text"
                        name="subject" onChange={this.onInputChange} />
                    <textarea value={this.state.textarea}
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
