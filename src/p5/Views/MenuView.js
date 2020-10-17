import TextBox from '../uiClasses/TextBox';
import Wireframe from '../uiClasses/Wireframe';

export default class MenuView {
    constructor(){
        // title object
        this.title = undefined;

        this.titleText = "Baron von Tessan";
        this.titleTextIndex = -1;

        this.timeOutVar1 = undefined;
        this.timeOutVar2 = undefined;

        // button objects
        this.enterSiteButton = undefined;
        this.justDrawButton = undefined;
        this.justWatchDrawingsButton = undefined;
    }
    addCharacterToTitle(){
        if (this.titleTextIndex<this.titleText.length+1){
            let allOfDialog = this.titleText;
            let dialogString = allOfDialog.slice(0,this.titleTextIndex++);
            if (this.title){
                let hasCursor = this.title.text.includes("|");
                dialogString = hasCursor ? dialogString + "|" : dialogString;
                this.title.setString(dialogString);
                this.timeOutVar1 = setTimeout(()=>{this.addCharacterToTitle()},200);
            }
        } else {
            clearTimeout(this.timeOutVar1);
            return;
        }
    }
    toggleShowCursor(bool){
        if (this.title){
            bool = !bool;
            if (bool){
                if (!this.title.text.includes("|")){
                    this.title.text+="|";
                } else {
                    this.title.text = this.title.text.replace("|","");
                }
            }
        }
        this.timeOutVar2 = setTimeout(()=>{this.toggleShowCursor(bool)},700);
    }
    getUI(previousUI){return this;}
    setUI(p,w,h,REACT_APP,windowResized,previousUI,changeView){
        let wildcard;
        let parameters;
        /// ---- ******** BEGIN WIREFRAME OBJECTS
            // wireframe objects are not drawn to screen.
        wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:.9}
        parameters = {     p:p,
                           windowWidth: w,
                           windowHeight: h,
                           width:w>800?800:w,
                           offsetX:w>800?(w-800)/2:0,
                           row:true,
                           wildcard:wildcard,
                         }
        let menuContainer = new Wireframe(parameters);
        let menuSections = [];
        let section;
        for (let i = 0; i < 4; i++){
            wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.6};
            parameters = { p:p,
                               windowWidth:w,
                               windowHeight:h,
                               row:true,
                               parent:menuContainer,
                               len:4,
                               index:i,
                               wildcard:wildcard,
                               offsetY:i===0?-menuContainer.height/24:0,
                             }
            section = new Wireframe(parameters);
            menuSections.push(section);
        }
        /// ---- ******** END WIREFRAME OBJECTS

        /// ---- ******** BEGIN _UI OBJECTS
        let _ui = [];
        // _ui objects are drawn to screen and mirror a wireframe object
        let x,y,width,height,objectToMirror
        let text = "";
        for (let i = 0; i < menuSections.length; i++){
            if (i===0){
                // TITLE
                if (previousUI){
                    if (previousUI.title){
                        x = previousUI.title.x;
                        y = previousUI.title.y;
                        width = previousUI.title.width;
                        height = previousUI.title.height;
                        text = previousUI.title.text;
                    }
                }
                objectToMirror = menuSections[i];
                wildcard = {text:text,numberOfLines:.8,fontSize:w>h?objectToMirror.width/13:objectToMirror.width/8};
                parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard};
                this.title = new TextBox(parameters);
                _ui.push(this.title);
            } else {
            // BUTTONS
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
                    objectToMirror = menuSections[i];
                    wildcard = {numberOfLines:4};
                    parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard};
                    this.enterSiteButton = new TextBox(parameters);
                    let doOnce = true;
                    this.enterSiteButton.setClickType(doOnce);
                    let isInteractive = true;
                    this.enterSiteButton.setInteractivity(isInteractive);
                    this.enterSiteButton.setStroke(true);
                    this.enterSiteButton.setFill(true);
                    this.enterSiteButton.setColor("white");
                    this.enterSiteButton.mouseClickfunc = changeView;
                    this.enterSiteButton.setString("ENTER SITE");
                    _ui.push(this.enterSiteButton);
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
                    objectToMirror = menuSections[i];
                    wildcard = {numberOfLines:3};
                    parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard};
                    this.justDrawButton = new TextBox(parameters);
                    let doOnce = true;
                    this.justDrawButton.setClickType(doOnce);
                    let isInteractive = true;
                    this.justDrawButton.setInteractivity(isInteractive);
                    this.justDrawButton.setStroke(true);
                    this.justDrawButton.setFill(true);
                    this.justDrawButton.setColor("white");
                    this.justDrawButton.mouseClickfunc = () => {changeView(3,5)};
                    this.justDrawButton.setString("I just want to draw!");
                    _ui.push(this.justDrawButton);
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
                    objectToMirror = menuSections[i];
                    wildcard = {numberOfLines:3};
                    parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard}
                    this.justWatchDrawingsButton = new TextBox(parameters);
                    let doOnce = true;
                    this.justWatchDrawingsButton.setClickType(doOnce);
                    let isInteractive = true;
                    this.justWatchDrawingsButton.setInteractivity(isInteractive);
                    this.justWatchDrawingsButton.setStroke(true);
                    this.justWatchDrawingsButton.setFill(true);
                    this.justWatchDrawingsButton.setColor("white");
                    this.justWatchDrawingsButton.mouseClickfunc = () => {changeView(2,3)};
                    this.justWatchDrawingsButton.setString("I want to see what other people drew!");
                    _ui.push(this.justWatchDrawingsButton);
                }
            }
        }
        // only called once when the view
            // is loaded for the first time.
        if (!windowResized){
            this.addCharacterToTitle();
            this.toggleShowCursor(true);
        }
        // if all of the characters of the title have been added
            // set the title to display all of the text
            // (only an issue if the user resizes the window after
            // 'addCharacterToTitle' has finished.)
        if (this.titleTextIndex>=this.titleText.length){
            let allOfDialog = this.titleText;
            this.title.setString(allOfDialog);
        }
        return _ui;
    }
}
