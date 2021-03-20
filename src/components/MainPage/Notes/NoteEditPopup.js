import React from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';

import 'reactjs-popup/dist/index.css';
import '../../FormsStyles/Buttons.scss';
import './NotePopup.scss';

import { url } from '../../url';

 
class NoteAddPopup extends React.Component {


  state = { noteHeader: '', note: '', noteId: null, popupIsActive: true }

  
    //Create function that on click on button with edit note will fetch old text and header from the note what user want to edit

    getNoteContent(e, id) {
      if (this.state.popupIsActive === true) {
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
      } else {
        e.preventDefault();
      }
      
    }

    updateNote() {
      axios({
        method: 'POST',
        url: 'https://nodejs-jarvis-backend.herokuapp.com/updatenote',
        data: this.state //data must be a object
      })
    }

    getNoteContentControler() {
      if (this.state.popupIsActive === false) {
        this.setState({ popupIsActive: true })   
      } else {
        this.setState({ popupIsActive: false })
      }
    }
    
    

  render() {
    return(
      <Popup  trigger={ <form onSubmit={(e) => {  this.getNoteContentControler(); this.getNoteContent(e, this.props.noteId)}}> <button className='btn__primary btn__primary-white' type='submit'  >Edit note</button>  </form>} position="top center">
    <div className='popup'>
            <form className='popup__form' onSubmit={this.updateNote.bind(this)}>
                <input className='popup__input' placeholder='Note header' value={this.state.noteHeader} onChange={e => this.setState({ noteHeader: e.target.value })} />
                <textarea className='popup__textarea' placeholder='Your note' value={this.state.note} onChange={e => this.setState({ note: e.target.value })}></textarea>
                <button className='btn__primary btn__primary-white' type='submit'>Update</button>
            </form>
    </div>
  </Popup>
    )
  }
  
};

export default NoteAddPopup;