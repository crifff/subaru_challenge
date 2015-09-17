import * as config from "./config.es6"
import "./sound.es6"
import Ball from "./ball.es6"
import Bat from "./bat.es6"
import Home from "./stage_home.es6"
import Ground from "./stage_ground.es6"

var current_state=config.STATES["START"]

var renderer = PIXI.autoDetectRenderer(config.WIDTH, config.HEIGHT,{ antialias: true });
renderer.view.style.width = config.WIDTH + "px"
renderer.view.style.height = config.HEIGHT + "px"
renderer.view.style.display = "block"
document.body.appendChild(renderer.view)

var stages={}
stages["home"] = new Home()
stages["ground"] = new Ground()
// var stage = new PIXI.Container()
var ground = new PIXI.Container()
var current_stage = "home"
//stage.interactive = true

//var thing = new PIXI.Graphics()
//stage.addChild(thing)

// stage.on('click', onClick)
// stage.on('tap', onClick)
setTimeout(function () {
  throwBall()
}, 1000);

var items={}
function onClick(){
  // stages["home"].batter_movie.gotoAndPlay(0)
  if(current_state == config.STATES["THROW"]){
    stages["home"].swing(function(){
      current_state = config.STATES["HIT"]

      var ball = stages["home"].items["ball"]
      console.log(ball)
      stages["ground"].addChild("ball",  new Ball({
        x: config.WIDTH / 2,
        y: 300,
        angle: ball.angle,
        speed: ball.speed,
        vx: ball.vx,
        vy: ball.vy,
        vz: ball.vz,
        onSpeedZero:function(){
          console.log("speed zero")
          delete stages["ground"].initialize()
          current_state = config.STATES["START"]
          current_stage = "home"
          setTimeout(throwBall,1000)
        }
      }))

      setTimeout(function(){
        current_stage="ground"
      },1000)
      createjs.Sound.play("hit")
    })


  }
}
function throwBall()
{
  if(current_state != config.STATES["START"]) {return true}
  console.log("throw")
  var ball =new Ball({x:config.WIDTH/2-20 ,y:100 ,angle:Math/2,speed:6})

  stages["home"].pitch(ball)
  current_state=config.STATES["THROW"]
}
document.addEventListener("mousedown",onClick)
document.addEventListener("touchstart",onClick)
document.addEventListener("keydown",keydown)
document.addEventListener("keyup",keyup)
var vx=0
var vy=0
function keyup(event){
  if(event.keyCode==37){ vx=0 }
  if(event.keyCode==38){ vy=0 }
  if(event.keyCode==39){ vx=0 }
  if(event.keyCode==40){ vy=0 }
}
function keydown(event){
  var v=1
  if(event.keyCode==13||event.keyCode==32){ return onClick() }
  if(event.keyCode==37){ vx=-v }
  if(event.keyCode==38){ vy=-v }
  if(event.keyCode==39){ vx=v }
  if(event.keyCode==40){ vy=v }
}
function move(){
  if(!stages["home"].batter_movie){return false}
  stages["home"].batter_movie.position.x+=vx
  stages["home"].batter_movie.position.y+=vy
  stages["home"].items["bat"].x+=vx
  stages["home"].items["bat"].y+=vy
}
// run the render loop
stages["home"].addChild("bat",new Bat())
var meter = new FPSMeter();
var graphics = new PIXI.Graphics()
// stage.addChild(graphics)


function animate() {
  if(current_state==config.STATES["THROW"]){
    if(stages["home"].items["ball"]){
      // console.log(stages["home"].items["ball"].y)

      if(stages["home"].items["ball"].y >= config.HEIGHT+20){
        delete stages["home"].items["ball"]
        setTimeout(function () {

          createjs.Sound.play("strike")
          console.log("reset")
          current_state=config.STATES["START"]
          throwBall()
        }, 1000);
      }
    }
  }
  move()
  stages[current_stage].animate()
  renderer.render(stages[current_stage].stage)
  meter.tick();
  requestAnimationFrame( animate )
}
requestAnimationFrame( animate )
