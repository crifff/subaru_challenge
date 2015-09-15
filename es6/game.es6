import * as config from "./config.es6"
import "./sound.es6"
import Ball from "./ball.es6"

console.log(config)
var renderer = PIXI.autoDetectRenderer(config.WIDTH, config.HEIGHT,{ antialias: true });
renderer.view.style.width = window.innerWidth + "px"
renderer.view.style.height = window.innerHeight + "px"
renderer.view.style.display = "block"
document.body.appendChild(renderer.view)

var stage = new PIXI.Container()
//stage.interactive = true

//var thing = new PIXI.Graphics()
//stage.addChild(thing)

// stage.on('click', onClick)
// stage.on('tap', onClick)

var items={}
function onClick()
{
  console.log("throw")
  createjs.Sound.play("ball")

// var graphic = new PIXI.Graphics()
// stage.addChild(graphic)
  items["ball"]= new Ball(config.WIDTH/2 ,0 ,5)
}
document.addEventListener("click",onClick)
document.addEventListener("touchstart",onClick)
// run the render loop
animate()

var graphics = new PIXI.Graphics()
stage.addChild(graphics)

function animate() {
    for(var i in items){
      if(items[i].move()){
        items[i].draw(graphics);
      }else{
        items[i].clear(graphics)
        delete items[i]
      }
    }
    renderer.render(stage)
    requestAnimationFrame( animate )
  }
