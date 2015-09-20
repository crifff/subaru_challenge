import * as config from "./config.es6"
export default class StageGround {
  constructor(){
    this.items=[]
    this.stage = new PIXI.Container()

    var texture = PIXI.Texture.fromImage("image/background_ground.png");
    // create a new Sprite using the texture
    this.ground_image = new PIXI.Sprite(texture);
    this.initialize()

    this.stage.addChild(this.ground_image);
    this.graphics = new PIXI.Graphics()
    this.stage.addChild(this.graphics)

    this.faul_image = new PIXI.Sprite(PIXI.Texture.fromImage("image/faul.png"));
    this.faul_image.position.x=config.WIDTH/2-100
    this.faul_image.position.y=config.HEIGHT/2-20
    this.faul_image.visible=false
    this.stage.addChild(this.faul_image);

    this.homerun_image = new PIXI.Sprite(PIXI.Texture.fromImage("image/homerun.png"));
    this.homerun_image.position.x=config.WIDTH/2-100
    this.homerun_image.position.y=config.HEIGHT/2-20
    this.homerun_image.visible=false
    this.stage.addChild(this.homerun_image);

 this.score = new PIXI.Text('', { font: 'bold 20px Arial', fill: '#ffffff', align: 'center' });
 this.score.x = this.homerun_image.position.x+25;
 this.score.y = this.homerun_image.position.y+40;

this.stage.addChild(this.score);
}
initialize(){
  console.log("map init")

  // move the sprite t the center of the screen
  this.ground_image.position.x = 0;
  this.ground_image.position.y = 0;
  this.camera=[-365,-270]
  this.measure=0
}

addChild(key,obj){
  this.items[key]=obj
}

animate(){
  this.graphics.clear()
  var ball = this.items["ball"]
  var scale=0.1
  ball.move_ground(scale)
  var x= ball.x
  var y= ball.y
  this.measure += Math.sqrt(ball.x * ball.x + ball.y * ball.y)
  // console.log(this.measure)
  // console.log(ball.y)
  // var stopX=false;
  // var stopY=false;
  if(this.ground_image.position.x > -700 && this.ground_image.position.x < 0){
    this.camera[0]-=ball.vx
  }
  // console.log(this.ground_image.position.y)
  if(this.ground_image.position.y<0){
    this.camera[1]-=ball.vy
  }
  this.ground_image.position.x = this.camera[0]
  this.ground_image.position.y = this.camera[1]

  // this.diffX = this.diffX || 0
  //
  // console.log(x)
  //     if(this.ground_image.position.x > -700 && this.ground_image.position.x < 0){
  //       if(x < 50){x=50; stopX=true}
  //       if(x > config.WIDTH-50){x=config.WIDTH-50;stopX=true; }
  //       if(stopX){
  //          this.ground_image.position.x -= ball.vx }
  //       // console.log(this.ground_image.position.x)
  //     }else{
  //       x +=this.ground_image.position.x
  //     }

  // if(y < 50){y=50;stopY=true}
  // if(y > config.HEIGHT-50){y=config.HEIGHT-50;stopY=true}
  // if(stopY){ this.ground_image.position.y -= ball.vy }

  if(this.items["ball"]) this.items["ball"].draw_ground(
    this.graphics,
    x,
    y,
    ball.radius)
  }
}
