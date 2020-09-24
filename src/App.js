import React,{Component}  from 'react';
import {isMobile} from 'react-device-detect';
import Sketch from './Sketch.js';
import './App.css';
const p5 = require("p5")
class App extends Component {
    constructor(props){
        super(props)
        // testing
        this.state = {
            currentView: undefined,
            drawingDescriptor: "hello",
            drawingData: [],
            response:[],
            test: false,
            isMobile: isMobile,
            viewIndex: 0,
            image:undefined,
            fontStyle:undefined,
            viewIndexTimeoutVar: undefined,
            lengthOfViews:2,
        }
        this.myRef = React.createRef()
        this.SketchWrapper = new Sketch(this,isMobile)
        this.Sketch = this.SketchWrapper.sketch;

        // callbacks
        this.testCallback = this.testCallback.bind(this);
        this.testViewSwitch = this.testViewSwitch.bind(this);
        this.setImage = this.setImage.bind(this);
        this.setFontStyle = this.setFontStyle.bind(this);
        this.handleSubmitDrawing = this.handleSubmitDrawing.bind(this);
        this.setNumberOfViews = this.setNumberOfViews.bind(this);
    }
    setNumberOfViews(number){
        this.setState({lengthOfViews:number})
    }
    testViewSwitch(){
        let viewIndex;
        if (this.state.viewIndex === this.state.lengthOfViews-1){//files.length){
            viewIndex = 0
            this.setState({viewIndex:viewIndex})
        } else {
            viewIndex = this.state.viewIndex+1
            this.setState({viewIndex:viewIndex})
        }
    }

    testCallback(setStateTo) { this.setState({test:setStateTo}) }
    setImage(image) { this.setState({image:image}) }
    setFontStyle(fontStyle) { this.setState({fontStyle:fontStyle}) }
    handleSubmitDrawing(drawingData) {
        this.setState({drawingData:drawingData})
        console.log(this.state.drawingData)
    }
    handleSubmitDescription_React(drawingDescriptor){
        this.setState({drawingDescriptor:drawingDescriptor})
    }
    handleAddToResponseArrayForTesting(response) {
        this.setState({response:[...this.state.response, response]})
    }
    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current)
        // this.myP5.loadFont('./fonts/PrintClearly.otf');
        // console.log(this.myP5.drawingContext)

        this.setState({isMobile:isMobile})
    }
    setCurrentView(view) { this.setState({currentView:view}) }
    render(){
        return (
          <div className="App">
              <div className="sketch-holder" id="sketch-holder" ref={this.myRef}></div>
          </div>
        );
    }
}

export default App;
