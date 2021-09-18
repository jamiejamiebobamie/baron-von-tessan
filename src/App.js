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
      response1: simulatedResponse.data,
      isMobile: isMobile,
      flaggedIndices: [],
      isUsingSimulatedData: true
    };
    this.myRef = React.createRef();
    // passing in a reference to the app's scope.
    // binding 'this' isn't necessary for callbacks.
    this.SketchWrapper = new Sketch(this);
    this.Sketch = this.SketchWrapper.sketch;
    this.fetchDrawings(6);
  }
  fetchDrawings(number) {
    const url =
      "https://baron-von-tessan-backend.herokuapp.com/api/v1/random-drawings/" +
      number;
    console.log("fetching more drawings");
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ response1: data.drawing_data });
        this.setState({ isUsingSimulatedData: false });
      })
      .catch(error => {
        console.error("Error:", error);
        this.setState({ response1: simulatedResponse.data });
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
    this.fetchDrawings(6);
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
