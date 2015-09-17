let queue = new createjs.LoadQueue(false)
queue.installPlugin(createjs.Sound)
let loadSoundComplete=function(){

};
queue.addEventListener("complete",loadSoundComplete)
var manifest = [
  {src:"/sound/nyu3.mp3", id:"ball"},
  {src:"/sound/strike1.mp3", id:"hit"},
  {src:"/sound/hitting.mp3", id:"strike"},
  {src:"/sound/swing.mp3", id:"swing"},
]
queue.loadManifest(manifest)
