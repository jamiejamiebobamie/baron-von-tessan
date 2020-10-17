import React,{Component}  from 'react';
import {isMobile} from 'react-device-detect';
import Sketch from './p5/Sketch.js';
import './App.css';
import response from './p5/simulatedResponse'
import baronData from './p5/baronDrawingDataReduced'


const p5 = require("p5")

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            drawingDescription: "",
            drawingData: [],
            response:response.data,
            isMobile: isMobile,
            flaggedIndices:[],
            backgroundDrawingData:[baronData.drawingData,baronData.drawingData,baronData.drawingData,baronData.drawingData]
        }
        this.myRef = React.createRef()
        // passing in a reference to the app's scope.
            // binding 'this' isn't necessary for callbacks.
        this.SketchWrapper = new Sketch(this)
        this.Sketch = this.SketchWrapper.sketch;
    }
    handleSubmitDrawing(drawingData) {this.setState({drawingData:drawingData})}
    handleSubmitDescription(drawingDescription){
        this.setState({drawingDescription:drawingDescription})
        // send drawing and description to backend
        console.log("Sending: "+this.state.drawingData+" "+this.state.drawingDescription+" to backend.")
    }
    handleSubmitFlaggedIndices(flaggedIndices){
        this.setState({flaggedIndices:flaggedIndices})
        // send flaggedIndices to backend
        console.log("Sending: "+this.state.flaggedIndices+" to backend.")
    }
    resetStateVariables(){
        // got a weird error about setting state
            // before a component did mount...
        // might be unnecessary.
        if (this.state){
            this.setState({drawingData:[],drawingDescription:"",flaggedIndices:[]})
        }
        // Query backend for new data.
        console.log("Queried backend for new data.")
    }
    componentDidMount() {
        // https://p5js.org/reference/#/p5/p5
            // p5 instance mode. allows for React and p5 to interact.
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }
    render(){
        return (
          <div className="App">
              <div className="sketch-holder" ref={this.myRef}></div>
          </div>
        );
    }
}

export default App;
