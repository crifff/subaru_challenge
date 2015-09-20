export default class StageHome {
  constructor(){
    this.items=[]
    this.stage = new PIXI.Container()
    this.graphics = new PIXI.Graphics()
    this.stage.addChild(this.graphics)
    this.bg = new PIXI.Sprite(PIXI.Texture.fromImage("image/background_home.png"));
    this.bg.position.x = 0;
    this.bg.position.y = 0;
    this.stage.addChildAt(this.bg,0);

    this.score = new PIXI.Text('CHALLENGE 0\nHOMERUN 0', { font: 'bold 16px Arial', fill: '#cccccc'});
    this.score.x = 30;
    this.score.y = 2;

    this.stage.addChild( this.score);

    let self=this
    PIXI.loader
    .add('subaru', '/image/spritesheet.json')
    .add('pitcher', '/image/pitcher.json')
    .load(function(){
      var pitcher_textures = []
      for (var i = 0; i < 5; i++)
      {
        var pitcher_texture = PIXI.Texture.fromFrame('picher_0' + (i+1) + '.png');
        pitcher_textures.push(pitcher_texture);
      }
      self.pitcher_movie = new PIXI.extras.MovieClip(pitcher_textures);
      self.pitcher_movie.position.x=110
      self.pitcher_movie.position.y=70
      self.pitcher_movie.width=100
      self.pitcher_movie.height=100
      self.pitcher_movie.animationSpeed = 0.05;
      self.pitcher_movie.loop = false;
      self.pitcher_movie.gotoAndPlay(0);

      var textures = []
      for (var i = 0; i < 5; i++)
      {
        var texture = PIXI.Texture.fromFrame('bat_0' + (i+1) + '.png');
        textures.push(texture);
      }
      self.batter_movie = new PIXI.extras.MovieClip(textures);

      self.batter_movie.position.x=150
      self.batter_movie.position.y=200
      self.batter_movie.width=200
      self.batter_movie.height=200
      self.batter_movie.loop=false
      // self.batter_movie.onComplete(function(){
      //   setTimeout(funtion(){
      //     self.batter_movie.gotoAndStop(0)
      //   },500)
      // })

      self.batter_movie.animationSpeed = 0.5;

      self.batter_movie.gotoAndStop(0);
      self.stage.addChild(self.batter_movie);
      self.stage.addChild(self.pitcher_movie);
    });


  }

  addChild(key,obj){
    this.items[key]=obj
  }

  ball(){
    return this.items["ball"]
  }
  bat(){
    return this.items["bat"]
  }
  pitch(ball){
    console.log("pitch")
    this.pitched=false
    var self=this
    this.pitcher_movie.gotoAndPlay(0)
    this.onPitch=function(){
      createjs.Sound.play("ball")
      self.addChild("ball",ball)
    }
  }

  swing(success){
    createjs.Sound.play("swing")
    console.log("swing")
    this.success=success
    this.hited=false
    this.batter_movie.gotoAndPlay(0)
  }

  animate_batter(){
    if(this.hited==false && this.batter_movie.currentFrame==3){
      var hit=this.bat().hitCheck(this.ball())
      if(hit != false){
        console.log("hit")
        this.hited=true
        this.ball().hit(hit[0],hit[1],hit[2])
        this.success()
      }
    }
  }

  animate_pitcher(){
    if(typeof this.onPitch =='undefined')return false;
    if(this.pitched)return false
    if(this.pitcher_movie.currentFrame==3){
      this.pitched=true
      this.onPitch()
    }

  }

  animate(){
    this.graphics.clear()
    if(this.batter_movie){this.animate_batter() }
    if(this.pitcher_movie){this.animate_pitcher() }

    for(var i in this.items){
      if(this.items[i].move()){
        this.items[i].draw(this.graphics);
      }else{
        this.items[i].clear(this.graphics)
        delete this.items[i]
      }
    }
  }
}
