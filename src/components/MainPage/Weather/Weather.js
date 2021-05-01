import React from 'react';
import axios from 'axios';

import { url } from '../../url';

import LoadingNormal from '../../Error/Loading/LoadingNormal';

import './Weather.scss';
import '../../styles/Buttons.scss'



class Notes extends React.Component {

    state = { lat: null, lng: null, town: '', temperature: null, icon: '', windspeed: null, pressure: null };

    getWeather() { 
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err  => console.log(err))
        
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lng: position.coords.longitude }),
            err  => console.log(err))
        
            setTimeout(() => { //its retarded so i have to wait for the coords
                 axios({
                  method: 'POST',
                  url: `${url}/getweather`,
                  data: this.state, 
              })
              .then(async response =>  {
                  await this.setState({ town: response.data.town, temperature: response.data.temperature, icon: response.data.icon, windspeed: response.data.windspeed, pressure: response.data.pressure })
              })
              .catch(err => console.log(err));
             }, 10);       
    }
    componentDidMount() {
        this.getWeather();
    }
    
    render() { 
        if (this.state.pressure === null) {
            return <LoadingNormal />
        } else {
            return (
                <div className='weather'>
                    <h2 className='weather__town'>{this.state.town}</h2>
                    <button className='weather__refresh btn__refresh-small' onClick={() => this.getWeather()}>
                        <img src='/images/svg/refresh-yellow.svg' alt='refresh-icon'></img>
                    </button>
                    <div className='weather__box'>
                        <img className='weather__icon' src={this.state.icon} alt='weather-icon' />
                    </div>
                    <h2 className={(this.state.temperature > 0) ? 'weather__temperature weather__temperature-orange' : 'weather__temperature weather__temperature-blue'}>{this.state.temperature} °C</h2>
                    <div className='weather__moreinfo'>
                        <h3 className='weather__windspeed'>Wind speed: {this.state.windspeed} km/h</h3>
                        <h3 className='weather__pressure'>Pressure: {this.state.pressure} mbar</h3>
                    </div>
                </div>
            )    
        }  
    }
};   

export default Notes;