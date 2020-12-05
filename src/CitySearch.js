import React, { Component } from 'react';

class CitySearch extends Component {
  state = {
    query : '',
    suggestions : [],
    showSuggestions : false
  }

  handleInputChange = ( event ) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf( value.toUpperCase() ) > -1;
    });
    this.setState({
      query : value,
      suggestions,
    });
  };

  handleItemClick = ( suggestion ) => {
    this.setState({ 
      query : suggestion,
      showSuggestions : false
    });
    this.props.updateEvents( suggestion );
  }

  render() {

    return (

      <div className = "CitySearch">
        <input 
          type = "text" 
          className = "city" 
          value = { this.state.query } 
          onChange = { this.handleInputChange }
          onFocus = { () => { this.setState({ showSuggestions : true }) }}
        />
        <ul className = "suggestions" style = { this.state.showSuggestions ? {}: { display : 'none'}} > 
          { this.state.suggestions.map(( suggestion ) => (
            <li key = { suggestion } onClick = { () => this.handleItemClick( suggestion )} >{ suggestion }</li>
          ))}
          <li key='all' onClick = { () => this.handleItemClick( 'all' ) } >
            <b> See all cities </b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;