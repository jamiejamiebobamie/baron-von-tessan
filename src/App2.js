import React, { useState, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import Sketch from "./p5/Sketch.js";
import "./App.css";
import simulatedResponse from "./p5/simulatedData/simulatedResponse2";

const p5 = require("p5");

export const App = () => {
  const [state, setState] = useState({
    drawingDescription: "",
    drawingData: [],
    response1: simulatedResponse.data,
    isMobile: isMobile,
    flaggedIndices: [],
    isUsingSimulatedData: true,
    // SketchWrapper: new Sketch(this),
    Sketch: undefined,
    shouldFetchDrawings: false,
  });
  console.log(this)
  const myRef = useRef();

  useEffect(() => {
    // const _Sketch = this.SketchWrapper.sketch;
    // setState({ ...state, Sketch:_Sketch });
    // const myP5 = new p5(_Sketch, myRef.current);
    // console.log(_Sketch)//,myP5)
    fetchDrawings(6);
  }, []);
  useEffect(() => {
    if (state.shouldFetchDrawings) {
      fetchDrawings(6);
      setState({ ...state, shouldFetchDrawings: false });
    }
  }, [state.shouldFetchDrawings]);
  const fetchDrawings = (number) => {
    const url =
      "https://baron-von-tessan-backend.herokuapp.com/api/v1/random-drawings/" +
      number;
    console.log("fetching more drawings");
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setState({ ...state, response1: data.drawing_data });
        setState({ ...state, isUsingSimulatedData: false });
      })
      .catch(error => {
        console.error("Error:", error);
        setState({ ...state, response1: simulatedResponse.data });
        setState({ ...state, isUsingSimulatedData: true });
      });
  }
  const handleSubmitDrawing = drawingData => {
    setState({ ...state, drawingData: drawingData });
    console.log(drawingData);
  };
  const handleSubmitDescription = drawingDescription => {
    if (drawingDescription) {
      if (
        drawingDescription.length &&
        drawingDescription !== "I drew a..." &&
        state.drawingData.length
      ) {
        setState({ ...state, drawingDescription: drawingDescription });
        // send drawing and description to backend
        const data = {
          drawingDescription: drawingDescription,
          drawingData: state.drawingData
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
  };
  const handleSubmitFlaggedIndices = flaggedIndices => {
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
  };
  const resetStateVariables = () => {
    if (state) {
      setState({
        ...state,
        drawingData: [],
        drawingDescription: "",
        flaggedIndices: []
      });
    }
    // Query backend for new data.
    console.log("Queried backend for new data.");
    fetchDrawings(6);
  };
    return (
      <div className="App">
        <div className="sketch-holder" ref={myRef}></div>
      </div>
    );
};

export default App;
