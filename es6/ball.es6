import * as config from "./config.es6"

export default class Ball{
  constructor(x,y,radius){
    this.defaults={
      x: x,
      y: y,
      radius: radius
    }
    this.initialize();
  }

  initialize(){
    this.x =this.defaults["x"]
    this.y =this.defaults["y"]
    this.radius = this.defaults["radius"]
  }

  move(){
    this.y += 3
    this.radius += 0.05
    if(this.y > config.HEIGHT){
      return false
    }
    return true
  }

  clear(graphic){
    graphic.clear()
  }
  draw(graphic){
    this.clear(graphic);
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
