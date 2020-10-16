import TextBox from '../../uiClasses/TextBox';
import Wireframe from '../../uiClasses/Wireframe';

export default class testView {
    constructor(previousView){
        this.title = {text:""}
        this.titleText = "Baron von Tessan";
        this.timeOutVar1 = undefined;
        this.timeOutVar2 = undefined;
        this.titleTextIndex = -1;
        this.buttons = []
        this.enterSiteButton = undefined
        this.justDrawButton = undefined
        this.justWatchDrawingsButton = undefined
    }
    addCharacterToTitle(){
        if (this.titleTextIndex<this.titleText.length+1){
            let allOfDialog = this.titleText
            let dialogString = allOfDialog.slice(0,this.titleTextIndex++)
            if (this.title){
                if (this.title.text){
                    let hasCursor = this.title.text.includes("|")
                    dialogString = hasCursor ? dialogString + "|" : dialogString;
                    this.title.setString(dialogString)
                } else {
                    this.title.setString("")
                }
                clearTimeout(this.timeOutVar)
                this.timeOutVar = setTimeout(()=>{this.addCharacterToTitle()},200)
            }
        } else {
            clearTimeout(this.timeOutVar)
            return
        }
    }
    toggleShowCursor(bool){
        if (this.title){
            bool = !bool
            if (bool){
                // necessary for if user is resizing window
                    // while view changes back to menu
                if (!this.title.text){
                    this.title.text = ""
                }
                if (!this.title.text.includes("|")){
                    this.title.text+="|"
                } else if (this.title.text) {
                    this.title.text = this.title.text.replace("|","")
                }
            }
        }
        this.timeOutVar2 = setTimeout(()=>{this.toggleShowCursor(bool)},700)
    }
    getUI(previousUI){return this}
    setUI(p,w,h,REACT_APP,windowResized,previousUI,changeView){
        let _ui = []
        let color;
        let wildcard;
        let parameters;

        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:.9}
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

        let menuSections = []
        let section;

        for (let i = 0; i < 4; i++){
            color = i%2 ?"blue" :"red"
            wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.6}
            parameters = { p:p,
                               windowWidth: w,
                               windowHeight: h,
                               row:true,
                               parent:menuContainer,
                               len:4,
                               index:i,
                               color:color,
                               wildcard:wildcard,
                               offsetY:i===0?-menuContainer.height/24:0,
                             }
                section = new Wireframe(parameters)
                menuSections.push(section)
            }

        let x,y,width,height, objectToMirror, button;
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
                wildcard = {numberOfLines:.8,fontSize:w>h?objectToMirror.width/13:objectToMirror.width/8}
                parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard}
                this.title = new TextBox(parameters)
                _ui.push(this.title)
            } else {
                    if (i === 1){
                        // 1: Enter Site
                        if (previousUI){
                            if (previousUI.enterSiteButton){
                                x = previousUI.enterSiteButton.x;
                                y = previousUI.enterSiteButton.y;
                                width = previousUI.enterSiteButton.width;
                                height = previousUI.enterSiteButton.height;
                            }
                        }
                        objectToMirror = menuSections[i]
                        wildcard = {numberOfLines:4}
                        parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard}
                        this.enterSiteButton = new TextBox(parameters)
                        let doOnce = true;
                        this.enterSiteButton.setClickType(doOnce)
                        let isInteractive = true;
                        this.enterSiteButton.setInteractivity(isInteractive)
                        this.enterSiteButton.setStroke(true)
                        this.enterSiteButton.setFill(true)
                        this.enterSiteButton.setColor("white")

                        this.enterSiteButton.mouseClickfunc = changeView
                        this.enterSiteButton.setString("ENTER SITE")
                        _ui.push(this.enterSiteButton)
                    } else if (i === 2){
                        // 2: I just want to draw!
                        if (previousUI){
                            if (previousUI.justDrawButton){
                                x = previousUI.justDrawButton.x;
                                y = previousUI.justDrawButton.y;
                                width = previousUI.justDrawButton.width;
                                height = previousUI.justDrawButton.height;
                            }
                        }
                        objectToMirror = menuSections[i]
                        wildcard = {numberOfLines:3}
                        parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard}
                        this.justDrawButton = new TextBox(parameters)
                        let doOnce = true;
                        this.justDrawButton.setClickType(doOnce)
                        let isInteractive = true;
                        this.justDrawButton.setInteractivity(isInteractive)
                        this.justDrawButton.setStroke(true)
                        this.justDrawButton.setFill(true)
                        this.justDrawButton.setColor("white")

                        this.justDrawButton.mouseClickfunc = () => {changeView(3,5)}
                        this.justDrawButton.setString("I just want to draw!")
                        _ui.push(this.justDrawButton)
                    } else if (i === 3) {
                        // 3: I want to see what other people drew!
                        if (previousUI){
                            if (previousUI.justWatchDrawingsButton){
                                x = previousUI.justWatchDrawingsButton.x;
                                y = previousUI.justWatchDrawingsButton.y;
                                width = previousUI.justWatchDrawingsButton.width;
                                height = previousUI.justWatchDrawingsButton.height;
                            }
                        }
                        objectToMirror = menuSections[i]
                        wildcard = {numberOfLines:3}
                        parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard}
                        this.justWatchDrawingsButton = new TextBox(parameters)
                        let doOnce = true;
                        this.justWatchDrawingsButton.setClickType(doOnce)
                        let isInteractive = true;
                        this.justWatchDrawingsButton.setInteractivity(isInteractive)
                        this.justWatchDrawingsButton.setStroke(true)
                        this.justWatchDrawingsButton.setFill(true)
                        this.justWatchDrawingsButton.setColor("white")

                        this.justWatchDrawingsButton.mouseClickfunc = () => {changeView(2,3)}
                        this.justWatchDrawingsButton.setString("I want to see what other people drew!")
                        _ui.push(this.justWatchDrawingsButton)
                    }
                }
            }
            if (!windowResized){
                this.addCharacterToTitle()
                this.toggleShowCursor(true)
            }
            if (this.titleTextIndex>=this.titleText.length){
                let allOfDialog = this.titleText
                this.title.setString(allOfDialog)
            }
        return _ui;
    }
}
