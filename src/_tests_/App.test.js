import React from 'react';
import { shallow , mount } from 'enzyme';

import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

import { mockData } from '../mock-data';
import { extractLocations , getEvents } from '../api';

describe( '<App /> component' , () => {

  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow( <App /> );
  });

  test( 'render list of events' , () => {
    expect( AppWrapper.find( EventList )).toHaveLength(1);
  });

  test( 'render CitySearch' , () => {
    expect( AppWrapper.find( CitySearch )).toHaveLength(1);
  });

  test( 'render NumberOfEvents' , () => {
    expect( AppWrapper.find( NumberOfEvents )).toHaveLength(1);
  });

});

describe( '<App /> integration' , () => {
   
  test( 'App passes "events" state as a prop to EventList' , () => {
    const AppWrapper = mount( <App /> );
    const AppEventsState = AppWrapper.state( 'events' );
    expect( AppEventsState ).not.toEqual( undefined );
    expect( AppWrapper.find( EventList ).props().events).toEqual( AppEventsState );
    AppWrapper.unmount();
  });

  test( 'App passes "locations" state as a prop to CitySearch' , () => {
    const AppWrapper = mount( <App /> );
    const AppLocationsState = AppWrapper.state( 'locations' );
    expect( AppLocationsState ).not.toEqual( undefined );
    expect( AppWrapper.find( CitySearch ).props().locations).toEqual( AppLocationsState );
    AppWrapper.unmount();
  });

  test( 'get list of events matching the city selected by the user' , async () => {
    const AppWrapper = mount( <App /> );
    const CitySearchWrapper = AppWrapper.find( CitySearch );
    const locations = extractLocations( mockData );
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state( 'suggestions' );
    const selectedIndex = Math.floor( Math.random() * ( suggestions.length ));
    const selectedCity = suggestions[ selectedIndex ];
    await CitySearchWrapper.instance().handleItemClick( selectedCity );
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter( event => event.location === selectedCity );
    expect(AppWrapper.state( 'events' )).toEqual( eventsToShow );
    AppWrapper.unmount();
  });

  test( 'get list of all events when user selects "See all cities" ' , async () => {
    const AppWrapper = mount( <App /> );
    const suggestionItems = AppWrapper.find( CitySearch ).find( '.suggestions li' );
    await suggestionItems.at( suggestionItems.length -1 ).simulate( 'click' );
    const allEvents = await getEvents();
    expect( AppWrapper.state( 'events' )).toEqual( allEvents );
    AppWrapper.unmount();
  });

  test( 'App passes "eventNumber" state as prop to NumberOfEvents' , () => {
    const AppWrapper = mount( <App /> );
    const AppEventNumberState = AppWrapper.state( 'eventNumber' );
    expect( AppEventNumberState ).not.toEqual( undefined );
    expect( AppWrapper.find( NumberOfEvents ).props().eventNumber).toEqual( AppEventNumberState );
    AppWrapper.unmount();
  });

  test( 'user pressing enter in NumberOfEvents input box updates apps "eventNumber" state' , async () => {
    const AppWrapper = mount( <App /> );
    const suggestionItems = AppWrapper.find( CitySearch ).find( '.suggestions li' );
    await suggestionItems.at( suggestionItems.length -1 ).simulate( 'click' );
    await getEvents();
    const numberUpdate = { target : { value : 4 } };
    const NumberOfEventsUpdater = AppWrapper.find( NumberOfEvents ).find( '.numberOfEvents' );
    NumberOfEventsUpdater.simulate( 'change' , numberUpdate );
    NumberOfEventsUpdater.simulate( 'keypress' , { key : 'Enter' });
    expect( AppWrapper.state( 'eventNumber' )).toEqual( 4 );
    AppWrapper.unmount();
  });

  test( 'number of events shown matches "eventNumber" state, including when changed by user' , async () => {
    const AppWrapper = mount( <App /> );
    const suggestionItems = AppWrapper.find( CitySearch ).find( '.suggestions li' );
    await suggestionItems.at( suggestionItems.length -1 ).simulate( 'click' );
    await getEvents();
    const numberUpdate = { target : { value : Math.floor( Math.random() * 4 ) } };
    const NumberOfEventsUpdater = AppWrapper.find( NumberOfEvents ).find( '.numberOfEvents' );
    NumberOfEventsUpdater.simulate( 'change' , numberUpdate );
    NumberOfEventsUpdater.simulate( 'keypress' , { key : 'Enter' });
    const EventNumber = AppWrapper.state( 'eventNumber' );
    expect( AppWrapper.state().events).toHaveLength( EventNumber );
    AppWrapper.unmount();
  });

  test( 'having fewer available events than "eventNumber" state changes state to be equal to length of events array' , async () => {
    const AppWrapper = mount( <App /> );
    const suggestionItems = AppWrapper.find( CitySearch ).find( '.suggestions li' );
    await suggestionItems.at( suggestionItems.length -1 ).simulate( 'click' );
    await getEvents();
    const numberUpdate = { target : { value : 6 }};
    const NumberOfEventsUpdater = AppWrapper.find( NumberOfEvents ).find( '.numberOfEvents' );
    NumberOfEventsUpdater.simulate( 'change' , numberUpdate );
    NumberOfEventsUpdater.simulate( 'keypress' , { key : 'Enter' });
    const EventNumber = AppWrapper.state( 'eventNumber' );
    expect( AppWrapper.state().events).toHaveLength( EventNumber );
    AppWrapper.unmount();
  });

});