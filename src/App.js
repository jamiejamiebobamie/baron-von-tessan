import React,{Component}  from 'react';
import {isMobile} from 'react-device-detect';
import Sketch from './p5/Sketch.js';
import './App.css';
import response from './p5/simulatedResponse'

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
        }
        this.myRef = React.createRef()
        this.SketchWrapper = new Sketch(this)
        this.Sketch = this.SketchWrapper.sketch;
        // callbacks -- binding 'this' isn't necessary...
        // this.handleSubmitDrawing = this.handleSubmitDrawing.bind(this);
        // this.handleSubmitDescription = this.handleSubmitDescription.bind(this);
        // this.handleSubmitFlaggedIndices = this.handleSubmitFlaggedIndices.bind(this);
    }

    handleSubmitDrawing(drawingData) {
        this.setState({drawingData:drawingData})
    }
    handleSubmitDescription(drawingDescription){
        this.setState({drawingDescription:drawingDescription})
    }
    handleSubmitFlaggedIndices(flaggedIndices){
        this.setState({flaggedIndices:flaggedIndices})
    }
    componentDidMount() {
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
