
var width=320;
var height=480;
var renderer = PIXI.autoDetectRenderer(width*2, height*2);
renderer.view.style.width = window.innerWidth + "px";
renderer.view.style.height = window.innerHeight + "px";
renderer.view.style.display = "block";
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();
//stage.interactive = true;

// let's create a moving shape
var thing = new PIXI.Graphics();
stage.addChild(thing);
thing.position.x = width/2;
thing.position.y = 0;
thing.radius = 1;

// Just click on the stage to draw random lines
// stage.on('click', onClick);
// stage.on('tap', onClick);

document.addEventListener("click",onClick);
document.addEventListener("touchstart",onClick);
var items={};
function onClick()
{
  console.log("throw");
  createjs.Sound.play("ball");
  items["ball"]=drawBall;
}
// run the render loop
animate();

function drawBall(){
    thing.clear();
    thing.lineStyle(0);
    thing.beginFill(0xFFFFFF);
    thing.drawCircle(thing.x, thing.y, thing.radius);
    thing.endFill();
    thing.y += 2;
    thing.radius += 0.1;
    console.log(thing.y);
    if(thing.y > height){
      delete items["ball"]
    }
}

function animate() {

    thing.clear();

    for(var i in items){
      items[i]();
    }

    renderer.render(stage);
    requestAnimationFrame( animate );
  }
