import Mirror from './Mirror'

export default class DisplayDrawingContainer extends Mirror{
    constructor(parameterObject){
        super(parameterObject)
        this.submittedStrokes = []
        this.submittedStrokeIndex = 0
        // loops the drawing animation
        this.loop = false;
        this.drawingHasBeenDrawn = false;
        this.strokeColor = "black"

        if (parameterObject.wildcard){
            if (parameterObject.wildcard.drawingHasBeenDrawn){
                this.drawingHasBeenDrawn = parameterObject.wildcard.drawingHasBeenDrawn;
            }
            if (parameterObject.wildcard.strokeColor){
                this.strokeColor = parameterObject.wildcard.strokeColor;
            }

        }
        this.lengthOfDrawingSquare = 0

        this.toLocation = []
        this.fromLocation = []
        this.timeOut1 = undefined;
        this.timeOut2 = undefined;

        this.setNewToLocation()
        // for DrawingContainer functionality.
            // purely for storing strokes.
        // lose functionality of undo button without
            // storing data as a series of strokes.
        this.strokes = []
    }
    setNewToLocation(){
        this.toLocation = []
        for (let i = 0; i < this.submittedStrokes.length; i++){
            this.toLocation.push({x:(Math.random()*2-1)*this.lengthOfDrawingSquare/1500,y:(Math.random()*2-1)*this.lengthOfDrawingSquare/1500})
        }
        this.fromLocation = this.toLocation
        clearTimeout(this.timeOut1)
        this.timeOut1 = setTimeout(()=>{this.setNewToLocation()},100)
    }
    setLengthOfDrawingSquare(length){ this.lengthOfDrawingSquare = length }
    setSubmittedStrokeIndex(index){ this.submittedStrokeIndex = index }
    setSubmittedStrokes(submittedStrokes){
        this.submittedStrokes = submittedStrokes;
        // ensure that the toLocation array is correct by resetting it when the
            // drawing object recieves new strokes to draw.
        this.setNewToLocation()
    }
    setLoopToTrueToLoopFinishedDrawing(){ this.loop = true; }
    drawSubmittedStrokes(){
        let driftX = 0
        let driftY = 0
        if (this.drawingHasBeenDrawn){
            for (let i = 0; i < this.submittedStrokes.length; i++){
                if (this.toLocation.length){
                    driftX = this.toLocation[i].x;
                    driftY = this.toLocation[i].y;
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
    redrawStrokes(redrawSpeed){
        if (redrawSpeed===undefined){
            redrawSpeed = 1;
        }
        if (this.drawingHasBeenDrawn){
            if (this.loop){
                this.drawingHasBeenDrawn = false;
                this.submittedStrokeIndex = 0;
                clearTimeout(this.timeOut2)
            } else {
                clearTimeout(this.timeOut2)
                return;
            }
        }
        if (this.submittedStrokeIndex < this.submittedStrokes.length) {
            this.submittedStrokeIndex++
            this.timeOut2 = setTimeout(()=>{this.redrawStrokes(redrawSpeed);}, redrawSpeed);
        } else {
            this.drawingHasBeenDrawn = true;
            // pause three seconds to display drawing.
                // then loop if this.displayDrawingSpace.loop
                // is set to true otherwise return.
            this.timeOut2 = setTimeout(()=>{this.redrawStrokes(redrawSpeed);}, 3000);
        }
        // good for testing:
        console.log("hey")
    }
    undrawStrokes(){
        if (this.submittedStrokeIndex>=0) {
            this.submittedStrokeIndex--
            this.timeOut2 = setTimeout(()=>{this.undrawStrokes();}, 10);
        } else {
            clearTimeout(this.timeOut2)
            // this.drawingHasBeenDrawn = true;
            // // pause three seconds to display drawing.
            //     // then loop if this.displayDrawingSpace.loop
            //     // is set to true otherwise return.
            // this.timeOut2 = setTimeout(()=>{this.redrawStrokes();}, 7000);
        }
        // good for testing:
        // console.log("hey")
    }
    draw() {
        super.draw();
        this.p.noStroke();
        this.p.fill(this.strokeColor);
        this.drawSubmittedStrokes();
    }
}
