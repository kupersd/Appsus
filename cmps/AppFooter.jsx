import { eventBusService } from "../services/eventBusService.js";

const { NavLink, withRouter } = ReactRouterDOM;



class _AppFooter extends React.Component {

    state = {
        msg : ''
    }

    componentDidMount() {
        this.unsubscribe = eventBusService.on('showMsg', (msg) => {
            this.setState({ msg });
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    goToAbout = () => {
        this.props.history.push('/about');
    }        

    render() {
        const {msg} = this.state; 
        return <header className="app-footer">
            <nav className="">
                <ul>
                    {/* <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/books">Books</NavLink></li>
                    <li><NavLink to="/email">Mail</NavLink></li>
                    <li><NavLink to="/keep">Keep</NavLink></li> */}
                </ul>
                <div className="">
                    <h2>All rights reserved &amp; All lights reversed &copy;</h2>
                </div>
            </nav>
            {msg && <div className="user-msg">
                {msg}
            </div>}
        </header>
    }
}

//HOC - higher order component
export const AppFooter = withRouter(_AppFooter);