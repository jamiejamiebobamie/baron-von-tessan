import Container from './Container'
import Mirror from './Mirror'

export default class DrawingContainer extends Mirror{
    constructor(parameterObject){
        super(parameterObject)
        this.currentStroke = []
        this.strokes = [];
        // false for eraserMode
        this.penMode = true;
        this.lengthOfDrawingSquare = 0;
    }
    setLengthOfDrawingSquare(length){
        this.lengthOfDrawingSquare = length
    }
    setCurrentStroke(currentStroke){ this.currentStroke = currentStroke }
    setStrokes(strokes){ this.strokes = strokes; }
    getPenMode(){return this.penMode}
    setPenMode(penMode){this.penMode=penMode;}
    addCurrentStrokeToStrokesArray(){
        this.strokes.push(this.currentStroke)
        this.currentStroke = []
    }
    setClick(bool){
        let mouseClickReleased = !bool
        let userJustDrewAStroke = this.currentStroke.length && mouseClickReleased
        if (userJustDrewAStroke) {
            this.addCurrentStrokeToStrokesArray()
        }
        super.setClick(bool)
    }
    drawStrokes(){
        for (let i = 0; i < this.strokes.length;i++){
            for (let j = 0; j < this.strokes[i].length;j++){
                this.p.ellipse(this.strokes[i][j].x*this.lengthOfDrawingSquare+this.x, this.strokes[i][j].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
            }
        }
    }
    draw() {
        super.draw()
        this.p.fill(100,0,0)
        for (let i = 0; i < this.currentStroke.length;i++){
            this.p.ellipse(this.currentStroke[i].x*this.lengthOfDrawingSquare+this.x, this.currentStroke[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
        }
        this.p.fill(0)
        this.drawStrokes()
    }
}
