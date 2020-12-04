import React, { Component } from 'react';

class Event extends Component {
  state = {
    seeMore: false
  }

  handleSeeMore = () => {
    if( this.state.seeMore === false) {
      this.setState({ seeMore : true });
    }
    else {
      this.setState({ seeMore : false });
    }
  }

  render() {

    const seeMore = this.state.seeMore;
    const { event } = this.props;

    return (

      <div className = "event" >
        <h2 className = "title">{ event.summary }</h2>
        <p> Time : <span className = "time">{ event.start.dateTime }</span> </p>
        <p> Location : <span className = "location">{ event.location }</span></p>
        <button className = "seeMore" onClick = {() => this.handleSeeMore() } > See More </button>
        <div>
          { this.state.seeMore && (
            <div className = "more">
              <p> Organizer : <span className = "organizer">{ event.organizer.email }</span> </p>
              <p> Event Page : <span className = "eventLink">{ event.htmlLink }</span></p>
              <p> Description : <span className = "description">{ event.description }</span></p>
            </div>
          )}
        </div>
      </div>

    );
  }
}

export default Event;