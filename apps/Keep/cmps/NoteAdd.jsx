import { keepService } from "../services/keepService.js";

export class NoteAdd extends React.Component {

    state = {
        note: { type: 'noteText', info: {} },
        placeholder: 'What\'s on your mind...',
        inputText: ''
    };

    componentDidMount() {
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
                this.props.showAddedNote()
                this.setState({inputText: ''})
            })

    };

    onInputChange = (ev) => {//on input change
        const note = { ...this.state.note };
        const value = ev.target.value;
        const inputText = value;
        switch (note.type) {
            case 'noteText':
                note.info = { text: inputText }
                break;
            case 'noteImg':
                note.info = { url: inputText }
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

    onChooseNoteType = (noteType) => {
        const note = { ...this.state.note }
        note.type = noteType;
        let placeholder;
        switch (noteType) {
            case 'noteText':
                placeholder = 'What\'s on your mind...'
                break;
            case 'noteImg':
                placeholder = 'Enter image URL...'
                break;
            case 'noteTodos':
                placeholder = 'Enter comma separated list...'
                break;
        }
        this.setState({ note, inputText: '', placeholder })
    }

    render() {
        return (
            <form onSubmit={this.onSaveNote}>

                <input value={this.state.inputText}
                    placeholder={this.state.placeholder} type="text" name="inputText"
                    onChange={this.onInputChange} />
                <button type="button" onClick={() => { this.onChooseNoteType('noteText') }}>Text</button>
                <button type="button" onClick={() => { this.onChooseNoteType('noteImg') }}>Img</button>
                <button type="button" onClick={() => { this.onChooseNoteType('noteTodos') }}>Todos</button>


                <button type="submit" onClick={this.onSaveNote}>Add</button>
                {/* <button type="submit">{(this.state.pet.id)? 'Update' : 'Add'}</button> */}
            </form>
        );
    }
}
