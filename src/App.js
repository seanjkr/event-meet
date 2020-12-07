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
    locations : [],
    eventNumber : 32
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then(( events ) => {
      if ( this.mounted ) {
        this.setState({ events , locations: extractLocations(events) });
      }
    });
  }

  updateEventNumber = ( numberOfEvents ) => {
    const events = this.state.events;
    if ( events.length <= numberOfEvents ) {
      this.setState({
        eventNumber : events.length
      })
    }
    else {
      const limitedEvents = events.slice( 0 , numberOfEvents );
      this.setState({
        eventNumber : numberOfEvents,
        events : limitedEvents
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
        events : filteredEvents
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

        <EventList events = { this.state.events } />

      </div>
    );
  }
}
export default App;
