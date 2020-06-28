import React, { Component } from "react";
import Title from "./components/Title";
import Station from "./components/Station";
import Podcast from "./components/Podcast";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedStation: "0.0",
      selectedPodcast: null,
      podcasts: [],
    };
  }

  componentDidUpdate(previousProps, previousState) {
    const { selectedStation, podcasts } = this.state;
    const { selectedStation: oldStation } = previousState;

    const selectedPodcast = podcasts.find(
      (podcast) => podcast.id === selectedStation
    );
    if (selectedStation !== oldStation) {
      this.setState({ selectedPodcast });
    }
  }

  async componentDidMount() {
    const resource = await fetch("http://localhost:3001/podcasts");
    const json = await resource.json();

    this.setState({ podcasts: json, selectedStation: '88.5' });
  }

  handleStationChange = (newStation) => {
    this.setState({ selectedStation: newStation });
  };

  render() {
    const { selectedStation, selectedPodcast } = this.state;

    return (
      <div className="container center">
        <Title>React podcast</Title>

        <Station
          station={selectedStation}
          readOnly
          onStationChange={this.handleStationChange}
        />

        {selectedPodcast ? (
          <Podcast podcast={selectedPodcast} />
        ) : (
          <p>Nenhum Podcast encontrado</p>
        )}
      </div>
    );
  }
}
