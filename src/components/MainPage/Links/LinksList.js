import React from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';

import { url } from '../../url';

import './LinksList.scss';
import '../../FormsStyles/Buttons.scss';


class Links extends React.Component {
    state = { links: [], categoryId: this.props.categoryId, linkName: '', url: '', color: '#DACFCF', deleteActive: false, createActive: false }

   async getLinks(categoryId) {
        await axios({
            method: 'POST',
            url: `${url}/getlinks`,
            data: { categoryId: categoryId },
        })
        .then(response => {   
             this.setState({ links: response.data.links })
             
        })
        .catch(err => console.log(err));
    }

    createLink(e) {
        e.preventDefault()  
        this.setState({ createActive: false })
        axios({
            method: 'POST',
            url: `${url}/createlink`,
            data: this.state
        })
        .then(response => {       
            this.setState({ links: response.data.links, linkName: '', url: '' })  
        })
        .catch(err => console.log(err));
      }

    deleteLink(e, id) {
        e.preventDefault()  
       
        axios({
            method: 'POST',
            url: `${url}/deletelink`,
            data: { id: id, categoryId: this.state.categoryId }
        })
        .then(response => {       
            this.setState({ links: response.data.links })  
        })
        .catch(err => console.log(err));
    }
    
    renderLinks() {
        const link = this.state.links.map((link, i) => {
            return (
                <div className='links__list-item'  style={{backgroundColor: link.color}}  key={i}>
                    <a className='links__list-link' href={link.url}>{link.linkName}</a>
                    <Popup open={this.state.deleteActive} className='delete-popup'  trigger={<button className='btn__small-circle'>X</button>} position="top center">
                        <div>
                            <h2 className='delete-popup__header'>Are you sure ?</h2>
                            <div className='delete-popup__box'>
                                <button className='btn__primary btn__primary-red delete-popup__btn'  onClick={(e) => this.deleteLink(e, link.id)} >Yes delete</button>
                            </div>
                        </div>
                    </Popup>
                </div>
            )
        })
        return (
            <div className='links__list-box'>
                <div className='links__list-box--links'>{link}</div>
                <Popup open={this.state.createActive} className='addlink-popup' trigger={<button className='categorylist__btn btn__circle btn__circle-grey'>+</button>} position="top center">
                    <div className='popup__links-addlink'>
                            <form className='popup__links-addlink--form' onSubmit={this.createLink.bind(this)}>
                                <input className='popup__input popup__links-addlink--input' placeholder='Link name' value={this.state.linkName} onChange={e => this.setState({ linkName: e.target.value })} />
                                <input className='popup__input popup__links-addlink--input' placeholder='Url' value={this.state.url} onChange={e => this.setState({ url: e.target.value })} />
                                <input className='popup__input popup__links-addlink--input' type='color' value={this.state.color} onChange={e => this.setState({ color: e.target.value })} />
                                <button className='btn__primary btn__primary-white' type='submit' onClick={() => this.setState({ createActive: true })}>Add link</button>
                            </form>
                    </div>
                </Popup>
            </div>
            )
    }

    

    componentDidMount() {    
        this.getLinks(this.props.categoryId);
    }
  

    render() { 
        
        return (       
            <div>{this.renderLinks()}</div>
        )        
    }
};   


export default Links;