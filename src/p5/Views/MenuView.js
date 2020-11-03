import TextBox from '../uiClasses/TextBox';
import Wireframe from '../uiClasses/Wireframe';
import DisplayDrawingContainer from '../uiClasses/DisplayDrawingContainer';

export default class MenuView {
    constructor(){
        // title ui object
        this.title = undefined;

        this.titleText = "Sketch Queen";
        this.titleTextIndex = 0;

        // timeoutVariables
        this.timeOutVar1 = undefined;
        this.timeOutVar2 = undefined;

        // button ui objects
        this.enterSiteButton = undefined;
        this.drawButton = undefined;
        this.viewButton = undefined;
        this.rateButton = undefined;
        this.animateButton = undefined;



        // background drawing ui objects
        this.backgroundDrawing1 = undefined;
        this.backgroundDrawing2 = undefined;
        this.backgroundDrawing3 = undefined;
        this.backgroundDrawing4 = undefined;
        this.screenHasSettled = false
    }
    addCharacterToTitle(){
        if (this.titleTextIndex<this.titleText.length+1){
            let allOfDialog = this.titleText;
            let dialogString = allOfDialog.slice(0,this.titleTextIndex++);
            if (this.title){
                this.title.setString(dialogString);
                this.timeOutVar1 = setTimeout(()=>{this.addCharacterToTitle()},100);
            }
        } else {
            clearTimeout(this.timeOutVar1);
            return;
        }
    }
    // returns true if boxes overlap
    isOverlapping(box1,box2){
        // https://gist.github.com/Daniel-Hug/d7984d82b58d6d2679a087d896ca3d2b

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
                           color:"green",
                           wildcard:wildcard,
                         }
        let menuContainer = new Wireframe(parameters);
        // _ui.push(menuContainer)
        let menuSections = [];
        let section;
        for (let i = 0; i < 5; i++){
            wildcard = {shrinkAmountWidth:w>h&&i!==0?.5:.8,shrinkAmountHeight:.6};
            parameters = { p:p,
                               windowWidth:w,
                               windowHeight:h,
                               row:true,
                               parent:menuContainer,
                               len:5,
                               index:i,
                               wildcard:wildcard,
                               // color:i%2?"black":"white",
                               offsetY:i===0?-menuContainer.height/24:w>h?menuContainer.height/24:-menuContainer.height/36,
                             }
            section = new Wireframe(parameters);
            menuSections.push(section);
            _ui.push(section)
        }
        // if (w>1100){
            // for (let i = 0; i < 2; i++){
            //     let testWidth = w<h?w/6:h/6;//w<h? Math.random()*(w/4-w/5+1)+w/4:Math.random()*(h/4-h/5+1)+h/5
            //     // Math.random() * (max - min + 1) + min
            //
            //     let vertices = [
            //         {offsetX:w-testWidth-testWidth,offsetY:Math.random()*(h-testWidth-h/4+1)+h/4},
            //         {offsetX:Math.random()*w/10,offsetY:Math.random()*(h-testWidth-h/4+1)+h/4},
            //         {offsetX:w-testWidth,offsetY:Math.random()*(h/2-testWidth-h/4+1)+h/4},
            //         {offsetX:Math.random()*w/10,offsetY:Math.random()*(h-testWidth-h/4+1)+h/4},
            //     ]
            //
            //     wildcard = {shrinkAmountWidth:1,shrinkAmountHeight:.9}
            //     parameters = {     p:p,
            //                        windowWidth: w,
            //                        windowHeight: h,
            //                        width:w>h?w/6:h/6,
            //                        height:w>h?w/6:h/6,
            //                        offsetX:i>=vertices.length?Math.random() * (w - testWidth + 1):vertices[i].offsetX,
            //                        offsetY:i>=vertices.length?Math.random() * (h - testWidth - h/5 + 1) + h/5:vertices[i].offsetY,
            //                        row:true,
            //                        color:p.color(Math.random()*255,Math.random()*255,Math.random()*255),
            //                        wildcard:wildcard,
            //                      }
            //     let testWireframe = new Wireframe(parameters);
            //     let isOverlapping = false;
            //     for (let i = 0; i < objectsTotest.length; i++){
            //         if (!isOverlapping){
            //             isOverlapping = this.isOverlapping(objectsTotest[i],testWireframe)
            //         }
            //     }
            //     if (!isOverlapping){
            //         objectsTotest.push(testWireframe)
            //         // _ui.push(testWireframe)
            //     }
            // }
        // }
        /// ---- ******** END WIREFRAME OBJECTS

        /// ---- ******** BEGIN _UI OBJECTS
        // _ui objects are drawn to screen and mirror a wireframe object
        let x,y,width,height,objectToMirror;
        for (let i = 0; i < objectsTotest.length; i++){
            let drawingHasBeenDrawn = false
            let strokeIndex = 0
            // parameters = {p:p,w:w,h:h,objectToMirror:objectsTotest[i],x:x,y:y,width:width,height:height,wildcard:wildcard,lerpSpeed:.01}//,color:"lightgrey"}
                if (i===0){
                    if (previousUI){
                        if (previousUI.backgroundDrawing1){
                            x = previousUI.backgroundDrawing1.x;
                            y = previousUI.backgroundDrawing1.y;
                            width = previousUI.backgroundDrawing1.width;
                            height = previousUI.backgroundDrawing1.height;
                            drawingHasBeenDrawn = previousUI.backgroundDrawing1.drawingHasBeenDrawn
                            strokeIndex = previousUI.backgroundDrawing1.submittedStrokeIndex
                            clearTimeout(previousUI.backgroundDrawing1.timeOut1)
                            clearTimeout(previousUI.backgroundDrawing1.timeOut2)
                        }
                    }
                    wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}//,strokeColor:objectsTotest[i].color}
                    parameters = {p:p,w:w,h:h,objectToMirror:objectsTotest[i],x:x,y:y,width:width,height:height,wildcard:wildcard,lerpSpeed:.01}//,color:"lightgrey"}
                    this.backgroundDrawing1 = new DisplayDrawingContainer(parameters)
                    this.backgroundDrawing1.setLengthOfDrawingSquare(objectsTotest[i].width)
                    this.backgroundDrawing1.setFill(true)
                    this.backgroundDrawing1.setSubmittedStrokes(REACT_APP.state.backgroundDrawingData[i])
                    this.backgroundDrawing1.submittedStrokeIndex = strokeIndex;
                    this.backgroundDrawing1.redrawStrokes();

                    _ui.push(this.backgroundDrawing1)
                } else if (i===1){
                    if (previousUI){
                        if (previousUI.backgroundDrawing2){
                            x = previousUI.backgroundDrawing2.x;
                            y = previousUI.backgroundDrawing2.y;
                            width = previousUI.backgroundDrawing2.width;
                            height = previousUI.backgroundDrawing2.height;
                            drawingHasBeenDrawn = previousUI.backgroundDrawing2.drawingHasBeenDrawn
                            strokeIndex = previousUI.backgroundDrawing2.submittedStrokeIndex
                            clearTimeout(previousUI.backgroundDrawing2.timeOut1)
                            clearTimeout(previousUI.backgroundDrawing2.timeOut2)
                        }
                    }
                    wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}//,strokeColor:objectsTotest[i].color}
                    parameters = {p:p,w:w,h:h,objectToMirror:objectsTotest[i],x:x,y:y,width:width,height:height,wildcard:wildcard,lerpSpeed:.01}//,color:"lightgrey"}
                    this.backgroundDrawing2 = new DisplayDrawingContainer(parameters)
                    this.backgroundDrawing2.setLengthOfDrawingSquare(objectsTotest[i].width)
                    this.backgroundDrawing2.setFill(true)
                    this.backgroundDrawing2.setSubmittedStrokes(REACT_APP.state.backgroundDrawingData[i])
                    this.backgroundDrawing2.submittedStrokeIndex = strokeIndex;
                    this.backgroundDrawing2.redrawStrokes();

                    _ui.push(this.backgroundDrawing2)
                } else if (i===2){
                    if (previousUI){
                        if (previousUI.backgroundDrawing3){
                            x = previousUI.backgroundDrawing3.x;
                            y = previousUI.backgroundDrawing3.y;
                            width = previousUI.backgroundDrawing3.width;
                            height = previousUI.backgroundDrawing3.height;
                            drawingHasBeenDrawn = previousUI.backgroundDrawing3.drawingHasBeenDrawn
                            strokeIndex = previousUI.backgroundDrawing3.submittedStrokeIndex
                            clearTimeout(previousUI.backgroundDrawing3.timeOut1)
                            clearTimeout(previousUI.backgroundDrawing3.timeOut2)
                        }
                    }
                    wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}//,strokeColor:objectsTotest[i].color}
                    parameters = {p:p,w:w,h:h,objectToMirror:objectsTotest[i],x:x,y:y,width:width,height:height,wildcard:wildcard,lerpSpeed:.01}//,color:"lightgrey"}
                    this.backgroundDrawing3 = new DisplayDrawingContainer(parameters)
                    this.backgroundDrawing3.setLengthOfDrawingSquare(objectsTotest[i].width)
                    this.backgroundDrawing3.setFill(true)
                    this.backgroundDrawing3.setSubmittedStrokes(REACT_APP.state.backgroundDrawingData[i])
                    this.backgroundDrawing3.submittedStrokeIndex = strokeIndex;
                    this.backgroundDrawing3.redrawStrokes();

                    _ui.push(this.backgroundDrawing3)
                }  else if (i===3){
                    if (previousUI){
                        if (previousUI.backgroundDrawing4){
                            x = previousUI.backgroundDrawing4.x;
                            y = previousUI.backgroundDrawing4.y;
                            width = previousUI.backgroundDrawing4.width;
                            height = previousUI.backgroundDrawing4.height;
                            drawingHasBeenDrawn = previousUI.backgroundDrawing4.drawingHasBeenDrawn
                            strokeIndex = previousUI.backgroundDrawing4.submittedStrokeIndex
                            clearTimeout(previousUI.backgroundDrawing4.timeOut1)
                            clearTimeout(previousUI.backgroundDrawing4.timeOut2)
                        }
                    }
                    wildcard = {windowResized:windowResized,drawingHasBeenDrawn:drawingHasBeenDrawn}
                    this.backgroundDrawing4 = new DisplayDrawingContainer(parameters)
                    this.backgroundDrawing4.setLengthOfDrawingSquare(objectsTotest[i].width)
                    this.backgroundDrawing4.setFill(true)
                    this.backgroundDrawing4.setSubmittedStrokes(REACT_APP.state.backgroundDrawingData[i])
                    this.backgroundDrawing4.submittedStrokeIndex = strokeIndex;
                    this.backgroundDrawing4.redrawStrokes();

                    _ui.push(this.backgroundDrawing4)
                }
        }
        let text = "";
        let fontSize;
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
                wildcard = {text:text,numberOfLines:.8,fontSize:w>h?objectToMirror.width/9:objectToMirror.width/6};
                parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard};
                this.title = new TextBox(parameters);
                _ui.push(this.title);
            } else {
            // BUTTONS
                // if (i === 1){
                //     // 1: Enter Site
                //     if (previousUI){
                //         if (previousUI.enterSiteButton){
                //             x = previousUI.enterSiteButton.x;
                //             y = previousUI.enterSiteButton.y;
                //             width = previousUI.enterSiteButton.width;
                //             height = previousUI.enterSiteButton.height;
                //         }
                //     }
                //     objectToMirror = menuSections[i];
                //     wildcard = {numberOfLines:4};
                //     parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard};
                //     this.enterSiteButton = new TextBox(parameters);
                //     let doOnce = true;
                //     this.enterSiteButton.setClickType(doOnce);
                //     let isInteractive = true;
                //     this.enterSiteButton.setInteractivity(isInteractive);
                //     this.enterSiteButton.setStroke(true);
                //     this.enterSiteButton.setFill(true);
                //     this.enterSiteButton.setColor("white");
                //     this.enterSiteButton.mouseClickfunc = ()=>{setTimeout(()=>{changeView()},250)};
                //     this.enterSiteButton.setString("ENTER SITE");
                //     if(REACT_APP.state.isMobile){
                //         fontSize = w>h?objectToMirror.height/2:objectToMirror.height/3;
                //         this.enterSiteButton.setFontSize(fontSize);
                //     }
                //     _ui.push(this.enterSiteButton);
            if (i === 1){
                    // 2: I just want to draw!
                    if (previousUI){
                        if (previousUI.drawButton){
                            x = previousUI.drawButton.x;
                            y = previousUI.drawButton.y;
                            width = previousUI.drawButton.width;
                            height = previousUI.drawButton.height;
                        }
                    }
                    objectToMirror = menuSections[i];
                    wildcard = {numberOfLines:3};
                    parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard};
                    this.drawButton = new TextBox(parameters);
                    let doOnce = true;
                    this.drawButton.setClickType(doOnce);
                    let isInteractive = true;
                    this.drawButton.setInteractivity(isInteractive);
                    this.drawButton.setStroke(true);
                    this.drawButton.setFill(true);
                    this.drawButton.setColor("white");
                    this.drawButton.mouseClickfunc = () => {setTimeout(()=>{changeView(4,6)},250)};
                    this.drawButton.setString("DRAW");
                    if(REACT_APP.state.isMobile){
                        fontSize = w>h?objectToMirror.height/1.5:objectToMirror.height/4;
                        // this.drawButton.setFontSize(fontSize);
                    }
                    this.drawButton.setFontSize(fontSize);


                    _ui.push(this.drawButton);
                } else if (i === 2) {
                    // 3: I want to see what other people drew!
                    if (previousUI){
                        if (previousUI.viewButton){
                            x = previousUI.viewButton.x;
                            y = previousUI.viewButton.y;
                            width = previousUI.viewButton.width;
                            height = previousUI.viewButton.height;
                        }
                    }
                    objectToMirror = menuSections[i];
                    wildcard = {numberOfLines:3};
                    parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard}
                    this.viewButton = new TextBox(parameters);
                    let doOnce = true;
                    this.viewButton.setClickType(doOnce);
                    let isInteractive = true;
                    this.viewButton.setInteractivity(isInteractive);
                    this.viewButton.setStroke(true);
                    this.viewButton.setFill(true);
                    this.viewButton.setColor("white");
                    this.viewButton.mouseClickfunc = () => {setTimeout(()=>{changeView(8,9)},250)};
                    this.viewButton.setString("VIEW");
                    this.viewButton.setFontSize(fontSize);

                    // if(REACT_APP.state.isMobile){
                    //     let fontSize = w>h?objectToMirror.height/2.5:objectToMirror.height/4;
                    // }
                    _ui.push(this.viewButton);
                }
                else if (i === 3) {
                   // 4: I just want to judge other people.
                   if (previousUI){
                       if (previousUI.rateButton){
                           x = previousUI.rateButton.x;
                           y = previousUI.rateButton.y;
                           width = previousUI.rateButton.width;
                           height = previousUI.rateButton.height;
                       }
                   }
                   objectToMirror = menuSections[i];
                   wildcard = {numberOfLines:3};
                   parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard}
                   this.rateButton = new TextBox(parameters);
                   let doOnce = true;
                   this.rateButton.setClickType(doOnce);
                   let isInteractive = true;
                   this.rateButton.setInteractivity(isInteractive);
                   this.rateButton.setStroke(true);
                   this.rateButton.setFill(true);
                   this.rateButton.setColor("white");
                   this.rateButton.mouseClickfunc = () => {setTimeout(()=>{changeView(6,7)},250)};
                   this.rateButton.setString("RATE");
                   this.rateButton.setFontSize(fontSize);

                   // if(REACT_APP.state.isMobile){
                   //     let fontSize = w>h?objectToMirror.height/2.5:objectToMirror.height/4;
                   // }
                   _ui.push(this.rateButton);
               } else if (i === 4) {
                  // 4: I just want to judge other people.
                  if (previousUI){
                      if (previousUI.animateButton){
                          x = previousUI.animateButton.x;
                          y = previousUI.animateButton.y;
                          width = previousUI.animateButton.width;
                          height = previousUI.animateButton.height;
                      }
                  }
                  objectToMirror = menuSections[i];
                  wildcard = {numberOfLines:3};
                  parameters = {p:p,w:w,h:h,objectToMirror:objectToMirror,x:x,y:y,width:width,height:height,wildcard:wildcard}
                  this.animateButton = new TextBox(parameters);
                  let doOnce = true;
                  this.animateButton.setClickType(doOnce);
                  let isInteractive = true;
                  this.animateButton.setInteractivity(isInteractive);
                  this.animateButton.setStroke(true);
                  this.animateButton.setFill(true);
                  this.animateButton.setColor("white");
                  this.animateButton.mouseClickfunc = () => {setTimeout(()=>{changeView(9,11)},250)};
                  this.animateButton.setString("ANIMATE");
                  this.animateButton.setFontSize(fontSize);

                  // if(REACT_APP.state.isMobile){
                  //     let fontSize = w>h?objectToMirror.height/2.5:objectToMirror.height/4;
                  // }
                  _ui.push(this.animateButton);
            }
        }
    }
        // only called once when the view
            // is loaded for the first time.
        if (!windowResized){
            this.addCharacterToTitle();
        }
        // if all of the characters of the title have been added
            // set the title to display all of the text
            // (only an issue if the user resizes the window after
            // 'addCharacterToTitle' has finished.)
        if (this.titleTextIndex>=this.titleText.length){
            console.log("heheheheheheh")
            let allOfDialog = this.titleText;
            this.title.setString(allOfDialog);
        }
        return _ui;
    }
}
