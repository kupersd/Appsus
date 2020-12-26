export function About() {
    return (
        <section className="about-page">
            <h1>About Us</h1>
            <p>
                The story begins in November 2020. While the world is experiencing a unique, once in a century challenge, we have decided to go on a journey and become Coding-Ninjas Duo and conquer the world wide web.
            </p>
            <p>Our vision is to deliver Class-A products in terms of efficiency, perfect user experience, superb design and above all - a good spirit. Come and join us - We are hiring!</p>
            <hr />
            <div className="founders flex space-around">
                <div className="founder">
                    <div className="round">
                        <img src="/assets/img/ori.png" alt=""/>
                     </div>
                     <div className="founder-details">
                        <h2>Ori Weinstock</h2>
                        <ul className="clean-list">
                            <li>Master of UX and clean code</li>
                            <li className="qoute bold">Creative is my middle name</li>
                        </ul>
                    </div>
                </div>
                <div className="founder">
                    <div className="round">
                        <img src="/assets/img/dudi.png" alt=""/>
                     </div>
                    <div className="founder-details">
                        <h2>Dudi Kuperstein</h2>
                        <ul className="clean-list">
                            <li>Master of logic and Shabbas</li>
                            <li className="qoute bold">In god we trust</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}