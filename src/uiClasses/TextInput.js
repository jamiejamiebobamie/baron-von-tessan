import TextBox from '../uiClasses/TextBox'
import Container from '../uiClasses/Container'

export default class TextInput extends Container{
    constructor(parameterObject){
        super(parameterObject)
        this.text = ""//"I drew a... (click me and finish the sentence)."
        this.height = 60//this.windowHeight / 6;
        this.displayText = new TextBox({p:this.p,w:this.windowWidth,h:this.windowHeight,row:true,parent:this})

        // should enlarge when selected and shrink when deselected.
        this.displayText.setInteractivity(false)

        // this.displayText.setStroke(true)
        this.displayText.setString(this.text)
        this.textBoxSelected = false;
        this.showCursor = false;
        // this.toggleShowCursor(this);
        // this.mouseClickfunc = this.toggleTextBoxSelected
        this.setTimeoutVariable = undefined
        this.setStroke(true)
        this.referenceToAPP = undefined;
        // dummy object
        this.referenceToMobileKeyboard = new Container({p:this.p,w:this.windowWidth,h:this.windowHeight,width:0,height:0})
    }
    setReferenceToAPP(APP){
        this.referenceToAPP = APP;
    }
    setDisplayText(text){
        // I'm not sure if I need a reference outside of this.displayText
        this.text = text
        this.displayText.setString(this.text)
    }
    setMobileKeyboardReference(ref){
        this.referenceToMobileKeyboard = ref
    }
    performClickFunctionality(){
        this.toggleTextBoxSelected(this.text)
        super.performClickFunctionality()
    }
    toggleShowCursor(scope){
        scope.showCursor = !scope.showCursor
        if (scope.showCursor){
            scope.text+="|"
        } else {
            scope.text = scope.text.replace("|","")
        }
        scope.displayText.setString(scope.text)
        scope.setTimeoutVariable = setTimeout(function(){scope.toggleShowCursor(scope)},800)
    }
    // it works but it's ugly.
    // if the user clicks on the TextInputBox the cursor will begin to show
    // if the user clicks on the TextInputBox again. nothing changes.
    // if the user clicks off the TextInputBox, the cursor goes away.

        // need to rename methods and variables
            // this.testForClick() -> this.testForMouseOver
            // this.clicked -> this.userClickedOnScreen
            // etc.
    toggleTextBoxSelected(resetDisplayText){
        if (this.testForClick() && !this.textBoxSelected && this.setTimeoutVariable === undefined ){
            this.textBoxSelected = true;
            this.text = ""
            // start cursor playing
            this.toggleShowCursor(this);
        } else if (!this.testForClick() || resetDisplayText) {
                if (this.showCursor) {
                    this.showCursor = false;
                    this.text = this.text.replace("|","")
                    this.displayText.setString(this.text)
                }
                this.textBoxSelected = false;
                clearTimeout(this.setTimeoutVariable);
                this.setTimeoutVariable = undefined;
                if (resetDisplayText){
                    this.text = resetDisplayText
                } else {
                    this.text = ""//I drew a... \n(click to finish the sentence)."
                }
                this.displayText.setString(this.text)
            }
        }
    handleTyping(keyCode){
        const BACKSPACE = keyCode === 8
        const ENTER = keyCode === 13
        const SPACE = keyCode === 32
        if (ENTER) {
            let drawingDescriptor = this.text.replace("|","")
            this.referenceToAPP.handleSubmitDescription(drawingDescriptor)
            this.toggleTextBoxSelected(drawingDescriptor)

            this.referenceToAPP.testViewSwitch()
        } else if (BACKSPACE) {
            this.text = this.text.replace("|","")
            this.text = this.text.substring(0, this.text.length - 1);
            this.displayText.setString(this.text)
        } else if (SPACE) {
            this.text = this.text.replace("|","") + " "
            this.displayText.setString(this.text)
        } else if (keyCode>=65 &&keyCode<=90) {
            if (this.text.length < 100){
                let newChar = String.fromCharCode(keyCode);
                this.text = this.text.replace("|","") + newChar.toLowerCase()
                this.displayText.setString(this.text)
            }
        }
    }
    draw() {
        super.draw()
        // toggle off if user clicks off the TextInputBox
        if ( this.clicked &&
            ( !this.testForClick() && !this.referenceToMobileKeyboard.testForClick() ) &&
            this.textBoxSelected) {
                let text = this.text.replace("|","")
                this.performClickFunctionality()
        }
        this.displayText.draw();
    }
}
