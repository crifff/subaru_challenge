import * as config from "./config.es6"
import "./sound.es6"
import Ball from "./ball.es6"
import Bat from "./bat.es6"

console.log(config)
var renderer = PIXI.autoDetectRenderer(config.WIDTH, config.HEIGHT,{ antialias: true });
renderer.view.style.width = config.WIDTH + "px"
renderer.view.style.height = config.HEIGHT + "px"
renderer.view.style.display = "block"
document.body.appendChild(renderer.view)

var stage = new PIXI.Container()
//stage.interactive = true

//var thing = new PIXI.Graphics()
//stage.addChild(thing)

// stage.on('click', onClick)
// stage.on('tap', onClick)
setInterval(function () {
  throwBall()
}, 3000);

var items={}
function onClick(){
  if(items["ball"]){

  if(items["bat"].hitCheck(items["ball"])){
    items["ball"].hit()
    createjs.Sound.play("hit")
  }
  }
}
function throwBall()
{
  console.log("throw")
  createjs.Sound.play("ball")
  items["ball"]= new Ball(config.WIDTH/2 ,50 ,5)
}
document.addEventListener("mousedown",onClick)
document.addEventListener("touchstart",onClick)
// run the render loop
items["bat"]= new Bat()
var meter = new FPSMeter();
var graphics = new PIXI.Graphics()
stage.addChild(graphics)

function animate() {
  graphics.clear()
  for(var i in items){
    if(items[i].move()){
      items[i].draw(graphics);
    }else{
      items[i].clear(graphics)
      delete items[i]
    }
  }
  renderer.render(stage)
    meter.tick();
  requestAnimationFrame( animate )
}
requestAnimationFrame( animate )
