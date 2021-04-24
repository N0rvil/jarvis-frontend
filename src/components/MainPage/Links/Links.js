import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';

import { url } from '../../url';

import LinksList from './LinksList';
import LoadingNormal from '../../Error/Loading/LoadingNormal';

import './Links.scss';
import '../../styles/Buttons.scss';
import '../../styles/Forms.scss';


class Links extends React.Component {
    state = { categories: [], categoryName: '', categoryId: null, addCategoryActive: false  }

    getCategories() {
        axios({
            method: 'POST',
            url: `${url}/getcategories`,
            data: Cookies.get(),
        })
        .then(response => {       
            this.setState({ categories: response.data.categories })     
        })
        .catch(err => console.log(err));
    }

    createCategory(e) {
        e.preventDefault();
        this.setState({ addCategoryActive: true })
        axios({
            method: 'POST',
            url: `${url}/createcategory`,
            data: { cookies: Cookies.get(), note: this.state },
        })
        .then(response =>  {
            this.setState({ categories: response.data.categories, categoryName: '', addCategoryActive: false })   
        })
        .catch(err => console.log(err));
      }

    deleteCategory(e, categoryId) {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${url}/deletecategory`,
            data: { cookies: Cookies.get(), categoryId: categoryId },
        })
        .then(response => {
            this.setState({ categories: response.data.categories }) 
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getCategories();
    }

    renderCategories() {
        if (this.state.categories.length === 0) {
            return (
                <div className='categorylist'>
                    <LoadingNormal />
                </div>
            )
        } else {
            const categories = this.state.categories.map((category ,i) => {
                return (  
                    <li className='categorylist__item' key={i}>
                        <div className='categorylist__item-box'>
                            <Popup trigger={<button className='btn__delete-small'>X</button>} position="top center">
                                <div className='popup__delete'>
                                    <h2 className=''>Are you sure ?</h2>                              
                                    <button className='btn__delete-popup' onClick={(e) => this.deleteCategory(e, category.id)}>Yes delete</button>
                                </div>
                            </Popup>
                            <h2 className='categorylist__item-header'>{category.category}</h2>
                        </div>
    
                            <LinksList categoryId={category.id} />                              
                    </li>
                )
            })
            return <ul className='categorylist'>{categories}</ul>
        }
    }

    render() {    
        return (
            <div className='links'>
                {this.renderCategories()}
             
                <Popup  open={this.state.addCategoryActive} trigger={<button className='btn__add-big links__add-btn'>Add category +</button>} position="top center">
                    <div className='links__popup-addcategory'>
                        <form className='links__popup-addcategory--form' onSubmit={this.createCategory.bind(this)} >
                            <input className='input__popup-small' placeholder='Category name' value={this.state.categoryName} onChange={e => this.setState({ categoryName: e.target.value })} />
                            <button className='btn__add-popup' type='submit'>Create category</button>
                        </form>
                    </div>
                </Popup>      
            </div>
        )        
    }
};   


export default Links;