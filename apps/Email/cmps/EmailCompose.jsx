import { emailService } from "../services/email-service.js";

export class EmailCompose extends React.Component {

    state = {
        email: {
            to: '',
            subject: '',
            body: ''
        }
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

    render() {
        return (
            <section className="email-compose">

                <h1>Compose Mail</h1>
                <form className="email-form" onSubmit={this.onSendEmail}>
                    <input value={this.state.to}
                        placeholder="Recpient" type="text"
                        name="to" onChange={this.onInputChange} />
                    <input value={this.state.subject}
                        placeholder="Subject" type="text"
                        name="subject" onChange={this.onInputChange} />
                    <textarea value={this.state.textarea}
                        placeholder="Start writing..." rows="12" cols="80"
                        name="body" onChange={this.onInputChange}>
                    </textarea>
                    <button type="submit">Send</button>
                </form>
            </section>
        )
    }
}