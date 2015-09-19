import * as config from "./config.es6"

export default class Bat{
  constructor(){
    this.defaults={
      x: 50,
      y: 280,
      width: 160,
      height: 60
    }
    this.initialize();
  }

  initialize(){
    this.x =this.defaults["x"]
    this.y =this.defaults["y"]
    this.width = this.defaults["width"]
    this.height = this.defaults["height"]
  }

  hitCheck(ball){
    if(!ball)return false;
    if(
      this.x < ball.x &&
      ball.x < this.x + this.width &&
        this.y < ball.y &&
        ball.y < this.y + this.height
    ){
      // console.log(ball.x , this.x, this.width)
      //  exit()
      var angle=Math.atan2(
        (ball.x-(this.x+this.width/2)) / this.width*4 ,
         1
       )
       var zAngle=Math.atan2(
         (ball.y-(this.y+this.height/2)) / this.height*4 ,
          1
        )
      var pow =60 - 5* Math.sqrt(Math.abs((this.x+this.width/2)-ball.x), Math.abs((this.y+this.height/2)-ball.x))
      // console.log(ball.y , this.y, this.height)
      //  exit()
      //   console.log(zAngle* 180/ Math.PI)
      //   exit();
      console.log(pow)
      return [angle * 180/ Math.PI, zAngle* 180/ Math.PI,pow]
    }
    return false
  }
  move(){
    return true;
  }

  clear(graphic){
    graphic.clear()
  }
  draw(graphic){
    // this.clear(graphic);
    graphic.lineStyle(2, 0xFF0000);
    graphic.drawRect(
      this.x,
      this.y,
      this.width,
      this.height
      )
  }

}
