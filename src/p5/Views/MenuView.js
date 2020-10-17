import TextBox from '../uiClasses/TextBox';
import Wireframe from '../uiClasses/Wireframe';
import DisplayDrawingContainer from '../uiClasses/DisplayDrawingContainer';
import baronData from '../baronDrawingDataReduced'

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

        this.test = undefined
        this.drawings = []
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
    // returns true if boxes overlap
    isOverlapping(box1,box2){
        // https://gist.github.com/Daniel-Hug/d7984d82b58d6d2679a087d896ca3d2b
        // Check if rectangle a overlaps rectangle b
    	// no horizontal overlap
        if (box1.x >= box2.x+box2.width || box2.x >= box1.x+box1.width) return false;
        // no vertical overlap
        if (box1.y >= box2.y+box2.height || box2.y >= box1.y+box1.height) return false;
    	return true;
    }
    getUI(previousUI){return this;}
    setUI(p,w,h,REACT_APP,windowResized,previousUI,changeView){
        let _ui = [];
        let objectsTotest = [];
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
                               // color:i===0?"black":undefined,
                               offsetY:i===0?-menuContainer.height/24:0,
                             }
            section = new Wireframe(parameters);
            menuSections.push(section);
        }
        // _ui.push(menuSections[0])

        // objectsTotest.push(menuSections[0])
// Math.random()*(w-testWidth+1)

        if (w>800){
            for (let i = 0; i < 2; i++){
                let testWidth = w>h? Math.random()*(w/3-w/4+1)+w/4:Math.random()*(h/3-h/4+1)+h/4
                // Math.random() * (max - min + 1) + min

                let vertices = [
                    // {offsetX:0,offsetY:0+Math.random()*h/3+h/5},
                    {offsetX:w-testWidth,offsetY:h-testWidth-Math.random()*h/4},
                    {offsetX:0,offsetY:h-testWidth-Math.random()*h/4},
                ]

                wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:.9}
                parameters = {     p:p,
                                   windowWidth: w,
                                   windowHeight: h,
                                   width:testWidth,
                                   height:testWidth,
                                   offsetX:i>=vertices.length?Math.random() * (w - testWidth + 1):vertices[i].offsetX,
                                   offsetY:i>=vertices.length?Math.random() * (h - testWidth - h/5 + 1) + h/5:vertices[i].offsetY,
                                   row:true,
                                   // color:p.color(Math.random()*255,Math.random()*255,Math.random()*255),
                                   wildcard:wildcard,
                                 }
                this.test = new Wireframe(parameters);
                let isOverlapping = false;
                for (let i = 0; i < objectsTotest.length; i++){
                    if (!isOverlapping){
                        isOverlapping = this.isOverlapping(objectsTotest[i],this.test)
                    }
                }
                if (!isOverlapping){
                    objectsTotest.push(this.test)
                    // _ui.push(this.test)
                }
            }
        }
        /// ---- ******** END WIREFRAME OBJECTS

        /// ---- ******** BEGIN _UI OBJECTS
        // _ui objects are drawn to screen and mirror a wireframe object
        let x,y,width,height,objectToMirror, drawing

        for (let i = 0; i < objectsTotest.length; i++){
            let drawingHasBeenDrawn = false
            let strokeIndex = 0
            if (previousUI){
                if (previousUI.drawings){
                    if (previousUI.drawings[i]){
                        x = previousUI.drawings[i].x;
                        y = previousUI.drawings[i].y;
                        width = previousUI.drawings[i].width;
                        height = previousUI.drawings[i].height;
                        drawingHasBeenDrawn = previousUI.drawings[i].drawingHasBeenDrawn
                        strokeIndex = previousUI.drawings[i].submittedStrokeIndex
                        clearTimeout(previousUI.drawings[i].timeOut)
                    }
                }
            }
            wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}

            parameters = {p:p,w:w,h:h,objectToMirror:objectsTotest[i],x:x,y:y,width:width,height:height,wildcard:wildcard}//,color:"lightgrey",
            drawing = new DisplayDrawingContainer(parameters)
            drawing.setLengthOfDrawingSquare(objectsTotest[i].width)
            drawing.setFill(true)
            drawing.setSubmittedStrokes(baronData.drawingData)
            drawing.submittedStrokeIndex = strokeIndex;
            this.drawings.push(drawing)
            _ui.push(drawing)
        }
        let beginRedrawingStrokesFunc = (drawing) => {
            if (drawing){
                let redrawStrokes = (timeOutVar) => {
                    if (drawing.drawingHasBeenDrawn){
                        if (drawing.loop){
                            drawing.drawingHasBeenDrawn = false;
                            drawing.submittedStrokeIndex = 0;
                            clearTimeout(timeOutVar)
                        } else {
                            clearTimeout(timeOutVar)
                            return;
                        }
                    }
                    if (drawing.submittedStrokeIndex < drawing.submittedStrokes.length) {
                        drawing.submittedStrokeIndex++
                        clearTimeout(timeOutVar)
                        timeOutVar = setTimeout(redrawStrokes, 10,drawing,timeOutVar);
                    } else {
                        drawing.drawingHasBeenDrawn = true;
                        // pause three seconds to display drawing.
                            // then loop if this.displayDrawingSpace.loop
                            // is set to true otherwise return.
                        timeOutVar = setTimeout(redrawStrokes, 7000,drawing,timeOutVar);
                    }
                }
                redrawStrokes();
            }
        }

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
            for (let i = 0; i < this.drawings.length;i++){
                beginRedrawingStrokesFunc(this.drawings[i]);
            }
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
