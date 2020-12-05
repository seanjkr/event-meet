import React from 'react';
import { shallow } from 'enzyme';

import Event from '../Event';
import { mockData } from '../mock-data';

describe( '<Event /> component' , () => {

  let EventWrapper , event;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow( <Event event = { event } /> );
  });

  test( 'render event component' , () => {
    expect( EventWrapper.find( '.event' )).toHaveLength(1);
  });

  test( 'render basic info' , () => {
    expect( EventWrapper.find( '.title' ).text()).toBe( event.summary );
    expect( EventWrapper.find( '.time' ).text()).toBe( event.start.dateTime );
    expect( EventWrapper.find( '.location' ).text()).toBe( event.location );
    expect( EventWrapper.find( '.seeMore' )).toHaveLength(1);
  });

  test( 'hide details by default' , () => {
    expect( EventWrapper.find( '.description' )).toHaveLength(0);
    expect( EventWrapper.find( '.organizer' )).toHaveLength(0);
    expect( EventWrapper.find( '.eventLink')).toHaveLength(0);
  });

  test( 'show more information on click' , () => {
    EventWrapper.find( '.seeMore' ).simulate( 'click' );
    expect( EventWrapper.find( '.title' ).text()).toBe( event.summary );
    expect( EventWrapper.find( '.time' ).text()).toBe( event.start.dateTime );
    expect( EventWrapper.find( '.location' ).text()).toBe( event.location );
    expect( EventWrapper.find( '.description' ).text()).toBe( event.description );
    expect( EventWrapper.find( '.organizer' ).text()).toBe( event.organizer.email );
    expect( EventWrapper.find( '.eventLink')).toHaveLength( 1 );
  });

  test( 'hide details on click' , () => {
    EventWrapper.setState({
      seeMore : true
    })
    EventWrapper.find( '.seeMore').simulate( 'click' );
    expect( EventWrapper.find( '.title' ).text()).toBe( event.summary );
    expect( EventWrapper.find( '.time' ).text()).toBe( event.start.dateTime );
    expect( EventWrapper.find( '.location' ).text()).toBe( event.location );
    expect( EventWrapper.find( '.description' )).toHaveLength(0);
    expect( EventWrapper.find( '.organizer' )).toHaveLength(0);
    expect( EventWrapper.find( '.eventLink')).toHaveLength(0);

  });

});