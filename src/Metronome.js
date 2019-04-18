import React, { Component } from 'react';
import './Metronome.css';
import sound1 from './click1.wav';
import sound2 from './click2.wav';

class Metronome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };

    this.sound1 = new Audio(sound1);
    this.sound2 = new Audio(sound2);
  }

  handleBpmChange = event => {
    const bpm = event.target.value;
    this.setState({ bpm });
    if(this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
    }
  }

  toggle = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState(
        {
          count: 0,
          playing: true
        },
        this.playClick
      );
    }
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    if (count % beatsPerMeasure === 0) {
      this.sound1.play();
    } else {
      this.sound2.play();
    }

    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  render() {
    const { playing, bpm } = this.state;

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input type="range" min="60" max="240" value={bpm} onChange={this.handleBpmChange} />
        </div>
        <button onClick={this.toggle} >{playing ? 'Stop' : 'Start'}</button>
      </div>
    );
  }
}

export default Metronome;
