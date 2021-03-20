import React from 'react';
import Popup from 'reactjs-popup';
import Cookies from 'js-cookie';
import axios from 'axios';

import history from '../../../history';

import 'reactjs-popup/dist/index.css';
import '../../FormsStyles/Buttons.scss'
import './NotePopup.scss'

import { url } from '../../url';

 
class NoteAddPopup extends React.Component {

  state = { noteHeader: '', note: '' }

  

  createNote(e) { 
  e.preventDefault()
    axios({
        method: 'POST',
        url: `${url}/createnote`,
        data: { cookies: Cookies.get(), note: this.state },
    })
    .then(response =>  {
      window.location.reload();
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