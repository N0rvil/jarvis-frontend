import React from 'react';
import axios from 'axios';

import './Weather.scss';
import '../../FormsStyles/Buttons.scss'

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
                  url: 'http://localhost:3006/getweather',
                  data: this.state, 
              })
              .then(async response =>  {
                  console.log(response.data)
                  await this.setState({ town: response.data.town, temperature: response.data.temperature, icon: response.data.icon, windspeed: response.data.windspeed, pressure: response.data.pressure })
              })
              .catch(err => console.log(err));
             }, 10);
              
    }

    componentDidMount() {
        this.getWeather();
    }

    
    render() { 
            return (
                <div className='weather'>
                    <h2 className='weather__town'>{this.state.town}</h2>
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
};   


export default Notes;