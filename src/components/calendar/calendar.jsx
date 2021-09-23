import React from 'react'
import './calenderStyle.css'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Card from '@mui/material/Card';
import axios from 'axios'
import CircularIndeterminate from '../loading/loading'
export default class DemoApp extends React.Component {
  state = {
    weekendsVisible: true,
    currentEvents: [],
    placeName: this.props.placeName,
    course_id: this.props.courseID,
    place_id: this.props.placeID,
    description: this.props.description,
    isLoading: true,
    isAdmin: this.props.isAdmin,
    calendarEvents: []
  }
 
  render() {
    return (
      <div className='component-calander-container'>
        {
        !this.state.isLoading 
        ? 
        <div className='calendar-card'>
          <Card>
            <div className='calendar-main'>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={this.state.weekendsVisible}
                initialEvents={this.state.calendarEvents} // alternatively, use the `events` setting to fetch from a feed
                select={this.handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={this.handleEventClick}
                eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                eventChange={function(s){console.log(s);}}
                /* you can update a remote database when these fire:
                eventAdd={function(){}}
                eventChange={function(){}}
                eventRemove={function(){}}
                */
              />
            </div>
          </Card>
          </div> : CircularIndeterminate
  }
          <p style={{position:"absolut", buttom: 0}}>place id: {this.state.place_id} course_id: {this.state.course_id} name: {this.props.placeName}</p>
      </div>
    )
  }
  componentDidMount = async () => {
    this.updateCalendar(await this.getDates()) 
  }
  getDates = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/reservations?place_id=${this.state.place_id}`)
    console.log(response);
    return response.data
  }

  updateCalendar = (dataList) => {
    const tempArr = []
    dataList.forEach(item => {
      tempArr.push(
        {
          id: item.reservation_id,
          title: item.display_name,
          start: item.start_time,
          end: item.end_time,
          course_id: item.course_id,
          allDay: false
        }
      )
    })
    this.setState({...this.state, calendarEvents: tempArr})
    this.setState({...this.state,isLoading: false})
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }
    
  handleDateSelect =  async (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection
    const article = { 
      headers: {'Content-Type': 'application/json'}
      };
    const response = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/reservations`, 
    { 
      place_id: this.state.place_id,
      course_id: this.state.course_id,
      start_time: selectInfo.start,
      end_time: selectInfo.end
    }, article);

    // add indication of success
  }

  handleEventClick = (clickInfo) => {
    console.log(clickInfo);
      if(this.props.isAdmin || clickInfo.event._def.extendedProps.course_id === this.props.course_id){
      if(prompt("are you sure you want to delete? (type YES)")){
        axios.delete(`${process.env.REACT_APP_API_ADDRESS}/reservations/${clickInfo.event._def.publicId}`)
      }
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }
} // end of class

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}
