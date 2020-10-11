import Container from './Container'
import Mirror from './Mirror'

export default class TextBox extends Mirror{
    constructor(parameterObject){
        super(parameterObject)
        this.text = undefined
        this.textColor = "black";
        // this.row determines the orientation of the font.
        // use the orientation of the parent container for aligning
            // normally-oriented text, vertically.
        this.rotated = false;
        this.textSize = undefined
        // if (this.textSize * 2.5 > this.height && this.row){this.textSize = this.width / 20}
        // this.p.textSize(this.textSize);
        this.fontStyle = undefined
        // if (this.wildcard){
        //     if (this.wildcard.string){
        //         // this.setString(this.wildcard.string)
        //         this.text = this.wildcard.string
        //         this.setFontSize(this.width/100)
        //         // this.setFontSize(100)
        //     }
        // }

        if (parameterObject.wildcard){
            if (parameterObject.wildcard.fontSize){
                this.textSize = parameterObject.wildcard.fontSize
            }
            if (parameterObject.wildcard.text){
                this.text = parameterObject.wildcard.text
            }
        }

        this.textSize = this.textSize ? this.textSize :
            (this.windowWidth>this.windowHeight ?
                    this.width / 5 : this.width / 20) ;



        this.p.textSize(this.textSize);

        // setTimeout(()=>{
        // this.textSize = this.textSize ? this.textSize :
        //     (this.windowWidth>this.windowHeight ?
        //             this.width / 5 : this.width / 20) ;
        // this.p.textSize(this.textSize);},100);
        console.log(this.textSize)
    }
    // call this after instantiating the object to set the text
    setString(s) { this.text = s }
    // call this after instantiating the object to set the text color
    setTextColor(color) { this.textColor = color }
    setFontStyle(fontStyle){this.fontStyle=fontStyle}
    setFontSize(size){this.textSize = size; this.p.textSize(this.textSize);}
    drawRotatedTextBox(){
        this.p.push();
            super.draw()
            this.p.translate(this.x,this.y)
            this.p.rotate(this.p.radians(90))
            if (this.text){
                if (this.textColor){
                    this.p.fill(this.textColor)
                }
                if (this.fontStyle){
                    this.p.textFont(this.fontStyle)
                }
                this.p.text(this.text, 0, -this.width, this.height, this.width)
            }
        this.p.pop();
    }
    drawNormalTextBox(){
        super.draw()
        if (this.text){
            if (this.textColor){
                this.p.fill(this.textColor)
            }
            if (this.fontStyle){
                this.p.textFont(this.fontStyle)
            }
            this.p.text(this.text, this.x, this.y, this.width, this.height)
        }
    }
    draw() {
        !this.rotated ? this.drawNormalTextBox() : this.drawRotatedTextBox();
        // this.drawNormalTextBox()
    }
}
