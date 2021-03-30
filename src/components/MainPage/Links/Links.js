import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';

// import history from '../../history';

import { url } from '../../url';
import LinksList from './LinksList';

import './Links.scss';
import '../../FormsStyles/Buttons.scss';


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
        const category = this.state.categories.map((category ,i) => {
            return (  
                <li  key={i} className='categorylist__item'>
                    <div className='categorylist__item-box'>
                        <Popup  className='delete-popup'  trigger={<button className='btn__small-circle categorylist__item-btn'>X</button>} position="top center">
                            <div>
                                <h2 className='delete-popup__header'>Are you sure ?</h2>
                                <div className='delete-popup__box'>
                                    <button className='btn__primary btn__primary-red delete-popup__btn' onClick={(e) => this.deleteCategory(e, category.id)}>Yes delete</button>
                                </div>
                            </div>
                        </Popup>
                        <h2 className='categorylist__item-header'>{category.category}</h2>
                    </div>
                    <div className='categorylist__box'> 
                            <LinksList categoryId={category.id} />
                             
                    </div>

                </li>
            )
        })
        return <ul className='categorylist'>{category}</ul>
    }

    render() { 
        
        return (
            <div className='links'>
                <div className='links__box'>
                    {this.renderCategories()}
                </div>
                <div className='links__btn-box'>
                <Popup open={this.state.addCategoryActive} trigger={<button className='btn__big btn__big-grey popup__btn'> Add links category +</button>} position="top center">
                    <div className='popup__links-addcategory'>
                            <form className='popup__links-addcategory--form' onSubmit={this.createCategory.bind(this)} >
                                <input className='popup__input' placeholder='Category name' value={this.state.categoryName} onChange={e => this.setState({ categoryName: e.target.value })} />
                                <button className='btn__primary btn__primary-white' type='submit'>Create category</button>
                            </form>
                    </div>
                </Popup>
                </div>
                
            </div>
        )        
    }
};   


export default Links;