import { eventBusService } from "../services/eventBusService.js";
const { Link, withRouter } = ReactRouterDOM;

export function Home() {
    return (
        <section className="about-page">
            <div className="flex space-around bold mrg-bottom">

                <h1>App Sus</h1>
                <p>
                    The 'not-so-new' way to send and receive mail, and to save notes.
                </p>
            </div>
            {/* <h3>Choose your app and have fun</h3> */}
            <hr className="mrg-bottom" />
            <div className="founders flex space-around">
                <Link to="/email">
                    <div className="founder">
                        <div className="round">
                            <img src="assets/img/letter.png" alt="" />
                        </div>
                        <div className="founder-details">
                            <h2>Mail.js</h2>
                            <ul className="clean-list">
                                <li>Send and Receive</li>
                                <li className="qoute bold">Or is it Respon-ceive?</li>
                            </ul>
                        </div>
                    </div>
                </Link>
                <Link to="/leep">
                    <div className="founder">
                        <div className="round">
                            <img src="assets/img/note.png" alt="" />
                        </div>
                        <div className="founder-details">
                            <h2>Notes.js</h2>
                            <ul className="clean-list">
                                <li>Post it, Post that</li>
                                <li className="qoute bold">What can I keep for you?</li>
                            </ul>
                        </div>
                    </div>
                </Link>
            </div>

        </section>
    );
}