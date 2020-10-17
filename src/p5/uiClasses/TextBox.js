import Container from './Container'
import Mirror from './Mirror'

export default class TextBox extends Mirror{
    constructor(parameterObject){
        super(parameterObject)
        this.textColor = "black";
        // for rotating text 90 degrees clockwise
        this.rotated = false;
        this.text = ""
        this.textSize = undefined
        this.fontStyle = undefined
        this.numberOfLines = undefined
        // instantializes the string displayed,
            // text size, and number of lines of text
        if (parameterObject.wildcard){
            if (parameterObject.wildcard.fontSize){
                this.textSize = parameterObject.wildcard.fontSize
            }
            if (parameterObject.wildcard.text){
                this.text = parameterObject.wildcard.text
            }
            if (parameterObject.wildcard.numberOfLines){
                this.numberOfLines = parameterObject.wildcard.numberOfLines
            }
        }
        // sets text size if nothing is passed in.
        this.textSize = this.textSize ? this.textSize :
            (this.windowWidth>this.windowHeight ?
                    this.width / 5 : this.width / 20) ;
        // sets number of lines if nothing is passed in.
        this.numberOfLines = this.numberOfLines ?
            this.numberOfLines : (this.width/this.textSize)/7;

        // sets text size if it exceeds the size of container
        if ((this.textSize*(this.numberOfLines))>this.height){
            this.textSize = this.height*.2
        }
        // this.p.textSize(this.textSize);
    }
    // use setters for setting or resetting properties during runtime.
    setString(s) { this.text = s }
    setTextColor(color) { this.textColor = color }
    setFontStyle(fontStyle){this.fontStyle=fontStyle}
    setFontSize(size){this.textSize = size; this.p.textSize(this.textSize);}
    drawRotatedTextBox(){
        this.p.push();
            this.p.translate(this.x,this.y)
            this.p.rotate(this.p.radians(90))
            if (this.text){
                if (this.textColor){this.p.fill(this.textColor)}
                if (this.fontStyle){this.p.textFont(this.fontStyle)}
                this.p.text(this.text, 0, -this.width, this.height, this.width)
            }
        this.p.pop();
    }
    drawNormalTextBox(){
        if (this.text){
            if (this.textColor){this.p.fill(this.textColor)}
            if (this.fontStyle){ this.p.textFont(this.fontStyle)}
            this.p.text(this.text, this.x, this.y, this.width, this.height)
        }
    }
    draw() {
        super.draw()
        this.p.textSize(this.textSize);
        !this.rotated ? this.drawNormalTextBox() : this.drawRotatedTextBox();
    }
}
