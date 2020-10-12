// import TextBox from './TextBoxContainer'
import Container from './Container'
import KeyboardKey from './KeyboardKey'
import Mirror from './Mirror'
import Wireframe from './Wireframe'


export default class Keyboard extends Mirror{
    constructor(parameterObject){
        super(parameterObject)
        this.mouseClickfunc = this.searchClickedKey;
        let doOnce = true;
        this.setClickType(doOnce);
        this.referenceToInputTextBox = undefined
        this.rowsOfKeys = []
        {
            let row;
            for (let i = 0; i < 4; i++){
                row = new Container(
                                    {
                                        p:this.p,
                                        windowWidth:this.windowWidth,
                                        windowHeight:this.windowHeight,
                                        parent:this,
                                        width:this.width,//-i*10,
                                        len:4,
                                        index:i,
                                        row:true,
                                        // offsetX:i*10
                                    }
                                )
                // row.setStroke(true)
                this.rowsOfKeys.push(row)
            }
        }
        this.keyLetters = ["qwertyuiop","asdfghjkl","zxcvbnm"]
        // wireframe
        let keys = []

        {
            // let doOnce = true;
            let parameters;
            let keyboardButton;
            let wildcard = {shrinkAmountWidth:.9,shrinkAmountHeight:.8}
            for (let i = 0; i < this.keyLetters.length; i++){
                for (let j = 0; j < this.keyLetters[i].length; j++){
                    parameters = {
                                       p:this.p,
                                       windowWidth:this.windowWidth,
                                       windowHeight:this.windowHeight,
                                       parent:this.rowsOfKeys[i],
                                       len:this.keyLetters[i].length,
                                       index:j,
                                       row:false,
                                       color:"blue",
                                       wildcard:wildcard,
                                  }
                    keyboardButton = new Wireframe(parameters)
                    // keyboardButton.letter = this.keyLetters[i][j]
                    // keyboardButton.setClickType(doOnce)
                    // keyboardButton.setString(this.keyLetters[i][j])
                    // keyboardButton.setFontSize(this.object.width/30)
                    // keyboardButton.setInteractivity(true)
                    // keyboardButton.setFill(true)
                    // keyboardButton.setStroke(true)
                    // this.rowsOfKeys.push(keyboardButton)
                    keys.push(keyboardButton)
                }
            }
            // let controlButtons = ["SUBMIT","SPACE","BACKSPACE"]
            let controlButtons = ["SPACE","BACKSPACE"]

            for (let i = 0; i < controlButtons.length; i++){
                parameters = {
                               p:this.p,
                               windowWidth:this.windowWidth,
                               windowHeight:this.windowHeight,
                               parent:this.rowsOfKeys[3],
                               len:controlButtons.length,
                               index:i,
                               row:false,
                               color:"blue",
                               wildcard:wildcard,
                             }
                keyboardButton = new Wireframe(parameters)
                // keyboardButton.setClickType(doOnce)
                // keyboardButton.setString(controlButtons[i])
                // keyboardButton.setFontSize(this.object.width/30)
                // keyboardButton.setInteractivity(true)
                // keyboardButton.setFill(true)
                // keyboardButton.setStroke(true)
                keys.push(keyboardButton)

                // this.rowsOfKeys.push(keyboardButton)
            }
        }
        let count = 0
        let parameters;
        let keyboardButton;
        let x,y,width,height
        {
            for (let i = 0; i < this.keyLetters.length; i++){
                for (let j = 0; j < this.keyLetters[i].length; j++){

                    // parameters = {
                    //                    p:this.p,
                    //                    windowWidth:this.windowWidth,
                    //                    windowHeight:this.windowHeight,
                    //                    parent:this.rowsOfKeys[i],
                    //                    len:this.keyLetters[i].length,
                    //                    index:j,
                    //                    row:false,
                    //                    // color:"white"
                    //               }
                    // let wildcard = {fontSize:submitButton.width/5, REACT_APP:REACT_APP,text:textInput}

                    // 012 0
                    // 345 1
                    // 678 2
                    // 3*3
                    if (parameterObject.previousUI){
                        if (parameterObject.previousUI.keyBoard){
                            if (parameterObject.previousUI.keyBoard.rowsOfKeys){
                                if (parameterObject.previousUI.keyBoard.rowsOfKeys[count]){
                                    x = parameterObject.previousUI.keyBoard.rowsOfKeys[count].x;
                                    y = parameterObject.previousUI.keyBoard.rowsOfKeys[count].y;
                                    width = parameterObject.previousUI.keyBoard.rowsOfKeys[count].width;
                                    height = parameterObject.previousUI.keyBoard.rowsOfKeys[count].height;
                                }
                            }
                        }
                    }
                    parameters = {p:this.p,objectToMirror:keys[count],x:x,y:y,width:width,height:height}//,x:x,y:y,width:width,height:height,wildcard:wildcard}
                    keyboardButton = new KeyboardKey(parameters)
                    keyboardButton.setClickType(doOnce)
                    keyboardButton.letter = this.keyLetters[i][j]
                    keyboardButton.setKeyLetterToDisplay(keyboardButton.letter)
                    keyboardButton.setFontSize(this.object.width/30)
                    keyboardButton.setInteractivity(true)
                    keyboardButton.setStroke(true)
                    this.rowsOfKeys.push(keyboardButton)
                    count++
                }
            }
            // let controlButtons = ["SUBMIT","SPACE","BACKSPACE"]
            let controlButtons = ["SPACE","BACKSPACE"]

            for (let i = 0; i < controlButtons.length; i++){
                // parameters = {
                //                p:this.p,
                //                windowWidth:this.windowWidth,
                //                windowHeight:this.windowHeight,
                //                parent:this.rowsOfKeys[3],
                //                len:controlButtons.length,
                //                index:i,
                //                row:false,
                //              }        if (previousUI){
                if (parameterObject.previousUI){
                    if (parameterObject.previousUI.keyBoard){
                        if (parameterObject.previousUI.keyBoard.rowsOfKeys){
                            if (parameterObject.previousUI.keyBoard.rowsOfKeys[count]){
                                x = parameterObject.previousUI.keyBoard.rowsOfKeys[count].x;
                                y = parameterObject.previousUI.keyBoard.rowsOfKeys[count].y;
                                width = parameterObject.previousUI.keyBoard.rowsOfKeys[count].width;
                                height = parameterObject.previousUI.keyBoard.rowsOfKeys[count].height;
                            }
                        }
                    }
                }
                parameters = {p:this.p,objectToMirror:keys[count],x:x,y:y,width:width,height:height}//,x:x,y:y,width:width,height:height,wildcard:wildcard}
                keyboardButton = new KeyboardKey(parameters)
                parameters = {p:this.p,objectToMirror:keys[count++]}//,x:x,y:y,width:width,height:height,wildcard:wildcard}

                keyboardButton = new KeyboardKey(parameters)
                keyboardButton.setClickType(doOnce)
                keyboardButton.letter = controlButtons[i]
                keyboardButton.setKeyLetterToDisplay(keyboardButton.letter)
                keyboardButton.setFontSize(this.object.width/30)
                keyboardButton.setInteractivity(true)
                keyboardButton.setStroke(true)
                this.rowsOfKeys.push(keyboardButton)
            }
        }
    }
    setReferenceToInputBox(ref){
        this.referenceToInputTextBox = ref;
    }
    searchClickedKey(){
        let newChar = undefined
        // first 4 items of this.rowsOfKeys are the row containers.
            // skip.
        for (let i = 4; i < this.rowsOfKeys.length; i++){
            if(this.rowsOfKeys[i].testForClick()){
                newChar = this.rowsOfKeys[i].pressKey();
            }
        }
        if (this.referenceToInputTextBox){
            if (newChar){
                let keyCode;
                if (newChar.length === 1){
                    newChar = newChar.toUpperCase()
                    keyCode = newChar.charCodeAt(0);
                } else {
                    if (newChar === "SUBMIT"){
                        keyCode = 13
                    } else if (newChar === "SPACE"){
                        keyCode = 32
                    } else if (newChar === "BACKSPACE"){
                        keyCode = 8
                    }
                }
                this.referenceToInputTextBox.handleTyping(keyCode)
            }
        }
    }
    // performClickFunctionality(){
    //     super.performClickFunctionality()
    //
    // }
    draw(){
        super.draw()
        for (let i = 0; i < this.rowsOfKeys.length; i++){
            this.rowsOfKeys[i].draw();
        }
    }
}
