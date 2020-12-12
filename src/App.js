import React, { Component } from 'react';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import { extractLocations , getEvents } from './api.js';

import './App.css';
import './nprogress.css';

class App extends Component {
  state = {
    events : [],
    viewedEvents : [],
    locations : [],
    eventNumber : 32
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then(( events ) => {
      if ( this.mounted ) {
        this.setState({ viewedEvents: events , locations: extractLocations(events) });
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


  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (

      <div className = "App">

        <CitySearch locations = { this.state.locations } updateEvents = { this.updateEvents } />

        <NumberOfEvents eventNumber = { this.state.eventNumber } updateEventNumber = { this.updateEventNumber } />

        <EventList events = { this.state.viewedEvents } />

      </div>
    );
  }
}
export default App;
