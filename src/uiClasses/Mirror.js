import Container from './Container'

export default class Mirror extends Container{
    constructor(parameterObject){
        super()
        this.p = parameterObject.p;

        this.object = parameterObject.objectToMirror;
        this.x = parameterObject.x === undefined ? parameterObject.objectToMirror.x : parameterObject.x;
        this.y = parameterObject.y === undefined ? parameterObject.objectToMirror.y : parameterObject.y ;
        this.width = parameterObject.width === undefined ? parameterObject.objectToMirror.width : parameterObject.width;
        this.height = parameterObject.height === undefined ? parameterObject.objectToMirror.height : parameterObject.height;
        this.delta = parameterObject.delta ? parameterObject.delta : 1;
        // console.log(this.object)

        // store squared values to reduce computation (?)
        // this.xSquared = this.x * this.x;
        // this.ySquared = this.y * this.y;
        // this.widthSquared = this.width * this.width;
        // this.heightSquared = this.height;
        // this.xObjectSquared = parameterObject.objectToMirror.x;
        // this.yObjectSquared = parameterObject.objectToMirror.y;
        // this.widthObjectSquared = parameterObject.objectToMirror.width;
        // this.heightObjectSquared = parameterObject.objectToMirror.height;

    }

    lerpX(){
        if (Math.abs(this.x - this.object.x)>this.delta){
            this.x = this.p.lerp(this.x,this.object.x,.3)
        }
        console.log(this.x,this.object.x,1)
    }
    lerpY(){
        if (Math.abs(this.y - this.object.y)>this.delta){
            this.y =this.p.lerp(this.y,this.object.y,.3)
        }
    }
    lerpWidth(){
        if (Math.abs(this.width - this.object.width)>this.delta){
            this.width =this.p.lerp(this.width,this.object.width,.3)
        }
    }
    lerpHeight(){
        if (Math.abs(this.height - this.object.height)>this.delta){
            this.height =this.p.lerp(this.height,this.object.height,.3)
        }
    }
    draw(){
        this.lerpX()
        this.lerpY()
        this.lerpWidth()
        this.lerpHeight()
        this.p.fill("pink")
        this.p.rect(this.x, this.y, this.width, this.height)
        // console.log(this.x, this.y, this.width, this.height)
    }
}
