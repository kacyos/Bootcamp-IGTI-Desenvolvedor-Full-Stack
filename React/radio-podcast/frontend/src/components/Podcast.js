import React, { Component } from "react";

export default class Podcast extends Component {
  render() {
    const { img, title, description } = this.props.podcast;
    const{imageStyle} = styles;

    return (
      <div>
        <img style={imageStyle} src={`./img/${img}`} alt={title} title={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
}

const styles = {
    imageStyle: {
      width:"200px",
      height:"200px",
      borderRadius: "10px"
    }
  }
