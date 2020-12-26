import { EmailCompose } from "./cmps/EmailCompose.jsx";
import { EmailDetails } from "./cmps/EmailDetails.jsx";
import { EmailSearch } from "./cmps/EmailSearch.jsx";
import { EmailList } from "./cmps/EmailList.jsx";
import { EmailToolbar } from "./cmps/EmailToolbar.jsx";
import { emailService } from "./services/email-service.js";

const { Switch, Route } = ReactRouterDOM;

export class EmailApp extends React.Component {

    state = {
        emails: [],
        myMail: '',
        unreadCount: null,
        isCompose: false,
        filterBy: {
            mailText: '',
            currMailBox: 'inbox',
            isRead: false
        }
    }

    componentDidMount() {
        this.loadEmails();
        emailService.myMail()
            .then(myMail => this.setState({ myMail }));
    }

    loadEmails = () => {
        emailService.query().then(emails => this.setState({ emails }));
        emailService.unreadCount().then(count => this.setState({ unreadCount: count }));
    }

    onSetFilter = (key, value) => {
        console.log(key, value)
        const filterCopy = { ...this.state.filterBy };
        filterCopy[key] = value;
        this.setState({ filterBy: filterCopy })
    }
    onCompose = () => {
        this.setState({ isCompose: true });
    }

    onSent = () => {
        this.setState({ isCompose: false });
        this.loadEmails();
    }

    onRemove = (ev, emailId) => {
        ev.preventDefault();
        emailService.remove(emailId).then(this.loadEmails);
        this.props.history.push('/email');
    }

    onToggleIsRead = (ev, emailId) => {
        ev.preventDefault();
        emailService.toggleIsRead(emailId).then(this.loadEmails());
    }

    onCloseMail = () => {
        this.props.history.push('/email');
    }

    get emailsForDisplay() {

        const { filterBy } = this.state;
        const filterRegex = new RegExp(filterBy.mailText, 'i');

        const emailsToShow = this.state.emails.filter(email => {
            return ((filterRegex.test(email.body) || filterRegex.test(email.subject)) &&
                ((emailService.toWhichFolders(email) === this.state.filterBy.currMailBox) ||
                    this.state.filterBy.currMailBox === 'all'))
        });

        emailsToShow.sort((email1, email2) => email2.sentAt - email1.sentAt)
        return emailsToShow;
    }

    render() {
        const emailsForDisplay = this.emailsForDisplay;
        return (
            <section className="email-app">
                <EmailSearch setFilter2={this.onSetFilter} />
                <div className="email-main">
                    <EmailToolbar onCompose={this.onCompose}
                        onSetMailbox={this.onSetMailbox}
                        onSetFilter={this.onSetFilter}
                        unreadCount={this.state.unreadCount}
                        currMailBox={this.state.filterBy.currMailBox} />
                    <Switch>
                        <Route path="/email/:emailId/compose" render={() =>
                            <EmailDetails onBack={this.onCloseMail}
                            onRemove={this.onRemove} />} />
                        <Route path="/email/compose" render={() => <EmailList emails={emailsForDisplay}
                            onRemove={this.onRemove} onToggleIsRead={this.onToggleIsRead} />} />

                        <Route path="/email/:emailId" render={() =>
                            <EmailDetails onBack={this.onCloseMail}
                            onRemove={this.onRemove} />} />
                        <Route path="/email" render={() => <EmailList emails={emailsForDisplay}
                            onRemove={this.onRemove} onToggleIsRead={this.onToggleIsRead} />} />
                    </Switch>
                    <Route path="/email/compose" render={() => <EmailCompose onSend={this.onSent}
                        onCancel={this.onSent} />} />
                    {this.state.isCompose && <EmailCompose onSend={this.onSent} onCancel={this.onSent} />}
                </div>
            </section>
        )
    }
}
