import React, { Component } from 'react';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { OfflineAlert } from './Alert';

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


  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (

      <div className = "App">

        <OfflineAlert text = {this.state.offlineText } />

        <CitySearch locations = { this.state.locations } updateEvents = { this.updateEvents } />

        <NumberOfEvents eventNumber = { this.state.eventNumber } updateEventNumber = { this.updateEventNumber } />

        <EventList events = { this.state.viewedEvents } />

      </div>
    );
  }
}
export default App;
