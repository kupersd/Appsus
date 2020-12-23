import { NoteList } from "./cmps/NoteList.jsx";

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

// Simple React Component
export class KeepApp extends React.Component {
    

    render() {
        return (
            <Router>
                <section className="app">
                    <h1>Keep App</h1>
                    <Switch>
                        {/* <Route path="/pet/edit/:petId?" component={PetEdit} />
                        <Route path="/pet/:petId" component={PetDetails} />
                        <Route path="/pet" component={PetApp} />
                        <Route path="/about" component={About} />
                        <Route path="/survey" component={Survey} /> */}
                        <Route path="/keep" component={NoteList} />
                    </Switch>
                    {/* <footer className="animate__animated animate__jello">coffeerights 2020</footer> */}
                </section>
            </Router>
        );
    }
}

