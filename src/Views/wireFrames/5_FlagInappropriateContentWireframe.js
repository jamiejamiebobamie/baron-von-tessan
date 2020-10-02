import Wireframe from '../../uiClasses/Wireframe';
import Mirror from '../../uiClasses/Mirror';


export default class FlagInappropriateContentWireframe {
    constructor(){
        this.mirrorTest1 = undefined
        this.mirrorTest2 = [undefined,undefined,undefined]
        this.mirrorTest3 = [undefined,undefined,undefined]
        this.mirrorTest4 = undefined
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI){
        let wireFrameElements = []
        let _ui = []

        for (let i = 0; i < 3; i++){
            let color = i%2 ?"pink" :"orange"
            let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1,string:"do you find any of this content offensive or inappropriate?"}
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               row:true,
                               len:3,
                               index:i,
                               color:color,
                               wildcard:wildcard,
                             }
            let wireFrame = new Wireframe(parameters)
            wireFrameElements.push(wireFrame)
        }

        let topThirdOfScreen = wireFrameElements[0]
        // for (let i = 0; i < 5; i++){
        //     let color = i<3 ?"pink" :"orange"
        //     let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1,string:"do you find any of this content offensive or inappropriate?"}
        //     let parameters = { p:p,
        //                        windowWidth: w,
        //                        windowHeight: h,
        //                        row:w<h,
        //                        len:5,
        //                        index:i,
        //                        color:color,
        //                        wildcard:wildcard,
        //                        parent:topThirdOfScreen,
        //                      }
        //     let wireFrame = new Wireframe(parameters)
        //     _ui.push(wireFrame)
        // }

        let wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.9}
        let parameters = { p:p,
                           windowWidth: w,
                           windowHeight: h,
                           width: w>h? topThirdOfScreen.width*(3/5):topThirdOfScreen.width,
                           height: w>h? topThirdOfScreen.height:topThirdOfScreen.height*(3/5),
                           // len:5,
                           // index:0,

                           offsetY:w>h? 0:-topThirdOfScreen.height*(1/5),
                           offsetX:w>h? -topThirdOfScreen.width*(1/5):0,
                           row:w>h,
                           color:"red",
                           wildcard:wildcard,
                           parent: topThirdOfScreen
                         }
        let questionArea = new Wireframe(parameters)
        // _ui.push(questionArea)

        wildcard = {shrinkAmountWidth:w>h?.8:.5,shrinkAmountHeight:w>h?.5:.8}
        parameters = { p:p,
                           windowWidth: w,
                           windowHeight: h,
                           width: w>h? topThirdOfScreen.width*(2/5):topThirdOfScreen.width,
                           height: w>h? topThirdOfScreen.height:topThirdOfScreen.height*(2/5),
                           // len:5,
                           // index:0,

                           offsetY:w>h? 0:topThirdOfScreen.height*(1.5/5),
                           offsetX:w>h? topThirdOfScreen.width*(1.5/5):0,
                           row:w>h,
                           color:"green",
                           wildcard:wildcard,
                           parent: topThirdOfScreen
                         }
        let submitButtonArea = new Wireframe(parameters)
        // _ui.push(submitButtonArea)

        // let questionArea = topThirdOfScreen*(3/5)
        // let submitButtonArea =


        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        parameters = { p:p,
                            windowWidth: w,
                           windowHeight: h*2/3,
                           offsetY:h*1/3,
                           // offsetX:w*1/3,
                           // row:w>h,
                           color:"green",
                           wildcard:wildcard,
                         }
        let wireFrame = new Wireframe(parameters)
        wireFrameElements.push(wireFrame)
        for (let i = 0; i < 2; i++){
            let color = i%2 ?"red" :"red"
            let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1,string:"this is a container to place the drawings."}
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               row:w>h,
                               len:2,
                               index:i,
                               color:color,
                               wildcard:wildcard,
                               parent:wireFrameElements[3]
                             }
            let wireFrame = new Wireframe(parameters)
            wireFrameElements.push(wireFrame)
        }
        // top or left row of drawings
        let topLeft = []
        for (let i = 0; i < 3; i++){
            let wildcard = {shouldBeSquare:true,shrinkAmountWidth:.95,shrinkAmountHeight:.95,string:"[user drawing]"}
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               // offsetY:h*1/3,
                               len:3,
                               index:i,
                               color:"red",
                               wildcard:wildcard,
                               parent:wireFrameElements[4]
                             }
            let wireFrame = new Wireframe(parameters)
            topLeft.push(wireFrame)
            // _ui.push(wireFrame)
        }
        // bottom or right row of drawings
        let bottomRight = []
        for (let i = 0; i < 3; i++){
            let wildcard = {shouldBeSquare:true,shrinkAmountWidth:.95,shrinkAmountHeight:.95,string:"[user drawing]"}
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               // offsetY:h*1/3,
                               len:3,
                               index:i,
                               color:"red",
                               wildcard:wildcard,
                               parent:wireFrameElements[5]
                             }
            let wireFrame = new Wireframe(parameters)
            bottomRight.push(wireFrame)
            // _ui.push(wireFrame)
        }
        let x,y,width,height;

        // display question
        if (previousUI){
            if (previousUI.mirrorTest1){
                x = previousUI.mirrorTest1.x;
                y = previousUI.mirrorTest1.y;
                width = previousUI.mirrorTest1.width;
                height = previousUI.mirrorTest1.height;
            }
        }
        parameters = {p:p,objectToMirror:questionArea,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
        this.mirrorTest1 = new Mirror(parameters)
        _ui.push(this.mirrorTest1)

        if (previousUI){
            if (previousUI.mirrorTest4){
                x = previousUI.mirrorTest4.x;
                y = previousUI.mirrorTest4.y;
                width = previousUI.mirrorTest4.width;
                height = previousUI.mirrorTest4.height;
            }
        }
        parameters = {p:p,objectToMirror:submitButtonArea,x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
        this.mirrorTest4 = new Mirror(parameters)
        _ui.push(this.mirrorTest4)

        // top left row to mirror
        for (let i = 0; i < 3; i++){
            if (previousUI){
                if (previousUI.mirrorTest2[i]){
                    x = previousUI.mirrorTest2[i].x;
                    y = previousUI.mirrorTest2[i].y;
                    width = previousUI.mirrorTest2[i].width;
                    height = previousUI.mirrorTest2[i].height;
                }
            }
            parameters = {p:p,objectToMirror:topLeft[i],x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
            this.mirrorTest2[i] = new Mirror(parameters)
            _ui.push(this.mirrorTest2[i])
        }

        // bottom right row to mirror
        for (let i = 0; i < 3; i++){
            if (previousUI){
                if (previousUI.mirrorTest3[i]){
                    x = previousUI.mirrorTest3[i].x;
                    y = previousUI.mirrorTest3[i].y;
                    width = previousUI.mirrorTest3[i].width;
                    height = previousUI.mirrorTest3[i].height;
                }
            }
            parameters = {p:p,objectToMirror:bottomRight[i],x:x,y:y,width:width,height:height,mouseClickfunc: REACT_APP.testViewSwitch}
            this.mirrorTest3[i] = new Mirror(parameters)
            _ui.push(this.mirrorTest3[i])
        }

        return _ui;
    }
}
