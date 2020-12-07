Feature: Show/Hide Event Details

Scenario: An event element is collapsed by default
	  Given the user has the app open
    And has a list of events open
	  When the app displays a list of events
	  Then the events are collapsed and only show basic information


Scenario: User can expand an event to see its details
	  Given the user has the app open
    And is viewing a list of events
	  When the user clicks on the “see more” button
	  Then the event will expand and show details

Scenario: User can collapse an event to hide its details
	  Given the user has a list of events
    And the user has selected to see more on a given event
	  When the user clicks the same button again
	  Then the event will collapse again and hide its details