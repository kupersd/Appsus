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
        myMail: '',// why?
        unreadCount: null,
        isCompose: false,
        filterBy: {
            isRead: null, // used?
            mailText: '',
            currMailBox: 'all'
        }
    }

    componentDidMount() {
        emailService.unreadCount()
            .then(count => this.setState({ unreadCount: count }));  // unread count needs on update
        this.loadEmails();
        emailService.myMail()
            .then(myMail => this.setState({ myMail })); // used? isn't service enough?
    }

    loadEmails = () => {
        emailService.query().then(emails => {
            this.setState({ emails });
        });
    }

    onSetFilter = (mailText) => {   // change to search
        const filterCopy = { ...this.state.filterBy };
        filterCopy.mailText = mailText;
        this.setState({ filterBy: filterCopy })
    }

    onSetMailbox = (mailBox) => {
        const filterCopy = { ...this.state.filterBy };  // could combine both?
        filterCopy.currMailBox = mailBox;
        this.setState({ filterBy: filterCopy })
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

    onToggleIsRead = (ev, emailId) => {
        console.log(ev);
        ev.preventDefault();
        emailService.toggleIsRead(emailId)
            .then(this.loadEmails());
    }

    onCloseMail = () => {
        this.props.history.push('/email');
    }

    get emailsForDisplay() {

        const { filterBy } = this.state;
        const filterRegex = new RegExp(filterBy.mailText, 'i');
        return this.state.emails.filter(email => {
            return ((filterRegex.test(email.body) || filterRegex.test(email.subject)) &&
                ((emailService.toWhichFolders(email) === this.state.filterBy.currMailBox) ||
                    this.state.filterBy.currMailBox === 'all'))
        });
    }

    render() {
        const emailsForDisplay = this.emailsForDisplay;
        return (
            <section className="email-app">
                <h3>Account: {this.state.myMail}</h3>
                <EmailSearch setFilter={this.onSetFilter} />
                <div className="email-main">
                    <EmailToolbar onCompose={this.onCompose}
                        onSetMailbox={this.onSetMailbox}
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
