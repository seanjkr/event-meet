Feature: Specify Number of Events

Scenario: When user hasn’t specified a number, 32 is the default number
	  Given the user has the app open
	  When the user searches for events
	  Then the user will receive a list of 32 events


Scenario: User can change the number of events they want to see
	  Given the user has the app open 
		And is viewing a list of events
	  When the user changes the number of events to see
	  Then the app will display that many events
