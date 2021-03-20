import React from 'react';
import Popup from 'reactjs-popup';
import Cookies from 'js-cookie';
import axios from 'axios';

import 'reactjs-popup/dist/index.css';
import '../../FormsStyles/Buttons.scss'
import './NotePopup.scss'

 
class NoteAddPopup extends React.Component {

  state = { noteHeader: '', note: '' }

  createNote() { 
    axios({
        method: 'POST',
        url: 'https://nodejs-jarvis-backend.herokuapp.com/createnote',
        data: { cookies: Cookies.get(), note: this.state },
    })
    .then(response =>  {
        console.log(response.data.note)
    })
    .catch(err => console.log(err));
}


  render() {
    return(
      <Popup trigger={<button className='btn__big btn__big-grey popup__btn'> Add note +</button>} position="top center">
    <div className='popup'>
            <form className='popup__form' onSubmit={this.createNote.bind(this)}>
                <input className='popup__input' placeholder='Note header' value={this.state.noteHeader} onChange={e => this.setState({ noteHeader: e.target.value })} />
                <textarea className='popup__textarea' placeholder='Your note' value={this.state.note} onChange={e => this.setState({ note: e.target.value })}></textarea>
                <button className='btn__primary btn__primary-white' type='submit'>Create note</button>
            </form>
    </div>
  </Popup>
    )
  }
  
};

export default NoteAddPopup;