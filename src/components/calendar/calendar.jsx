import React from 'react'
import './calenderStyle.css'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Card from '@mui/material/Card';
import axios from 'axios'
import CircularIndeterminate from '../loading/loading'
import Navbar from '../navbar/navbar'
import Description from './description'

export default class DemoApp extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: [],
    placeName: this.props.location.params.PlaceName,
    userDisplayName: this.props.location.params.course.display_name,
    course_id: this.props.location.params.course.course_id,
    place_id: this.props.location.params.placeID,
    description: this.props.location.params.description,
    isLoading: true,
    isAdmin: this.props.location.params.course.is_admin,
    calendarEvents: []
  }

  render() {
    console.log(this.props)
    console.log(this.state);
    return (
      <div className='component-calander-container'>
        <div className="calendarNav">
        <Navbar/>
        </div>
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
                    eventChange={function (s) { console.log(s); }}
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
        <Description name={`${this.state.placeName}`} description={`${this.state.description}`} />
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
    this.setState({ ...this.state, calendarEvents: tempArr })
    this.setState({ ...this.state, isLoading: false })
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = async (selectInfo) => {
    let title = this.props.userDisplayName
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection
    const article = {
      headers: { 'Content-Type': 'application/json' }
    };
    const response = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/reservations`,
      {
        place_id: this.state.place_id,
        course_id: this.state.course_id,
        start_time: selectInfo.start,
        end_time: selectInfo.end
      }, article);

    console.log(response.data);

    calendarApi.addEvent({
      id: response.data,
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    })
  }

  handleEventClick = async (clickInfo) => {
    if (this.props.isAdmin || clickInfo.event._def.extendedProps.course_id === this.props.course_id) {
      if (prompt("are you sure you want to delete? (type YES)")) {
        axios.delete(`${process.env.REACT_APP_API_ADDRESS}/reservations/${clickInfo.event._def.publicId}`)
        clickInfo.event.remove()
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

