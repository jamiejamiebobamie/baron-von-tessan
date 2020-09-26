import Wireframe from '../../uiClasses/Wireframe';
import Mirror from '../../uiClasses/Mirror';


export default class FlagInappropriateContentWireframe {
    constructor(){
        this.mirrorTest1 = undefined
        this.mirrorTest2 = undefined
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI){
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
            _ui.push(wireFrame)
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
        _ui.push(wireFrame)
        for (let i = 0; i < 2; i++){
            let color = i%2 ?"pink" :"red"
            let wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1,string:"this a container to place the drawings."}
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               row:w>h,
                               len:2,
                               index:i,
                               color:color,
                               wildcard:wildcard,
                               parent:_ui[3]
                             }
            let wireFrame = new Wireframe(parameters)
            _ui.push(wireFrame)
        }
        for (let i = 0; i < 3; i++){
            let wildcard = {shouldBeSquare:true,shrinkAmountWidth:.95,shrinkAmountHeight:.95,string:"[user drawing]"}
            let parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               // offsetY:h*1/3,
                               len:3,
                               index:i,
                               color:"pink",
                               wildcard:wildcard,
                               parent:_ui[4]
                             }
            let wireFrame = new Wireframe(parameters)
            _ui.push(wireFrame)
        }
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
                               parent:_ui[5]
                             }
            let wireFrame = new Wireframe(parameters)
            _ui.push(wireFrame)
        }
        // let x,y,width,height;
        // if (previousUI){
        //     if (previousUI.mirrorTest1){
        //         x = previousUI.mirrorTest1.x;
        //         y = previousUI.mirrorTest1.y;
        //         width = previousUI.mirrorTest1.width;
        //         height = previousUI.mirrorTest1.height;
        //     }
        // }
        // parameters = {p:p,objectToMirror:backButton,x:x,y:y,width:width,height:height}
        // this.mirrorTest1 = new Mirror(parameters)
        // _ui.push(this.mirrorTest1)
        //
        // if (previousUI){
        //     if (previousUI.mirrorTest2){
        //         x = previousUI.mirrorTest2.x;
        //         y = previousUI.mirrorTest2.y;
        //         width = previousUI.mirrorTest2.width;
        //         height = previousUI.mirrorTest2.height;
        //     }
        // }
        // parameters = {p:p,objectToMirror:submitButton,x:x,y:y,width:width,height:height}
        // this.mirrorTest2 = new Mirror(parameters)
        // _ui.push(this.mirrorTest2)
        //
        // if (previousUI){
        //     if (previousUI.mirrorTest3){
        //         x = previousUI.mirrorTest3.x;
        //         y = previousUI.mirrorTest3.y;
        //         width = previousUI.mirrorTest3.width;
        //         height = previousUI.mirrorTest3.height;
        //     }
        // }
        // parameters = {p:p,objectToMirror:input,x:x,y:y,width:width,height:height}
        // this.mirrorTest3 = new Mirror(parameters)
        // _ui.push(this.mirrorTest3)
        //
        // if (previousUI){
        //     if (previousUI.mirrorTest4){
        //         x = previousUI.mirrorTest4.x;
        //         y = previousUI.mirrorTest4.y;
        //         width = previousUI.mirrorTest4.width;
        //         height = previousUI.mirrorTest4.height;
        //     }
        // }
        // parameters = {p:p,objectToMirror:drawing,x:x,y:y,width:width,height:height}
        // this.mirrorTest4 = new Mirror(parameters)
        // _ui.push(this.mirrorTest4)
        return _ui;
    }
}
