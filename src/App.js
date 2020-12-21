import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { OfflineAlert } from './Alert';
import EventTopic from './EventTopic';

import { extractLocations , getEvents } from './api.js';

import './App.css';
import './nprogress.css';

class App extends Component {
  state = {
    events : [],
    viewedEvents : [],
    locations : [],
    eventNumber : 32,
    offlineText : ''
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then(( events ) => {
      if ( this.mounted && !navigator.onLine ) {
        this.setState({ events : events, viewedEvents: events.slice( 0 , this.state.eventNumber ) , locations: extractLocations(events) , offlineText: 'You are offline' });
      }
      else {
        this.setState({ events : events , viewedEvents: events.slice( 0 , this.state.eventNumber ) , locations: extractLocations(events) });
      }
    });
  }

  updateEventNumber = ( numberOfEvents ) => {
    const events = this.state.events;
    const limitedEvents = events.slice( 0 , numberOfEvents );
    if ( events.length <= numberOfEvents ) {
      this.setState({
        eventNumber : events.length,
        viewedEvents : limitedEvents,
      })
    }
    else {
      this.setState({
        eventNumber : numberOfEvents,
        viewedEvents : limitedEvents,
      });
    }
  }

  updateEvents = ( location ) => {
    getEvents().then(( events ) => {
      const locationEvents = ( location === 'all' ) ?
      events : events.filter(( event ) => event.location === location );
      const eventNumber = this.state.eventNumber;
      const filteredEvents = locationEvents.slice( 0 , eventNumber );
      this.setState({
        events : locationEvents,
        viewedEvents : filteredEvents,
      });
    });
  }

  getData = () => {
    const  viewedEvents = this.state.viewedEvents;
    const locations = extractLocations( viewedEvents );
    const data = locations.map(( location ) => {
      const number = viewedEvents.filter(( event ) => event.location === location ).length
      const city = location.split( ',' ).shift()
      return { city , number };
    })
    return data;
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {

    return (

      <div className = "App">

        <header> 
          <h1 className="title" > Event-Meet </h1>
          <p> Event Directory for Everything Coding </p>
        </header>

        <OfflineAlert text = {this.state.offlineText } />

        <CitySearch locations = { this.state.locations } updateEvents = { this.updateEvents } />

        <NumberOfEvents eventNumber = { this.state.eventNumber } updateEventNumber = { this.updateEventNumber } />

        <div className= "data-vis">

          <EventTopic events = { this.state.viewedEvents } />

          <ResponsiveContainer height = {400} className = "charts" >

            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >

              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={ false } />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={ this.getData() } fill="#8884d8" />

            </ScatterChart>

          </ResponsiveContainer>

        </div>

        <EventList events = { this.state.viewedEvents } />

      </div>
    );
  }
}
export default App;
