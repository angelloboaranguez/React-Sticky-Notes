import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';
import Flash from './components/Flash';
import { NOTES } from './shared/notes';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showNote: false,
      notes: [],
      note: {},
      error: ''
    };
  }

  toggleNote = () => {
    this.setState({
      showNote: ! this.state.showNote,
      note: {}
    })
  }

  getNotes = () => {
	if (this.state.notes.length === 0)
		this.setState({notes: NOTES})
  }

  getNote = (id) => {
	this.setState({note: this.state.notes.filter((note) => note.id === id)[0], showNote: true });
  }

  submitNote = (data, id) => {
	if (!data.title)
	{
		return (
			this.setState({
				error: "You must specify a title"
			})
		);
	}
	if (!data.content)
	{
		return (
			this.setState({
				error: "You must enter note text"
			})
		);
	}
	
	if (id !== undefined)
	{
		const newNotesState = this.state.notes.map((note) => {
			if (note.id === id)
				return ({
					title: data.title,
					content: data.content,
					id: id,
					updated_at: new Date().toISOString(),
					created_at: note.created_at
				});
			else
				return (note);
		});
			
		this.setState({
			notes: newNotesState,
			showNote: false
		});
	}
	else
	{
		const newNote = {
			...data,
			id: id,
			updated_at: new Date().toISOString(),
			created_at: new Date().toISOString()
		}
		
		this.setState({
			notes: this.state.notes.concat(newNote),
			showNote: false
		});
	}
  }

  deleteNote = (id) => {
    const newNotesState = this.state.notes.filter((note) => note.id !== id );
	this.setState({notes: newNotesState});
  }

  resetError = () => {
    this.setState({ error: '' });
  }

  render() {
    const { showNote, notes, note, error } = this.state;

    return (
      <div className="App">
        <Nav toggleNote={this.toggleNote} showNote={showNote} />
        {error && <Flash error={error} resetError={this.resetError} />}
        <br />
        { showNote ?
            <Note
              note={note}
              submitNote={this.submitNote}
              deleteTag={this.deleteTag}
            />
            :
            <List 
              getNotes={this.getNotes}
              notes={notes}
              getNote={this.getNote}
              deleteNote={this.deleteNote}
            /> }
      </div>
    );
  }
}

export default App;
