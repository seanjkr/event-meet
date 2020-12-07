import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  }


  handleNumberChange = ( event ) => {
    const value = event.target.value;
    this.setState({
      numberOfEvents : value
    });
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