import Container from './Container'
import TextBox from './TextBoxContainer'

export default class Wireframe extends Container{
    constructor(parameterObject){
        super(parameterObject)
        this.label = new Container({p:this.p,w:this.windowWidth,h:this.windowHeight,row:true,parent:this,wildcard:this.wildcard})
        if (this.wildcard.shouldBeSquare){
            this.width = this.width * this.wildcard.shrinkAmountWidth < this.height * this.wildcard.shrinkAmountHeight ? this.width * this.wildcard.shrinkAmountWidth : this.height * this.wildcard.shrinkAmountHeight
            this.height = this.width * this.wildcard.shrinkAmountWidth < this.height * this.wildcard.shrinkAmountHeight ? this.width * this.wildcard.shrinkAmountWidth : this.height * this.wildcard.shrinkAmountHeight
        } else {
            this.width = this.width * this.wildcard.shrinkAmountWidth
            this.height = this.height * this.wildcard.shrinkAmountHeight
        }
    }
    draw(){ super.draw(); this.label.draw(); }
}
