import React from 'react';
import { shallow } from 'enzyme';

import NumberOfEvents from '../NumberOfEvents';

import { mockData } from '../mock-data';

describe( '<NumberOfEvents /> component' , () => {

  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow( <NumberOfEvents /> );
  });

  test( 'render eventNumber input ' , () => {
    expect( NumberOfEventsWrapper.find( '.eventNumber' )).toHaveLength(1);
  });

  test( 'render eventNumber input correctly' , () => {
    const eventNumber = NumberOfEventsWrapper.state( 'eventNumber' );
    expect( NumberOfEventsWrapper.find( '.eventNumber').prop( 'value' )).toBe( eventNumber );
   });

   test( 'render 32 by default' , () => {
    expect( NumberOfEventsWrapper.find( '.eventNumber').prop( 'value' )).toBe( 32 );
  });

  test( 'change state when eventNumber input changes' , () => {
    const eventObject = { target : { value : 14 } };
    NumberOfEventsWrapper.find( '.eventNumber' ).simulate( 'change' , eventObject );
    expect( NumberOfEventsWrapper.state( 'eventNumber' )).toBe( 14 );
  });

});