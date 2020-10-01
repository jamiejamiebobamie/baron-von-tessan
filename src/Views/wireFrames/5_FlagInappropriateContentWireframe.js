import Wireframe from '../../uiClasses/Wireframe';
import Mirror from '../../uiClasses/Mirror';


export default class FlagInappropriateContentWireframe {
    constructor(){
        this.mirrorTest1 = undefined
        this.mirrorTest2 = [undefined,undefined,undefined]
        this.mirrorTest3 = [undefined,undefined,undefined]

    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI){
        let wireFrameElements = []
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
        let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        let parameters = { p:p,
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
            let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1,string:"this a container to place the drawings."}
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
        let _ui = []
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
        parameters = {p:p,objectToMirror:wireFrameElements[0],x:x,y:y,width:width,height:height}
        this.mirrorTest1 = new Mirror(parameters)
        _ui.push(this.mirrorTest1)
        //

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
            parameters = {p:p,objectToMirror:topLeft[i],x:x,y:y,width:width,height:height}
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
            parameters = {p:p,objectToMirror:bottomRight[i],x:x,y:y,width:width,height:height}
            this.mirrorTest3[i] = new Mirror(parameters)
            _ui.push(this.mirrorTest3[i])
        }

        return _ui;
    }
}
