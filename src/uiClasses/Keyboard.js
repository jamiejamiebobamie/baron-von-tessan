import TextBox from './TextBox'
import Container from './Container'
import KeyboardKey from './KeyboardKey'

export default class Keyboard extends TextBox{
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
        {
            let doOnce = true;
            let parameters;
            let keyboardButton;
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
                                       // color:"white"
                                  }
                    keyboardButton = new KeyboardKey(parameters)
                    keyboardButton.letter = this.keyLetters[i][j]
                    keyboardButton.setClickType(doOnce)
                    keyboardButton.setKeyLetterToDisplay(this.keyLetters[i][j])
                    this.rowsOfKeys.push(keyboardButton)
                }
            }
            let controlButtons = ["SUBMIT","SPACE","BACKSPACE"]
            for (let i = 0; i < controlButtons.length; i++){
                parameters = {
                               p:this.p,
                               windowWidth:this.windowWidth,
                               windowHeight:this.windowHeight,
                               parent:this.rowsOfKeys[3],
                               len:controlButtons.length,
                               index:i,
                               row:false,
                             }
                keyboardButton = new KeyboardKey(parameters)
                keyboardButton.letter = controlButtons[i]
                keyboardButton.setClickType(doOnce)
                keyboardButton.setKeyLetterToDisplay(controlButtons[i])
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
                // set interactivity click response function here:
                    // this.rowsOfKeys[i].displayText.myClickResponseFunc()
                this.rowsOfKeys[i].displayText.shrinkButton(1)
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
    draw(){
        super.draw()
        for (let i = 0; i < this.rowsOfKeys.length; i++){
            this.rowsOfKeys[i].draw();
        }
    }
}
