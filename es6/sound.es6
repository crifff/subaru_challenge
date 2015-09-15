let queue = new createjs.LoadQueue(false)
queue.installPlugin(createjs.Sound)
let loadSoundComplete=function(){

};
queue.addEventListener("complete",loadSoundComplete)
var manifest = [
  {src:"/sound/nyu3.mp3", id:"ball"},
  {src:"/sound/strike1.mp3", id:"hit"},
]
queue.loadManifest(manifest)
