import React from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';

import { url } from '../../url';

import './LinksList.scss';
import '../../styles/Buttons.scss';
import '../../styles/Forms.scss';


class Links extends React.Component {
    state = { links: [], categoryId: this.props.categoryId, linkName: '', url: '', color: '#272727', deleteActive: false, createActive: false }

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

    hexToRgb(hex) {
        return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
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
        const links = this.state.links.map((link, i) => {
            return (
                <li className='linkslist__item' style={{backgroundColor: `rgba(${this.hexToRgb(link.color)}, 0.6)`}}  key={i}>
                    <a className='linkslist__item-link' href={link.url}>{link.linkName}</a>

                    <Popup open={this.state.deleteActive} className='delete-popup'  trigger={<button className='btn__delete-small'>X</button>} position="top center">
                        <div className='popup__delete'>
                            <h2 className=''>Are you sure ?</h2>
                            <button className='btn__delete-popup'  onClick={(e) => this.deleteLink(e, link.id)} >Yes delete</button>
                        </div>
                    </Popup>
                </li>
            )
        })
        return (
            <div className='linkslist'>
                <ul className='linkslist__list'>{links}</ul>

                <Popup open={this.state.createActive} className='addlink-popup' trigger={<button className='btn__add'>+</button>} position="top center">
                    <div className='linkslist__popup-addlink'>
                            <form className='linkslist__popup-addlink--form' onSubmit={this.createLink.bind(this)}>
                                <input className='input__popup-small' placeholder='Link name' value={this.state.linkName} onChange={e => this.setState({ linkName: e.target.value })} />
                                <input className='input__popup-small' placeholder='Url' value={this.state.url} onChange={e => this.setState({ url: e.target.value })} />
                                <input className='input__popup-small' type='color' value={this.state.color} onChange={e => this.setState({ color: e.target.value })} />
                                <button className='btn__add-popup' type='submit' onClick={() => this.setState({ createActive: true })}>Add link</button>
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
        return this.renderLinks()
                
    }
};   


export default Links;