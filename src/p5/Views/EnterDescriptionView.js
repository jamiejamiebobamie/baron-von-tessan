import Wireframe from '../uiClasses/Wireframe';
import DisplayDrawingContainer from '../uiClasses/DisplayDrawingContainer';
import TextInput from '../uiClasses/TextInput'
import TextBox from '../uiClasses/TextBox'
import Keyboard from '../uiClasses/Keyboard'

export default class EnterDescriptionView {
    constructor(){
        this.backButton = undefined;
        this.submitButton = undefined;
        this.drawing = undefined;
        this.input = undefined;
        this.keyBoard = undefined;
        this.showTypedLetter = undefined;
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI,changeView){
        /// ---- ******** BEGIN WIREFRAME OBJECTS
            // wireframe objects are not drawn to screen.
        let wireFrameElements = []
        let wildcard;
        let parameters;
        let wireFrame
        for (let i = 0; i < 3; i++){
            let color = i%2 ?"orange" :"orange"
            wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1, string:"break the screen into 3 rows"}
            parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               row:true,
                               len:3,
                               index:i,
                               color:color,
                               wildcard:wildcard,
                             }
            let viewBrokenIntoThirds = new Wireframe(parameters)
            wireFrameElements.push(viewBrokenIntoThirds)
        }

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h*2/3,
                           color:"green",
                           wildcard:wildcard,
                         }
        let topTwoThirdsOfView = new Wireframe(parameters)
        // _ui.push(topTwoThirdsOfView)

        // wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        // parameters = { p:p,
        //                    windowWidth: w*1/3,
        //                    windowHeight: h,
        //                    row:true,
        //                    color:"purple",
        //                    wildcard:wildcard,
        //                  }
        // let topOneThirdsOfView = new Wireframe(parameters)
        // _ui.push(topOneThirdsOfView)

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h*2/3,
                           color:"red",
                           wildcard:wildcard,
                           row:false,
                           len:2,
                           index:0,
                           parent:topTwoThirdsOfView,
                         }
        let topTwoThirdsOfViewSplitInTwoFirstHalf = new Wireframe(parameters)
        // _ui.push(topTwoThirdsOfViewSplitInTwoFirstHalf)

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h*2/3,
                           color:"green",
                           wildcard:wildcard,
                           row:false,
                           len:2,
                           index:1,
                           parent:topTwoThirdsOfView,
                         }
        let topTwoThirdsOfViewSplitInTwoSecondHalf = new Wireframe(parameters)
        // _ui.push(topTwoThirdsOfViewSplitInTwoSecondHalf)


        let topThirdOfView = wireFrameElements[0]
        let middleThirdOfScreen =  wireFrameElements[1];
        let bottomThirdOfScreen = wireFrameElements[2];

        let drawingParent = topTwoThirdsOfView;
        if (REACT_APP.state.isMobile){
            if (w>h){
                drawingParent = topTwoThirdsOfViewSplitInTwoFirstHalf;
            } else {
                drawingParent = topThirdOfView;
            }
        }

        wildcard = {shouldBeSquare:true,shrinkAmountWidth:1,shrinkAmountHeight:REACT_APP.state.isMobile?.9:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           color:"red",
                           wildcard:wildcard,
                           parent:drawingParent,
                         }
        let drawing = new Wireframe(parameters)

        let inputFormParent = bottomThirdOfScreen;

        if (REACT_APP.state.isMobile){
            if (w>h){

                inputFormParent = topTwoThirdsOfViewSplitInTwoSecondHalf;

            } else {
                inputFormParent = middleThirdOfScreen;
            }
        }

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:.5}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:true,
                           color:"green",
                           wildcard:wildcard,
                           parent:inputFormParent,
                         }
        let inputform = new Wireframe(parameters)

        wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:true,
                           color:"orange",
                           len:3,
                           index:0,
                           wildcard:wildcard,
                           parent:inputform,
                         }
        let inputformContainer1ForInput = new Wireframe(parameters)

        wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:true,
                           color:"red",
                           len:3,
                           index:2,
                           wildcard:wildcard,
                           parent:inputform,
                         }
        let inputformContainer2ForButtons = new Wireframe(parameters)

        wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:1.5}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:false,
                           color:"pink",
                           len:2,
                           index:0,
                           wildcard:wildcard,
                           parent:inputformContainer2ForButtons,
                         }
        let backButton = new Wireframe(parameters)

        wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:1.5}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:false,
                           color:"purple",
                           len:2,
                           index:1,
                           wildcard:wildcard,
                           parent:inputformContainer2ForButtons,
                         }
        let submitButton = new Wireframe(parameters)

        wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:1.8}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           // height:20,
                           row:true,
                           color:"purple",
                           wildcard:wildcard,
                           parent:inputformContainer1ForInput,
                         }
        let input = new Wireframe(parameters)

        wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:.95}
        parameters = { p:p,
                       windowWidth: w,
                       windowHeight: h,
                       row:true,
                       len:3,
                       index:2,
                       offsetY:REACT_APP.state.isMobile?0:h,
                       wildcard:wildcard,
                       parent:REACT_APP.state.isMobile?wireFrameElements[3]:wireFrame,
                         }
        let keyBoardArea = new Wireframe(parameters)

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        let row;
        let keyBoardRows = []
        for (let i = 0; i < 4; i++){
            row = new Wireframe(
                                {
                                    p:p,
                                    windowWidth: w,
                                    windowHeight: h,
                                    parent:keyBoardArea,
                                    len:4,
                                    index:i,
                                    row:true,
                                    wildcard:wildcard,
                                }
                            )
            keyBoardRows.push(row)
        }
        let keys = []
        let keyLetters = ["qwertyuiop","asdfghjkl","zxcvbnm"]
        let keyboardButton;
        wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.8}
        for (let i = 0; i < keyLetters.length; i++){
            for (let j = 0; j < keyLetters[i].length; j++){
                parameters = {
                                   p:p,
                                   windowWidth: w,
                                   windowHeight: h,
                                   parent:keyBoardRows[i],
                                   len:keyLetters[i].length,
                                   index:j,
                                   row:false,
                                   wildcard:wildcard,
                              }
                keyboardButton = new Wireframe(parameters)
                keys.push(keyboardButton)
            }
        }
        let controlButtons = ["SPACE","BACKSPACE"]
        for (let i = 0; i < controlButtons.length; i++){
            parameters = {
                           p:p,
                           windowWidth: w,
                           windowHeight: h,
                           parent:keyBoardRows[3],
                           len:controlButtons.length,
                           index:i,
                           row:false,
                           wildcard:wildcard,
                         }
            keyboardButton = new Wireframe(parameters)
            keys.push(keyboardButton)
        }

        /// ---- ******** END WIREFRAME OBJECTS

        /// ---- ******** BEGIN _UI OBJECTS
            // _ui objects are drawn to screen and mirror a wireframe object
        let _ui = []

        let x,y,width,height;
        if (previousUI){
            if (previousUI.backButton){
                x = previousUI.backButton.x;
                y = previousUI.backButton.y;
                width = previousUI.backButton.width;
                height = previousUI.backButton.height;
            }
        }
        let returnToPreviousView = () => {
            changeView(-1)
        }
        wildcard = {fontSize:backButton.width/10,numberOfLines:.8}
        parameters = {p:p,objectToMirror:backButton,x:x,y:y,width:width,height:height,mouseClickfunc:returnToPreviousView,wildcard:wildcard}
        this.backButton = new TextBox(parameters)
        this.backButton.setInteractivity(true);
        this.backButton.setStroke(true)
        this.backButton.setFill(true)
        this.backButton.setTextColor("black")
        this.backButton.setString("<< BACK");
        _ui.push(this.backButton)

        if (previousUI){
            if (previousUI.submitButton){
                x = previousUI.submitButton.x;
                y = previousUI.submitButton.y;
                width = previousUI.submitButton.width;
                height = previousUI.submitButton.height;
            }
        }
        let submitDescription = () => {
            let drawingDescription = this.input.text;
            REACT_APP.handleSubmitDescription(drawingDescription)
            changeView();
        }
        parameters = {p:p,objectToMirror:submitButton,x:x,y:y,width:width,height:height,mouseClickfunc:submitDescription,wildcard:wildcard}
        this.submitButton = new TextBox(parameters)
        this.submitButton.setInteractivity(true);
        this.submitButton.setStroke(true)
        this.submitButton.setFill(true)
        this.submitButton.setTextColor("black")
        this.submitButton.setString("SUBMIT");
        _ui.push(this.submitButton)

        let textInput = "I drew a..."
        if (previousUI){
            if (previousUI.input){
                x = previousUI.input.x;
                y = previousUI.input.y;
                width = previousUI.input.width;
                height = previousUI.input.height;
                textInput = previousUI.input.text;
            }
        }
        wildcard = {fontSize:input.width/25, REACT_APP:REACT_APP,numberOfLines:1}
        parameters = {p:p,objectToMirror:input,x:x,y:y,width:width,height:height,wildcard:wildcard}
        this.input = new TextInput(parameters)
        this.input.setStroke(true)
        this.input.setString(textInput)
        _ui.push(this.input)

        let drawingHasBeenDrawn = false
        let strokeIndex = 0;
        let strokes = []
        if (previousUI){
            if (previousUI.drawing){
                x = previousUI.drawing.x;
                y = previousUI.drawing.y;
                width = previousUI.drawing.width;
                height = previousUI.drawing.height;
                drawingHasBeenDrawn = previousUI.drawing.drawingHasBeenDrawn
                clearTimeout(previousUI.drawing.timeOut1)
                clearTimeout(previousUI.drawing.timeOut2)
                // last view's this.drawing is a DrawingContainer and not a DisplayDrawingContainer
                    // a DrawingContainer does not have a submittedStrokeIndex.
                // only an issue when the view is changed.
                strokeIndex = previousUI.drawing.submittedStrokeIndex?previousUI.drawing.submittedStrokeIndex:0;
                // in case user returns to the drawing view:
                    // the strokes from the last view need to be stored.
                    // the submitted drawing data stored in the React state
                    // is a flattened 2d array. so DrawingContainer functionality
                    // ("UNDO" button) breaks without original stroke data.
                // original stroke data from last view.
                strokes = previousUI.drawing.strokes
            }
        }
        wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}
        parameters = {p:p,w:w,h:h,objectToMirror:drawing,x:x,y:y,width:width,height:height,color:"lightgrey",wildcard:wildcard,lerpSpeed:windowResized?.3:.1}
        this.drawing = new DisplayDrawingContainer(parameters)
        this.drawing.setLengthOfDrawingSquare(drawing.width)
        this.drawing.setFill(true)
        let submittedStrokes = REACT_APP.state.drawingData
        this.drawing.setSubmittedStrokes(submittedStrokes)
        this.drawing.submittedStrokeIndex = strokeIndex;
        this.drawing.strokes = strokes
        this.drawing.redrawStrokes()
        _ui.push(this.drawing)

        if (previousUI){
            if (previousUI.keyBoard){
                x = previousUI.keyBoard.x;
                y = previousUI.keyBoard.y;
                width = previousUI.keyBoard.width;
                height = previousUI.keyBoard.height;
            }
        }
        wildcard = {keys:keys}
        parameters = {p:p,objectToMirror:keyBoardArea,x:x,y:y,width:width,height:height,previousUI:previousUI,wildcard:wildcard}
        this.keyBoard = new Keyboard(parameters)
        this.keyBoard.setReferenceToInputBox(this.input)
        this.input.setMobileKeyboardReference(this.keyBoard)

        if (REACT_APP.state.isMobile){
            _ui.push(this.keyBoard)
        }

        return _ui;
    }
}
