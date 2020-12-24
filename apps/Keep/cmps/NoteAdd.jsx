import { keepService } from "../services/keepService.js";


export class NoteAdd extends React.Component {

    state = {
        note: { type: 'noteText', info: {} },
        placeholder: 'What\'s on your mind...',
        inputText: '',
        isActive: { text: true }
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
                this.setState({ note: { type: 'noteText', info: {} }, inputText: '' })
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
        let placeholder, isActive;
        switch (noteType) {
            case 'noteText':
                placeholder = 'What\'s on your mind...'
                isActive = { text: true }
                break;
            case 'noteImg':
                isActive = { img: true }
                placeholder = 'Enter image URL...'
                break;
            case 'noteVideo':
                isActive = { video: true }
                placeholder = 'Enter video URL...'
                break;
            case 'noteTodos':
                isActive = { todos: true }
                placeholder = 'Enter comma separated list...'
                break;
        }
        this.setState({ note, inputText: '', placeholder, isActive })
    }

    render() {
        const { isActive, inputText, placeholder } = this.state
        return (
            <div>
                <form className="note-add flex space-between" onSubmit={this.onSaveNote}>
                    <input value={inputText}
                        placeholder={placeholder} type="text" name="inputText"
                        onChange={this.onInputChange} />
                    <div>
                        <button type="button" className={isActive.text && 'my-active'} onClick={() => { this.onChooseNoteType('noteText') }}><img src="apps/Keep/assets/img/text.png" /></button>
                        <button type="button" className={isActive.img && 'my-active'} onClick={() => { this.onChooseNoteType('noteImg') }}><img src="apps/Keep/assets/img/img.png" /></button>
                        <button type="button" className={isActive.video && 'my-active'} onClick={() => { this.onChooseNoteType('noteVideo') }}><img src="apps/Keep/assets/img/youtube.png" /></button>
                        <button type="button" className={isActive.todos && 'my-active'} onClick={() => { this.onChooseNoteType('noteTodos') }}><img src="apps/Keep/assets/img/todo.png" /></button>
                        {/* <button type="submit" onClick={this.onSaveNote}>Add</button> */}
                        {/* <button type="submit">{(this.state.pet.id)? 'Update' : 'Add'}</button> */}
                    </div>
                </form>
            </div>
        );
    }
}
