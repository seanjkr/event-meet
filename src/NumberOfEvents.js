import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    infoText: ''
  }


  handleNumberChange = ( event ) => {
    const value = event.target.value;
    if (value <= 0) {
      this.setState({
        numberOfEvents: value,
        infoText: 'I mean, ya wanna see at least one event, right?',
      });
    } else {
      return this.setState({
        numberOfEvents: value,
        infoText: ''
      });
    }
  };

  handleEnter = ( event ) => {
    const numberOfEvents = this.state.numberOfEvents;
    if( event.key === 'Enter' ) {
      this.props.updateEventNumber( numberOfEvents );
    }
  }

  render() {

    return (

      <div className = "eventNumber">

        <ErrorAlert text={this.state.infoText} />

        <input 
          type = "text" 
          className = "numberOfEvents" 
          value = { this.state.numberOfEvents } 
          onChange = { this.handleNumberChange } 
          onKeyPress = { this.handleEnter }
        />
        
      </div>
    );
  }
}

export default NumberOfEvents;