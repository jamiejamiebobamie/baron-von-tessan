import DrawingContainer from './DrawingContainer'
// import KeyFrame from './KeyFrame'

//0.
// user submits drawing
// animated drawing view is loaded
// on the view, is the AnimateDrawingContainer class.

//1.
    // user erases section of the drawing.
    // by erasing vertices, he is adding them to his ink.
//2.
    // user is happy with portions erased and clicks 'animate' button on view.
//3.
    // the erased sections appear in [lightcolor/pink] as a background element
    // the unerased base drawing is [anotherlightcolor/lightgrey]
    // the above sections are drawn first to the canvas
    // and cannot be interacted with. they act as guides.
//4.
    // user draws on top of drawing.
    // stroke appears in 'currentStroke' dark red color
//5.
    // user is happy with newly drawn portions and clicks 'add animation'
        // button on view.
//6.
    // an AnimationSection is created (a class).
    // vertices removed from base drawing remain removed,
        // now a part of the Animation Section.
    // An Animation Section contains the same number of vertices
        // from the start position (the originally erased vertex positions)
        // as the end position (the newly drawn vertices)
        // (difficult?)

    // upon object creation, the start vertices are rearranged in the array to
        // match the index of the vertex position that they will end at.

// array position / end vertex is found by iterating over the two arrays
    // and comparing the overall distance:
        // Math.sqrt(
        // (end.x - start.x)*(end.x - start.x)
        //       + (end.y - start.y)*(end.x - start.x)
        // )
    // and finding the overall shortest sum distance of all of the distances.

// if lerping verts back and forth in an anim looks good.
    // add a keyframe array class property to AnimationSection
    // that cycles through vert positions.

// allows for multiple animations on one drawing.
// does not repeat the drawing of vertices.
// might not look good or even work. ("redrawing" with "ink" feature.)

export default class AnimateDrawingContainer extends DrawingContainer{
    constructor(parameterObject){
        super(parameterObject)
        // when a user erases a vertex from the current keyframe
            // the popped vertex is added to the ink count
        // the vertex can then be redrawn to the screen.
        this.ink = 0;

        // false for erase mode.
        this.penMode = false;

        // false for showAnimationMode
        this.buildAnimationModeIsToggled = true;

        this.animationGroups = [
            {   drawnVertices:[],
                startPositions:[],
                endPositions:[],
                startColor:this.p.color(Math.random()*255,Math.random()*255,Math.random()*255),
                endColor:this.p.color(Math.random()*255,Math.random()*255,Math.random()*255),
                finishedVerticesCount:0, // keep a count of the vertices
                                    // that have interpolated to the finish.
            }
        ]
        this.currentAnimationGroupIndex = 0;

        this.finishedVerticesCount = 0;
        this.totalVerticesCount = 0;
    }
    setSubmittedStrokes(submittedStrokes){ this.submittedStrokes = submittedStrokes }
    // VERSION1
    setDrawnVerticesStartingPostions(){
        let vertice;
        this.totalVerticesCount = 0;
        for (let i = 0; i < this.animationGroups.length; i++){
            // NOT WORKING ___

            // iterate through all of the startPositions
                // find the overall minimum distance from one startVertex to one endVertex
                    // swap these values in their respective arrays with the j index
            for (let j = 0; j < this.animationGroups[i].startPositions.length; j++){
                let minDist = Number.MAX_VALUE
                let testMin;
                let storeIndices = {start:0,end:0}
                // in the future, the endPositions.length
                    // may be larger or smaller than the startPositions.length
                    // will add vertices to starting position
                for (let k = j; k < this.animationGroups[i].endPositions.length; k++){
                    testMin = Math.sqrt(
                    (this.animationGroups[i].endPositions[k].x - this.animationGroups[i].startPositions[j].x)*(this.animationGroups[i].endPositions[k].x - this.animationGroups[i].startPositions[j].x)
                          + (this.animationGroups[i].endPositions[k].y - this.animationGroups[i].startPositions[j].y)*(this.animationGroups[i].endPositions[k].y - this.animationGroups[i].startPositions[j].y)
                    )
                    minDist = Math.min(testMin,minDist)
                    if (testMin === minDist){
                        storeIndices.start = j;
                        storeIndices.end = k;
                    }
                }
                // swap the found min pairs with the front of each array
                let storeStartValueToSwap = this.animationGroups[i].startPositions[j]
                this.animationGroups[i].startPositions[j] = this.animationGroups[i].startPositions[storeIndices.start]
                this.animationGroups[i].startPositions[storeIndices.start] = storeStartValueToSwap
                let storeEndValueToSwap = this.animationGroups[i].endPositions[j]
                this.animationGroups[i].endPositions[j] = this.animationGroups[i].endPositions[storeIndices.end]
                this.animationGroups[i].endPositions[storeIndices.end] = storeEndValueToSwap
            }
            // console.log(this.animationGroups[0].startPositions[0],this.animationGroups[0].endPositions[0])

            // set the drawnVertices positions to startPositions
            this.animationGroups[i].drawnVertices = [];
            for (let j = 0; j < this.animationGroups[i].startPositions.length; j++){
                vertice = {x:this.animationGroups[i].startPositions[j].x,y:this.animationGroups[i].startPositions[j].y,finished:false}
                this.animationGroups[i].drawnVertices.push(vertice)
                this.totalVerticesCount++;
            }
        }
    }
    // VERSION2
    // setDrawnVerticesStartingPostions(){
    //     function perm(xs) {
    //       let ret = [];
    //       for (let i = 0; i < xs.length; i = i + 1) {
    //         let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));
    //         if(!rest.length) {
    //           ret.push([xs[i]])
    //         } else {
    //           for(let j = 0; j < rest.length; j = j + 1) {
    //             ret.push([xs[i]].concat(rest[j]))
    //           }
    //         }
    //       }
    //       return ret;
    //     }
    //     this.totalVerticesCount = 0;
    //     for (let i = 0; i < this.animationGroups.length; i++){
    //         // find all permutations of the start and end positions arrays
    //         let allPermsOfStartPositions = perm(this.animationGroups[i].startPositions)
    //         let allPermsOEndPositions = perm(this.animationGroups[i].endPositions)
    //         // iterate through these jumbled positions
    //             // find the lowest overall sum minimum distance
    //             // store the j and k indices of the two arrays that represent the minimum
    //             // the values in these arrays should be swapped to create the animation
    //         let min_j = 0;
    //         let minDist = Number.MAX_VALUE;
    //         for (let j = 0; j < allPermsOfStartPositions.length; j++){
    //             for (let k = 0; k < allPermsOEndPositions.length; k++){
    //                 // get the total sum distance between all vertex pairs
    //                 let testMin;
    //                 for (let l = 0; l < allPermsOfStartPositions[j].length; l++){
    //                     for (let m = 0; m < allPermsOEndPositions[k].length; m++){
    //                         testMin += Math.sqrt(
    //                         (allPermsOEndPositions[k].x - allPermsOfStartPositions[j].x)*(allPermsOEndPositions[k].x - allPermsOfStartPositions[j].x)
    //                               + (allPermsOEndPositions[k].y - allPermsOfStartPositions[j].y)*(allPermsOEndPositions[k].y - allPermsOfStartPositions[j].y)
    //                         )
    //                     }
    //                 }
    //                 minDist = Math.min(testMin,minDist)
    //                 if (testMin === minDist){
    //                     min_j = j;
    //                 }
    //             }
    //         }
    //         // iterate through the allPermsOfStartPositions[min_j] array and
    //             // swap the indices of animationGroups[i].startPositions
    //             // to match allPermsOfStartPositions[min_j]
    //         for (let j = 0; j < allPermsOfStartPositions[min_j].length; j++){
    //             let vertex1 = allPermsOfStartPositions[min_j][j]
    //             let vertex1String = vertex1.x.toString() + vertex1.y.toString()
    //             for (let k = 0; k < this.animationGroups[i].startPositions.length; k++){
    //                 let vertex2 = this.animationGroups[i].startPositions[k]
    //                 let vertex2String = vertex2.x.toString() + vertex2.y.toString()
    //                 if (vertex1String === vertex2String){
    //                     allPermsOfStartPositions[min_j][j] = vertex2
    //                     this.animationGroups[i].startPositions[k] = vertex1;
    //                 }
    //             }
    //         }
    //         let vertice;
    //         // set the drawnVertices positions to startPositions
    //             // and tally-up the running total of vertices
    //             // (used to synchronize animations)
    //         this.animationGroups[i].drawnVertices = [];
    //         for (let j = 0; j < this.animationGroups[i].startPositions.length; j++){
    //             vertice = {x:this.animationGroups[i].startPositions[j].x,y:this.animationGroups[i].startPositions[j].y,finished:false}
    //             this.animationGroups[i].drawnVertices.push(vertice)
    //             this.totalVerticesCount++;
    //         }
    //     }
    // }

    // VERSION3
    // calculate the total distance from a single start vertex to all of the end
        // vertices.
    // the start vertex with the maximum sum has the least ideal options
        // i.e. the fewest close neighbors.
    // match up these vertices and move to vertices with many options
        // i.e. many close neighbors.
    // focusing on the least ideal vertices and pairing them up with
        // their most ideal match might work.
    // (work = matching start vertices with
        // the closest end vertices to make the animation.)
    // setDrawnVerticesStartingPostions(){
    //     let vertice;
    //     this.totalVerticesCount = 0;
    //
    //     for (let i = 0; i < this.animationGroups.length; i++){
    //         // store the sums of all of the distances from a start vertex
    //             // to all of the end vertices.
    //         let totalDistancesArray = []
    //         for (let j = 0; j < this.animationGroups[i].startPositions.length; j++){
    //             let sumDistance = 0;
    //             for (let k = j; k < this.animationGroups[i].endPositions.length; k++){
    //                 sumDistance += Math.sqrt(
    //                 (this.animationGroups[i].endPositions[k].x - this.animationGroups[i].startPositions[j].x)*(this.animationGroups[i].endPositions[k].x - this.animationGroups[i].startPositions[j].x)
    //                       + (this.animationGroups[i].endPositions[k].y - this.animationGroups[i].startPositions[j].y)*(this.animationGroups[i].endPositions[k].y - this.animationGroups[i].startPositions[j].y)
    //                 )
    //             }
    //             totalDistancesArray.push(sumDistance)
    //         }
    //         // find the order of start vertices to solve for.
    //             // the most troublesome vertices to pair are at the front.
    //         let distanceArrayEntiresAmount = totalDistancesArray.length;
    //         let startVertexIndexSolveOrder = []
    //         while ( distanceArrayEntiresAmount !== 0 ){
    //             let currentMax = Math.MIN_VALUE;
    //             let storeJ = 0;
    //             // iterate through the totalDistancesArray and find the max
    //             for (let j = 0; j < totalDistancesArray.length; j++){
    //                 currentMax = Math.max(currentMax,totalDistancesArray[j])
    //                 if (currentMax === totalDistancesArray[j]){
    //                     storeJ = j
    //                 }
    //             }
    //             totalDistancesArray[storeJ] = 0;
    //             startVertexIndexSolveOrder.push(storeJ)
    //             distanceArrayEntiresAmount--;
    //         }
    //
    //         // using the startVertexOrder swap the indices of the
    //         // I STOPPED THINKING HERE.
    //         for (let m = 0; m < startVertexIndexSolveOrder.length; m++){
    //             let j = startVertexIndexSolveOrder[m];
    //             // iterate through all of the startPositions
    //                 // find the overall minimum distance from one startVertex to one endVertex
    //                 // swap these values in their respective arrays with the j index
    //             let minDist = Number.MAX_VALUE
    //             let testMin;
    //             let storeIndices = {start:0,end:0}
    //             // in the future, the endPositions.length
    //                 // may be larger or smaller than the startPositions.length
    //                 // will add vertices to starting position
    //             for (let k = j; k < this.animationGroups[i].endPositions.length; k++){
    //                 testMin = Math.sqrt(
    //                 (this.animationGroups[i].endPositions[k].x - this.animationGroups[i].startPositions[j].x)*(this.animationGroups[i].endPositions[k].x - this.animationGroups[i].startPositions[j].x)
    //                       + (this.animationGroups[i].endPositions[k].y - this.animationGroups[i].startPositions[j].y)*(this.animationGroups[i].endPositions[k].y - this.animationGroups[i].startPositions[j].y)
    //                 )
    //                 minDist = Math.min(testMin,minDist)
    //                 if (testMin === minDist){
    //                     console.log("hi")
    //                     storeIndices.start = j;
    //                     storeIndices.end = k;
    //                 }
    //             }
    //             // swap the found min pairs with the front of each array
    //             let storeStartValueToSwap = this.animationGroups[i].startPositions[j]
    //             this.animationGroups[i].startPositions[j] = this.animationGroups[i].startPositions[storeIndices.start]
    //             this.animationGroups[i].startPositions[storeIndices.start] = storeStartValueToSwap
    //             let storeEndValueToSwap = this.animationGroups[i].endPositions[j]
    //             this.animationGroups[i].endPositions[j] = this.animationGroups[i].endPositions[storeIndices.end]
    //             this.animationGroups[i].endPositions[storeIndices.end] = storeEndValueToSwap
    //         }
    //
    //         // set the drawnVertices positions to startPositions
    //         this.animationGroups[i].drawnVertices = [];
    //         for (let j = 0; j < this.animationGroups[i].startPositions.length; j++){
    //             vertice = {x:this.animationGroups[i].startPositions[j].x,y:this.animationGroups[i].startPositions[j].y,finished:false}
    //             this.animationGroups[i].drawnVertices.push(vertice)
    //             this.totalVerticesCount++;
    //         }
    //     }
    // }
    incrementDrawingGroupIndex(){
        this.animationGroups.push(
            {   drawnVertices:[],
                startPositions:[],
                endPositions:[],
                startColor:this.p.color(Math.random()*255,Math.random()*255,Math.random()*255),
                endColor:this.p.color(Math.random()*255,Math.random()*255,Math.random()*255),
                finishedVerticesCount:0, // keep a count of the vertices
                                    // that have interpolated to the finish.
            }
        )
        this.currentAnimationGroupIndex++;
    }
    showAnimation(){
        // i do not know why, but i actually need three for loops here
            // and not just one.
        // it does not work otherwise. (work = all animations sync up and loop w/o popping)
        if (this.finishedVerticesCount === this.totalVerticesCount){
            for (let i = 0; i < this.animationGroups.length; i++){
                this.finishedVerticesCount = 0;
                this.resetDrawnVerticesFinishedStatus(this.animationGroups[i])
                // swap starting and ending vertices.
                let storeStartingPositions = this.animationGroups[i].startPositions
                this.animationGroups[i].startPositions = this.animationGroups[i].endPositions
                this.animationGroups[i].endPositions = storeStartingPositions
            }
        } else {
            for (let i = 0; i < this.animationGroups.length; i++){
                this.lerpAnimationGroup(this.animationGroups[i])
            }
        }
        for (let i = 0; i < this.animationGroups.length; i++){
            this.drawVerticesToScreen(this.animationGroups[i].drawnVertices, 0)
        }
    }
    lerpAnimationGroup(group){
        for (let i = 0; i < group.drawnVertices.length; i++){
            group.drawnVertices[i].x=this.p.lerp(group.drawnVertices[i].x,group.endPositions[i].x,.1)
            group.drawnVertices[i].y=this.p.lerp(group.drawnVertices[i].y,group.endPositions[i].y,.1)
            if (!group.drawnVertices[i].finished){
                if (Math.abs(group.drawnVertices[i].x-group.endPositions[i].x)<this.lengthOfDrawingSquare*.00001 && Math.abs(group.drawnVertices[i].y-group.endPositions[i].y)<this.lengthOfDrawingSquare*.00001){
                    group.drawnVertices[i].finished = true
                    // group.finishedVerticesCount++;
                    this.finishedVerticesCount++;
                }
            }
        }
    }
    resetDrawnVerticesFinishedStatus(group){
        for (let i = 0; i < group.drawnVertices.length; i++){
            group.drawnVertices[i].finished = false
        }
    }
    drawVerticesToScreen(verticesData, color){
        this.p.noStroke();
        this.p.fill(color)
        for (let i = 0; i < verticesData.length; i++){
            this.p.ellipse(verticesData[i].x*this.lengthOfDrawingSquare+this.x, verticesData[i].y*this.lengthOfDrawingSquare+this.y, this.lengthOfDrawingSquare*.025,this.lengthOfDrawingSquare*.025)
        }
    }
    buildAnimation(){
        this.drawAnimationGroups();
     }
    drawAnimationGroups(){
        for (let i = 0; i < this.animationGroups.length; i++){
            this.drawVerticesToScreen(this.animationGroups[i].startPositions, this.animationGroups[i].startColor?this.animationGroups[i].startColor:"pink")
            this.drawVerticesToScreen(this.animationGroups[i].endPositions, this.animationGroups[i].endColor?this.animationGroups[i].endColor:"pink")
        }
    }
    drawSubmittedStrokes(){ this.drawVerticesToScreen(this.submittedStrokes, 0) }
    draw() {
        super.draw();
        this.drawSubmittedStrokes();
        if (this.buildAnimationModeIsToggled){
            this.buildAnimation()
        } else {
            this.showAnimation();
        }
    }
}
