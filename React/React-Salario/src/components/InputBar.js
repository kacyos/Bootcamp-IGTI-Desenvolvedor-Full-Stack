import React, { Component } from 'react'

export default class InputBar extends Component {
  render() {
    const { value, color = '#000' } = this.props;
    return (
      <div
        style={{
          marginTop: "40px",
          width: value + "%",
          height: "20px",
          backgroundColor: color,
        }}
      />
    );
  }
}
