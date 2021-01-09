import Mirror from './Mirror'

export default class DrawingContainer extends Mirror{
    constructor(parameterObject){
        super(parameterObject)
        this.currentStroke = []
        this.strokes = [];
        this.penMode = true; // false for eraserMode
        this.lengthOfDrawingSquare = 0;
        this.userIsDrawingOrErasing = false;
    }
    setLengthOfDrawingSquare(length){
        this.lengthOfDrawingSquare = length
    }
    setCurrentStroke(currentStroke){ this.currentStroke = currentStroke }
    setStrokes(strokes){ this.strokes = strokes; }
    addCurrentStrokeToStrokesArray(){
        this.strokes.push(this.currentStroke)
        this.currentStroke = []
    }
    setClick(bool){
        let mouseClickReleased = !bool
        // increase the framerate to 70 to capture user strokes better
            // and decrease it back to 24 when user is not drawing.
        if (mouseClickReleased){
            this.p.frameRate(24);
        } else {
            this.p.frameRate(70);
        }
        this.userIsDrawingOrErasing = !mouseClickReleased && this.testForClick();

        let userJustDrewAStroke = this.currentStroke !== undefined ? this.currentStroke.length && mouseClickReleased : false;
        if (userJustDrewAStroke) {
            this.addCurrentStrokeToStrokesArray()
        }
        super.setClick(bool)
    }
    draw() {
        super.draw()
        this.p.fill(100,0,0)
        if (this.currentStroke){
            for (let i = 0; i < this.currentStroke.length;i++){
                this.p.ellipse(this.currentStroke[i].x*this.lengthOfDrawingSquare+this.x, this.currentStroke[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
            }
        }
        this.p.fill(0)
        if (this.strokes){
            for (let i = 0; i < this.strokes.length;i++){
                for (let j = 0; j < this.strokes[i].length;j++){
                    this.p.ellipse(this.strokes[i][j].x*this.lengthOfDrawingSquare+this.x, this.strokes[i][j].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
                }
            }
        }
    }
}
