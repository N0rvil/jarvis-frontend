import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';

import { url } from '../../url';

import './ReactCalendar.scss';
import '../../FormsStyles/Forms.scss';
import '../../FormsStyles/Buttons.scss';


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
    getEvents(date); 
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
    console.log(date)
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
        <button className='btn__primary btn__primary-red' onClick={(e) => deleteEvent(e, repeat, id)}>Delete</button>
      )
    } else {
      return(
        <Popup trigger={<button className='btn__primary btn__primary-red'>Delete</button>} position="top center">
          <div className='popup__event-content'>
            <button className='btn__primary btn__primary-red' onClick={(e) => deleteEvent(e, 'only-this-date', id)}>Delete only for this date</button>
            <button className='btn__primary btn__primary-red' onClick={(e) => deleteEvent(e, repeat, id)}>Delete for all other dates</button>
          </div>
        </Popup>
      )
      
    }
  }

  const renderEvents = () => {
    return events.map((event, i) => {
      return(
        <li className='calendar__events-item' key={i}>
          <div>
            <h2 className='calendar__events-name'>{event.eventName}</h2> 
            <h4 className='calendar__events-repeated'>{ event.repeat === 'norepeat' ? 'no repeated' : `${event.repeat} repeated`}</h4>
          </div>
            <p className='calendar__events-description'>{event.description}</p>     
          <div className='calendar__events-time'>
            <h3 className='calendar__events-from'>From: {event.from}</h3>
            <h3 className='calendar__events-to'>To: {event.to}</h3>
            <div>{renderDeletePopup(event.repeat, event.id)}</div>
          </div>
        </li>
      )
    })
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
        <h2 className='calendar__header'>{`Add event to: ${shortDate(date)}`}</h2>
        <form className='calendar__form' onSubmit={(e) => addEvent(e)}>
          <input className='form__input-small' type='text' placeholder='Event name' value={eventName} onChange={e => setEventName(e.target.value)}/>
          <textarea className='form__textarea-small' type='textarea' placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
          <div className='calendar__form-time'>
            <input className='form__time' type='time' value={from} onChange={e => setFrom(e.target.value)} />
            <h3>-------&gt;</h3>
            <input className='form__time' type='time' value={to} onChange={e => setTo(e.target.value)} />
          </div>
          <select className='form__select-small' name="repeat" id="reapeat" value={repeat} onChange={e => setRepeat(e.target.value)}>
          <option className='form__option-small' value="norepeat">no reapeat</option>
            <option className='form__option-small' value="weekly">reapeat weekly</option>
            <option className='form__option-small' value="monthly">reapeat monthly</option>
            <option className='form__option-small' value="yearly">reapeat yearly</option>
          </select>
          <button className='btn__submit' type='submit'>Add event</button>
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