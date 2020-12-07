import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';
import { mockData } from "../mock-data";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {

    let AppWrapper;

    given('the user has the app open', () => {
      AppWrapper = mount( <App /> );
    });

    when('the user searches for events', () => {

    });

    then( 'the user will receive a list of 32 events' , () => {
      expect( AppWrapper.state( 'eventNumber' )).toBe( 32 );
    });

  });

  test('User can change the number of events they want to see', ({ given, and, when, then }) => {

    let AppWrapper;

    given('the user has the app open', () => {
      AppWrapper = mount( <App /> );
    });

    and( 'is viewing a list of events' , () => {
      AppWrapper.update();
      expect( AppWrapper.find( '.event' )).toHaveLength( mockData.length );      
    });

    when('the user changes the number of events to see', () => {
      const eventNumberInput = AppWrapper.find( '.numberOfEvents' );
      const numberUpdate = { target : { value : 4 } };
      eventNumberInput.simulate( 'change' , numberUpdate );
      eventNumberInput.simulate( 'keypress' , { key : 'Enter' });
      expect( AppWrapper.state( 'eventNumber' )).toBe( 4 );
    });

    then('the app will display that many events', () => {
      expect( AppWrapper.find( '.event' )).toHaveLength( 4 );
    });

  });

});