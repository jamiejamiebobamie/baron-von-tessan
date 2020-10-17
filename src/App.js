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
        // passing in a reference to the app's scope.
            // binding 'this' isn't necessary for callbacks
        this.SketchWrapper = new Sketch(this)
        this.Sketch = this.SketchWrapper.sketch;
    }
    handleSubmitDrawing(drawingData) {
        this.setState({drawingData:drawingData})
    }
    handleSubmitDescription(drawingDescription){
        this.setState({drawingDescription:drawingDescription})
        // send drawing and description to backend
        console.log(this.state.drawingData,this.state.drawingDescription)
    }
    handleSubmitFlaggedIndices(flaggedIndices){
        this.setState({flaggedIndices:flaggedIndices})
        // send flaggedIndices to backend
        console.log(this.state.flaggedIndices)
    }
    resetStateVariables(){
        this.setState({drawingData:[],drawingDescription:"",flaggedIndices:[]})
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
