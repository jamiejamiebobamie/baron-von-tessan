import TextBox from './TextBox'
import Container from './Container'

export default class KeyboardKey extends Container{
    constructor(parameterObject){
        super(parameterObject)
        this.letter = undefined;
        this.displayText = new TextBox(
            {
                p:this.p,
                windowWidth:this.windowWidth,
                windowHeight:this.windowHeight,
                row:true,
                parent:this,
                color:"white"
            }
        )
        this.displayText.setStroke(true)
        this.displayText.setInteractivity(true)
        this.mouseClickfunc = this.pressKey
    }
    setKeyLetterToDisplay(letter){
        this.letter = letter
        this.displayText.setString(letter)
        this.displayText.setFontSize(10)
    }
    pressKey(){
        return this.letter
    }
    draw(){
        super.draw()
        this.displayText.draw()
    }
}
