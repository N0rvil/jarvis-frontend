import React from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2'

import { url } from '../../url';

import './Graphs.scss';

class Graphs extends React.Component {

    state = { crypto: 'bitcoin', time: 1, test: null, values: [], labels: [], cryptoPrice: null, cryptoChange: null }

    async getCryptoData(crypto) {
        axios({
            method: 'POST',
            url: `${url}/getcryptodata`,
            data: { crypto: crypto }
        })
        .then(response => {
            this.setState({ cryptoPrice: response.data.price, cryptoChange: response.data.change })
        })
        .catch(err => console.log(err))
    }

    async getCrypto() {
        axios({
            method: 'POST',
            url: `${url}/getselectedcrypto`,
            data: this.state
        })
        .then(response => {                  
            this.setState({ values: response.data.prices, labels: response.data.times })
        })
        .catch(err => console.log(err));
    }

    async getSelectedCrypto(e, value) {
        if (isNaN(value)) {
            await this.setState({ crypto: value });
            
        } else {
            await this.setState({ time: value });
        }
        e.preventDefault()  
        axios({
            method: 'POST',
            url: `${url}/getselectedcrypto`,
            data: this.state
        })
        .then(response => {       
            this.setState({ values: response.data.prices, labels: response.data.times })
        })
        .catch(err => console.log(err));
    }


  componentDidMount() {
    this.getCrypto();
    this.getCryptoData(this.state.crypto);

    setInterval(() => { 
        this.getCryptoData(this.state.crypto);
     }, 1000 * 60);
  }

    render() {
        return (
            <div className='graphs'>
                <div className='graphs__graph'>
                <Line
                    data={{
                        labels: this.state.labels,
                        datasets: [
                          {
                            label: this.state.crypto.toUpperCase(),
                            data: this.state.values,
                            fill: true,
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(75,192,192,1)"
                          },
                
                        ]
                    }}
                    options={{ maintainAspectRatio: false }} 
                />
                </div>
                <div className='graphs__data'>
                    <form className='graphs__data-form' id='crypto-form'>
                    <h2 className='graphs__data-header'>Select</h2>
                        <select className='graphs__data-select' name="crypto" id="select-crypto" value={this.state.crypto} onChange={(e) => {this.getSelectedCrypto(e, e.target.value); this.getCryptoData(e.target.value)}}>
                            <option className='graphs__data-option' value="bitcoin">Bitcoin</option>
                            <option className='graphs__data-option' value="ethereum">Ethereum</option>
                            <option className='graphs__data-option' value="dogecoin">Dogecoin</option>
                        </select>
                        <select className='graphs__data-select' name="time" id="select-time" value={this.state.time} onChange={(e) => this.getSelectedCrypto(e, e.target.value)}>
                            <option className='graphs__data-option' value={1}>1 Day</option>
                            <option className='graphs__data-option' value={30}>30 Days</option>
                            <option className='graphs__data-option' value={365}>1 Year</option>
                        </select>
                    </form>
                    <div className='graphs__data-info'>
                        <h2 className='graphs__data-header'>Actual Price</h2>
                        <h1 className='graphs__data-price'>{this.state.cryptoPrice}$</h1>
                        <h2 className='graphs__data-header'>Last 24 hours</h2>
                        <h1 className={  (this.state.cryptoChange > 0) ? 'graphs__data-change--green graphs__data-change' : 'graphs__data-change--red graphs__data-change'}>{this.state.cryptoChange}%</h1>
                    </div>
                </div>
            </div>
        )     
    }

}
 


export default Graphs;