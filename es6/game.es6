import * as config from "./config.es6"
import "./sound.es6"
import Ball from "./ball.es6"
import Bat from "./bat.es6"
import Home from "./stage_home.es6"
import Ground from "./stage_ground.es6"

var current_state=config.STATES["START"]

console.log(config)
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
var current_stage="home"
//stage.interactive = true

//var thing = new PIXI.Graphics()
//stage.addChild(thing)

// stage.on('click', onClick)
// stage.on('tap', onClick)
setTimeout(function () {
  throwBall()
}, 300);

var items={}
function onClick(){
  if(current_state="throw"){
    if(stages["home"].swing()){

      current_state=config.STATES["HIT"]
      var ball =stages["home"].items["ball"]
      stages["ground"].addChild("ball", new Ball({
        x:config.WIDTH/2,
        y:300,
        vx:ball.vx,
        vy:ball.vy,
        vz:ball.yz,
        speed:ball.speed,
        angle:ball.angle,
      }))
      setTimeout(function(){
        current_stage="ground"
      },1000)
      createjs.Sound.play("hit")
    }
  }
}
function throwBall()
{
  if(current_state != config.STATES["START"]) {return true}
  console.log("throw")
  createjs.Sound.play("ball")
  var ball =new Ball({x:config.WIDTH/2 ,y:50 ,angle:Math/2,speed:6})

  stages["home"].addChild("ball", ball)
  current_state=config.STATES["THROW"]
}
document.addEventListener("mousedown",onClick)
document.addEventListener("touchstart",onClick)
// run the render loop
stages["home"].addChild("bat",new Bat())
var meter = new FPSMeter();
var graphics = new PIXI.Graphics()
// stage.addChild(graphics)


function animate() {
  stages[current_stage].animate()
  renderer.render(stages[current_stage].stage)
  meter.tick();
  requestAnimationFrame( animate )
}
requestAnimationFrame( animate )
