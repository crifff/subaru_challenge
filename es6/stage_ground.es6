import * as config from "./config.es6"
export default class StageGround {
  constructor(){
    this.items=[]
    this.stage = new PIXI.Container()

    var texture = PIXI.Texture.fromImage("image/ballpark2.gif");
    // create a new Sprite using the texture
    this.ground_image = new PIXI.Sprite(texture);

    // center the sprites anchor point
    //  bunny.anchor.x = 0.5;
    //  bunny.anchor.y = 0.5;

    // move the sprite t the center of the screen
    this.ground_image.position.x = -300;
    this.ground_image.position.y = -300;

    this.stage.addChild(this.ground_image);
    this.graphics = new PIXI.Graphics()
    this.stage.addChild(this.graphics)
  }

  addChild(key,obj){
    this.items[key]=obj
  }

  animate(){
    this.graphics.clear()
    var ball=this.items["ball"]
    var scale=0.1
    ball.move_ground(scale)
    var x= ball.x
    var y= ball.y
    var stopX=false;
    var stopY=false;

    if(x < 50){x=50; stopX=true}
    if(x > config.WIDTH-50){x=config.WIDTH-50;stopX=true; }
    if(stopX){ this.ground_image.position.x -= ball.vx }
    if(y < 50){y=50;stopY=true}
    if(y > config.HEIGHT-50){y=config.HEIGHT-50;stopY=true}
    if(stopY){ this.ground_image.position.y -= ball.vy }

    this.items["ball"].draw_ground(
      this.graphics,
      x,
      y,
      ball.radius)
    }
  }
