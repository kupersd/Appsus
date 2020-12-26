import { EmailCompose } from "./cmps/EmailCompose.jsx";
import { EmailDetails } from "./cmps/EmailDetails.jsx";
import { EmailSearch } from "./cmps/EmailSearch.jsx";
import { EmailList } from "./cmps/EmailList.jsx";
import { EmailToolbar } from "./cmps/EmailToolbar.jsx";
import { emailService } from "./services/emailService.js";

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
            isUnread: false
        },
        isMenuOpen: false
    }

    componentDidMount() {
        this.loadEmails();
        emailService.myMail()
            .then(myMail => this.setState({ myMail }));
    }

    loadEmails = () => {
        emailService.query().then(emails => this.setState({ emails }));
        emailService.getUnreadCount().then(count => this.setState({ unreadCount: count }));
    }

    onSetFilter = (key, value) => {
        const filterCopy = { ...this.state.filterBy };
        filterCopy[key] = value;
        filterCopy.isUnread = false;
        this.setState({ filterBy: filterCopy })
    }

    onCompose = (ev, replyEmail = null) => {    // I get ev.. ?
        this.setState({ isCompose: true });
    }

    onReply = (email) => {
        this.props.history.push(`/email/${email.id}/reply`);
    }

    onSent = () => {
        this.setState({ isCompose: false });
        this.props.history.push('/email');
        this.loadEmails();
    }

    onRemove = (ev, emailId) => {
        ev.preventDefault();
        emailService.remove(emailId).then(this.loadEmails);
        this.props.history.push('/email');
    }

    onToggleIsRead = (ev, emailId, isForceRead) => { // isForce: not toggle, but set as read
        if (ev) ev.preventDefault();                 // could be 'clickless' (email details)
        emailService.toggleIsRead(emailId, isForceRead).then(this.loadEmails());
    }

    onCloseMail = () => {
        this.props.history.push('/email');
    }

    toggleMenu = () => {
        console.log('toggeling menu');
        const toggleBool = !this.state.isMenuOpen
        this.setState({ isMenuOpen: toggleBool })
    }

    onUnread = () => {
        const filterCopy = { ...this.state.filterBy };
        filterCopy.isUnread = true;
        this.setState({ filterBy: filterCopy })
    }

    get emailsForDisplay() {

        const { filterBy } = this.state;
        const filterRegex = new RegExp(filterBy.mailText, 'i');

        const emailsToShow = this.state.emails.filter(email => {
            return ((filterRegex.test(email.body) || filterRegex.test(email.subject)) &&
                ((emailService.toWhichFolders(email) === this.state.filterBy.currMailBox) ||
                    this.state.filterBy.currMailBox === 'all'))
        });

        if (filterBy.currMailBox === 'inbox' && filterBy.isUnread === true) {
            emailsToShow.filter(email => {
                return email.isRead === false
            })
        }
        emailsToShow.sort((email1, email2) => email2.sentAt - email1.sentAt)
        return emailsToShow;
    }

    get unreadMails() {
        const emailsToShow = this.state.emails.filter(email => !email.isRead);
        return emailsToShow;
    }

    
    render() {
        const emailsForDisplay =(this.state.filterBy.isUnread) ? this.unreadMails : this.emailsForDisplay;
        const { isMenuOpen } = this.state
        const isMenuOpenClass = (isMenuOpen) ? 'menu-open' : '';

        return (
            <section className={'email-app ' + isMenuOpenClass}>
                <div className="email-main">
                    <EmailSearch setFilter={this.onSetFilter} toggleMenu={this.toggleMenu} />
                    <EmailToolbar onCompose={this.onCompose}
                        onSetMailbox={this.onSetMailbox}
                        onSetFilter={this.onSetFilter}
                        unreadCount={this.state.unreadCount}
                        currMailBox={this.state.filterBy.currMailBox} />
                    <Switch>
                        
                        <Route path="/email/:emailId/compose" render={() =>
                            <EmailDetails onBack={this.onCloseMail}
                                onRemove={this.onRemove}
                                onToggleIsRead={this.onToggleIsRead}
                                onReply={this.onReply} />} />
                        <Route path="/email/compose" render={() =>
                            <EmailList emails={emailsForDisplay}
                                onRemove={this.onRemove}
                                onToggleIsRead={this.onToggleIsRead}
                                onUnread={this.onUnread} />} />
                        <Route path="/email/:emailId" render={() =>
                            <EmailDetails onBack={this.onCloseMail}
                                onRemove={this.onRemove}
                                onToggleIsRead={this.onToggleIsRead}
                                onReply={this.onReply} />} />
                        <Route path="/email" render={() => <EmailList emails={emailsForDisplay}
                            onRemove={this.onRemove}
                            onToggleIsRead={this.onToggleIsRead}
                            onUnread={this.onUnread}/>} />
                    </Switch>
                    <Route path="/email/compose" render={() => <EmailCompose onSend={this.onSent}
                        onCancel={this.onSent} />} />
                    <Route path="/email/:emailId/reply" render={() =>
                            <EmailCompose onSend={this.onSent} onCancel={this.onSent}/> } />
                    {this.state.isCompose && <EmailCompose onSend={this.onSent} onCancel={this.onSent} />}
                </div>
            </section>
        )
    }
}
