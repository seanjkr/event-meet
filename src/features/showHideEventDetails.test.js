import { loadFeature, defineFeature } from 'jest-cucumber';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from "../mock-data";

const feature = loadFeature( './src/features/showHideEventDetails.feature' );

defineFeature( feature , test => {

  test( 'An event element is collapsed by default' , ({ given, and, when, then }) => {

    let EventWrapper;
    let event;

    beforeAll(() => {
      event = mockData[0];
    });

    given( 'the user has the app open' , () => {

    });

    and( 'has a list of events open', () => {
      EventWrapper = shallow( <Event event = { event } /> );
    });

    when( 'the app displays a list of events', () => {
      expect( EventWrapper.find( '.title' ).text()).toBe( event.summary );
    });

    then('the events are collapsed and only show basic information', () => {
      expect( EventWrapper.find( '.time' ).text()).toBe( event.start.dateTime );
      expect( EventWrapper.find( '.location' ).text()).toBe( event.location );
      expect( EventWrapper.find( '.details-btn' )).toHaveLength(1);
      expect( EventWrapper.find( '.description' )).toHaveLength(0);
      expect( EventWrapper.find( '.organizer' )).toHaveLength(0);
      expect( EventWrapper.find( '.eventLink')).toHaveLength(0);
    });

  });

  test('User can expand an event to see its details', ({ given, and, when, then }) => {

    let EventWrapper;
    let event;

    beforeAll(() => {
      event = mockData[0];
    });


    given( 'the user has the app open', () => {

    });

    and( 'is viewing a list of events' , () => {
      EventWrapper = shallow( <Event event = { event } /> );
    });

    when('the user clicks on the “see more” button', () => {
      EventWrapper.find( '.details-btn' ).simulate( 'click' );
    });

    then('the event will expand and show details', () => {
      expect( EventWrapper.find( '.title' ).text()).toBe( event.summary );
      expect( EventWrapper.find( '.time' ).text()).toBe( event.start.dateTime );
      expect( EventWrapper.find( '.location' ).text()).toBe( event.location );
      expect( EventWrapper.find( '.description' ).text()).toBe( event.description );
      expect( EventWrapper.find( '.organizer' ).text()).toBe( event.organizer.email );
      expect( EventWrapper.find( '.eventLink')).toHaveLength( 1 );
    });

  });

  test('User can collapse an event to hide its details', ({ given, and, when, then }) => {

    let EventWrapper;
    let event;

    beforeAll(() => {
      event = mockData[0];
    });

    given('the user has a list of events', () => {
      EventWrapper = shallow( <Event event = { event } /> );
      expect( EventWrapper.find( '.title' ).text()).toBe( event.summary );
      expect( EventWrapper.find( '.description' )).toHaveLength(0);

    });

    and('the user has selected to see more on a given event', () => {
      EventWrapper.find( '.details-btn' ).simulate( 'click' );
      expect( EventWrapper.find( '.description' ).text()).toBe( event.description );
      expect( EventWrapper.find( '.organizer' ).text()).toBe( event.organizer.email );
      expect( EventWrapper.find( '.eventLink')).toHaveLength( 1 );
    });

    when('the user clicks the same button again', () => {
      EventWrapper.find( '.details-btn' ).simulate( 'click' );
    });

    then('the event will collapse again and hide its details', () => {
      expect( EventWrapper.find( '.title' ).text()).toBe( event.summary );
      expect( EventWrapper.find( '.time' ).text()).toBe( event.start.dateTime );
      expect( EventWrapper.find( '.location' ).text()).toBe( event.location );
      expect( EventWrapper.find( '.details-btn' )).toHaveLength(1);
      expect( EventWrapper.find( '.description' )).toHaveLength(0);
      expect( EventWrapper.find( '.organizer' )).toHaveLength(0);
      expect( EventWrapper.find( '.eventLink')).toHaveLength(0);
    });

  });

});