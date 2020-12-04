import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventNumber : 32
  }

  handleNumberChange = ( event ) => {
    const value = event.target.value;
    this.setState({
      eventNumber : value
    });
  };

  render() {

    return (

      <div className = "numberOfEvents">
        <input type = "text" className = "eventNumber" value = { this.state.eventNumber } onChange = { this.handleNumberChange } />
      </div>
    );
  }
}

export default NumberOfEvents;