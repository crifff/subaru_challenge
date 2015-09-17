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
    this.speed =60

    let zmin=280
    let zmax=360
    this.zAngle=(( Math.random() * (zmax - zmin) ) + zmin) * Math.PI/180;
    this.vz = Math.sin(this.zAngle) * this.speed
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
    this.vz -= 0.68
    this.y += this.vy
    this.x += this.vx
    this.z += this.vz
    if(this.z<=0){
      this.z=0
      this.speed*=0.9
      this.vz*=-0.5
    }
    var cof=30
    if(this.z/cof<3){this.radius = 3}
    else if(this.z/cof>10){this.radius=10}
    else{this.radius=this.z/cof}

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
