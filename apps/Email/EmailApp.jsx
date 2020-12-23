import { EmailCompose } from "./cmps/EmailCompose.jsx";
import { EmailDetails } from "./cmps/EmailDetails.jsx";
import { EmailList } from "./cmps/EmailList.jsx";
import { EmailPreview } from "./cmps/EmailPreview.jsx";
import { EmailToolbar } from "./cmps/EmailToolbar.jsx";
import { emailService } from "./services/email-service.js";

const { Router } = ReactRouterDOM.HashRouter;
const { Switch, Route } = ReactRouterDOM;

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

    onCompose = () => {
        this.setState({ isCompose: true });
    }

    onSent = () => {
        this.setState({ isCompose: false });
        this.loadEmails();
    }

    onRemove = (emailId) => {
        emailService.remove(emailId).then(this.loadEmails);
    }

    onUnreadFilter = () => {
        this.setState({ filterBy: { mailBox: 'unread' } })
    }

    onAllMail = () => {
        this.setState({ filterBy: { mailBox: 'all' } })
    }
        
    onCloseMail = () => {
        this.props.history.push('/email');
    }
    get emailsForDisplay() {
        const { mailBox } = this.state.filterBy;
        let filteredMails;
        if (mailBox === 'unread') {
            filteredMails = this.state.emails.filter(email => email.isRead === false);
        } else {
            filteredMails = this.state.emails;
        }
        return filteredMails;
    }

    render() {
        const emailsForDisplay = this.emailsForDisplay;
        return (
            <section className="email-app">
                <h3>Account: {this.state.myMail}</h3>
                <div className="email-main">
                    <EmailToolbar onCompose={this.onCompose} onUnread={this.onUnreadFilter} onAll={this.onAllMail}/>
                    {/* <Router> */}
                        <Switch>
                            <Route path="/email/:emailId" render={() => <EmailDetails onBack={this.onCloseMail} />} />
                            <Route path="/email" render={() => <EmailList emails={emailsForDisplay} onRemove={this.onRemove} />} />
                        </Switch>
                    {/* </Router> */}
                </div>
                {this.state.isCompose && <EmailCompose onSend={this.onSent} />}
            </section>
        )
    }
}
