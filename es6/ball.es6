import * as config from "./config.es6"

export default class Ball{
  constructor(defaults){
    this.defaults=defaults
    this.initialize();
  }

  initialize(){
    this.x =this.defaults["x"]||0
    this.y =this.defaults["y"]||0
    this.z =5
    this.vx =this.defaults["vx"]||0
    this.vy =this.defaults["vy"]||0
    this.vz =this.defaults["vz"]||0
    this.angle = this.defaults["angle"]||Math.PI/2
    this.zAngle = this.defaults["zAngle"]||Math.PI/2
    this.speed = this.defaults["speed"]||0
    this.radius = this.defaults["radius"]||0
    this.measure = 0
      this.homeBox=[0,0]
    this.onSpeedZero = this.defaults["onSpeedZero"] || function(){}
    this.onFirstBound = this.defaults["onFirstBound"] || function(){}
    this.stoped=false
  }

  hit(){
    let min=180
    let max=360
    this.angle=(( Math.random() * (max - min) ) + min) * Math.PI/180;
    // this.angle=min//debug
    this.speed =20

    let zmin=10
    let zmax=80
    this.zAngle=(( Math.random() * (zmax - zmin) ) + zmin) * Math.PI/180;
    // this.zAngle=300* Math.PI/180;//debug
    this.vz = Math.sin(this.zAngle) * this.speed

    this.homeBox=[0,0]
    // console.log("Hit",this.x,this.y)
  }

  move(){
    this.vy = Math.sin(this.angle) * this.speed
    this.vx = Math.cos(this.angle) * this.speed
    this.y += this.vy
    this.x += this.vx
    this.radius = this.y/30
    // if(this.y > config.HEIGHT){

    //   return false
    // }

    return true
  }

  move_ground(scale){
    this.vy = Math.sin(this.angle) * this.speed*scale
    this.vx = Math.cos(this.angle) * this.speed*scale
    this.vz -= 0.68
    this.y += this.vy
    this.x += this.vx
    this.z += this.vz
    // console.log(this.z)
    this.homeBox[0]+=this.vx
    this.homeBox[1]+=this.vy
    this.measure = Math.sqrt((this.homeBox[0]*this.homeBox[0]) + (this.homeBox[1]*this.homeBox[1]))
    // console.log(this.measure)
    if(this.z<=0){
      this.z=0
      this.speed*=0.9
      this.vz*=-0.5
      // this.vz*=-1//debug
    }
    // console.log(this.z)
    if(this.z<100 && this.measure > 300 && this.measure<350){
      this.measure=300
      // console.log("refrect")
      // this.y=90
      // this.vy*=-1
      this.angle*=-1
      this.vz*=-1
    }
    // console.log(this.y)
    var cof=30
    if(this.z/cof<3){this.radius = 3}
    else if(this.z/cof>10){this.radius=10}
    else{this.radius=this.z/cof}
    //
    // if(this.y > config.HEIGHT){
    //   return false
    // }
    // console.log(this.speed)
    if(this.stoped==false && this.speed < 0.1){
      this.stoped=true
      this.speed=0
      this.onSpeedZero()
    }
    if(this.z<1){
      //homerun
      if(this.measure>350){
        this.stoped=true
        this.speed=0
        this.onSpeedZero()
        console.log("home run")
      }
      var digree =this.angle/Math.PI*180
      if(315 <= digree){
        this.stoped=true
        this.speed=0
        this.onSpeedZero()
        alert("faul")
      }
      if(225 >= digree){
        this.stoped=true
        this.speed=0
        this.onSpeedZero()
        alert("faul")
      }

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
