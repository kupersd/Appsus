import { DynamicNoteCmp } from "./DynamicNoteCmp.jsx";
import { NoteToolBar } from "./NoteToolBar.jsx";

export class NoteList extends React.Component {

    state = {
        noteList: {
            cmps: [
                {
                    type: 'noteText',
                    info: {
                        text: 'Text Note - Got to love dynamic components'
                    }
                },
                {
                    type: 'noteTodos',
                    info: {
                        todos: [{text:'Todo for Dudi'}, {text:'Todo for Ori'}]
                    }
                },
                {
                    type: 'noteImg',
                    info: {
                        url: 'https://rabamnetee.com/wp-content/uploads/Funny-Going-To-Hell-In-Every-Religion-Cool-Crazy-Joke-Shirt-ladies-tee.jpg'
                    }
                }
            ]
        }
    };

    componentDidMount() {
        console.log(this.props)
    }

    // onAns = (idx, ans) => {
    //     const copy = [...this.state.answers]
    //     copy[idx] = ans;
    //     this.setState({ answers: copy })
    // }

    render() {
        const { noteList } = this.state;
        return (
            <section className="note-list">
                <h1>Note list</h1>
                <ul className="clean-list flex">
                    {noteList.cmps.map((cmp, idx) => <li key={idx}>
                        <div className="note">
                            <DynamicNoteCmp currCmp={cmp.type} info={cmp.info} onAns={(ans) => {
                                this.onAns(idx, ans);
                            }} />
                        </div>
                        <NoteToolBar/>
                    </li>)}
                </ul>

                <button onClick={(ev) => {
                    ev.preventDefault();
                    console.log('Saving:', answers);
                }}> Send</button>


            </section>
        );
    }
}

