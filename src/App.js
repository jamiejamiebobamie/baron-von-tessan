import React,{Component}  from 'react';
import {isMobile} from 'react-device-detect';
import Sketch from './p5/Sketch.js';
import './App.css';
import simulatedResponse from './p5/simulatedResponse2'
// import baronData from './p5/baronDrawingDataReduced'

const p5 = require("p5")

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            drawingDescription: "",
            drawingData: [],
            response:[],
            isMobile: isMobile,
            flaggedIndices:[],
            // backgroundDrawingData:[],
            // likedDrawingData:[],
            // isUsingSimulatedData:true,
        }
        this.myRef = React.createRef()
        // passing in a reference to the app's scope.
            // binding 'this' isn't necessary for callbacks.
        this.SketchWrapper = new Sketch(this)
        this.Sketch = this.SketchWrapper.sketch;
        this.fetchDrawings(8)
    }
    fetchDrawings(number){
        console.log("fetching more drawings")
        fetch("http://127.0.0.1:5000/api/v1/random-drawings/"+number)
            .then(response => response.json())
            .then(data => {
                console.log(data.drawing_data);
              // console.log('Success:', data.success);
              // let backgroundDrawings = []
              //     for (let i = 0; i < data.drawing_data.length; i++){
              //         const drawing = data.drawing_data[i].vertices
              //         backgroundDrawings.push(drawing)
              //     this.setState({backgroundDrawingData:backgroundDrawings})
              // }
              console.log();
              this.setState({response:data.drawing_data})
            })
            .catch((error) => {
              console.error('Error:', error);
              this.setState({response:simulatedResponse.data})
            });
    }
    handleSubmitDrawing(drawingData) {this.setState({drawingData:drawingData});console.log(drawingData)}
    handleSubmitDescription(drawingDescription){
        this.setState({drawingDescription:drawingDescription})
        // send drawing and description to backend
        console.log("Sending to backend.")
        const data = {
            drawingDescription:drawingDescription,
            drawingData:this.state.drawingData
        }
        fetch("http://127.0.0.1:5000/api/v1/add-drawing-to-db", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data.success);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
    }
    handleSubmitFlaggedIndices(flaggedIndices){
        this.setState({flaggedIndices:flaggedIndices})
        // send flaggedIndices to backend
        console.log("Sending to backend.")
        let _ids = []
        for (let i = 0; i < this.state.flaggedIndices.length; i++ ){
            const index = this.state.flaggedIndices[i]
            console.log(this.state.response[index]._id)
            // it's poor practice to expose this information...
            const id = this.state.response[index]._id
            _ids.push(id)
        }
        const data = { _ids: _ids }
        fetch("http://127.0.0.1:5000/api/v1/increment-likes", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data.success);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
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
        this.fetchDrawings(8)
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
