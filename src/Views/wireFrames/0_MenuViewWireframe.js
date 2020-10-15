import testCallBackButton from '../../uiClasses';
import TextBox from '../../uiClasses/TextBox';
import Wireframe from '../../uiClasses/Wireframe';


export default class testView {
    constructor(previousView){
        this.title = undefined;
        this.buttons = []
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI,changeView){
        let _ui = []
        let color;
        let wildcard;
        let parameters;

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:1}
        parameters = {     p:p,
                           windowWidth: w,
                           windowHeight: h,
                           width: w > 800?800:w,
                           offsetX:w > 800?(w-800)/2:0,
                           row:true,
                           color:"pink",
                           wildcard:wildcard,
                         }
         let menuContainer = new Wireframe(parameters)
         // _ui.push(menuContainer)

        let menuSections = []
        let section;

        for (let i = 0; i < 4; i++){
            color = i%2 ?"blue" :"red"
            wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.9}
            parameters = { p:p,
                               windowWidth: w,//menuContainer.width, // this might be wrong.
                               windowHeight: h,//menuContainer.height, // this might be wrong.
                               row:true,
                               parent:menuContainer,
                               len:4,
                               index:i,
                               color:color,
                               wildcard:wildcard,
                             }
                section = new Wireframe(parameters)
                menuSections.push(section)
            }

        let x,y,width,height, objectToMirror;
        for (let i = 0; i < menuSections.length; i++){
            if (i===0){
                // title
                if (previousUI){
                    if (previousUI.title){
                        x = previousUI.title.x;
                        y = previousUI.title.y;
                        width = previousUI.title.width;
                        height = previousUI.title.height;
                    }
                }
                objectToMirror = menuSections[i]
                wildcard = {}
                parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard}
                this.title = new TextBox(parameters)
                this.title.setStroke(true)

                _ui.push(this.title)

            } else {
                // buttons
                if (previousUI){
                    if (previousUI.buttons){
                        x = previousUI.buttons[i-1].x;
                        y = previousUI.buttons[i-1].y;
                        width = previousUI.buttons[i-1].width;
                        height = previousUI.buttons[i-1].height;
                    }
                }
                objectToMirror = menuSections[i]
                wildcard = {numberOfLines:3}
                parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard}
                let button = new TextBox(parameters)
                this.buttons.push(button)

                let doOnce = true;
                this.buttons[i-1].setClickType(doOnce)
                let isInteractive = true;
                this.buttons[i-1].setInteractivity(isInteractive)
                this.buttons[i-1].setStroke(true)


                if (i === 1){
                    // 1: Enter Site
                    this.buttons[i-1].mouseClickfunc = changeView
                    this.buttons[i-1].setString("ENTER SITE")
                } else if (i === 2){
                    // 2: I just want to draw!
                    this.buttons[i-1].mouseClickfunc = () => {changeView(3,5)} // need to pass in a variable to the views to signal early exit
                    this.buttons[i-1].setString("I just want to draw!")
                } else if (i === 3) {
                    // 3: I want to see what other people drew!
                    this.buttons[i-1].mouseClickfunc = () => {changeView(2,3)} // need to pass in a variable to the views to signal early exit
                    this.buttons[i-1].setString("I want to see what other people drew!")
                }
                _ui.push(button)
            }


            }

        return _ui;
    }
    // setUI(p,w,h,REACT_APP,windowResized,previousView,changeView){
    //     let _ui = []
    //     let testClass
    //     for (let i = 0; i < 4; i++){
    //         let color = i%2 ?"blue" :"red"
    //         let parameters = { p:p,
    //                            windowWidth: w,
    //                            windowHeight: h,
    //                            row:true,
    //                            len:4,
    //                            index:i,
    //                            // color:color,
    //                          }
    //         if (i !== 0){
    //             // buttons
    //             testClass = new testCallBackButton(parameters)
    //             let doOnce = true;
    //             testClass.setClickType(doOnce)
    //             let isInteractive = true;
    //             testClass.setInteractivity(isInteractive)
    //             testClass.setStroke(true)
    //
    //             if (i === 1){
    //                 // 1: Enter Site
    //                 testClass.mouseClickfunc = changeView
    //             } else if (i === 2){
    //                 // 2: I just want to draw!
    //                 testClass.mouseClickfunc = () => {changeView(3,5)} // need to pass in a variable to the views to signal early exit
    //             } else {
    //                 // 3: I want to see what other people drew!
    //                 testClass.mouseClickfunc = () => {changeView(2,3)} // need to pass in a variable to the views to signal early exit
    //             }
    //         } else {
    //             // 0: title: "baron von tessan"
    //             testClass = new testCallBackButton(parameters)
    //         }
    //         _ui.push(testClass)
    //     }
    //     return _ui;
    // }
}
