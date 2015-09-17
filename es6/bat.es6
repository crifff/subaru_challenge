import * as config from "./config.es6"

export default class Bat{
  constructor(){
    this.defaults={
      x: 150,
      y: 280,
      width: 60,
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
      return true
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
