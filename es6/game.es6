import * as config from "./config.es6"
import "./sound.es6"
import Ball from "./ball.es6"
import Bat from "./bat.es6"
import Home from "./stage_home.es6"
import Ground from "./stage_ground.es6"

var current_state=config.STATES["OPENING"]

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
var opening = new PIXI.Container()
var current_stage = "opening"



//stage.interactive = true

//var thing = new PIXI.Graphics()
//stage.addChild(thing)

// stage.on('click', onClick)
// stage.on('tap', onClick)
// setTimeout(function () {
//   throwBall()
// }, 1000);

var items={}
var self=this
function onClick(){
  // return
  if(current_state == config.STATES["OPENING"]){
    //   current_state=config.STATES["START"]
    //   current_stage="home"
    //   requestAnimationFrame( animate )
    //   createjs.Sound.play("bgm", {loop:-1})
    // setTimeout(function () { throwBall() }, 2000);

  } else if(current_state == config.STATES["THROW"]){
    stages["home"].swing(function(){
      current_state = config.STATES["HIT"]

      var ball = stages["home"].items["ball"]
      console.log(ball)
      stages["ground"].addChild("ball",  new Ball({
        x: config.WIDTH / 2,
        y: 400,
        angle: ball.angle,
        speed: ball.speed,
        vx: ball.vx,
        vy: ball.vy,
        vz: ball.vz,
        onHomerun:function(measure){
          createjs.Sound.play("homerun")
          homerunCount++;
          stages["ground"].homerun_image.visible=true
          var point =Math.floor(measure)
          totalPoint+=point;
            stages["ground"].score.text=`${point} pt`
          setTimeout(function(){
            delete stages["ground"].initialize()
            stages["ground"].homerun_image.visible=false
            stages["ground"].score.text=''

            current_state = config.STATES["START"]
            current_stage = "home"
            setTimeout(function(){
              throwBall()
            },1000)
          },2000)
        },
        onFoul:function(){
          createjs.Sound.play("foul")
          stages["ground"].faul_image.visible=true
          console.log("foul")
          setTimeout(function(){
            delete stages["ground"].initialize()
            stages["ground"].faul_image.visible=false
            current_state = config.STATES["START"]
            current_stage = "home"
            setTimeout(function(){
              throwBall()
            },1000)
          },1000)
        },
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
      },0)
      createjs.Sound.play("hit")
    })


  }
}
var ballCount=0
var totalPoint=0
var homerunCount=0;
function ending(){
  var page= $("#ending")
  page.find(".score .result").text(homerunCount)
  page.find(".point .result").text(totalPoint)
  if(homerunCount>=5){
    $(".success.message").show()
    $(".fail.message").hide()
    $(".tweetButtonWrapper").html(
      `<a href="https://twitter.com/share" class="twitter-share-button" data-size="large" data-hashtags="subaru_challenge" data-dnt="true" data-text="10球中${homerunCount}ホームランでチャレンジ成功！${totalPoint}pt獲得しました" data-lang="ja">ツイート</a>`
    )
    twttr.widgets.load()
  }else{
    $(".success.message").hide()
    $(".fail.message").show()

  }
  page.show()
}
$("#retry").click(retry)
function retry(){
  ballCount=0;
  totalPoint=0;
  homerunCount=0;
  // stages["home"].score.text=`${ballCount}/10`
  refleshBallCount()
  $("#ending").hide()
  $("#opening").show()
}
function throwBall()
{
  if(ballCount==10){
    createjs.Sound.stop("bgm")
    createjs.Sound.play("whistle")
    ending()
    return;
  }
  if(current_state != config.STATES["START"]) {return true}
  console.log("throw")
  var speed=_.random(3,10)
  var ball =new Ball({
    x:config.WIDTH/2-20 ,
    y:100 ,
    angle: Math.PI/(_.random(197, 215)/100),
    speed: speed
  })

  stages["home"].pitch(ball)
  current_state=config.STATES["THROW"]
  ballCount++;
  console.log(ballCount)
  refleshBallCount()
}
function refleshBallCount(){
  var text = `CHALLENGE ${ballCount}/10\nHOMERUN ${homerunCount}`
  stages["home"].score.text=text

}


$("#opening .startBtn").click(function(){
  $('#opening').hide()
  current_state=config.STATES["START"]
  current_stage="home"
  requestAnimationFrame( animate )
  createjs.Sound.play("bgm", {loop:-1})
  setTimeout(function () { throwBall() }, 2000);
})

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
  stages["home"].items["bat"].x=  stages["home"].batter_movie.position.x
  stages["home"].items["bat"].y=stages["home"].batter_movie.position.y+80
  if(stages["home"].batter_movie.position.x<110)stages["home"].batter_movie.position.x=110
  if(stages["home"].batter_movie.position.x>170)stages["home"].batter_movie.position.x=170
  if(stages["home"].batter_movie.position.y<160)stages["home"].batter_movie.position.y=160
  if(stages["home"].batter_movie.position.y>280)stages["home"].batter_movie.position.y=280
}
// run the render loop
stages["home"].addChild("bat",new Bat())
// var meter = new FPSMeter();
var graphics = new PIXI.Graphics()
// stage.addChild(graphics)


function animate() {
  if(current_state==config.STATES["THROW"]){
    if(stages["home"].items["ball"]){
      // console.log(stages["home"].items["ball"].y)
      if(stages["home"].items["ball"].y >= config.HEIGHT+50){
        delete stages["home"].items["ball"]
        createjs.Sound.play("strike")
        setTimeout(function () {
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
  // meter.tick();
  requestAnimationFrame( animate )
}
// requestAnimationFrame( animate )

var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
window.addEventListener("devicemotion", function(evt){

  //加速度
  var x = evt.acceleration.x;
  var y = evt.acceleration.y;
  var z = evt.acceleration.z;


  //傾き
  var xg = evt.accelerationIncludingGravity.x;
  var yg = evt.accelerationIncludingGravity.y;
  var zg = evt.accelerationIncludingGravity.z;

  if(iOS){
    vx=xg/3
    vy=-yg/3
  }else{
    vx=-xg/3
    vy=yg/3
  }
  // $("#console").html(xg)

},true);
