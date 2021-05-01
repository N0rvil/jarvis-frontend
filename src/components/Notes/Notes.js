import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Popup from 'reactjs-popup';

import { url } from '../url';

import NotFoundLoged from '../Error/NotFound/NotFound';
import LoadingBig from '../Error/Loading/LoadingPage';

import './Notes.scss';
import '../styles/Buttons.scss'
import '../styles/Forms.scss'

class Notes extends React.Component {

    state = { notes: [], noteHeader: '', note: '', noteId: null, newNote: '', newNoteHeader: '', popupIsActive: false, addActive: false, updateActive: false, isLoged: null }

    checkLoginReq() {  
        axios({
           method: 'POST',
           url: `${url}/checklogin`,
           data: Cookies.get(),
       })
       .then(response =>  {
        if (response.data.note === 'verified') {
            this.setState({ isLoged: true })
        } else {
            this.setState({ isLoged: false })
        }
       })
       .catch(err => console.log(err));
   }

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

      wheel() {
          this.setState({ addActive: false })
      }

       componentDidMount()  {
        this.checkLoginReq();
        this.getNotes()
     }

      
    renderNotes() {
            if(this.state.notes) {
                const listItem = this.state.notes.map((note ,i) => {
                    return (  
                        <li className='notelist__item' key={i}>
                            <h2 className='notelist__header'>{note.noteHeader}</h2>
                            <p className='notelist__text'>{note.note}</p>                               
                            <div className='notelist__box'>
                                <Popup open={this.state.updateActive}  trigger={  
                                <form className='notelist__btns' 
                                    onSubmit={(e) => {this.getNoteContentControler(); this.getNoteContent(e, note.id)}}> 
                                        <button className='btn__responsive-yellow' type='submit'  >Edit note</button> 
                                 </form>} position="top left">
                                        <form className='notelist__popup-editnote' onSubmit={this.updateNote.bind(this)}>
                                            <input className='form__input-small' placeholder='Note header' value={this.state.noteHeader} onChange={e => this.setState({ noteHeader: e.target.value })} />
                                            <textarea className='form__textarea-big' placeholder='Your note' value={this.state.note} onChange={e => this.setState({ note: e.target.value })}></textarea>
                                            <button className='btn__add-popup' type='submit' onClick={() => this.setState({ updateActive: true })}>Update</button>
                                        </form>
                                </Popup>
                                <button className='notelist__btns btn__responsive-red' onClick={() => this.deleteNote(note.id)}>Delete</button>
                            </div>    
                        </li>
                    )
                })
                return <ul className='notelist'>{listItem}</ul>
        }
    }
    
    render() { 
        if(this.state.isLoged === false) {
            return <NotFoundLoged />
        } else if (this.state.isLoged === null) {
            return <LoadingBig />
        } else {
            return (
                <div className='notes'>
                    
                    {this.renderNotes()}            
                    <div className='notes__box'>
                    <Popup open={this.state.addActive} trigger={<button className='btn__responsive-yellow'>Add note +</button>} position="top center">
                            <form className='notes__popup-addnote' onSubmit={this.createNote.bind(this)}>
                                <input className='form__input-small' placeholder='Note header' value={this.state.newNoteHeader} onChange={e => this.setState({ newNoteHeader: e.target.value })} />
                                <textarea className='form__textarea-big' placeholder='Your note' value={this.state.newNote} onChange={e => this.setState({ newNote: e.target.value })}></textarea>
                                <button className='btn__add-popup' type='submit' onClick={() => this.setState({ addActive: !this.state.addActive })}>Create note</button>
                            </form>
                    </Popup>
                    </div>
                </div>
            )        
        }
            
    }
};   

export default Notes;