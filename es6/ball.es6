import * as config from "./config.es6"

export default class Ball{
  constructor(x,y,radius){
    this.defaults={
      x: x,
      y: y,
      radius: radius,
      angle: Math.PI/2,
      speed: 9.2
    }
    this.initialize();
  }

  initialize(){
    this.x =this.defaults["x"]
    this.y =this.defaults["y"]
    this.angle = this.defaults["angle"]
    this.speed = this.defaults["speed"]
    this.radius = this.defaults["radius"]
  }

  hit(){
    let min=Math.PI
    let max=Math.PI*2
    this.angle=( Math.random() * (max - min) ) + min;
    console.log(this.angle)
    this.speed =20
  }

  move(){
    this.y += Math.sin(this.angle) * this.speed
    this.x += Math.cos(this.angle) * this.speed
    this.radius = this.y/30
    if(this.y > config.HEIGHT){
      return false
    }
    return true
  }

  clear(graphic){
    graphic.clear()
  }
  draw(graphic){
    // this.clear(graphic);
    graphic.lineStyle(0)
    graphic.beginFill(0xFFFFFF)
    graphic.drawCircle(
      this.x,
      this.y,
      this.radius
      )
    graphic.endFill()
  }

}
