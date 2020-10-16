import Container from './Container'
import Mirror from './Mirror'

export default class DisplayDrawingContainer extends Mirror{
    constructor(parameterObject){
        super(parameterObject)
        this.submittedStrokes = []
        this.submittedStrokeIndex = 0
        // loops the drawing animation
        this.loop = false;
        this.drawingHasBeenDrawn = false;
        if (parameterObject.wildcard){
            if (parameterObject.wildcard.drawingHasBeenDrawn){
                this.drawingHasBeenDrawn = parameterObject.wildcard.drawingHasBeenDrawn;
            }
        }
        this.lengthOfDrawingSquare = 0

        this.toLocation = []
        this.fromLocation = []
        this.timeOut1 = undefined;
        this.timeOut2 = undefined;

        this.setNewToLocation()
        // for DrawingContainer functionality.
            // purely storing strokes.
        this.strokes = []
    }
    setNewToLocation(){
        this.toLocation = []
        for (let i = 0; i < this.submittedStrokes.length; i++){
            this.toLocation.push({x:(Math.random()*2-1)*this.lengthOfDrawingSquare/1000,y:(Math.random()*2-1)*this.lengthOfDrawingSquare/1000})
        }
        this.fromLocation = this.toLocation
        clearTimeout(this.timeOut1)
        this.timeOut1 = setTimeout(()=>{this.setNewToLocation()},300)
    }
    setLengthOfDrawingSquare(length){ this.lengthOfDrawingSquare = length }
    setSubmittedStrokeIndex(index){ this.submittedStrokeIndex = index }
    setSubmittedStrokes(submittedStrokes){
        this.submittedStrokes = submittedStrokes
    }
    setLoopToTrueToLoopFinishedDrawing(){ this.loop = true; }
    drawSubmittedStrokes(){
        let driftX = 0
        let driftY = 0
        if (this.drawingHasBeenDrawn){
            for (let i = 0; i < this.submittedStrokes.length; i++){
                if (this.toLocation.length){
                    // experimenting with this...
                    // driftX = this.p.lerp(this.fromLocation[i].x,this.toLocation[i].x,.2)
                    // driftY = this.p.lerp(this.fromLocation[i].y,this.toLocation[i].y,.2)
                    driftX = this.toLocation[i].x//(this.toLocation[i].x - this.fromLocation[i].x)*.2
                    driftY = this.toLocation[i].y//(this.toLocation[i].y - this.fromLocation[i].y)*.2
                }
                this.p.ellipse(this.submittedStrokes[i].x*this.lengthOfDrawingSquare+driftX+this.x, this.submittedStrokes[i].y*this.lengthOfDrawingSquare+driftY+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
            }
        } else {
            for (let i = 0; i < this.submittedStrokeIndex; i++){
                if (this.toLocation.length){
                    driftX = this.p.lerp(this.fromLocation[i].x,this.toLocation[i].x,.2)
                    driftY = this.p.lerp(this.fromLocation[i].y,this.toLocation[i].y,.2)
                }
                this.p.ellipse(this.submittedStrokes[i].x*this.lengthOfDrawingSquare+driftX+this.x, this.submittedStrokes[i].y*this.lengthOfDrawingSquare+driftY+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
            }
        }
    }
    draw() {
        super.draw();
        this.p.noStroke();
        this.p.fill(0);
        this.drawSubmittedStrokes();
    }
}
