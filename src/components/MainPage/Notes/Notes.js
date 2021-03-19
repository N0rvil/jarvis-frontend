import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


import NoteAddPopup from './NoteAddPopup';
import NoteEditPopup from './NoteEditPopup';

import './Notes.scss';
import '../../FormsStyles/Buttons.scss'

class Notes extends React.Component {

    state = { notes: [] }

    getNotes()  { 
        axios({
            method: 'POST',
            url: 'http://localhost:3006/getnotes',
            data: Cookies.get(),
        })
        .then(response => {       
            this.setState({ notes: response.data.notes })
        })
        .catch(err => console.log(err));
    }

    async componentDidMount()  {
       await this.getNotes()
    }

    deleteNote(id) {
        axios({
            method: 'POST',
            url: 'http://localhost:3006/deletenote',
            data: { id: id }, //data must be a object
        })
        .then(response => {    
            window.location.reload(); //Reloading the page
        })
        .catch(err => console.log(err));
    }

    

    

    renderNotes() {
        const listItem = this.state.notes.map((note ,i) => {
            return (  
                <li className='notelist__item' key={i}>
                    <h2 className='notelist__header'>{note.noteHeader}</h2>
                    <div className='notelist__content'>
                        <p className='notelist__text'>{note.note}</p>
                        <div className='notelist__box'>
                            <NoteEditPopup noteId={note.id} />
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
                        <NoteAddPopup className='notes__btn' />
                    </div>
                </div>
            )        
    }
};   


export default Notes;