import React from 'react';

import './Graphs.scss';




class Graphs extends React.Component {

    state = { crypto: '' }

  
    render() {
        return (
            <div className='graphs'>
                <div className='graphs__graph'>GRAPH</div>
                <div className='graphs__data'>
                    <form className='graphs__data-form'>
                    <h2 className='graphs__data-header'>Select</h2>
                        <select className='graphs__data-select' name="crypto" id="select-crypto" value={this.state.crypto} onChange={(e) => this.setState({ crypto: e.target.value })}>
                            <option className='graphs__data-option' value="bitcoin">Bitcoin</option>
                            <option className='graphs__data-option' value="ethereum">Ethereum</option>
                            <option className='graphs__data-option' value="dogecoin">Dogecoin</option>
                        </select>
                    </form>
                    <div className='graphs__data-info'>
                        <h2 className='graphs__data-header'>Actual Price</h2>
                        <h1 className='graphs__data-price'>50000$</h1>
                        <h2 className='graphs__data-header'>Last 24 hours</h2>
                        <h1 className='graphs__data-percentage'>-1.5%</h1>
                    </div>
                </div>
            </div>
        )     
    }

}
 


export default Graphs;