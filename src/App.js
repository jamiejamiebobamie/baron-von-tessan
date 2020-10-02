import React,{Component}  from 'react';
import {isMobile} from 'react-device-detect';
import Sketch from './Sketch.js';
import './App.css';
const p5 = require("p5")
class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            drawingDescription: "",
            drawingData: [],
            response:[],
            isMobile: isMobile,

            // temporary
            viewIndex:0,
            lengthOfViews:1,
        }
        this.myRef = React.createRef()
        this.SketchWrapper = new Sketch(this)
        this.Sketch = this.SketchWrapper.sketch;

        // callbacks
        this.handleSubmitDrawing = this.handleSubmitDrawing.bind(this);
        this.handleSubmitDescription = this.handleSubmitDescription.bind(this);
        this.setNumberOfViews = this.setNumberOfViews.bind(this);
        this.testViewSwitch = this.testViewSwitch.bind(this);
    }
    handleSubmitDrawing(drawingData) {
        this.setState({drawingData:drawingData})
    }
    handleSubmitDescription(drawingDescription){
        this.setState({drawingDescription:drawingDescription})
    }
    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    // ----
        // temporary
    setNumberOfViews(number){
        this.setState({lengthOfViews:number})
    }
        // temporary
    testViewSwitch(){
        let viewIndex;
        if (this.state.viewIndex === this.state.lengthOfViews-1){
            viewIndex = 0
            this.setState({viewIndex:viewIndex})
        } else {
            viewIndex = this.state.viewIndex+1
            this.setState({viewIndex:viewIndex})
        }
    }
    // ----

    render(){
        return (
          <div className="App">
              <div className="sketch-holder" ref={this.myRef}></div>
          </div>
        );
    }
}

export default App;
