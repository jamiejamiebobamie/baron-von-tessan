import Wireframe from '../../uiClasses/Wireframe';
import Mirror from '../../uiClasses/Mirror';

export default class testView {
    constructor(previousView){
        this.mirrorTest1 = undefined
        this.mirrorTest2 = undefined
        this.mirrorTest3 = undefined
        this.mirrorTest4 = undefined
        this.mirrorTest5 = undefined

        this.drawing = previousView ? previousView.drawing : undefined;

        // NOT THE DIALOG BOX -- CONTROLS WINDOW
        this.dialog = previousView ? previousView.dialog : undefined;

    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI){
        let wireFrameElements = []
        let _ui = []


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

        wildcard = {shouldBeSquare:true,shrinkAmountWidth:1,shrinkAmountHeight:REACT_APP.state.isMobile?.9:1,string:"[user drawing just submitted]"}
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

         // inputFormParent = REACT_APP.state.isMobile && w>h ? topTwoThirdsOfViewSplitInTwoSecondHalf : bottomThirdOfScreen;
         // inputFormParent = REACT_APP.state.isMobile && !w>h ? middleThirdOfScreen : bottomThirdOfScreen;

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:.5, string:"this is the inputform container"}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:true,
                           color:"green",
                           wildcard:wildcard,
                           parent:inputFormParent,
                         }
        let inputform = new Wireframe(parameters)
        // wireFrameElements.push(inputform)

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
        // _ui.push(inputformContainer1)

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
        // _ui.push(inputformContainer2)

        wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:1.5, string:"<< Back"}
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
        // _ui.push(backButton)

        wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:1.5, string:"Submit"}
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
        // _ui.push(submitButton)

        wildcard = {shrinkAmountWidth:.95,shrinkAmountHeight:1.8,string:"I drew a... (click me and type)"}
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
        // _ui.push(input)

        // _ui.push(drawing)

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h,
                           row:true,
                           len:3,
                           index:2,
                           offsetY:REACT_APP.state.isMobile?0:h,
                           color:"red",
                           wildcard:wildcard,
                           parent:REACT_APP.state.isMobile?wireFrameElements[3]:wireFrame,
                         }
        let areaForKeyboard = new Wireframe(parameters)

        let x,y,width,height;
        if (previousUI){
            if (previousUI.mirrorTest1){
                x = previousUI.mirrorTest1.x;
                y = previousUI.mirrorTest1.y;
                width = previousUI.mirrorTest1.width;
                height = previousUI.mirrorTest1.height;
            }
        }
        parameters = {p:p,objectToMirror:backButton,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
        this.mirrorTest1 = new Mirror(parameters)
        _ui.push(this.mirrorTest1)

        if (previousUI){
            if (previousUI.mirrorTest2){
                x = previousUI.mirrorTest2.x;
                y = previousUI.mirrorTest2.y;
                width = previousUI.mirrorTest2.width;
                height = previousUI.mirrorTest2.height;
            }
        }
        parameters = {p:p,objectToMirror:submitButton,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
        this.mirrorTest2 = new Mirror(parameters)
        _ui.push(this.mirrorTest2)

        if (previousUI){
            if (previousUI.dialog){
                x = previousUI.dialog.x;
                y = previousUI.dialog.y;
                width = previousUI.dialog.width;
                height = previousUI.dialog.height;
            }
        }
        parameters = {p:p,objectToMirror:input,x:x,y:y,width:width,height:height, mouseClickfunc:REACT_APP.testViewSwitch}
        this.dialog = new Mirror(parameters)
        _ui.push(this.dialog)

        if (previousUI){
            if (previousUI.drawing){
                x = previousUI.drawing.x;
                y = previousUI.drawing.y;
                width = previousUI.drawing.width;
                height = previousUI.drawing.height;
            }
        }
        parameters = {p:p,objectToMirror:drawing,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
        this.drawing = new Mirror(parameters)
        _ui.push(this.drawing)

        if (previousUI){
            if (previousUI.mirrorTest5){
                x = previousUI.mirrorTest5.x;
                y = previousUI.mirrorTest5.y;
                width = previousUI.mirrorTest5.width;
                height = previousUI.mirrorTest5.height;
            }
        }
        parameters = {p:p,objectToMirror:areaForKeyboard,x:x,y:y,width:width,height:height}
        this.mirrorTest5 = new Mirror(parameters)
        _ui.push(this.mirrorTest5)

        return _ui;
    }
}
