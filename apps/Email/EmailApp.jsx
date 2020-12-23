import { EmailCompose } from "./cmps/EmailCompose.jsx";
import { EmailDetails } from "./cmps/EmailDetails.jsx";
import { EmailList } from "./cmps/EmailList.jsx";
import { EmailPreview } from "./cmps/EmailPreview.jsx";
import { EmailToolbar } from "./cmps/EmailToolbar.jsx";
import { emailService } from "./services/email-service.js";

const Router = ReactRouterDOM.HashRouter;
// const { Route, Switch } = ReactRouterDOM;

// Simple React Component
export class EmailApp extends React.Component {

    state = {
        emails: [],
        myMail: '',
        isCompose: false,
        filterBy: {
            isRead: null,
            mailText: '',
            mailBox: 'all'
        }
    }

    componentDidMount() {
        console.log('Email APP Loaded');
        this.loadEmails();
        emailService.myMail().then(myMail => this.setState({ myMail }));
    }

    loadEmails = () => {
        emailService.query().then(emails => {
            this.setState({ emails });
        });
    }

    onRemove = (emailId) => {
        emailService.remove(emailId).then(this.loadEmails);
    }

    get emailsForDisplay() {
        return this.state.emails;
    }

    render() {
        const emailsForDisplay = this.emailsForDisplay;
        return (
            <section className="email-app">
                <h3>Account: {this.state.myMail}</h3>
                <div className="email-main">
                    <EmailToolbar />
                    <EmailList emails={emailsForDisplay} onRemove={this.onRemove} />
                </div>
                <EmailDetails email={emailsForDisplay[0]} />
                {this.state.isCompose && <EmailCompose onSend={this.loadEmails} />}
            </section>
        )
    }
}
