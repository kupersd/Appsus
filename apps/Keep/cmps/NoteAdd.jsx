import { noteService } from "../services/noteService.js";


export class NoteAdd extends React.Component {

    state = {
        note: { type: 'noteText', info: {} },
        placeholder: 'What\'s on your mind...',
        inputText: '',
    };

    refInput = React.createRef();

    componentDidMount() {
        this.refInput.current.focus();
    }

    onSaveNote = (ev) => {//on submit
        ev.preventDefault();
        const { note } = this.state
        if (!this.state.inputText) {
            // TODO: SWAL?
            return 
        }
        if (note.type === 'noteVideo') {
            note.info.url = note.info.url.replace('watch?v=', 'embed/');
        }
        noteService.save(note)
            .then(savedNote => {
                console.log('Saved succesfully', savedNote);
                this.props.showAddedNote()
                this.setState({ note: { type: note.type, info: {} }, inputText: '' })
            })

    };

    onInputChange = (ev) => {//on input change
        const note = { ...this.state.note };
        const inputText = ev.target.value;
        switch (note.type) {
            case 'noteText':
                note.info = { text: inputText }
                break;
            case 'noteImg':
            case 'noteVideo':
                note.info = { url: inputText, title: '' }
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
            case 'noteVideo':
                placeholder = 'Enter video URL...'
                break;
            case 'noteTodos':
                placeholder = 'Enter comma separated list...'
                break;
        }
        this.setState({ note, inputText: '', placeholder })
    }
    render() {
        const { inputText, placeholder, note } = this.state
        return (
            <div>
                <form className="note-add flex space-between shadow mrg-bottom" onSubmit={this.onSaveNote}>
                    <input value={inputText} ref={this.refInput}
                        placeholder={placeholder} type="text" name="inputText"
                        onChange={this.onInputChange} />
                    <div>
                        <button type="button" className={`${(note.type === 'noteText') && 'my-active'}`} onClick={() => { this.onChooseNoteType('noteText') }}><img src="apps/Keep/assets/img/text.png" /></button>
                        <button type="button" className={`${(note.type === 'noteImg') && 'my-active'}`} onClick={() => { this.onChooseNoteType('noteImg') }}><img src="apps/Keep/assets/img/img.png" /></button>
                        <button type="button" className={`${(note.type === 'noteVideo') && 'my-active'}`} onClick={() => { this.onChooseNoteType('noteVideo') }}><img src="apps/Keep/assets/img/youtube.png" /></button>
                        <button type="button" className={`${(note.type === 'noteTodos') && 'my-active'}`} onClick={() => { this.onChooseNoteType('noteTodos') }}><img src="apps/Keep/assets/img/todo.png" /></button>

                    </div>
                </form>
            </div>
        );
    }
}
