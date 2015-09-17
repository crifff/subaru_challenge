import * as config from "./config.es6"

export default class Ball{
  constructor(defaults){
    this.defaults=defaults
    this.initialize();
  }

  initialize(){
    this.x =this.defaults["x"]||0
    this.y =this.defaults["y"]||0
    this.z =this.defaults["z"]||0
    this.vx =this.defaults["vx"]||0
    this.vy =this.defaults["vy"]||0
    this.vz =this.defaults["vz"]||0
    this.angle = this.defaults["angle"]||Math.PI/2
    this.zAngle = this.defaults["zAngle"]||Math.PI/2
    this.speed = this.defaults["speed"]||0
    this.radius = this.defaults["radius"]||0
  }

  hit(){
    let min=Math.PI
    let max=Math.PI*2
    this.angle=( Math.random() * (max - min) ) + min;
    console.log(this.angle)
    this.speed =20
  }

  move(){
    this.vy = Math.sin(this.angle) * this.speed
    this.vx = Math.cos(this.angle) * this.speed
    this.y += this.vy
    this.x += this.vx
    this.radius = this.y/30
    if(this.y > config.HEIGHT){
      return false
    }
    return true
  }

  move_ground(scale){
    this.vy = Math.sin(this.angle) * this.speed*scale
    this.vx = Math.cos(this.angle) * this.speed*scale
    this.y += this.vy
    this.x += this.vx
    this.radius = this.z
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

  draw_ground(graphic,x,y,radius){
    // this.clear(graphic);
    // console.log(this.x*scale+offset_x,this.y*scale+offset_y)
    graphic.lineStyle(0)
    graphic.beginFill(0xFFFFFF)
    graphic.drawCircle(x,y,radius )
    graphic.endFill()
  }
}
