export default class StageHome {
  constructor(){
    this.items=[]
    this.stage = new PIXI.Container()
    this.graphics = new PIXI.Graphics()
    this.stage.addChild(this.graphics)
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
