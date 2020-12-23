import { EmailList } from "./cmps/EmailList.jsx";

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

// Simple React Component
export class EmailApp extends React.Component {

    render() {
        return (
            <Router>
                <section className="app">
                    <h1>Mail App</h1>
                    <ul>
                        <li>Compose</li>
                        <li>Inbox</li>
                        <li>Starred</li>
                        <li>Sent</li>
                        <li>Drafts</li>
                    </ul>
                    <Switch>
                        <Route path="/email" component={EmailList} />
                    </Switch>
                    {/* <footer className="animate__animated animate__jello">coffeerights 2020</footer> */}
                </section>
            </Router>
        )
    }
}
