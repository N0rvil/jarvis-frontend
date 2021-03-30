import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Popup from 'reactjs-popup';

import './Notes.scss';
import '../../FormsStyles/Buttons.scss'

import { url } from '../../url';

class Notes extends React.Component {

    state = { notes: [], noteHeader: '', note: '', noteId: null, newNote: '', newNoteHeader: '', popupIsActive: false, addActive: false, updateActive: false }

    getNotes()  { 
        axios({
            method: 'POST',
            url: `${url}/getnotes`,
            data: Cookies.get(),
        })
        .then(response => {       
            this.setState({ notes: response.data.notes });
        })
        .catch(err => console.log(err));
    }

    async componentDidMount()  {
       await this.getNotes()
    }

    createNote(e) { 
        e.preventDefault()
        this.setState({ addActive: !this.state.addActive })
          axios({
              method: 'POST',
              url: `${url}/createnote`,
              data: { cookies: Cookies.get(), note: this.state },
          })
          .then(response =>  {
            this.setState({ notes: response.data.notes, newNoteHeader: '', newNote: '' });
          })
          .catch(err => console.log(err));
      }

      updateNote(e) {
        e.preventDefault();
        this.setState({ updateActive: false })
        
        axios({
          method: 'POST',
          url: `${url}/updatenote`,
          data: { cookies: Cookies.get(), note: this.state } //data must be a object
        })
        .then(response => {
            this.setState({ notes: response.data.notes });
        })
        .catch(err => console.log(err));
      }

    deleteNote(id) {
        axios({
            method: 'POST',
            url: `${url}/deletenote`,
            data: { id: id, cookies: Cookies.get() }, //data must be a object
        })
        .then(response => {    
            this.setState({ notes: response.data.notes });
        })
        .catch(err => console.log(err));
    }

      getNoteContent(e, id) {
          e.preventDefault();
        axios({
          method: 'POST',
          url: `${url}/getnotecontent`,
          data: { id: id } //data must be a object
        })
       
        .then(response => {    
          this.setState({ noteId: id })
          this.setState({ noteHeader: response.data.noteHeader })
          this.setState({ note: response.data.note })
        })
        .catch(err => console.log(err));
        } 
        
   
      getNoteContentControler() {
        if (this.state.popupIsActive === false) {
          this.setState({ popupIsActive: true })   
        } else {
          this.setState({ popupIsActive: false })
        }
      }

      
    renderNotes() {
        const listItem = this.state.notes.map((note ,i) => {
            return (  
                <li className='notelist__item' key={i}>
                    <h2 className='notelist__header'>{note.noteHeader}</h2>
                    <div className='notelist__content'>
                        <p className='notelist__text'>{note.note}</p>
                        <div className='notelist__box'>
                        <Popup open={this.state.updateActive}  trigger={ <form onSubmit={(e) => {this.getNoteContentControler(); this.getNoteContent(e, note.id)}}> <button className='btn__primary btn__primary-white' type='submit'  >Edit note</button>  </form>} position="top center">
                            <div className='popup'>
                                    <form className='popup__form' onSubmit={this.updateNote.bind(this)}>
                                        <input className='popup__input' placeholder='Note header' value={this.state.noteHeader} onChange={e => this.setState({ noteHeader: e.target.value })} />
                                        <textarea className='popup__textarea' placeholder='Your note' value={this.state.note} onChange={e => this.setState({ note: e.target.value })}></textarea>
                                        <button className='btn__primary btn__primary-white' type='submit' onClick={() => this.setState({ updateActive: true })}>Update</button>
                                    </form>
                            </div>
                        </Popup>
                            <button className='btn__primary btn__primary-red' onClick={() => this.deleteNote(note.id)}>Delete</button>
                        </div>
                    </div>
                </li>
            )
        })
        return <ul className='notelist'>{listItem}</ul>
    }
    
    render() { 
            return (
                <div className='notes'>
                    <h1 className='notes__header'>Notes</h1>
                    <div className='notes__content'>
                        {this.renderNotes()}            
                    </div>
                    <div className='notes__box'>
                    <Popup open={this.state.addActive} trigger={<button className='btn__big btn__big-grey popup__btn'>Add note +</button>} position="top center">
                        <div className='popup'>
                            <form className='popup__form' onSubmit={this.createNote.bind(this)}>
                                <input className='popup__input' placeholder='Note header' value={this.state.newNoteHeader} onChange={e => this.setState({ newNoteHeader: e.target.value })} />
                                <textarea className='popup__textarea' placeholder='Your note' value={this.state.newNote} onChange={e => this.setState({ newNote: e.target.value })}></textarea>
                                <button className='btn__primary btn__primary-white' type='submit' onClick={() => this.setState({ addActive: !this.state.addActive })}>Create note</button>
                            </form>
                        </div>
                    </Popup>
                    </div>
                </div>
            )        
    }
};   

export default Notes;