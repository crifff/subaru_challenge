 // createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin]);
let queue = new createjs.LoadQueue(false)
queue.installPlugin(createjs.Sound)
let loadSoundComplete=function(){
      // createjs.Sound.play("bgm",{loop:-1})
      // alert(1)
};
queue.addEventListener("complete",loadSoundComplete)
var manifest = [
  {src:"/sound/bgm.ogg", id:"bgm"},
  {src:"/sound/foul.mp3", id:"foul"},
  {src:"/sound/homerun.mp3", id:"homerun"},
  {src:"/sound/nyu3.mp3", id:"ball"},
  {src:"/sound/strike1.mp3", id:"hit"},
  {src:"/sound/hitting.mp3", id:"strike"},
  {src:"/sound/swing.mp3", id:"swing"},
]
queue.loadManifest(manifest)
