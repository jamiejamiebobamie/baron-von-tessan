import Wireframe from '../uiClasses/Wireframe';
// import DrawingContainer from '../uiClasses/DrawingContainer';
// import DisplayDrawingContainer from '../uiClasses/DisplayDrawingContainer';
// import TextBox from '../uiClasses/TextBox'
import DisplayDrawingContainer from '../uiClasses/DisplayDrawingContainer';
import TextBox from '../uiClasses/TextBox'

export default class DrawingView {
    constructor(){
        // ui objects
        this.drawing = undefined
        this.buttons = [undefined,undefined,undefined,undefined,undefined,undefined]
        // to inherit transforms between views
            // the object that will store the description of the drawing
            // on this view is called the "this.dialog"
        this.dialog = undefined;

        this.responseIndex = 0
        this.charIndex = 0
        this.timeOutVarForCharacters = undefined
        this.timeOutVarForStrokes = undefined

        this.allCharsAdded = false;

        this.autoplay = true;
        this.isPlayingFunc = undefined
        this.predrawn = false;
    }
    addCharacterToDialogString(REACT_APP){
        if (this.charIndex<REACT_APP.state.response1[this.responseIndex].description.length){
            let allOfDialog = REACT_APP.state.response1[this.responseIndex].description
            let dialogString = allOfDialog.slice(0,this.charIndex)
            this.dialog.setString(dialogString)
            clearTimeout(this.timeOutVarForCharacters)
            this.charIndex += 1
            this.timeOutVarForCharacters = setTimeout(()=>{this.addCharacterToDialogString(REACT_APP)},45)
        }
        else {
            // this.compositeBoolean.allCharsAdded = true;
            // if (this.compositeBoolean.allCharsAdded && this.compositeBoolean.allStrokesAdded){
            //     // set both to false to stop other method from running logic
            //     this.compositeBoolean = {allCharsAdded:false, allStrokesAdded:false}
            //
            // }
            this.allCharsAdded = true;
            clearTimeout(this.timeOutVarForCharacters)
            return
        }
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI,changeView){
        /// ---- ******** BEGIN WIREFRAME OBJECTS
            // wireframe objects are not drawn to screen.
        let wireframeElements = [];
        let _ui = [];

        // general variables
        let params;
        let layoutBlock;
        let color;
        let wildcard;

        // variables for the wireframe objects the drawn UI objects will mirror
        let loopButton, backToMenuButton, autoPlayButton, nextDrawingButton;
        let previousDrawingButton, predrawDrawingButton, drawing, description;

        // if landscape
        if (w>h){
            // if mobile
            if (REACT_APP.state.isMobile){
                for (let i = 0; i < 5; i++){
                    color = i%2? "lightgrey":"grey";
                    wildcard = {shouldBeSquare:false,shrinkAmountWidth:1,shrinkAmountHeight:1}
                    params = {
                                p:p,
                                windowWidth: w,
                                windowHeight: h,
                                color: color,
                                row:true,//w<h,
                                len:5,
                                index:i,
                                wildcard:wildcard,
                             }
                    layoutBlock = new Wireframe(params)
                    // _ui.push(layoutBlock)
                    wireframeElements.push(layoutBlock)
                }
                // top buttons
                for (let i = 0; i < 3; i++){
                    color = "red"
                    wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.4}
                    params = {
                                p:p,
                                windowWidth: w,
                                windowHeight: h,
                                color: color,
                                row:false,
                                len:3,
                                index:i,
                                wildcard:wildcard,
                                parent:wireframeElements[0],
                                offsetY:-wireframeElements[0].height/4,
                             }
                    layoutBlock = new Wireframe(params)
                    // _ui.push(layoutBlock)
                    if (i===0) {
                        autoPlayButton = layoutBlock;
                    } else if (i===1){
                        loopButton = layoutBlock;
                    } else if (i===2){
                        predrawDrawingButton = layoutBlock;
                    }
                }
                // bottom buttons
                for (let i = 0; i < 3; i++){
                    color = "red"
                    wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.4}
                    params = {
                                p:p,
                                windowWidth: w,
                                windowHeight: h,
                                color: color,
                                row:false,
                                len:3,
                                index:i,
                                wildcard:wildcard,
                                parent:wireframeElements[4],
                                offsetY:wireframeElements[4].height/4,
                             }
                    layoutBlock = new Wireframe(params)
                    // _ui.push(layoutBlock)

                    if (i===0){
                        backToMenuButton = layoutBlock;
                    } else if (i===1){
                        previousDrawingButton = layoutBlock;
                    } else if (i===2){
                        nextDrawingButton = layoutBlock;
                    }
                }
                // drawing
                wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.9}
                params = {
                            p:p,
                            windowWidth: w,
                            windowHeight: h,
                            color: "red",
                            row:true,
                            wildcard:wildcard,
                            width: h*4/5,
                            height: h*4/5,
                            offsetX: w/40,
                            offsetY: h/10,
                         }
                drawing = new Wireframe(params)
                // _ui.push(layoutBlock)
                // wireframeElements.push(drawing)
                // description
                wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.9}
                params = {
                            p:p,
                            windowWidth: w,
                            windowHeight: h,
                            color: "red",
                            row:true,
                            wildcard:wildcard,
                            width: w/2,
                            height: h*4/5,
                            offsetX: w/2,
                            offsetY: h/10,

                         }
                description = new Wireframe(params)
                // _ui.push(layoutBlock)
                // wireframeElements.push(description)
            // else if desktop / laptop
            } else {
                for (let i = 0; i < 16; i++){
                    color = i%2? "lightgrey":"grey";
                    wildcard = {shouldBeSquare:false,shrinkAmountWidth:1,shrinkAmountHeight:1}
                    params = {
                                p:p,
                                windowWidth: w,
                                windowHeight: h,
                                color: color,
                                row:true,
                                len:16,
                                index:i,
                                wildcard:wildcard,
                             }
                    layoutBlock = new Wireframe(params)
                    // _ui.push(layoutBlock)
                    wireframeElements.push(layoutBlock)
                }
                // buttons
                for (let i = 0; i < 6; i++){
                    color = "red"
                    wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.9}
                    params = {
                                p:p,
                                windowWidth: w,
                                windowHeight: h,
                                color: color,
                                row:false,
                                len:6,
                                index:i,
                                wildcard:wildcard,
                                parent:wireframeElements[0]
                             }
                    layoutBlock = new Wireframe(params)
                    // _ui.push(layoutBlock)
                    if (i===0) {
                        autoPlayButton = layoutBlock;
                    } else if (i===1){
                        loopButton = layoutBlock;
                    } else if (i===2){
                        predrawDrawingButton = layoutBlock;
                    } else if (i===3){
                        backToMenuButton = layoutBlock;
                    } else if (i===4){
                        previousDrawingButton = layoutBlock;
                    } else if (i===5){
                        nextDrawingButton = layoutBlock;
                    }
                }
                // drawing
                let drawingSpaceWidth = w > h-h/16 ? w*(2/3) : w;
                let drawingSpaceHeight = w > h-h/16 ? h-h/16 : h-h/16*(2/3);
                let lengthOfDrawingSquare = w > h-h/16 ? drawingSpaceHeight : drawingSpaceWidth;
                let longerSideOfScreen = w > h-h/16 ? w : h-h/16;
                lengthOfDrawingSquare = lengthOfDrawingSquare > longerSideOfScreen*(2/3) ? longerSideOfScreen*(2/3) : lengthOfDrawingSquare;
                wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.9}
                params = { p:p,
                                   windowWidth: w,
                                   windowHeight: h,
                                   offsetX:w>h?0:(w-lengthOfDrawingSquare)/2,
                                   offsetY:w>h?(h+h/10-lengthOfDrawingSquare)/2:0,
                                   width:lengthOfDrawingSquare,
                                   height:lengthOfDrawingSquare,
                                   len:3,
                                   index:0,
                                   color:"red",
                                   wildcard:wildcard,
                                 }
                drawing = new Wireframe(params)
                // _ui.push(layoutBlock)
                // wireframeElements.push(layoutBlock)
                // description
                wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.9}
                params = {
                            p:p,
                            windowWidth: w,
                            windowHeight: h,
                            color:"red",
                            row:true,
                            wildcard:wildcard,
                            width: w-drawing.width-drawing.width/16,
                            offsetX: drawing.width+drawing.width/10,
                            offsetY:(h-h*.9)/4,
                         }
                description = new Wireframe(params)
                // _ui.push(layoutBlock)
                // wireframeElements.push(layoutBlock)

            }
        // if portrait
        } else {
            // if mobile
            if (REACT_APP.state.isMobile){
                for (let i = 0; i < 8; i++){
                    color = i%2? "lightgrey":"grey";
                    wildcard = {shouldBeSquare:false,shrinkAmountWidth:1,shrinkAmountHeight:1}
                    params = {
                                p:p,
                                windowWidth: w,
                                windowHeight: h,
                                color: color,
                                row:true,
                                len:8,
                                index:i,
                                wildcard:wildcard,
                             }
                    layoutBlock = new Wireframe(params)
                    // _ui.push(layoutBlock)
                    wireframeElements.push(layoutBlock)
                }
                // top buttons
                for (let i = 0; i < 3; i++){
                    color = "red"
                    wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.6}
                    params = {
                                p:p,
                                windowWidth: w,
                                windowHeight: h,
                                color: color,
                                row:false,
                                len:3,
                                index:i,
                                wildcard:wildcard,
                                parent:wireframeElements[0],
                                offsetY:-wireframeElements[0].height/8,
                             }
                    layoutBlock = new Wireframe(params)
                    // _ui.push(layoutBlock)
                    if (i===0) {
                        autoPlayButton = layoutBlock;
                    } else if (i===1){
                        loopButton = layoutBlock;
                    } else if (i===2){
                        predrawDrawingButton = layoutBlock;
                    }
                }
                // bottom buttons
                for (let i = 0; i < 3; i++){
                    color = "red"
                    wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.6}
                    params = {
                                p:p,
                                windowWidth: w,
                                windowHeight: h,
                                color: color,
                                row:false,
                                len:3,
                                index:i,
                                wildcard:wildcard,
                                parent:wireframeElements[7],
                                offsetY:wireframeElements[7].height/8,
                             }
                    layoutBlock = new Wireframe(params)
                    // _ui.push(layoutBlock)

                    if (i===0){
                        backToMenuButton = layoutBlock;
                    } else if (i===1){
                        previousDrawingButton = layoutBlock;
                    } else if (i===2){
                        nextDrawingButton = layoutBlock;
                    }
                }
                // drawing
                wildcard = {shouldBeSquare:true,shrinkAmountWidth:1,shrinkAmountHeight:1}
                params = {
                            p:p,
                            windowWidth: w,
                            windowHeight: h,
                            color: "red",
                            row:true,
                            wildcard:wildcard,
                            height: h/2,
                            offsetY: h/6,
                         }
                drawing = new Wireframe(params)
                // _ui.push(layoutBlock)
                // wireframeElements.push(layoutBlock)
                // description
                wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.9}
                params = {
                            p:p,
                            windowWidth: w,
                            windowHeight: h,
                            color: "red",
                            row:true,//w<h,
                            wildcard:wildcard,
                            parent:wireframeElements[5],
                            // width: w/2,
                            height: h/4,
                            offsetY: h/10,
                         }
                description = new Wireframe(params)
                // _ui.push(layoutBlock)
                wireframeElements.push(description)
            // else if desktop / laptop
            } else {
                for (let i = 0; i < 16; i++){
                    color = i%2? "lightgrey":"grey";
                    wildcard = {shouldBeSquare:false,shrinkAmountWidth:1,shrinkAmountHeight:1}
                    params = {
                                p:p,
                                windowWidth: w,
                                windowHeight: h,
                                color: color,
                                row:true,
                                len:16,
                                index:i,
                                wildcard:wildcard,
                             }
                    layoutBlock = new Wireframe(params)
                    // _ui.push(layoutBlock)
                    wireframeElements.push(layoutBlock)
                }
                // top buttons
                for (let i = 0; i < 3; i++){
                    color = "red"
                    wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.6}
                    params = {
                                p:p,
                                windowWidth: w,
                                windowHeight: h,
                                color: color,
                                row:false,
                                len:3,
                                index:i,
                                wildcard:wildcard,
                                parent:wireframeElements[0]
                             }
                    layoutBlock = new Wireframe(params)
                    // _ui.push(layoutBlock)
                    if (i===0){
                        backToMenuButton = layoutBlock;
                    } else if (i===1){
                        previousDrawingButton = layoutBlock;
                    } else if (i===2){
                        nextDrawingButton = layoutBlock;
                    }
                }
                // bottom buttons
                for (let i = 0; i < 3; i++){
                    color = "red"
                    wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.6}
                    params = {
                                p:p,
                                windowWidth: w,
                                windowHeight: h,
                                color: color,
                                row:false,
                                len:3,
                                index:i,
                                wildcard:wildcard,
                                parent:wireframeElements[1]
                             }
                    layoutBlock = new Wireframe(params)
                    // _ui.push(layoutBlock)

                    if (i===0) {
                        autoPlayButton = layoutBlock;
                    } else if (i===1){
                        loopButton = layoutBlock;
                    } else if (i===2){
                        predrawDrawingButton = layoutBlock;
                    }
                }
                // drawing
                wildcard = {shouldBeSquare:true,shrinkAmountWidth:1,shrinkAmountHeight:1}
                params = {
                            p:p,
                            windowWidth: w,
                            windowHeight: h,
                            color: "red",
                            row:true,
                            wildcard:wildcard,
                            height: h/2,
                            offsetY: h/5,
                         }
                drawing = new Wireframe(params)
                // _ui.push(layoutBlock)
                wireframeElements.push(drawing)
                // description
                wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.9}
                params = {
                            p:p,
                            windowWidth: w,
                            windowHeight: h,
                            color: "red",
                            row:true,//w<h,
                            wildcard:wildcard,
                            parent:wireframeElements[5],
                            // width: w/2,
                            height: h/3,
                            offsetY: h/2,
                         }
                description = new Wireframe(params)
                // _ui.push(layoutBlock)
                // wireframeElements.push(layoutBlock)
            }
        }
        //// ---- - - - - - - - -
        //// START OF DRAWN UI ELEMENTS

        if (previousUI){
            if (previousUI.predrawn){
                this.predrawn = previousUI.predrawn;
            }
            if (previousUI.autoplay){
                this.autoplay = previousUI.autoplay;
            }
            if (previousUI.responseIndex){
                this.responseIndex = previousUI.responseIndex;
            }
        }

        let x,y,width,height;
        let drawingHasBeenDrawn = false
        let strokeIndex = 0;
        let loop = false;
        if (previousUI){
            if (previousUI.drawing){
                x = previousUI.drawing.x;
                y = previousUI.drawing.y;
                width = previousUI.drawing.width;
                height = previousUI.drawing.height;
                drawingHasBeenDrawn = windowResized ? previousUI.drawing.drawingHasBeenDrawn : false;
                clearTimeout(previousUI.drawing.timeOut)
                strokeIndex = previousUI.drawing.submittedStrokeIndex
                loop = previousUI.drawing.loop
            }
        }
        wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}
        params = {p:p,objectToMirror:drawing,x:x,y:y,width:width,height:height,color:"lightgrey",wildcard:wildcard,lerpSpeed:windowResized?.3:.1}
        this.drawing = new DisplayDrawingContainer(params)
        this.drawing.setLengthOfDrawingSquare(drawing.width+drawing.width*.11)
        this.drawing.setFill(true)
        this.drawing.setSubmittedStrokes(REACT_APP.state.response1[this.responseIndex].vertices)
        this.drawing.submittedStrokeIndex = strokeIndex;
        this.drawing.loop = loop
        // this.drawing.redrawStrokes();

        let beginRedrawingStrokesAndAddingCharsFunc = () => {
            clearTimeout(this.timeOutVarForStrokes)
            clearTimeout(this.timeOutVarForCharacters)
            if (this.predraw){
                this.drawing.setSubmittedStrokeIndex(REACT_APP.state.response1[this.responseIndex].vertices.length-2)
            } else {
                this.drawing.setSubmittedStrokeIndex(0)
            }
            this.charIndex = 0
            let redrawStrokes = () => {
                if (this.drawing.drawingHasBeenDrawn){
                    if (this.drawing.loop){
                        this.drawing.drawingHasBeenDrawn = false;
                        this.drawing.setSubmittedStrokeIndex(0)
                    } else if (this.autoplay) {
                        if (this.responseIndex < REACT_APP.state.response1.length-1){
                            this.responseIndex++
                        } else {
                            this.responseIndex = 0;
                            // get more drawings!
                            REACT_APP.fetchDrawings(8)
                        }
                        this.drawing.setSubmittedStrokes(REACT_APP.state.response1[this.responseIndex].vertices)

                        if (this.predraw){
                            this.drawing.setSubmittedStrokeIndex(REACT_APP.state.response1[this.responseIndex].vertices.length-2)
                        } else {
                            this.drawing.setSubmittedStrokeIndex(0)
                        }
                        this.drawing.drawingHasBeenDrawn = false;
                        this.allCharsAdded = false;
                        this.charIndex = 0
                        this.dialog.setString("")
                        this.isPlayingFunc = setTimeout(beginRedrawingStrokesAndAddingCharsFunc,500);
                        return;
                    }
                }
                if (this.drawing.submittedStrokeIndex < this.drawing.submittedStrokes.length) {
                    this.drawing.submittedStrokeIndex++
                    this.timeOutVarForStrokes = setTimeout(redrawStrokes,1);
                } else if (!this.allCharsAdded) {
                    this.addCharacterToDialogString(REACT_APP)
                    this.timeOutVarForStrokes = setTimeout(redrawStrokes,500);
                } else if (this.allCharsAdded) {
                    this.drawing.drawingHasBeenDrawn = true;
                    // pause three seconds to display drawing.
                        // then loop if this.displayDrawingSpace.loop
                        // is set to true otherwise return.
                    let lengthOfTimeToPause;
                    lengthOfTimeToPause = 3000
                    this.timeOutVarForStrokes = setTimeout(redrawStrokes,lengthOfTimeToPause);
                } else {
                    this.timeOutVarForStrokes = setTimeout(redrawStrokes,500);
                }
            }
            redrawStrokes();
        }
        _ui.push(this.drawing)
        let text;
        if (previousUI){
            if (previousUI.dialog){
                x = previousUI.dialog.x;
                y = previousUI.dialog.y;
                width = previousUI.dialog.width;
                height = previousUI.dialog.height;
                text = windowResized?previousUI.dialog.text:"";
            }
            this.charIndex = previousUI.charIndex;
        }
        let fontSize = drawing.width/10>description.width/10?description.width/10:drawing.width/10//w>h ? description.width/10 : description.width/10 ;
        wildcard = {text:text,fontSize:fontSize}//,numberOfLines:4}
        params = {p:p,objectToMirror:description,x:x,y:y,width:width,height:height,wildcard:{text:text,fontSize:fontSize}}
        this.dialog = new TextBox(params)
        this.dialog.setFill(true)
        // this.dialog.setStroke(true)

        if (this.charIndex>=REACT_APP.state.response1[this.responseIndex].description.length){
            let allOfDialog = REACT_APP.state.response1[this.responseIndex].description
            this.dialog.setString(allOfDialog)
        }

        _ui.push(this.dialog)

        if (!windowResized){
            this.autoplayFunc = beginRedrawingStrokesAndAddingCharsFunc();
        }
        for (let i = 0; i<6;i++){
            color = "white";
            if (previousUI){
                if (previousUI.buttons){
                    if (previousUI.buttons[i]){
                        x = previousUI.buttons[i].x;
                        y = previousUI.buttons[i].y;
                        width = previousUI.buttons[i].width;
                        height = previousUI.buttons[i].height;
                        color = previousUI.buttons[i].color;
                    }
                }
            }
            let buttonMirror;
            let performClickOnce;
            let buttonString;
            if (i===0) {
                buttonMirror = autoPlayButton;
                buttonString = "AUTOPLAY"
                color = this.autoplay ? p.color(244,129,130):"white"
            } else if (i===1){
                buttonMirror = loopButton;
                buttonString = "LOOP"
            } else if (i===2){
                buttonMirror = predrawDrawingButton;
                buttonString = "PREDRAW"
            } else if (i===3){
                buttonMirror = backToMenuButton;
                buttonString = "BACK TO MENU"
            } else if (i===4){
                buttonMirror = previousDrawingButton;
                buttonString = "PREV"
            } else if (i===5){
                buttonMirror = nextDrawingButton;
                buttonString = "NEXT"
            }
            let fontSize = w>h ? buttonMirror.width / 7 :  buttonMirror.width / 7
            wildcard = {fontSize:fontSize, numberOfLines:.8}
            params = {p:p,objectToMirror:buttonMirror,x:x,y:y,row:true,width:width,height:height, wildcard:wildcard}
            this.buttons[i] = new TextBox(params)
            this.buttons[i].setInteractivity(true);
            this.buttons[i].setStroke(true)
            this.buttons[i].setFill(true)
            this.buttons[i].setColor(color);
            this.buttons[i].setTextColor("black")
            performClickOnce = true;
            this.buttons[i].setClickType(performClickOnce)
            this.buttons[i].setString(buttonString);
            this.buttons[i].clickedColor = p.color(244,129,130);
            _ui.push(this.buttons[i])
        }
        // AUTOPLAY
        // this is still in progress.
        this.buttons[0].mouseClickfunc = () => {
            this.autoplay=!this.autoplay;
            if (this.autoplay){
                this.buttons[0].setColor(p.color(244,129,130))
                if (this.isPlayingFunc===undefined && this.drawing.drawingHasBeenDrawn){
                     this.isPlayingFunc = beginRedrawingStrokesAndAddingCharsFunc();
                }
            } else {
                this.buttons[0].setColor(p.color(255))
            }
            this.drawing.loop= false;
            this.buttons[1].setColor(p.color(255))
        };
        // LOOP
        this.buttons[1].mouseClickfunc = () => {
            this.drawing.loop=!this.drawing.loop;
            if (this.drawing.loop){
                this.buttons[1].setColor(p.color(244,129,130))
                this.autoplay= false;
                this.buttons[0].setColor(p.color(255))
                this.predraw= false;
                this.buttons[2].setColor(p.color(255))
            } else {
                this.buttons[1].setColor(p.color(255))
            }
            if (this.isPlayingFunc===undefined && this.drawing.drawingHasBeenDrawn){
                 this.isPlayingFunc = beginRedrawingStrokesAndAddingCharsFunc();
            }
        };
        // PREDRAW
        // this is still in progress.
        this.buttons[2].mouseClickfunc = () => {
            this.predraw=!this.predraw;
            if (this.predraw){
                this.buttons[2].setColor(p.color(244,129,130))
                this.drawing.loop = false;
                this.buttons[1].setColor(p.color(255))
                this.drawing.setSubmittedStrokeIndex(REACT_APP.state.response1[this.responseIndex].vertices.length-2)
            } else {
                this.buttons[2].setColor(p.color(255))
            }
        };
        // BACK TO MENU
        this.buttons[3].mouseClickfunc = () => {
            setTimeout(()=>{changeView(0)},250)
        };
        // PREV
        // this is still in progress.
        this.buttons[4].mouseClickfunc = () => {
            if (this.responseIndex>=1){
                this.responseIndex--;
            } else {
                this.responseIndex = REACT_APP.state.response1.length-1;
            }
            this.drawing.setSubmittedStrokes(REACT_APP.state.response1[this.responseIndex].vertices)
            if (this.predraw){
                this.drawing.setSubmittedStrokeIndex(REACT_APP.state.response1[this.responseIndex].vertices.length-2)
            } else {
                this.drawing.setSubmittedStrokeIndex(0)
            }
            this.drawing.drawingHasBeenDrawn = false;
            this.allCharsAdded = false;
            this.charIndex = 0
            this.dialog.setString("")
            if (this.predraw){
                this.addCharacterToDialogString(REACT_APP)
            }
        };
        // NEXT
        // this is still in progress.
        this.buttons[5].mouseClickfunc = () => {
            if (this.responseIndex<REACT_APP.state.response1.length-1){
                this.responseIndex++;
            } else {
                this.responseIndex = 0;
                // get more drawings!
                REACT_APP.fetchDrawings(8)
            }
            this.drawing.setSubmittedStrokes(REACT_APP.state.response1[this.responseIndex].vertices)
            if (this.predraw){
                this.drawing.setSubmittedStrokeIndex(REACT_APP.state.response1[this.responseIndex].vertices.length-2)
            } else {
                this.drawing.setSubmittedStrokeIndex(0)
            }
            this.drawing.drawingHasBeenDrawn = false;
            this.allCharsAdded = false;
            this.charIndex = 0
            this.dialog.setString("")
            if (this.predraw){
                this.addCharacterToDialogString(REACT_APP)
            }
        };;

        return _ui;
    }
}
