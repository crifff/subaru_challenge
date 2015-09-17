export default class StageHome {
  constructor(){
    this.items=[]
    this.stage = new PIXI.Container()
    this.graphics = new PIXI.Graphics()
    this.stage.addChild(this.graphics)


    let self=this
    PIXI.loader
        .add('subaru', '/image/spritesheet.json')
        .load(function(){
          var textures = []

          for (var i = 0; i < 5; i++)
          {
            var texture = PIXI.Texture.fromFrame('bat_0' + (i+1) + '.png');
            textures.push(texture);
          }
          self.movie = new PIXI.extras.MovieClip(textures);

          self.movie.position.x=150
          self.movie.position.y=200
          self.movie.width=200
          self.movie.height=200
          self.movie.loop=false
          // self.movie.onComplete(function(){
          //   setTimeout(funtion(){
          //     self.movie.gotoAndStop(0)
          //   },500)
          // })

          self.movie.animationSpeed = 0.5;

          self.movie.gotoAndStop(0);

          self.stage.addChild(self.movie);
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

      swing(){
        if(this.bat().hitCheck(this.ball())){
          this.ball().hit()
          return true
        }
        return false
      }

      animate(){
        this.graphics.clear()
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
