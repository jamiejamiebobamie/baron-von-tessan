import Wireframe from '../../uiClasses/Wireframe';
import Mirror from '../../uiClasses/Mirror';

export default class testView {
    constructor(previousView){
        this.drawing = previousView ? previousView.drawing : undefined;

        // NOT THE DIALOG BOX -- CONTROLS WINDOW
        this.buttons = [undefined,undefined,undefined,undefined]
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI){
        let _ui = []
        let drawingSpaceWidth = w > h ? w*(2/3) : w;
        let drawingSpaceHeight = w > h ? h : h*(2/3);
        let lengthOfDrawingSquare = w > h ? drawingSpaceHeight : drawingSpaceWidth;
        let longerSideOfScreen = w > h ? w : h;
        lengthOfDrawingSquare = lengthOfDrawingSquare > longerSideOfScreen*(2/3) ? longerSideOfScreen*(2/3) : lengthOfDrawingSquare;
        let wildcard = {shouldBeSquare:false,shrinkAmountWidth:.9,shrinkAmountHeight:.9,string:"this is where the drawings will be displayed."}
        let parameters = { p:p,
                           windowWidth: w,
                           windowHeight: h,

                             offsetX:w>h?0:(w-lengthOfDrawingSquare)/2,
                             offsetY:w>h?(h-lengthOfDrawingSquare)/2:0,

                           width:lengthOfDrawingSquare,
                           height:lengthOfDrawingSquare,
                           len:3,
                           index:0,
                           color:"red",
                           wildcard:wildcard,
                           // mouseClickfunc: REACT_APP.testViewSwitch
                         }
        let drawingArea = new Wireframe(parameters)
        // _ui.push(wireFrame1)

        wildcard = {shouldBeSquare:false,shrinkAmountWidth:1.1,shrinkAmountHeight:.9,string:"this is a container to place the description."}
        parameters = { p:p,
                           windowWidth: w,
                           windowHeight: h,
                           // offsetY:h-10,
                           // row:false,
                           len:3,
                           index:2,
                           // color:"red",
                           wildcard:wildcard,
                           // mouseClickfunc: REACT_APP.testViewSwitch
                         }
        let controlsArea = new Wireframe(parameters)
        // _ui.push(controlsArea)

        let buttons = []
        for (let i = 0; i<4;i++){
            wildcard = {shouldBeSquare:false,shrinkAmountWidth:w>h?.7:.9,shrinkAmountHeight:w>h?.5:.3}

            if (i === 0){
                wildcard.string = "PEN"
            } else if (i === 1) {
                wildcard.string = "UNDO"
            } else if (i === 2) {
                wildcard.string = "CLEAR"
            } else {
                wildcard.string = "SUBMIT"
            }
            parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               row:w>h,
                               len:w>h?4:3,
                               offsetY:w<h?-controlsArea.height/3:0,
                               index:i,
                               color:"pink",
                               wildcard:wildcard,
                               parent:controlsArea,
                              mouseClickfunc: REACT_APP.testViewSwitch
                             }
            let button = new Wireframe(parameters)
            // _ui.push(button)
            buttons.push(button)
        }

        // if(w<h){
                wildcard = {shouldBeSquare:false,shrinkAmountWidth:1,shrinkAmountHeight:.9,string:"SUBMIT"}
                parameters = { p:p,
                                   windowWidth: w,
                                   windowHeight: h,
                                   row:true,
                                   len:3,
                                   offsetY:-controlsArea.height/4,
                                   index:2,
                                   color:"pink",
                                   wildcard:wildcard,
                                   parent:controlsArea,
                                  mouseClickfunc: REACT_APP.testViewSwitch
                                   // mouseClickfunc: REACT_APP.testViewSwitch
                                 }
                let button = new Wireframe(parameters)
                // _ui.push(button)
                buttons.push(button)
        // }


        let x,y,width,height;
        if (previousUI){
            if (previousUI.drawing){
                x = previousUI.drawing.x;
                y = previousUI.drawing.y;
                width = previousUI.drawing.width;
                height = previousUI.drawing.height;
            }
        }
        parameters = {p:p,objectToMirror:drawingArea,x:x,y:y,width:width,height:height, mouseClickfunc: REACT_APP.testViewSwitch}
        this.drawing = new Mirror(parameters)
        _ui.push(this.drawing)

        for (let i = 0; i<4;i++){
            if (previousUI){
                if (previousUI.buttons){
                    if (previousUI.buttons[i]){
                    x = previousUI.buttons[i].x;
                    y = previousUI.buttons[i].y;
                    width = previousUI.buttons[i].width;
                    height = previousUI.buttons[i].height;
                }
            }
        }
        let submitButtonMirror = buttons[i];
        // submit button logic
        if (i === 3)
        {
            submitButtonMirror = w>h ? buttons[3]:buttons[4]
        }
            parameters = {p:p,objectToMirror:submitButtonMirror,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
            this.buttons[i] = new Mirror(parameters)
            _ui.push(this.buttons[i])
        }

        // if (previousUI){
        //     if (previousUI.dialog){
        //         x = previousUI.dialog.x;
        //         y = previousUI.dialog.y;
        //         width = previousUI.dialog.width;
        //         height = previousUI.dialog.height;
        //     }
        // }
        // parameters = {p:p,objectToMirror:controlsArea,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
        // this.dialog = new Mirror(parameters)
        // _ui.push(this.dialog)

        return _ui;
    }
}


// import Wireframe from '../../uiClasses/Wireframe';
// import Mirror from '../../uiClasses/Mirror';
//
// export default class testView {
//     constructor(){
//         this.mirrorTest1 = undefined
//         this.mirrorTest2 = undefined
//         this.mirrorTest3 = undefined
//         this.mirrorTest4 = undefined
//         this.mirrorTest5 = undefined
//     }
//     getUI(previousUI){return this}
//     setUI(p,w,h,REACT_APP,windowResized,previousUI){
//         let wireFrameElements = []
//         let _ui = []
//
//
//         let wildcard;
//         let parameters;
//         let wireFrame
//         for (let i = 0; i < 3; i++){
//             let color = i%2 ?"orange" :"orange"
//             wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1, string:"break the screen into 3 rows"}
//             parameters = { p:p,
//                                windowWidth: w,
//                                windowHeight: h,
//                                row:h>w,
//                                len:3,
//                                index:i,
//                                color:color,
//                                wildcard:wildcard,
//                              }
//             wireFrame = new Wireframe(parameters)
//             wireFrameElements.push(wireFrame)
//         }
//
//         wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight:  h,
//                            width: w>h?w:w*11/12,
//                           height:  w>h?h*11/12:h,
//
//                           offsetX:w>h?-w*1/6:w*1/24,
//                           offsetY:w>h?h*1/24:-h*1/6,
//
//                            color:"red",
//                            wildcard:wildcard,
//                            // row:w<h,
//                          }
//         let topTwoThirdsOfView = new Wireframe(parameters)
//         _ui.push(topTwoThirdsOfView)
//
//         wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.9, string:"this is the inputform container"}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h,
//                            row:w>h*3,
//                            color:"green",
//                            wildcard:wildcard,
//                            parent:wireFrameElements[2],
//                          }
//         let inputform = new Wireframe(parameters)
//         _ui.push(inputform)
//
//         // wireFrameElements.push(inputform)
//
//         wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:1}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h,
//                            row:true,
//                            color:"orange",
//                            len:3,
//                            index:0,
//                            wildcard:wildcard,
//                            parent:inputform,
//                          }
//         let inputformContainer1 = new Wireframe(parameters)
//         // _ui.push(inputformContainer1)
//
//         wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:1}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h,
//                            row:true,
//                            color:"red",
//                            len:3,
//                            index:2,
//                            wildcard:wildcard,
//                            parent:inputform,
//                          }
//         let inputformContainer2 = new Wireframe(parameters)
//         // _ui.push(inputformContainer2)
//
//         wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.95, string:"<< Back"}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h,
//                            row:false,
//                            color:"pink",
//                            len:2,
//                            index:0,
//                            wildcard:wildcard,
//                            parent:inputformContainer2,
//                          }
//         let backButton = new Wireframe(parameters)
//         // _ui.push(backButton)
//
//         wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.95, string:"Submit"}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h,
//                            row:false,
//                            color:"purple",
//                            len:2,
//                            index:1,
//                            wildcard:wildcard,
//                            parent:inputformContainer2,
//                          }
//         let submitButton = new Wireframe(parameters)
//         // _ui.push(submitButton)
//
//         wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:.95,string:"I drew a... (click me and type)"}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h,
//                            // height:20,
//                            row:true,
//                            color:"purple",
//                            wildcard:wildcard,
//                            parent:inputformContainer1,
//                          }
//         let input = new Wireframe(parameters)
//         // _ui.push(input)
//
//         wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h*2/3,
//                            color:"green",
//                            wildcard:wildcard,
//                          }
//         wireFrame = new Wireframe(parameters)
//         // _ui.push(wireFrame)
//
//         // let drawingSquareSide = w>h?h*(2/3):w*(2/3)
//         wildcard = {shouldBeSquare:true,shrinkAmountWidth:1,shrinkAmountHeight:1,string:"[user drawing just submitted]"}
//         parameters = { p:p,
//                             windowWidth: w,
//                            windowHeight: h,
//                            // width:drawingSquareSide,
//                            // height:drawingSquareSide,
//                            color:"red",
//                            wildcard:wildcard,
//                            parent:topTwoThirdsOfView,//REACT_APP.state.isMobile?wireFrameElements[0]:wireFrame,
//                          }
//         let drawing = new Wireframe(parameters)
//         // _ui.push(drawing)
//
//
//         let x,y,width,height;
//         if (previousUI){
//             if (previousUI.mirrorTest1){
//                 x = previousUI.mirrorTest1.x;
//                 y = previousUI.mirrorTest1.y;
//                 width = previousUI.mirrorTest1.width;
//                 height = previousUI.mirrorTest1.height;
//             }
//         }
//         parameters = {p:p,objectToMirror:backButton,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
//         this.mirrorTest1 = new Mirror(parameters)
//         _ui.push(this.mirrorTest1)
//
//         if (previousUI){
//             if (previousUI.mirrorTest2){
//                 x = previousUI.mirrorTest2.x;
//                 y = previousUI.mirrorTest2.y;
//                 width = previousUI.mirrorTest2.width;
//                 height = previousUI.mirrorTest2.height;
//             }
//         }
//         parameters = {p:p,objectToMirror:submitButton,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
//         this.mirrorTest2 = new Mirror(parameters)
//         _ui.push(this.mirrorTest2)
//
//         if (previousUI){
//             if (previousUI.mirrorTest3){
//                 x = previousUI.mirrorTest3.x;
//                 y = previousUI.mirrorTest3.y;
//                 width = previousUI.mirrorTest3.width;
//                 height = previousUI.mirrorTest3.height;
//             }
//         }
//         parameters = {p:p,objectToMirror:input,x:x,y:y,width:width,height:height, mouseClickfunc:REACT_APP.testViewSwitch}
//         this.mirrorTest3 = new Mirror(parameters)
//         _ui.push(this.mirrorTest3)
//
//         if (previousUI){
//             if (previousUI.mirrorTest4){
//                 x = previousUI.mirrorTest4.x;
//                 y = previousUI.mirrorTest4.y;
//                 width = previousUI.mirrorTest4.width;
//                 height = previousUI.mirrorTest4.height;
//             }
//         }
//         parameters = {p:p,objectToMirror:drawing,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
//         this.mirrorTest4 = new Mirror(parameters)
//         _ui.push(this.mirrorTest4)
//
//         return _ui;
//     }
// }
