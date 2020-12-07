import React from 'react';
import { shallow } from 'enzyme';

import NumberOfEvents from '../NumberOfEvents';

import { mockData } from '../mock-data';

describe( '<NumberOfEvents /> component' , () => {

  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow( <NumberOfEvents /> );
  });

  test( 'render numberOfEvents input ' , () => {
    expect( NumberOfEventsWrapper.find( '.numberOfEvents' )).toHaveLength(1);
  });

  test( 'render numberOfEvents input correctly' , () => {
    const numberOfEvents = NumberOfEventsWrapper.state( 'numberOfEvents' );
    expect( NumberOfEventsWrapper.find( '.numberOfEvents' ).prop( 'value' )).toBe( numberOfEvents );
   });

   test( 'render 32 by default' , () => {
    expect( NumberOfEventsWrapper.find( '.numberOfEvents' ).prop( 'value' )).toBe( 32 );
  });

  test( 'change state when numberOfEvents input changes' , () => {
    const eventObject = { target : { value : 14 } };
    NumberOfEventsWrapper.find( '.numberOfEvents' ).simulate( 'change' , eventObject );
    expect( NumberOfEventsWrapper.state( 'numberOfEvents' )).toBe( 14 );
  });

});