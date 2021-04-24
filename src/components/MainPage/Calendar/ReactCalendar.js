import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';

import { url } from '../../url';

import './ReactCalendar.scss';
import '../../styles/Forms.scss';
import '../../styles/Buttons.scss';


const ReactCalendar = () => { 
  const [date, setDate] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [from, setFrom] = useState('00:00');
  const [to, setTo] = useState('23:59');
  const [repeat, setRepeat] = useState('norepeat');
  const [note, setNote] = useState('');
  const [events, setEvents] = useState([]);
  const [daysWithEvents, setDaysWithEvents] = useState([]);

  const getEvents = (putedDate) => {
    axios({
      method: 'POST',
      url: `${url}/getevents`,
      data: { cookies: Cookies.get(), date: putedDate },
    })
    .then(response => {
      setEvents(response.data.events);
    })
    .catch(err => console.log(err))
  }

  const getDaysWithEvents = (putedDate) => {
    axios({
      method: 'POST',
      url: `${url}/getdayswithevents`,
      data: { cookies: Cookies.get(), date: putedDate },
    })
    .then(response => {
      setDaysWithEvents(response.data.daysWithEvents);
    })
    .catch(err => console.log(err))
  }
  
  useEffect(() => { 
    const currentDate = new Date(date);
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate()+1);

    getEvents(tomorrow); // bacause of heroku servers i have to add one day to fetch right data
    getDaysWithEvents(date);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps
          // removing the warning because its stupid :)
  

  const shortDate = (d) => {
    const date = new Date(d)
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${day}.${month+1}.${year}`
  }
  
  const onChange = (date) => {
    setDate(date);
    getEvents(date);
  }

  const addEvent = (e) => {
    e.preventDefault();
    if (eventName) { 
    axios({
      method: 'POST',
      url: `${url}/createevent`,
      data: { cookies: Cookies.get(), date: date, eventName, description, repeat, from, to  },
    })
    .then(response => {     
      console.log(response.data.events)
      setNote(response.data.note);
      setEvents(response.data.events);
      setDaysWithEvents(response.data.daysWithEvents);
      setEventName('');
      setDescription('');
      setFrom('00:00');
      setTo('23:59');
      setRepeat('');
      setTimeout(() => {
        setNote('');
      }, 2000);     
    })
    .catch(err => console.log(err));
    } else {
      setNote('Your event must have name')
      setTimeout(() => {
        setNote('');
      }, 2000);  
    }
  }

  const deleteEvent =  (e, repeat, id) => {
    e.preventDefault();
    if (repeat === 'only-this-date') {
      axios({
        method: 'POST',
        url: `${url}/deleteeventondate`,
        data: { cookies: Cookies.get(), eventId: id, date }
      })
      
      .then( response =>  {
        setEvents(response.data.events);
        setDaysWithEvents(response.data.daysWithEvents);
      })
      .catch(err => console.log(err))
    } else {  
      axios({
        method: 'POST',
        url: `${url}/deleteevent`,
        data: { cookies: Cookies.get(), eventId: id, date },
      })
      .then(response => {
        setEvents(response.data.events);
        setDaysWithEvents(response.data.daysWithEvents);
      })
      .catch(err => console.log(err))
    } 
  }

  const renderDeletePopup = (repeat, id) => {
    if (repeat === 'norepeat' || repeat === '') {
      return(
        <button className='btn__delete-big' onClick={(e) => deleteEvent(e, repeat, id)}>x</button>
      )
    } else {
      return(
        <Popup trigger={<button className='btn__delete-big'>x</button>} position="top center">   
          <div className='calendar__popup-content'>
            <button className='btn__delete-popup' onClick={(e) => deleteEvent(e, 'only-this-date', id)}>Delete only for this date</button>
            <button className='btn__delete-popup' onClick={(e) => deleteEvent(e, repeat, id)}>Delete for all other dates</button>
          </div>
        </Popup>
      )
      
    }
  }

  const renderEvents = () => {
    if (events.length === 0) {
      return <h3 className='calendar__events-no'>No events</h3>
    } else {
      return events.map((event, i) => {
        return(
          <li className='calendar__events-item' key={i}>
            <div>
              <h2 className='calendar__events-name'>{event.eventName}</h2> 
              <h4 className='calendar__events-repeated'>{ event.repeat === 'norepeat' ? 'no repeated' : `${event.repeat} repeated`}</h4>¨
              <p className='calendar__events-description'>{event.description}</p>
            </div> 
            <div  className='calendar__events-info'>
            <div className='calendar__events-time'>
              <h3 className='calendar__events-from'>{event.from}</h3>
              <h3 className='calendar__events-time--arrow'>---&gt;</h3>
              <h3 className='calendar__events-to'>{event.to}</h3>
            </div>
            <div>{renderDeletePopup(event.repeat, event.id)}</div>
            </div>
          </li>
        )
      })
    }
  }

  return (
    <div className='calendar'>
      <Calendar
        className='calendar__calendar'
        onChange={onChange}
        value={date}
        locale='EN'
        tileClassName={({ activeStartDate, date, view }) => {
          const theDate = new Date(date);
          const year = theDate.getFullYear();
          const month = theDate.getMonth();
          const day = theDate.getDate();
          if (daysWithEvents.find(x=>x===`${day}.${month+1}.${year}`)) {
            return 'highlight'
          }
        }}
      />
      <div className='calendar__form-box'>
        <form className='calendar__form' onSubmit={(e) => addEvent(e)}>
          <input className='form__input-small calendar__form-item' type='text' placeholder='EVENT NAME' value={eventName} onChange={e => setEventName(e.target.value)}/>
          <textarea className='form__textarea-small calendar__form-item' type='textarea' placeholder='DESCRIPTION' value={description} onChange={e => setDescription(e.target.value)} />
          <select className='form__select-small calendar__form-item' name="repeat" id="reapeat" value={repeat} onChange={e => setRepeat(e.target.value)}>
          <option className='form__option-small' value="norepeat">no reapeat</option>
            <option className='form__option-small' value="weekly">reapeat weekly</option>
            <option className='form__option-small' value="monthly">reapeat monthly</option>
            <option className='form__option-small' value="yearly">reapeat yearly</option>
          </select>
          <div className='calendar__form-time calendar__form-item'>
            <div className='calendar__form-time--box'>
              <input className='form__time' type='time' value={from} onChange={e => setFrom(e.target.value)} />
              <h3>----&gt;</h3>
              <input className='form__time' type='time' value={to} onChange={e => setTo(e.target.value)} />
            </div>
            <div>
              <button className='btn__add' type='submit'>+</button>
            </div>
          </div>
          
          <h3 className={ note === 'successfuly created' ? 'calendar__form-note calendar__form-note--succ' : 'calendar__form-note calendar__form-note--err'}>{note}</h3>
        </form>

      </div>

      <div className='calendar__events'>
        <h2 className='calendar__header'>{`Events at: ${shortDate(date)}`}</h2>
        <ul className='calendar__events-list'>
          {renderEvents()}
        </ul>
      </div>
    </div>
  );
};

export default ReactCalendar;