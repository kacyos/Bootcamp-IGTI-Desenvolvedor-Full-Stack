import React, { Component } from "react";

export default class Station extends Component {
  
  handleStationChange = (event) => {      
      const newStation = event.target.value;
      this.props.onStationChange(newStation)
  }
  
    render() {
    const { station } = this.props;
    const {stationStyle} = styles;

    return (
      <>
        <input style={stationStyle} type="text" value={station} />
        <input
          type="range"
          value={station}
          min="88.5"
          max="108"
          step="0.1"
          onChange={this.handleStationChange}          
        />
      </>
    );
  }
}

const styles = {
  stationStyle: {
    width:"200px",
    border:"1px solid #ccc",
    fontSize: "1.2rem",
    borderRadius: "10px",
    textAlign: "center"
  }
}
