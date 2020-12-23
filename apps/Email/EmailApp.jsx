import { EmailList } from "./cmps/EmailList.jsx";
import { EmailToolbar } from "./cmps/EmailToolbar.jsx";
import { emailService } from "./services/email-service.js";

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

// Simple React Component
export class EmailApp extends React.Component {

    state = {
        emails: [],
        filterBy: {
            isRead: null,
            mailText: ''
        }
    }

    componentDidMount() {
        console.log('Email APP Loaded')
        this.loadEmails();
    }

    loadEmails = () => {
        emailService.query().then(emails => {
            this.setState({ emails });
            console.log(emails)
        });
    }

    get emailsForDisplay() {
        return this.state.emails;
    }

    render() {
        const emailsForDisplay = this.emailsForDisplay;
        return (
            <Router>
                <section className="email-app">
                    <EmailToolbar />
                    <EmailList emails={emailsForDisplay} />

                </section>
            </Router>
        )
    }
}
