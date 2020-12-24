import { keepService } from "../services/keepService.js";
import { DynamicNoteCmp } from "./DynamicNoteCmp.jsx";

export class NoteEdit extends React.Component {

    state = {
        note: { type: '', info: {} },
        inputText: '',
        placeholder: 'Enter title'
    };

    // refInput = React.createRef();

    componentDidMount() {
        // const { petId } = this.props.match.params;
        const { note } = this.props
        let placeholder;
        switch (note.type) {
            case 'noteImg':
                placeholder = 'Enter image URL...'
                break;
            case 'noteVideo':
                placeholder = 'Enter video URL...'
                break;
            case 'noteTodos':
                placeholder = 'Enter comma separated list...'
                break;
        }
        this.setState({ note, placeholder})
        // this.refInput.current.focus();
    }


    onSaveNote = (ev) => {//on submit
        ev.preventDefault();
        if (!this.state.inputText) {
            alert('Please enter something....')
            return
        }
        keepService.save(this.state.note)
            .then(savedNote => {
                console.log('Saved succesfully', savedNote);
                this.setState({ inputText: '' })
                this.props.onUpdateNote()
            })

    };

    onInputChange = (ev) => {//on input change
        const inputText = ev.target.value;
        const note = { ...this.state.note };
        note.info.text = inputText;
        switch (note.type) {
            case 'noteText':
                note.info = { text: inputText }
                break;
            case 'noteImg':
            case 'noteVideo':
                note.info.title = inputText
                break;
            case 'noteTodos':
                const todosTxts = inputText.split(',')
                const todos = todosTxts.map(todoTxt => { return { text: todoTxt } })
                note.info = { todos };
                break;
        }
        this.setState({
            note, inputText
        });
    };

    render() {
        if (!this.state.note.type) return <h1>Loading...</h1>
        return (
            <div className="note-edit">
                <DynamicNoteCmp note={this.state.note}/>
                <form onSubmit={this.onSaveNote}>

                    <input value={this.state.inputText} ref={this.refInput}
                        placeholder={this.state.placeholder} type="text" name="inputText"
                        onChange={this.onInputChange} />

                    <button type="submit">Update</button>
                </form>
            </div>
        );
    }
}
