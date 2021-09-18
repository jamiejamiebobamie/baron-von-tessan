import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import Sketch from "./p5/Sketch.js";
import "./App.css";
import simulatedResponse from "./p5/simulatedData/simulatedResponse2";

const p5 = require("p5");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawingDescription: "",
      drawingData: [],
      response1: [],
      response2: [],
      isMobile: isMobile,
      flaggedIndices: [],
      isUsingSimulatedData: true
    };
    this.myRef = React.createRef();
    // passing in a reference to the app's scope.
    // binding 'this' isn't necessary for callbacks.
    this.SketchWrapper = new Sketch(this);
    this.Sketch = this.SketchWrapper.sketch;

    // backend often requires time to wake up in order to return response.
    // sometimes this takes as long as 30 seconds.
    // initialize response1 and response2 with simulated data
    // while user waits for response.
    this.fetchDrawings(0, false, true);
    setTimeout(() => {
      this.fetchDrawings(0, false, true);
    }, 1000);

    // call fetchDrawings() twice to fill both response1 and response2 with
    // real data
    this.fetchDrawings(8);
    setTimeout(() => {
      this.fetchDrawings(8);
    }, 1000);
  }
  fetchDrawings(number, shouldFetchLikedDrawings, firstCall) {
    let url;
    if (shouldFetchLikedDrawings)
      url =
        "https://baron-von-tessan-backend.herokuapp.com/api/v1/liked-drawings/" +
        number;
    else
      url =
        "https://baron-von-tessan-backend.herokuapp.com/api/v1/random-drawings/" +
        number;
    if (firstCall) {
      this.setState({ response2: simulatedResponse.data });
      this.setState({ isUsingSimulatedData: true });
    }
    console.log("fetching more drawings");
    this.setState({ response1: this.state.response2 });
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ response2: data.drawing_data });
        this.setState({ isUsingSimulatedData: false });
      })
      .catch(error => {
        console.error("Error:", error);
        this.setState({ response2: simulatedResponse.data });
        this.setState({ isUsingSimulatedData: true });
      });
  }
  handleSubmitDrawing(drawingData) {
    this.setState({ drawingData: drawingData });
    console.log(drawingData);
  }
  handleSubmitDescription(drawingDescription) {
    if (drawingDescription) {
      if (
        drawingDescription.length &&
        drawingDescription !== "I drew a..." &&
        this.state.drawingData.length
      ) {
        this.setState({ drawingDescription: drawingDescription });
        // send drawing and description to backend
        const data = {
          drawingDescription: drawingDescription,
          drawingData: this.state.drawingData
        };
        console.log("Sending to backend.");
        fetch(
          "https://baron-von-tessan-backend.herokuapp.com/api/v1/add-drawing-to-db",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
        )
          .then(response => response.json())
          .then(data => {
            console.log("Success:", data.success);
          })
          .catch(error => {
            console.error("Error:", error);
          });
      }
    }
  }
  handleSubmitFlaggedIndices(flaggedIndices) {
    // send flaggedIndices to backend
    if (flaggedIndices) {
      if (flaggedIndices.length) {
        let _ids = [];
        for (let i = 0; i < flaggedIndices.length; i++) {
          const index = flaggedIndices[i];
          const id = this.state.response1[index]._id;
          _ids.push(id);
        }
        console.log("Sending to backend.");
        const data = { _ids: _ids };
        fetch(
          "https://baron-von-tessan-backend.herokuapp.com/api/v1/increment-likes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
        )
          .then(response => response.json())
          .then(data => {
            console.log("Success:", data.success);
          })
          .catch(error => {
            console.error("Error:", error);
          });
      }
    }
  }
  resetStateVariables() {
    if (this.state) {
      this.setState({
        drawingData: [],
        drawingDescription: "",
        flaggedIndices: []
      });
    }
    // Query backend for new data.
    console.log("Queried backend for new data.");
    this.fetchDrawings(8);
  }
  componentDidMount() {
    // https://p5js.org/reference/#/p5/p5
    // p5 instance mode: allows React and p5 to interact.
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }
  render() {
    return (
      <div className="App">
        <div className="sketch-holder" ref={this.myRef}></div>
      </div>
    );
  }
}

export default App;
