(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _configEs6 = require("./config.es6");

var config = _interopRequireWildcard(_configEs6);

var Ball = (function () {
  function Ball(defaults) {
    _classCallCheck(this, Ball);

    this.defaults = defaults;
    this.initialize();
  }

  _createClass(Ball, [{
    key: "initialize",
    value: function initialize() {
      this.x = this.defaults["x"] || 0;
      this.y = this.defaults["y"] || 0;
      this.z = 5;
      this.vx = this.defaults["vx"] || 0;
      this.vy = this.defaults["vy"] || 0;
      this.vz = this.defaults["vz"] || 0;
      this.angle = this.defaults["angle"] || Math.PI / 2;
      this.zAngle = this.defaults["zAngle"] || Math.PI / 2;
      this.speed = this.defaults["speed"] || 0;
      this.radius = this.defaults["radius"] || 0;
      this.measure = 0;
      this.homeBox = [0, 0];
      this.onSpeedZero = this.defaults["onSpeedZero"] || function () {};
      this.onFoul = this.defaults["onFoul"] || function () {};
      this.onHomerun = this.defaults["onHomerun"] || function () {};
      this.onFirstBound = this.defaults["onFirstBound"] || function () {};
      this.bountCount = 0;
      this.firstBound = true;
      this.stoped = false;
    }
  }, {
    key: "hit",
    value: function hit(angle, zAngle, pow) {
      // let min=180
      // let max=360
      // this.angle=(( Math.random() * (max - min) ) + min) * Math.PI/180;
      // this.angle=min//debug
      this.angle = (angle + 180 + 90) * Math.PI / 180;
      this.speed = pow;

      // let zmin=10
      // let zmax=80
      // this.zAngle=(( Math.random() * (zmax - zmin) ) + zmin) * Math.PI/180;
      this.zAngle = (zAngle + 45) * Math.PI / 180;
      // this.zAngle=300* Math.PI/180;//debug
      this.vz = Math.sin(this.zAngle) * this.speed;

      this.homeBox = [0, 0];
      // console.log("Hit",this.x,this.y)
    }
  }, {
    key: "move",
    value: function move() {
      this.vy = Math.sin(this.angle) * this.speed;
      this.vx = Math.cos(this.angle) * this.speed;
      this.y += this.vy;
      this.x += this.vx;
      this.radius = this.y / 30;
      // if(this.y > config.HEIGHT){

      //   return false
      // }

      return true;
    }
  }, {
    key: "move_ground",
    value: function move_ground(scale) {
      this.vy = Math.sin(this.angle) * this.speed * scale;
      this.vx = Math.cos(this.angle) * this.speed * scale;
      this.vz -= 0.68;
      this.y += this.vy;
      this.x += this.vx;
      this.z += this.vz;
      // console.log(this.z)
      this.homeBox[0] += this.vx;
      this.homeBox[1] += this.vy;
      this.measure = Math.sqrt(this.homeBox[0] * this.homeBox[0] + this.homeBox[1] * this.homeBox[1]);
      // console.log(this.measure)
      if (this.z <= 0) {
        this.firstBound;
        this.z = 0;
        this.bountCount++;
        this.speed *= 0.9;
        this.vz *= -0.5;
        // this.vz*=-1//debug
      }
      // console.log(this.z)
      if (this.z < 100 && this.measure > 300 && this.measure < 350) {
        this.measure = 300;
        // console.log("refrect")
        // this.y=90
        // this.vy*=-1
        this.angle *= -1;
        this.vz *= -1;
      }
      // console.log(this.y)
      var cof = 30;
      if (this.z / cof < 3) {
        this.radius = 3;
      } else if (this.z / cof > 10) {
        this.radius = 10;
      } else {
        this.radius = this.z / cof;
      }
      //
      // if(this.y > config.HEIGHT){
      //   return false
      // }
      // console.log(this.speed)
      if (this.stoped == false && this.speed < 0.1) {
        this.stoped = true;
        this.speed = 0;
        this.onSpeedZero();
      }
      if (this.z < 1) {
        //homerun
        var digree = this.angle * (180 / Math.PI);
        // console.log(this.angle,digree)
        // exit;
        if (this.firstBound && 315 <= digree) {
          if (this.stoped == false) this.onFoul();
          this.stoped = true;
          // this.speed=0
          // this.onSpeedZero()
          // alert("faul")
        } else if (this.firstBound && 225 >= digree) {
            if (this.stoped == false) this.onFoul();
            this.stoped = true;
            // this.speed=0
            // this.onSpeedZero()
            // alert("faul")
          } else if (this.firstBound && this.measure > 350) {
              if (this.stoped == false) this.onHomerun();
              this.stoped = true;
              // this.speed=0
              // this.onSpeedZero()
              // console.log("home run")
            }
      }

      return true;
    }
  }, {
    key: "clear",
    value: function clear(graphic) {
      graphic.clear();
    }
  }, {
    key: "draw",
    value: function draw(graphic) {
      // this.clear(graphic);
      graphic.lineStyle(0);
      graphic.beginFill(0xFFFFFF);
      graphic.drawCircle(this.x, this.y, this.radius);
      graphic.endFill();
    }
  }, {
    key: "draw_ground",
    value: function draw_ground(graphic, x, y, radius) {
      // this.clear(graphic);
      // console.log(this.x*scale+offset_x,this.y*scale+offset_y)
      graphic.lineStyle(0);
      graphic.beginFill(0xFFFFFF);
      graphic.drawCircle(x, y, radius);
      graphic.endFill();
    }
  }]);

  return Ball;
})();

exports["default"] = Ball;
module.exports = exports["default"];

},{"./config.es6":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _configEs6 = require("./config.es6");

var config = _interopRequireWildcard(_configEs6);

var Bat = (function () {
  function Bat() {
    _classCallCheck(this, Bat);

    this.defaults = {
      x: 50,
      y: 280,
      width: 160,
      height: 60
    };
    this.initialize();
  }

  _createClass(Bat, [{
    key: "initialize",
    value: function initialize() {
      this.x = this.defaults["x"];
      this.y = this.defaults["y"];
      this.width = this.defaults["width"];
      this.height = this.defaults["height"];
    }
  }, {
    key: "hitCheck",
    value: function hitCheck(ball) {
      if (!ball) return false;
      if (this.x < ball.x && ball.x < this.x + this.width && this.y < ball.y && ball.y < this.y + this.height) {
        // console.log(ball.x , this.x, this.width)
        //  exit()
        var angle = Math.atan2((ball.x - (this.x + this.width / 2)) / this.width * 4, 1);
        var zAngle = Math.atan2((ball.y - (this.y + this.height / 2)) / this.height * 4, 1);
        var pow = 60 - 5 * Math.sqrt(Math.abs(this.x + this.width / 2 - ball.x), Math.abs(this.y + this.height / 2 - ball.x));
        // console.log(ball.y , this.y, this.height)
        //  exit()
        //   console.log(zAngle* 180/ Math.PI)
        //   exit();
        console.log(pow);
        return [angle * 180 / Math.PI, zAngle * 180 / Math.PI, pow];
      }
      return false;
    }
  }, {
    key: "move",
    value: function move() {
      return true;
    }
  }, {
    key: "clear",
    value: function clear(graphic) {
      graphic.clear();
    }
  }, {
    key: "draw",
    value: function draw(graphic) {
      // this.clear(graphic);
      graphic.lineStyle(2, 0xFF0000);
      graphic.drawRect(this.x, this.y, this.width, this.height);
    }
  }]);

  return Bat;
})();

exports["default"] = Bat;
module.exports = exports["default"];

},{"./config.es6":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var WIDTH = 320;
exports.WIDTH = WIDTH;
var HEIGHT = 480;
exports.HEIGHT = HEIGHT;
var STATES = {
  OPENING: 0,
  START: 1,
  THROW: 2,
  HIT: 3,
  BOUND: 4
};
exports.STATES = STATES;

},{}],4:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _configEs6 = require("./config.es6");

var config = _interopRequireWildcard(_configEs6);

require("./sound.es6");

var _ballEs6 = require("./ball.es6");

var _ballEs62 = _interopRequireDefault(_ballEs6);

var _batEs6 = require("./bat.es6");

var _batEs62 = _interopRequireDefault(_batEs6);

var _stage_homeEs6 = require("./stage_home.es6");

var _stage_homeEs62 = _interopRequireDefault(_stage_homeEs6);

var _stage_groundEs6 = require("./stage_ground.es6");

var _stage_groundEs62 = _interopRequireDefault(_stage_groundEs6);

var current_state = config.STATES["OPENING"];

var renderer = PIXI.autoDetectRenderer(config.WIDTH, config.HEIGHT, { antialias: true });
renderer.view.style.width = config.WIDTH + "px";
renderer.view.style.height = config.HEIGHT + "px";
renderer.view.style.display = "block";
document.body.appendChild(renderer.view);

var stages = {};
stages["home"] = new _stage_homeEs62["default"]();
stages["ground"] = new _stage_groundEs62["default"]();
// var stage = new PIXI.Container()
var ground = new PIXI.Container();
var opening = new PIXI.Container();
var current_stage = "opening";

var title = new PIXI.Sprite(PIXI.Texture.fromImage("image/title.png"));
title.width = 300;
title.height = 132;
title.position.x = config.WIDTH / 2 - 150;
title.position.y = 100;
opening.addChild(title);
var style = {
  font: 'bold italic 30px Arial',
  fill: '#FFFFFF',
  wordWrap: true,
  wordWrapWidth: 440
};

var richText = new PIXI.Text('TOUCH START !!', style);
richText.x = 0;
richText.y = 300;

opening.addChild(richText);
function opening_anime() {
  renderer.render(opening);
  requestAnimationFrame(opening_anime);
}
requestAnimationFrame(opening_anime);
//stage.interactive = true

//var thing = new PIXI.Graphics()
//stage.addChild(thing)

// stage.on('click', onClick)
// stage.on('tap', onClick)
// setTimeout(function () {
//   throwBall()
// }, 1000);

var items = {};
var self = undefined;
function onClick() {
  // return
  if (current_state == config.STATES["OPENING"]) {
    current_state = config.STATES["START"];
    current_stage = "home";
    requestAnimationFrame(animate);
    createjs.Sound.play("bgm", { loop: -1 });
    setTimeout(function () {
      throwBall();
    }, 2000);
  } else if (current_state == config.STATES["THROW"]) {
    stages["home"].swing(function () {
      current_state = config.STATES["HIT"];

      var ball = stages["home"].items["ball"];
      console.log(ball);
      stages["ground"].addChild("ball", new _ballEs62["default"]({
        x: config.WIDTH / 2,
        y: 400,
        angle: ball.angle,
        speed: ball.speed,
        vx: ball.vx,
        vy: ball.vy,
        vz: ball.vz,
        onHomerun: function onHomerun() {
          createjs.Sound.play("homerun");
          stages["ground"].homerun_image.visible = true;
          console.log("homerun");
          setTimeout(function () {
            delete stages["ground"].initialize();
            stages["ground"].homerun_image.visible = false;
            current_state = config.STATES["START"];
            current_stage = "home";
            setTimeout(function () {
              throwBall();
            }, 1000);
          }, 2000);
        },
        onFoul: function onFoul() {
          createjs.Sound.play("foul");
          stages["ground"].faul_image.visible = true;
          console.log("foul");
          setTimeout(function () {
            delete stages["ground"].initialize();
            stages["ground"].faul_image.visible = false;
            current_state = config.STATES["START"];
            current_stage = "home";
            setTimeout(function () {
              throwBall();
            }, 1000);
          }, 1000);
        },
        onSpeedZero: function onSpeedZero() {
          console.log("speed zero");
          delete stages["ground"].initialize();
          current_state = config.STATES["START"];
          current_stage = "home";
          setTimeout(throwBall, 1000);
        }
      }));

      setTimeout(function () {
        current_stage = "ground";
      }, 0);
      createjs.Sound.play("hit");
    });
  }
}
function throwBall() {
  if (current_state != config.STATES["START"]) {
    return true;
  }
  console.log("throw");
  var ball = new _ballEs62["default"]({ x: config.WIDTH / 2 - 20, y: 100, angle: Math / 2, speed: 6 });

  stages["home"].pitch(ball);
  current_state = config.STATES["THROW"];
}
document.addEventListener("mousedown", onClick);
document.addEventListener("touchstart", onClick);
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
var vx = 0;
var vy = 0;
function keyup(event) {
  if (event.keyCode == 37) {
    vx = 0;
  }
  if (event.keyCode == 38) {
    vy = 0;
  }
  if (event.keyCode == 39) {
    vx = 0;
  }
  if (event.keyCode == 40) {
    vy = 0;
  }
}
function keydown(event) {
  var v = 1;
  if (event.keyCode == 13 || event.keyCode == 32) {
    return onClick();
  }
  if (event.keyCode == 37) {
    vx = -v;
  }
  if (event.keyCode == 38) {
    vy = -v;
  }
  if (event.keyCode == 39) {
    vx = v;
  }
  if (event.keyCode == 40) {
    vy = v;
  }
}
function move() {
  if (!stages["home"].batter_movie) {
    return false;
  }
  stages["home"].batter_movie.position.x += vx;
  stages["home"].batter_movie.position.y += vy;
  stages["home"].items["bat"].x += vx;
  stages["home"].items["bat"].y += vy;
}
// run the render loop
stages["home"].addChild("bat", new _batEs62["default"]());
var meter = new FPSMeter();
var graphics = new PIXI.Graphics();
// stage.addChild(graphics)

function animate() {
  if (current_state == config.STATES["THROW"]) {
    if (stages["home"].items["ball"]) {
      // console.log(stages["home"].items["ball"].y)
      if (stages["home"].items["ball"].y >= config.HEIGHT + 50) {
        delete stages["home"].items["ball"];
        createjs.Sound.play("strike");
        setTimeout(function () {
          console.log("reset");
          current_state = config.STATES["START"];
          throwBall();
        }, 1000);
      }
    }
  }
  move();
  stages[current_stage].animate();
  renderer.render(stages[current_stage].stage);
  meter.tick();
  requestAnimationFrame(animate);
}
// requestAnimationFrame( animate )

},{"./ball.es6":1,"./bat.es6":2,"./config.es6":3,"./sound.es6":5,"./stage_ground.es6":6,"./stage_home.es6":7}],5:[function(require,module,exports){
// createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin]);
"use strict";

var queue = new createjs.LoadQueue(false);
queue.installPlugin(createjs.Sound);
var loadSoundComplete = function loadSoundComplete() {
  // createjs.Sound.play("bgm",{loop:-1})
  // alert(1)
};
queue.addEventListener("complete", loadSoundComplete);
var manifest = [{ src: "/sound/bgm.ogg", id: "bgm" }, { src: "/sound/foul.mp3", id: "foul" }, { src: "/sound/homerun.mp3", id: "homerun" }, { src: "/sound/nyu3.mp3", id: "ball" }, { src: "/sound/strike1.mp3", id: "hit" }, { src: "/sound/hitting.mp3", id: "strike" }, { src: "/sound/swing.mp3", id: "swing" }];
queue.loadManifest(manifest);

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _configEs6 = require("./config.es6");

var config = _interopRequireWildcard(_configEs6);

var StageGround = (function () {
  function StageGround() {
    _classCallCheck(this, StageGround);

    this.items = [];
    this.stage = new PIXI.Container();

    var texture = PIXI.Texture.fromImage("image/background_ground.png");
    // create a new Sprite using the texture
    this.ground_image = new PIXI.Sprite(texture);
    this.initialize();

    this.stage.addChild(this.ground_image);
    this.graphics = new PIXI.Graphics();
    this.stage.addChild(this.graphics);

    this.faul_image = new PIXI.Sprite(PIXI.Texture.fromImage("image/faul.png"));
    this.faul_image.position.x = config.WIDTH / 2 - 100;
    this.faul_image.position.y = config.HEIGHT / 2 - 20;
    this.faul_image.visible = false;
    this.stage.addChild(this.faul_image);

    this.homerun_image = new PIXI.Sprite(PIXI.Texture.fromImage("image/homerun.png"));
    this.homerun_image.position.x = config.WIDTH / 2 - 100;
    this.homerun_image.position.y = config.HEIGHT / 2 - 20;
    this.homerun_image.visible = false;
    this.stage.addChild(this.homerun_image);
  }

  _createClass(StageGround, [{
    key: "initialize",
    value: function initialize() {
      console.log("map init");

      // move the sprite t the center of the screen
      this.ground_image.position.x = 0;
      this.ground_image.position.y = 0;
      this.camera = [-365, -270];
      this.measure = 0;
    }
  }, {
    key: "addChild",
    value: function addChild(key, obj) {
      this.items[key] = obj;
    }
  }, {
    key: "animate",
    value: function animate() {
      this.graphics.clear();
      var ball = this.items["ball"];
      var scale = 0.1;
      ball.move_ground(scale);
      var x = ball.x;
      var y = ball.y;
      this.measure += Math.sqrt(ball.x * ball.x + ball.y * ball.y);
      // console.log(this.measure)
      // console.log(ball.y)
      // var stopX=false;
      // var stopY=false;
      if (this.ground_image.position.x > -700 && this.ground_image.position.x < 0) {
        this.camera[0] -= ball.vx;
      }
      // console.log(this.ground_image.position.y)
      if (this.ground_image.position.y < 0) {
        this.camera[1] -= ball.vy;
      }
      this.ground_image.position.x = this.camera[0];
      this.ground_image.position.y = this.camera[1];

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

      if (this.items["ball"]) this.items["ball"].draw_ground(this.graphics, x, y, ball.radius);
    }
  }]);

  return StageGround;
})();

exports["default"] = StageGround;
module.exports = exports["default"];

},{"./config.es6":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var StageHome = (function () {
  function StageHome() {
    _classCallCheck(this, StageHome);

    this.items = [];
    this.stage = new PIXI.Container();
    this.graphics = new PIXI.Graphics();
    this.stage.addChild(this.graphics);
    this.bg = new PIXI.Sprite(PIXI.Texture.fromImage("image/background_home.png"));
    this.bg.position.x = 0;
    this.bg.position.y = 0;
    this.stage.addChildAt(this.bg, 0);

    var self = this;
    PIXI.loader.add('subaru', '/image/spritesheet.json').add('pitcher', '/image/pitcher.json').load(function () {
      var pitcher_textures = [];
      for (var i = 0; i < 5; i++) {
        var pitcher_texture = PIXI.Texture.fromFrame('picher_0' + (i + 1) + '.png');
        pitcher_textures.push(pitcher_texture);
      }
      self.pitcher_movie = new PIXI.extras.MovieClip(pitcher_textures);
      self.pitcher_movie.position.x = 110;
      self.pitcher_movie.position.y = 70;
      self.pitcher_movie.width = 100;
      self.pitcher_movie.height = 100;
      self.pitcher_movie.animationSpeed = 0.05;
      self.pitcher_movie.loop = false;
      self.pitcher_movie.gotoAndPlay(0);

      var textures = [];
      for (var i = 0; i < 5; i++) {
        var texture = PIXI.Texture.fromFrame('bat_0' + (i + 1) + '.png');
        textures.push(texture);
      }
      self.batter_movie = new PIXI.extras.MovieClip(textures);

      self.batter_movie.position.x = 150;
      self.batter_movie.position.y = 200;
      self.batter_movie.width = 200;
      self.batter_movie.height = 200;
      self.batter_movie.loop = false;
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

  _createClass(StageHome, [{
    key: 'addChild',
    value: function addChild(key, obj) {
      this.items[key] = obj;
    }
  }, {
    key: 'ball',
    value: function ball() {
      return this.items["ball"];
    }
  }, {
    key: 'bat',
    value: function bat() {
      return this.items["bat"];
    }
  }, {
    key: 'pitch',
    value: function pitch(ball) {
      console.log("pitch");
      this.pitched = false;
      var self = this;
      this.pitcher_movie.gotoAndPlay(0);
      this.onPitch = function () {
        createjs.Sound.play("ball");
        self.addChild("ball", ball);
      };
    }
  }, {
    key: 'swing',
    value: function swing(success) {
      createjs.Sound.play("swing");
      console.log("swing");
      this.success = success;
      this.hited = false;
      this.batter_movie.gotoAndPlay(0);
    }
  }, {
    key: 'animate_batter',
    value: function animate_batter() {
      if (this.hited == false && this.batter_movie.currentFrame == 3) {
        var hit = this.bat().hitCheck(this.ball());
        if (hit != false) {
          console.log("hit");
          this.hited = true;
          this.ball().hit(hit[0], hit[1], hit[2]);
          this.success();
        }
      }
    }
  }, {
    key: 'animate_pitcher',
    value: function animate_pitcher() {
      if (this.pitched) return false;
      if (this.pitcher_movie.currentFrame == 3) {
        this.pitched = true;
        this.onPitch();
      }
    }
  }, {
    key: 'animate',
    value: function animate() {
      this.graphics.clear();
      if (this.batter_movie) {
        this.animate_batter();
      }
      if (this.pitcher_movie) {
        this.animate_pitcher();
      }

      for (var i in this.items) {
        if (this.items[i].move()) {
          this.items[i].draw(this.graphics);
        } else {
          this.items[i].clear(this.graphics);
          delete this.items[i];
        }
      }
    }
  }]);

  return StageHome;
})();

exports['default'] = StageHome;
module.exports = exports['default'];

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9iYWxsLmVzNiIsIi9Vc2Vycy9ob3NzeS9wcm9qZWN0L3N1YmFydV9jaGFsbGVuZ2UvZXM2L2JhdC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9jb25maWcuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvZ2FtZS5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zb3VuZC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zdGFnZV9ncm91bmQuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvc3RhZ2VfaG9tZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7eUJDQXdCLGNBQWM7O0lBQTFCLE1BQU07O0lBRUcsSUFBSTtBQUNaLFdBRFEsSUFBSSxDQUNYLFFBQVEsRUFBQzswQkFERixJQUFJOztBQUVyQixRQUFJLENBQUMsUUFBUSxHQUFDLFFBQVEsQ0FBQTtBQUN0QixRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDbkI7O2VBSmtCLElBQUk7O1dBTWIsc0JBQUU7QUFDVixVQUFJLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFBO0FBQzdCLFVBQUksQ0FBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDN0IsVUFBSSxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUE7QUFDVCxVQUFJLENBQUMsRUFBRSxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUUsQ0FBQyxDQUFBO0FBQy9CLFVBQUksQ0FBQyxFQUFFLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDL0IsVUFBSSxDQUFDLEVBQUUsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFFLENBQUMsQ0FBQTtBQUMvQixVQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUUsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUE7QUFDOUMsVUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFFLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFBO0FBQ2hELFVBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDdEMsVUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFFLENBQUMsQ0FBQTtBQUN4QyxVQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQTtBQUNkLFVBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFDcEIsVUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFlBQVUsRUFBRSxDQUFBO0FBQy9ELFVBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxZQUFVLEVBQUUsQ0FBQTtBQUNyRCxVQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksWUFBVSxFQUFFLENBQUE7QUFDM0QsVUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLFlBQVUsRUFBRSxDQUFBO0FBQ2pFLFVBQUksQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFBO0FBQ2pCLFVBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFBO0FBQ3BCLFVBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO0tBQ2xCOzs7V0FFRSxhQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDOzs7OztBQUtuQixVQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsS0FBSyxHQUFFLEdBQUcsR0FBQyxFQUFFLENBQUEsR0FBRSxJQUFJLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQTtBQUN0QyxVQUFJLENBQUMsS0FBSyxHQUFFLEdBQUcsQ0FBQTs7Ozs7QUFLZixVQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQSxHQUFFLElBQUksQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFBOztBQUVuQyxVQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7O0FBRTVDLFVBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7O0tBRW5COzs7V0FFRyxnQkFBRTtBQUNKLFVBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtBQUMzQyxVQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFDM0MsVUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFBO0FBQ2pCLFVBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQTtBQUNqQixVQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFBOzs7Ozs7QUFNdkIsYUFBTyxJQUFJLENBQUE7S0FDWjs7O1dBRVUscUJBQUMsS0FBSyxFQUFDO0FBQ2hCLFVBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUE7QUFDakQsVUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFDLEtBQUssQ0FBQTtBQUNqRCxVQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQTtBQUNmLFVBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQTtBQUNqQixVQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUE7QUFDakIsVUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFBOztBQUVqQixVQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxFQUFFLENBQUE7QUFDeEIsVUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsRUFBRSxDQUFBO0FBQ3hCLFVBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEFBQUMsQ0FBQyxDQUFBOztBQUUvRixVQUFHLElBQUksQ0FBQyxDQUFDLElBQUUsQ0FBQyxFQUFDO0FBQ1gsWUFBSSxDQUFDLFVBQVUsQ0FBQTtBQUNmLFlBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO0FBQ1IsWUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0FBQ2pCLFlBQUksQ0FBQyxLQUFLLElBQUUsR0FBRyxDQUFBO0FBQ2YsWUFBSSxDQUFDLEVBQUUsSUFBRSxDQUFDLEdBQUcsQ0FBQTs7T0FFZDs7QUFFRCxVQUFHLElBQUksQ0FBQyxDQUFDLEdBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxFQUFDO0FBQ3RELFlBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxDQUFBOzs7O0FBSWhCLFlBQUksQ0FBQyxLQUFLLElBQUUsQ0FBQyxDQUFDLENBQUE7QUFDZCxZQUFJLENBQUMsRUFBRSxJQUFFLENBQUMsQ0FBQyxDQUFBO09BQ1o7O0FBRUQsVUFBSSxHQUFHLEdBQUMsRUFBRSxDQUFBO0FBQ1YsVUFBRyxJQUFJLENBQUMsQ0FBQyxHQUFDLEdBQUcsR0FBQyxDQUFDLEVBQUM7QUFBQyxZQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtPQUFDLE1BQzVCLElBQUcsSUFBSSxDQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsRUFBRSxFQUFDO0FBQUMsWUFBSSxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUE7T0FBQyxNQUNsQztBQUFDLFlBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUE7T0FBQzs7Ozs7O0FBTTVCLFVBQUcsSUFBSSxDQUFDLE1BQU0sSUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUM7QUFDeEMsWUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7QUFDaEIsWUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUE7QUFDWixZQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7T0FDbkI7QUFDRCxVQUFHLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDOztBQUVWLFlBQUksTUFBTSxHQUFFLElBQUksQ0FBQyxLQUFLLElBQUUsR0FBRyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUEsQUFBQyxDQUFBOzs7QUFHcEMsWUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUM7QUFDbEMsY0FBRyxJQUFJLENBQUMsTUFBTSxJQUFFLEtBQUssRUFBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDbkMsY0FBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7Ozs7U0FJakIsTUFBTSxJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBQztBQUN6QyxnQkFBRyxJQUFJLENBQUMsTUFBTSxJQUFFLEtBQUssRUFBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDbkMsZ0JBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBOzs7O1dBSWpCLE1BQUssSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxFQUFDO0FBQzNDLGtCQUFHLElBQUksQ0FBQyxNQUFNLElBQUUsS0FBSyxFQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtBQUN0QyxrQkFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7Ozs7YUFJakI7T0FFRjs7QUFFRCxhQUFPLElBQUksQ0FBQTtLQUNaOzs7V0FFSSxlQUFDLE9BQU8sRUFBQztBQUNaLGFBQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtLQUNoQjs7O1dBQ0csY0FBQyxPQUFPLEVBQUM7O0FBRVgsYUFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNwQixhQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzNCLGFBQU8sQ0FBQyxVQUFVLENBQ2hCLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsTUFBTSxDQUNaLENBQUE7QUFDRCxhQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7S0FDbEI7OztXQUVVLHFCQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQzs7O0FBRzdCLGFBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDcEIsYUFBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUMzQixhQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxDQUFFLENBQUE7QUFDL0IsYUFBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0tBQ2xCOzs7U0E3SmtCLElBQUk7OztxQkFBSixJQUFJOzs7Ozs7Ozs7Ozs7Ozs7O3lCQ0ZELGNBQWM7O0lBQTFCLE1BQU07O0lBRUcsR0FBRztBQUNYLFdBRFEsR0FBRyxHQUNUOzBCQURNLEdBQUc7O0FBRXBCLFFBQUksQ0FBQyxRQUFRLEdBQUM7QUFDWixPQUFDLEVBQUUsRUFBRTtBQUNMLE9BQUMsRUFBRSxHQUFHO0FBQ04sV0FBSyxFQUFFLEdBQUc7QUFDVixZQUFNLEVBQUUsRUFBRTtLQUNYLENBQUE7QUFDRCxRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDbkI7O2VBVGtCLEdBQUc7O1dBV1osc0JBQUU7QUFDVixVQUFJLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDMUIsVUFBSSxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzFCLFVBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUNuQyxVQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDdEM7OztXQUVPLGtCQUFDLElBQUksRUFBQztBQUNaLFVBQUcsQ0FBQyxJQUFJLEVBQUMsT0FBTyxLQUFLLENBQUM7QUFDdEIsVUFDRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQ2YsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQzFCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFDaEM7OztBQUdDLFlBQUksS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQ2xCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBLENBQUMsR0FBSSxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsRUFDNUMsQ0FBQyxDQUNGLENBQUE7QUFDRCxZQUFJLE1BQU0sR0FBQyxJQUFJLENBQUMsS0FBSyxDQUNuQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQSxDQUFDLEdBQUksSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQzlDLENBQUMsQ0FDRixDQUFBO0FBQ0gsWUFBSSxHQUFHLEdBQUUsRUFBRSxHQUFHLENBQUMsR0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEFBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTs7Ozs7QUFLM0csZUFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNoQixlQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRSxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRSxHQUFHLEdBQUUsSUFBSSxDQUFDLEVBQUUsRUFBQyxHQUFHLENBQUMsQ0FBQTtPQUN4RDtBQUNELGFBQU8sS0FBSyxDQUFBO0tBQ2I7OztXQUNHLGdCQUFFO0FBQ0osYUFBTyxJQUFJLENBQUM7S0FDYjs7O1dBRUksZUFBQyxPQUFPLEVBQUM7QUFDWixhQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7S0FDaEI7OztXQUNHLGNBQUMsT0FBTyxFQUFDOztBQUVYLGFBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLGFBQU8sQ0FBQyxRQUFRLENBQ2QsSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxLQUFLLEVBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FDVixDQUFBO0tBQ0o7OztTQTlEa0IsR0FBRzs7O3FCQUFILEdBQUc7Ozs7Ozs7OztBQ0ZqQixJQUFNLEtBQUssR0FBQyxHQUFHLENBQUE7O0FBQ2YsSUFBTSxNQUFNLEdBQUMsR0FBRyxDQUFBOztBQUNoQixJQUFNLE1BQU0sR0FBQztBQUNsQixTQUFPLEVBQUMsQ0FBQztBQUNULE9BQUssRUFBRSxDQUFDO0FBQ1IsT0FBSyxFQUFFLENBQUM7QUFDUixLQUFHLEVBQUUsQ0FBQztBQUNOLE9BQUssRUFBRSxDQUFDO0NBQ1QsQ0FBQTs7Ozs7Ozs7Ozt5QkNSdUIsY0FBYzs7SUFBMUIsTUFBTTs7UUFDWCxhQUFhOzt1QkFDSCxZQUFZOzs7O3NCQUNiLFdBQVc7Ozs7NkJBQ1Ysa0JBQWtCOzs7OytCQUNoQixvQkFBb0I7Ozs7QUFFdkMsSUFBSSxhQUFhLEdBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTs7QUFFMUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hGLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtBQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7QUFDakQsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtBQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7O0FBRXhDLElBQUksTUFBTSxHQUFDLEVBQUUsQ0FBQTtBQUNiLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxnQ0FBVSxDQUFBO0FBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxrQ0FBWSxDQUFBOztBQUUvQixJQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtBQUNqQyxJQUFJLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtBQUNsQyxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUE7O0FBSXpCLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7QUFDdkUsS0FBSyxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUE7QUFDZixLQUFLLENBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQTtBQUNoQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBQyxHQUFHLENBQUE7QUFDbkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFBO0FBQ3BCLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEIsSUFBSSxLQUFLLEdBQUc7QUFDVixNQUFJLEVBQUcsd0JBQXdCO0FBQy9CLE1BQUksRUFBRyxTQUFTO0FBQ2hCLFVBQVEsRUFBRyxJQUFJO0FBQ2YsZUFBYSxFQUFHLEdBQUc7Q0FDdEIsQ0FBQzs7QUFFRixJQUFJLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFDckQsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDZixRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQzs7QUFFakIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3QixTQUFTLGFBQWEsR0FBRTtBQUNwQixVQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3hCLHVCQUFxQixDQUFFLGFBQWEsQ0FBRSxDQUFBO0NBQ3pDO0FBQ0EscUJBQXFCLENBQUUsYUFBYSxDQUFFLENBQUE7Ozs7Ozs7Ozs7OztBQVl2QyxJQUFJLEtBQUssR0FBQyxFQUFFLENBQUE7QUFDWixJQUFJLElBQUksWUFBSyxDQUFBO0FBQ2IsU0FBUyxPQUFPLEdBQUU7O0FBRWhCLE1BQUcsYUFBYSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUM7QUFDM0MsaUJBQWEsR0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3BDLGlCQUFhLEdBQUMsTUFBTSxDQUFBO0FBQ3BCLHlCQUFxQixDQUFFLE9BQU8sQ0FBRSxDQUFBO0FBQ2hDLFlBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7QUFDekMsY0FBVSxDQUFDLFlBQVk7QUFBRSxlQUFTLEVBQUUsQ0FBQTtLQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FFM0MsTUFBTSxJQUFHLGFBQWEsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFDO0FBQ2hELFVBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBVTtBQUM3QixtQkFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7O0FBRXBDLFVBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDdkMsYUFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNqQixZQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRyx5QkFBUztBQUMxQyxTQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDO0FBQ25CLFNBQUMsRUFBRSxHQUFHO0FBQ04sYUFBSyxFQUFFLElBQUksQ0FBQyxLQUFLO0FBQ2pCLGFBQUssRUFBRSxJQUFJLENBQUMsS0FBSztBQUNqQixVQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7QUFDWCxVQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7QUFDWCxVQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7QUFDWCxpQkFBUyxFQUFDLHFCQUFVO0FBQ2hCLGtCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUM5QixnQkFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFBO0FBQzNDLGlCQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQ3RCLG9CQUFVLENBQUMsWUFBVTtBQUNuQixtQkFBTyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUE7QUFDcEMsa0JBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQTtBQUM1Qyx5QkFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDdEMseUJBQWEsR0FBRyxNQUFNLENBQUE7QUFDdEIsc0JBQVUsQ0FBQyxZQUFVO0FBQ25CLHVCQUFTLEVBQUUsQ0FBQTthQUNaLEVBQUMsSUFBSSxDQUFDLENBQUE7V0FDUixFQUFDLElBQUksQ0FBQyxDQUFBO1NBQ1Y7QUFDRCxjQUFNLEVBQUMsa0JBQVU7QUFDYixrQkFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDM0IsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQTtBQUN4QyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNuQixvQkFBVSxDQUFDLFlBQVU7QUFDbkIsbUJBQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFBO0FBQ3BDLGtCQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUE7QUFDekMseUJBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3RDLHlCQUFhLEdBQUcsTUFBTSxDQUFBO0FBQ3RCLHNCQUFVLENBQUMsWUFBVTtBQUNuQix1QkFBUyxFQUFFLENBQUE7YUFDWixFQUFDLElBQUksQ0FBQyxDQUFBO1dBQ1IsRUFBQyxJQUFJLENBQUMsQ0FBQTtTQUNSO0FBQ0QsbUJBQVcsRUFBQyx1QkFBVTtBQUNwQixpQkFBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUN6QixpQkFBTyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUE7QUFDcEMsdUJBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3RDLHVCQUFhLEdBQUcsTUFBTSxDQUFBO0FBQ3RCLG9CQUFVLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxDQUFBO1NBQzNCO09BQ0YsQ0FBQyxDQUFDLENBQUE7O0FBRUgsZ0JBQVUsQ0FBQyxZQUFVO0FBQ25CLHFCQUFhLEdBQUMsUUFBUSxDQUFBO09BQ3ZCLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFDSixjQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUMzQixDQUFDLENBQUE7R0FHSDtDQUNGO0FBQ0QsU0FBUyxTQUFTLEdBQ2xCO0FBQ0UsTUFBRyxhQUFhLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUFDLFdBQU8sSUFBSSxDQUFBO0dBQUM7QUFDekQsU0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUNwQixNQUFJLElBQUksR0FBRSx5QkFBUyxFQUFDLENBQUMsRUFBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUMsSUFBSSxHQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQTs7QUFFdEUsUUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUMxQixlQUFhLEdBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtDQUNyQztBQUNELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUMsT0FBTyxDQUFDLENBQUE7QUFDOUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBQyxPQUFPLENBQUMsQ0FBQTtBQUMvQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzVDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUMsS0FBSyxDQUFDLENBQUE7QUFDeEMsSUFBSSxFQUFFLEdBQUMsQ0FBQyxDQUFBO0FBQ1IsSUFBSSxFQUFFLEdBQUMsQ0FBQyxDQUFBO0FBQ1IsU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFDO0FBQ25CLE1BQUcsS0FBSyxDQUFDLE9BQU8sSUFBRSxFQUFFLEVBQUM7QUFBRSxNQUFFLEdBQUMsQ0FBQyxDQUFBO0dBQUU7QUFDN0IsTUFBRyxLQUFLLENBQUMsT0FBTyxJQUFFLEVBQUUsRUFBQztBQUFFLE1BQUUsR0FBQyxDQUFDLENBQUE7R0FBRTtBQUM3QixNQUFHLEtBQUssQ0FBQyxPQUFPLElBQUUsRUFBRSxFQUFDO0FBQUUsTUFBRSxHQUFDLENBQUMsQ0FBQTtHQUFFO0FBQzdCLE1BQUcsS0FBSyxDQUFDLE9BQU8sSUFBRSxFQUFFLEVBQUM7QUFBRSxNQUFFLEdBQUMsQ0FBQyxDQUFBO0dBQUU7Q0FDOUI7QUFDRCxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUM7QUFDckIsTUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFBO0FBQ1AsTUFBRyxLQUFLLENBQUMsT0FBTyxJQUFFLEVBQUUsSUFBRSxLQUFLLENBQUMsT0FBTyxJQUFFLEVBQUUsRUFBQztBQUFFLFdBQU8sT0FBTyxFQUFFLENBQUE7R0FBRTtBQUM1RCxNQUFHLEtBQUssQ0FBQyxPQUFPLElBQUUsRUFBRSxFQUFDO0FBQUUsTUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFBO0dBQUU7QUFDOUIsTUFBRyxLQUFLLENBQUMsT0FBTyxJQUFFLEVBQUUsRUFBQztBQUFFLE1BQUUsR0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFFO0FBQzlCLE1BQUcsS0FBSyxDQUFDLE9BQU8sSUFBRSxFQUFFLEVBQUM7QUFBRSxNQUFFLEdBQUMsQ0FBQyxDQUFBO0dBQUU7QUFDN0IsTUFBRyxLQUFLLENBQUMsT0FBTyxJQUFFLEVBQUUsRUFBQztBQUFFLE1BQUUsR0FBQyxDQUFDLENBQUE7R0FBRTtDQUM5QjtBQUNELFNBQVMsSUFBSSxHQUFFO0FBQ2IsTUFBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUM7QUFBQyxXQUFPLEtBQUssQ0FBQTtHQUFDO0FBQzlDLFFBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUE7QUFDMUMsUUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQTtBQUMxQyxRQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUE7QUFDakMsUUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFBO0NBQ2xDOztBQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFDLHlCQUFTLENBQUMsQ0FBQTtBQUN4QyxJQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBQzNCLElBQUksUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBOzs7QUFJbEMsU0FBUyxPQUFPLEdBQUc7QUFDakIsTUFBRyxhQUFhLElBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBQztBQUN2QyxRQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUM7O0FBRTlCLFVBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBQyxFQUFFLEVBQUM7QUFDcEQsZUFBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ25DLGdCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUM3QixrQkFBVSxDQUFDLFlBQVk7QUFDckIsaUJBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDcEIsdUJBQWEsR0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3BDLG1CQUFTLEVBQUUsQ0FBQTtTQUNaLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDVjtLQUNGO0dBQ0Y7QUFDRCxNQUFJLEVBQUUsQ0FBQTtBQUNOLFFBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUMvQixVQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUM1QyxPQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDYix1QkFBcUIsQ0FBRSxPQUFPLENBQUUsQ0FBQTtDQUNqQzs7Ozs7OztBQ2hNSCxJQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDekMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDbkMsSUFBSSxpQkFBaUIsR0FBQyxTQUFsQixpQkFBaUIsR0FBVzs7O0NBRy9CLENBQUM7QUFDRixLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFDLGlCQUFpQixDQUFDLENBQUE7QUFDcEQsSUFBSSxRQUFRLEdBQUcsQ0FDYixFQUFDLEdBQUcsRUFBQyxnQkFBZ0IsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFDLEVBQ2hDLEVBQUMsR0FBRyxFQUFDLGlCQUFpQixFQUFFLEVBQUUsRUFBQyxNQUFNLEVBQUMsRUFDbEMsRUFBQyxHQUFHLEVBQUMsb0JBQW9CLEVBQUUsRUFBRSxFQUFDLFNBQVMsRUFBQyxFQUN4QyxFQUFDLEdBQUcsRUFBQyxpQkFBaUIsRUFBRSxFQUFFLEVBQUMsTUFBTSxFQUFDLEVBQ2xDLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUMsRUFDcEMsRUFBQyxHQUFHLEVBQUMsb0JBQW9CLEVBQUUsRUFBRSxFQUFDLFFBQVEsRUFBQyxFQUN2QyxFQUFDLEdBQUcsRUFBQyxrQkFBa0IsRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQ3JDLENBQUE7QUFDRCxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7eUJDakJKLGNBQWM7O0lBQTFCLE1BQU07O0lBQ0csV0FBVztBQUNuQixXQURRLFdBQVcsR0FDakI7MEJBRE0sV0FBVzs7QUFFNUIsUUFBSSxDQUFDLEtBQUssR0FBQyxFQUFFLENBQUE7QUFDYixRQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBOztBQUVqQyxRQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDOztBQUVwRSxRQUFJLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QyxRQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7O0FBRWpCLFFBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QyxRQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQ25DLFFBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTs7QUFFbEMsUUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0FBQzVFLFFBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBQyxHQUFHLENBQUE7QUFDN0MsUUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQTtBQUM3QyxRQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUE7QUFDN0IsUUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUVyQyxRQUFJLENBQUMsYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7QUFDbEYsUUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQTtBQUNoRCxRQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFBO0FBQ2hELFFBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQTtBQUNoQyxRQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDM0M7O2VBekJvQixXQUFXOztXQTBCdEIsc0JBQUU7QUFDVixhQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBOzs7QUFHdkIsVUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQyxVQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLFVBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3ZCLFVBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFBO0tBQ2Y7OztXQUVPLGtCQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUM7QUFDZixVQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFDLEdBQUcsQ0FBQTtLQUNwQjs7O1dBRU0sbUJBQUU7QUFDUCxVQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFBO0FBQ3JCLFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDN0IsVUFBSSxLQUFLLEdBQUMsR0FBRyxDQUFBO0FBQ2IsVUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN2QixVQUFJLENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQ2IsVUFBSSxDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUNiLFVBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7Ozs7O0FBSzVELFVBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUM7QUFDekUsWUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsRUFBRSxDQUFBO09BQ3hCOztBQUVELFVBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQztBQUNoQyxZQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxFQUFFLENBQUE7T0FDeEI7QUFDRCxVQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUM3QyxVQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CN0MsVUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUNuRCxJQUFJLENBQUMsUUFBUSxFQUNiLENBQUMsRUFDRCxDQUFDLEVBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ2I7OztTQXBGa0IsV0FBVzs7O3FCQUFYLFdBQVc7Ozs7Ozs7Ozs7Ozs7O0lDRFgsU0FBUztBQUNqQixXQURRLFNBQVMsR0FDZjswQkFETSxTQUFTOztBQUUxQixRQUFJLENBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQTtBQUNiLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7QUFDakMsUUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUNuQyxRQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDbEMsUUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO0FBQy9FLFFBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkIsUUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QixRQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVqQyxRQUFJLElBQUksR0FBQyxJQUFJLENBQUE7QUFDYixRQUFJLENBQUMsTUFBTSxDQUNOLEdBQUcsQ0FBQyxRQUFRLEVBQUUseUJBQXlCLENBQUMsQ0FDeEMsR0FBRyxDQUFDLFNBQVMsRUFBRSxxQkFBcUIsQ0FBQyxDQUNyQyxJQUFJLENBQUMsWUFBVTtBQUNkLFVBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFBO0FBQ3pCLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQzFCO0FBQ0UsWUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBQzFFLHdCQUFnQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztPQUN4QztBQUNELFVBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2pFLFVBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUE7QUFDakMsVUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQTtBQUNoQyxVQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUE7QUFDNUIsVUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUMsR0FBRyxDQUFBO0FBQzdCLFVBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztBQUN6QyxVQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7QUFDaEMsVUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRWxDLFVBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQTtBQUNqQixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUMxQjtBQUNFLFlBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztBQUMvRCxnQkFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztPQUN4QjtBQUNELFVBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFeEQsVUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQTtBQUNoQyxVQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFBO0FBQ2hDLFVBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFDLEdBQUcsQ0FBQTtBQUMzQixVQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBQyxHQUFHLENBQUE7QUFDNUIsVUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUMsS0FBSyxDQUFBOzs7Ozs7O0FBTzVCLFVBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQzs7QUFFdkMsVUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsVUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZDLFVBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUN6QyxDQUFDLENBQUM7R0FHSjs7ZUExRGMsU0FBUzs7V0E0RGhCLGtCQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUM7QUFDZixVQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFDLEdBQUcsQ0FBQTtLQUNwQjs7O1dBRUcsZ0JBQUU7QUFDSixhQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDMUI7OztXQUNFLGVBQUU7QUFDSCxhQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDekI7OztXQUNJLGVBQUMsSUFBSSxFQUFDO0FBQ1QsYUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUNwQixVQUFJLENBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQTtBQUNsQixVQUFJLElBQUksR0FBQyxJQUFJLENBQUE7QUFDYixVQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxVQUFJLENBQUMsT0FBTyxHQUFDLFlBQVU7QUFDckIsZ0JBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzNCLFlBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFBO09BQzNCLENBQUE7S0FDRjs7O1dBRUksZUFBQyxPQUFPLEVBQUM7QUFDVixjQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUM5QixhQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3BCLFVBQUksQ0FBQyxPQUFPLEdBQUMsT0FBTyxDQUFBO0FBQ3BCLFVBQUksQ0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFBO0FBQ2hCLFVBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ2pDOzs7V0FFYSwwQkFBRTtBQUNkLFVBQUcsSUFBSSxDQUFDLEtBQUssSUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLElBQUUsQ0FBQyxFQUFDO0FBQ3hELFlBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFDeEMsWUFBRyxHQUFHLElBQUksS0FBSyxFQUFDO0FBQ2QsaUJBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDbEIsY0FBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUE7QUFDZixjQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDckMsY0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ2Y7T0FDRjtLQUNGOzs7V0FFYywyQkFBRTtBQUNmLFVBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQyxPQUFPLEtBQUssQ0FBQTtBQUM1QixVQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxJQUFFLENBQUMsRUFBQztBQUNwQyxZQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQTtBQUNqQixZQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7T0FDZjtLQUVGOzs7V0FFTSxtQkFBRTtBQUNQLFVBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUE7QUFDckIsVUFBRyxJQUFJLENBQUMsWUFBWSxFQUFDO0FBQUMsWUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO09BQUU7QUFDN0MsVUFBRyxJQUFJLENBQUMsYUFBYSxFQUFDO0FBQUMsWUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO09BQUU7O0FBRS9DLFdBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBQztBQUN0QixZQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUM7QUFDdEIsY0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25DLE1BQUk7QUFDSCxjQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDbEMsaUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNyQjtPQUNGO0tBQ0Y7OztTQTNIYyxTQUFTOzs7cUJBQVQsU0FBUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGx7XG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRzKXtcbiAgICB0aGlzLmRlZmF1bHRzPWRlZmF1bHRzXG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICBpbml0aWFsaXplKCl7XG4gICAgdGhpcy54ID10aGlzLmRlZmF1bHRzW1wieFwiXXx8MFxuICAgIHRoaXMueSA9dGhpcy5kZWZhdWx0c1tcInlcIl18fDBcbiAgICB0aGlzLnogPTVcbiAgICB0aGlzLnZ4ID10aGlzLmRlZmF1bHRzW1widnhcIl18fDBcbiAgICB0aGlzLnZ5ID10aGlzLmRlZmF1bHRzW1widnlcIl18fDBcbiAgICB0aGlzLnZ6ID10aGlzLmRlZmF1bHRzW1widnpcIl18fDBcbiAgICB0aGlzLmFuZ2xlID0gdGhpcy5kZWZhdWx0c1tcImFuZ2xlXCJdfHxNYXRoLlBJLzJcbiAgICB0aGlzLnpBbmdsZSA9IHRoaXMuZGVmYXVsdHNbXCJ6QW5nbGVcIl18fE1hdGguUEkvMlxuICAgIHRoaXMuc3BlZWQgPSB0aGlzLmRlZmF1bHRzW1wic3BlZWRcIl18fDBcbiAgICB0aGlzLnJhZGl1cyA9IHRoaXMuZGVmYXVsdHNbXCJyYWRpdXNcIl18fDBcbiAgICB0aGlzLm1lYXN1cmUgPSAwXG4gICAgICB0aGlzLmhvbWVCb3g9WzAsMF1cbiAgICB0aGlzLm9uU3BlZWRaZXJvID0gdGhpcy5kZWZhdWx0c1tcIm9uU3BlZWRaZXJvXCJdIHx8IGZ1bmN0aW9uKCl7fVxuICAgIHRoaXMub25Gb3VsID0gdGhpcy5kZWZhdWx0c1tcIm9uRm91bFwiXSB8fCBmdW5jdGlvbigpe31cbiAgICB0aGlzLm9uSG9tZXJ1biA9IHRoaXMuZGVmYXVsdHNbXCJvbkhvbWVydW5cIl0gfHwgZnVuY3Rpb24oKXt9XG4gICAgdGhpcy5vbkZpcnN0Qm91bmQgPSB0aGlzLmRlZmF1bHRzW1wib25GaXJzdEJvdW5kXCJdIHx8IGZ1bmN0aW9uKCl7fVxuICAgIHRoaXMuYm91bnRDb3VudD0wXG4gICAgdGhpcy5maXJzdEJvdW5kPXRydWVcbiAgICB0aGlzLnN0b3BlZD1mYWxzZVxuICB9XG5cbiAgaGl0KGFuZ2xlLHpBbmdsZSxwb3cpe1xuICAgIC8vIGxldCBtaW49MTgwXG4gICAgLy8gbGV0IG1heD0zNjBcbiAgICAvLyB0aGlzLmFuZ2xlPSgoIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSApICsgbWluKSAqIE1hdGguUEkvMTgwO1xuICAgIC8vIHRoaXMuYW5nbGU9bWluLy9kZWJ1Z1xuICAgIHRoaXMuYW5nbGU9KGFuZ2xlICsxODArOTApKk1hdGguUEkvMTgwXG4gICAgdGhpcy5zcGVlZCA9cG93XG5cbiAgICAvLyBsZXQgem1pbj0xMFxuICAgIC8vIGxldCB6bWF4PTgwXG4gICAgLy8gdGhpcy56QW5nbGU9KCggTWF0aC5yYW5kb20oKSAqICh6bWF4IC0gem1pbikgKSArIHptaW4pICogTWF0aC5QSS8xODA7XG4gICAgdGhpcy56QW5nbGU9KHpBbmdsZSs0NSkqTWF0aC5QSS8xODBcbiAgICAvLyB0aGlzLnpBbmdsZT0zMDAqIE1hdGguUEkvMTgwOy8vZGVidWdcbiAgICB0aGlzLnZ6ID0gTWF0aC5zaW4odGhpcy56QW5nbGUpICogdGhpcy5zcGVlZFxuXG4gICAgdGhpcy5ob21lQm94PVswLDBdXG4gICAgLy8gY29uc29sZS5sb2coXCJIaXRcIix0aGlzLngsdGhpcy55KVxuICB9XG5cbiAgbW92ZSgpe1xuICAgIHRoaXMudnkgPSBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWRcbiAgICB0aGlzLnZ4ID0gTWF0aC5jb3ModGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkXG4gICAgdGhpcy55ICs9IHRoaXMudnlcbiAgICB0aGlzLnggKz0gdGhpcy52eFxuICAgIHRoaXMucmFkaXVzID0gdGhpcy55LzMwXG4gICAgLy8gaWYodGhpcy55ID4gY29uZmlnLkhFSUdIVCl7XG5cbiAgICAvLyAgIHJldHVybiBmYWxzZVxuICAgIC8vIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBtb3ZlX2dyb3VuZChzY2FsZSl7XG4gICAgdGhpcy52eSA9IE1hdGguc2luKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZCpzY2FsZVxuICAgIHRoaXMudnggPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQqc2NhbGVcbiAgICB0aGlzLnZ6IC09IDAuNjhcbiAgICB0aGlzLnkgKz0gdGhpcy52eVxuICAgIHRoaXMueCArPSB0aGlzLnZ4XG4gICAgdGhpcy56ICs9IHRoaXMudnpcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnopXG4gICAgdGhpcy5ob21lQm94WzBdKz10aGlzLnZ4XG4gICAgdGhpcy5ob21lQm94WzFdKz10aGlzLnZ5XG4gICAgdGhpcy5tZWFzdXJlID0gTWF0aC5zcXJ0KCh0aGlzLmhvbWVCb3hbMF0qdGhpcy5ob21lQm94WzBdKSArICh0aGlzLmhvbWVCb3hbMV0qdGhpcy5ob21lQm94WzFdKSlcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm1lYXN1cmUpXG4gICAgaWYodGhpcy56PD0wKXtcbiAgICAgIHRoaXMuZmlyc3RCb3VuZFxuICAgICAgdGhpcy56PTBcbiAgICAgIHRoaXMuYm91bnRDb3VudCsrXG4gICAgICB0aGlzLnNwZWVkKj0wLjlcbiAgICAgIHRoaXMudnoqPS0wLjVcbiAgICAgIC8vIHRoaXMudnoqPS0xLy9kZWJ1Z1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnopXG4gICAgaWYodGhpcy56PDEwMCAmJiB0aGlzLm1lYXN1cmUgPiAzMDAgJiYgdGhpcy5tZWFzdXJlPDM1MCl7XG4gICAgICB0aGlzLm1lYXN1cmU9MzAwXG4gICAgICAvLyBjb25zb2xlLmxvZyhcInJlZnJlY3RcIilcbiAgICAgIC8vIHRoaXMueT05MFxuICAgICAgLy8gdGhpcy52eSo9LTFcbiAgICAgIHRoaXMuYW5nbGUqPS0xXG4gICAgICB0aGlzLnZ6Kj0tMVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnkpXG4gICAgdmFyIGNvZj0zMFxuICAgIGlmKHRoaXMuei9jb2Y8Myl7dGhpcy5yYWRpdXMgPSAzfVxuICAgIGVsc2UgaWYodGhpcy56L2NvZj4xMCl7dGhpcy5yYWRpdXM9MTB9XG4gICAgZWxzZXt0aGlzLnJhZGl1cz10aGlzLnovY29mfVxuICAgIC8vXG4gICAgLy8gaWYodGhpcy55ID4gY29uZmlnLkhFSUdIVCl7XG4gICAgLy8gICByZXR1cm4gZmFsc2VcbiAgICAvLyB9XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5zcGVlZClcbiAgICBpZih0aGlzLnN0b3BlZD09ZmFsc2UgJiYgdGhpcy5zcGVlZCA8IDAuMSl7XG4gICAgICB0aGlzLnN0b3BlZD10cnVlXG4gICAgICB0aGlzLnNwZWVkPTBcbiAgICAgIHRoaXMub25TcGVlZFplcm8oKVxuICAgIH1cbiAgICBpZih0aGlzLno8MSl7XG4gICAgICAvL2hvbWVydW5cbiAgICAgIHZhciBkaWdyZWUgPXRoaXMuYW5nbGUqKDE4MC9NYXRoLlBJKVxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5hbmdsZSxkaWdyZWUpXG4gICAgICAvLyBleGl0O1xuICAgICAgaWYodGhpcy5maXJzdEJvdW5kICYmIDMxNSA8PSBkaWdyZWUpe1xuICAgICAgICBpZih0aGlzLnN0b3BlZD09ZmFsc2UpdGhpcy5vbkZvdWwoKVxuICAgICAgICB0aGlzLnN0b3BlZD10cnVlXG4gICAgICAgIC8vIHRoaXMuc3BlZWQ9MFxuICAgICAgICAvLyB0aGlzLm9uU3BlZWRaZXJvKClcbiAgICAgICAgLy8gYWxlcnQoXCJmYXVsXCIpXG4gICAgICB9IGVsc2UgaWYodGhpcy5maXJzdEJvdW5kICYmIDIyNSA+PSBkaWdyZWUpe1xuICAgICAgICBpZih0aGlzLnN0b3BlZD09ZmFsc2UpdGhpcy5vbkZvdWwoKVxuICAgICAgICB0aGlzLnN0b3BlZD10cnVlXG4gICAgICAgIC8vIHRoaXMuc3BlZWQ9MFxuICAgICAgICAvLyB0aGlzLm9uU3BlZWRaZXJvKClcbiAgICAgICAgLy8gYWxlcnQoXCJmYXVsXCIpXG4gICAgICB9ZWxzZSBpZih0aGlzLmZpcnN0Qm91bmQgJiYgdGhpcy5tZWFzdXJlPjM1MCl7XG4gICAgICAgIGlmKHRoaXMuc3RvcGVkPT1mYWxzZSl0aGlzLm9uSG9tZXJ1bigpXG4gICAgICAgIHRoaXMuc3RvcGVkPXRydWVcbiAgICAgICAgLy8gdGhpcy5zcGVlZD0wXG4gICAgICAgIC8vIHRoaXMub25TcGVlZFplcm8oKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhvbWUgcnVuXCIpXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgY2xlYXIoZ3JhcGhpYyl7XG4gICAgZ3JhcGhpYy5jbGVhcigpXG4gIH1cbiAgZHJhdyhncmFwaGljKXtcbiAgICAvLyB0aGlzLmNsZWFyKGdyYXBoaWMpO1xuICAgIGdyYXBoaWMubGluZVN0eWxlKDApXG4gICAgZ3JhcGhpYy5iZWdpbkZpbGwoMHhGRkZGRkYpXG4gICAgZ3JhcGhpYy5kcmF3Q2lyY2xlKFxuICAgICAgdGhpcy54LFxuICAgICAgdGhpcy55LFxuICAgICAgdGhpcy5yYWRpdXNcbiAgICApXG4gICAgZ3JhcGhpYy5lbmRGaWxsKClcbiAgfVxuXG4gIGRyYXdfZ3JvdW5kKGdyYXBoaWMseCx5LHJhZGl1cyl7XG4gICAgLy8gdGhpcy5jbGVhcihncmFwaGljKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLngqc2NhbGUrb2Zmc2V0X3gsdGhpcy55KnNjYWxlK29mZnNldF95KVxuICAgIGdyYXBoaWMubGluZVN0eWxlKDApXG4gICAgZ3JhcGhpYy5iZWdpbkZpbGwoMHhGRkZGRkYpXG4gICAgZ3JhcGhpYy5kcmF3Q2lyY2xlKHgseSxyYWRpdXMgKVxuICAgIGdyYXBoaWMuZW5kRmlsbCgpXG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIGNvbmZpZyBmcm9tIFwiLi9jb25maWcuZXM2XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmF0e1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuZGVmYXVsdHM9e1xuICAgICAgeDogNTAsXG4gICAgICB5OiAyODAsXG4gICAgICB3aWR0aDogMTYwLFxuICAgICAgaGVpZ2h0OiA2MFxuICAgIH1cbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKXtcbiAgICB0aGlzLnggPXRoaXMuZGVmYXVsdHNbXCJ4XCJdXG4gICAgdGhpcy55ID10aGlzLmRlZmF1bHRzW1wieVwiXVxuICAgIHRoaXMud2lkdGggPSB0aGlzLmRlZmF1bHRzW1wid2lkdGhcIl1cbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuZGVmYXVsdHNbXCJoZWlnaHRcIl1cbiAgfVxuXG4gIGhpdENoZWNrKGJhbGwpe1xuICAgIGlmKCFiYWxsKXJldHVybiBmYWxzZTtcbiAgICBpZihcbiAgICAgIHRoaXMueCA8IGJhbGwueCAmJlxuICAgICAgYmFsbC54IDwgdGhpcy54ICsgdGhpcy53aWR0aCAmJlxuICAgICAgICB0aGlzLnkgPCBiYWxsLnkgJiZcbiAgICAgICAgYmFsbC55IDwgdGhpcy55ICsgdGhpcy5oZWlnaHRcbiAgICApe1xuICAgICAgLy8gY29uc29sZS5sb2coYmFsbC54ICwgdGhpcy54LCB0aGlzLndpZHRoKVxuICAgICAgLy8gIGV4aXQoKVxuICAgICAgdmFyIGFuZ2xlPU1hdGguYXRhbjIoXG4gICAgICAgIChiYWxsLngtKHRoaXMueCt0aGlzLndpZHRoLzIpKSAvIHRoaXMud2lkdGgqNCAsXG4gICAgICAgICAxXG4gICAgICAgKVxuICAgICAgIHZhciB6QW5nbGU9TWF0aC5hdGFuMihcbiAgICAgICAgIChiYWxsLnktKHRoaXMueSt0aGlzLmhlaWdodC8yKSkgLyB0aGlzLmhlaWdodCo0ICxcbiAgICAgICAgICAxXG4gICAgICAgIClcbiAgICAgIHZhciBwb3cgPTYwIC0gNSogTWF0aC5zcXJ0KE1hdGguYWJzKCh0aGlzLngrdGhpcy53aWR0aC8yKS1iYWxsLngpLCBNYXRoLmFicygodGhpcy55K3RoaXMuaGVpZ2h0LzIpLWJhbGwueCkpXG4gICAgICAvLyBjb25zb2xlLmxvZyhiYWxsLnkgLCB0aGlzLnksIHRoaXMuaGVpZ2h0KVxuICAgICAgLy8gIGV4aXQoKVxuICAgICAgLy8gICBjb25zb2xlLmxvZyh6QW5nbGUqIDE4MC8gTWF0aC5QSSlcbiAgICAgIC8vICAgZXhpdCgpO1xuICAgICAgY29uc29sZS5sb2cocG93KVxuICAgICAgcmV0dXJuIFthbmdsZSAqIDE4MC8gTWF0aC5QSSwgekFuZ2xlKiAxODAvIE1hdGguUEkscG93XVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBtb3ZlKCl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjbGVhcihncmFwaGljKXtcbiAgICBncmFwaGljLmNsZWFyKClcbiAgfVxuICBkcmF3KGdyYXBoaWMpe1xuICAgIC8vIHRoaXMuY2xlYXIoZ3JhcGhpYyk7XG4gICAgZ3JhcGhpYy5saW5lU3R5bGUoMiwgMHhGRjAwMDApO1xuICAgIGdyYXBoaWMuZHJhd1JlY3QoXG4gICAgICB0aGlzLngsXG4gICAgICB0aGlzLnksXG4gICAgICB0aGlzLndpZHRoLFxuICAgICAgdGhpcy5oZWlnaHRcbiAgICAgIClcbiAgfVxuXG59XG4iLCJleHBvcnQgY29uc3QgV0lEVEg9MzIwXG5leHBvcnQgY29uc3QgSEVJR0hUPTQ4MFxuZXhwb3J0IGNvbnN0IFNUQVRFUz17XG4gIE9QRU5JTkc6MCxcbiAgU1RBUlQ6IDEsXG4gIFRIUk9XOiAyLFxuICBISVQ6IDMsXG4gIEJPVU5EOiA0XG59XG4iLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5pbXBvcnQgXCIuL3NvdW5kLmVzNlwiXG5pbXBvcnQgQmFsbCBmcm9tIFwiLi9iYWxsLmVzNlwiXG5pbXBvcnQgQmF0IGZyb20gXCIuL2JhdC5lczZcIlxuaW1wb3J0IEhvbWUgZnJvbSBcIi4vc3RhZ2VfaG9tZS5lczZcIlxuaW1wb3J0IEdyb3VuZCBmcm9tIFwiLi9zdGFnZV9ncm91bmQuZXM2XCJcblxudmFyIGN1cnJlbnRfc3RhdGU9Y29uZmlnLlNUQVRFU1tcIk9QRU5JTkdcIl1cblxudmFyIHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIoY29uZmlnLldJRFRILCBjb25maWcuSEVJR0hULHsgYW50aWFsaWFzOiB0cnVlIH0pO1xucmVuZGVyZXIudmlldy5zdHlsZS53aWR0aCA9IGNvbmZpZy5XSURUSCArIFwicHhcIlxucmVuZGVyZXIudmlldy5zdHlsZS5oZWlnaHQgPSBjb25maWcuSEVJR0hUICsgXCJweFwiXG5yZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldylcblxudmFyIHN0YWdlcz17fVxuc3RhZ2VzW1wiaG9tZVwiXSA9IG5ldyBIb21lKClcbnN0YWdlc1tcImdyb3VuZFwiXSA9IG5ldyBHcm91bmQoKVxuLy8gdmFyIHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKClcbnZhciBncm91bmQgPSBuZXcgUElYSS5Db250YWluZXIoKVxudmFyIG9wZW5pbmcgPSBuZXcgUElYSS5Db250YWluZXIoKVxudmFyIGN1cnJlbnRfc3RhZ2UgPSBcIm9wZW5pbmdcIlxuXG5cblxuICAgIHZhciB0aXRsZSA9IG5ldyBQSVhJLlNwcml0ZShQSVhJLlRleHR1cmUuZnJvbUltYWdlKFwiaW1hZ2UvdGl0bGUucG5nXCIpKTtcbiAgICB0aXRsZS53aWR0aD0zMDBcbiAgICB0aXRsZS5oZWlnaHQ9MTMyXG4gICAgdGl0bGUucG9zaXRpb24ueD1jb25maWcuV0lEVEgvMi0xNTBcbiAgICB0aXRsZS5wb3NpdGlvbi55PTEwMFxuICAgIG9wZW5pbmcuYWRkQ2hpbGQodGl0bGUpO1xuICAgIHZhciBzdHlsZSA9IHtcbiAgICAgIGZvbnQgOiAnYm9sZCBpdGFsaWMgMzBweCBBcmlhbCcsXG4gICAgICBmaWxsIDogJyNGRkZGRkYnLFxuICAgICAgd29yZFdyYXAgOiB0cnVlLFxuICAgICAgd29yZFdyYXBXaWR0aCA6IDQ0MFxuICB9O1xuXG4gIHZhciByaWNoVGV4dCA9IG5ldyBQSVhJLlRleHQoJ1RPVUNIIFNUQVJUICEhJyxzdHlsZSk7XG4gIHJpY2hUZXh0LnggPSAwO1xuICByaWNoVGV4dC55ID0gMzAwO1xuXG4gIG9wZW5pbmcuYWRkQ2hpbGQocmljaFRleHQpO1xuZnVuY3Rpb24gb3BlbmluZ19hbmltZSgpe1xuICAgIHJlbmRlcmVyLnJlbmRlcihvcGVuaW5nKVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggb3BlbmluZ19hbmltZSApXG59XG4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBvcGVuaW5nX2FuaW1lIClcbi8vc3RhZ2UuaW50ZXJhY3RpdmUgPSB0cnVlXG5cbi8vdmFyIHRoaW5nID0gbmV3IFBJWEkuR3JhcGhpY3MoKVxuLy9zdGFnZS5hZGRDaGlsZCh0aGluZylcblxuLy8gc3RhZ2Uub24oJ2NsaWNrJywgb25DbGljaylcbi8vIHN0YWdlLm9uKCd0YXAnLCBvbkNsaWNrKVxuLy8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4vLyAgIHRocm93QmFsbCgpXG4vLyB9LCAxMDAwKTtcblxudmFyIGl0ZW1zPXt9XG52YXIgc2VsZj10aGlzXG5mdW5jdGlvbiBvbkNsaWNrKCl7XG4gIC8vIHJldHVyblxuICBpZihjdXJyZW50X3N0YXRlID09IGNvbmZpZy5TVEFURVNbXCJPUEVOSU5HXCJdKXtcbiAgICBjdXJyZW50X3N0YXRlPWNvbmZpZy5TVEFURVNbXCJTVEFSVFwiXVxuICAgIGN1cnJlbnRfc3RhZ2U9XCJob21lXCJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGFuaW1hdGUgKVxuICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJiZ21cIiwge2xvb3A6LTF9KVxuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHRocm93QmFsbCgpIH0sIDIwMDApO1xuXG4gIH0gZWxzZSBpZihjdXJyZW50X3N0YXRlID09IGNvbmZpZy5TVEFURVNbXCJUSFJPV1wiXSl7XG4gICAgc3RhZ2VzW1wiaG9tZVwiXS5zd2luZyhmdW5jdGlvbigpe1xuICAgICAgY3VycmVudF9zdGF0ZSA9IGNvbmZpZy5TVEFURVNbXCJISVRcIl1cblxuICAgICAgdmFyIGJhbGwgPSBzdGFnZXNbXCJob21lXCJdLml0ZW1zW1wiYmFsbFwiXVxuICAgICAgY29uc29sZS5sb2coYmFsbClcbiAgICAgIHN0YWdlc1tcImdyb3VuZFwiXS5hZGRDaGlsZChcImJhbGxcIiwgIG5ldyBCYWxsKHtcbiAgICAgICAgeDogY29uZmlnLldJRFRIIC8gMixcbiAgICAgICAgeTogNDAwLFxuICAgICAgICBhbmdsZTogYmFsbC5hbmdsZSxcbiAgICAgICAgc3BlZWQ6IGJhbGwuc3BlZWQsXG4gICAgICAgIHZ4OiBiYWxsLnZ4LFxuICAgICAgICB2eTogYmFsbC52eSxcbiAgICAgICAgdno6IGJhbGwudnosXG4gICAgICAgIG9uSG9tZXJ1bjpmdW5jdGlvbigpe1xuICAgICAgICAgICAgY3JlYXRlanMuU291bmQucGxheShcImhvbWVydW5cIilcbiAgICAgICAgICAgIHN0YWdlc1tcImdyb3VuZFwiXS5ob21lcnVuX2ltYWdlLnZpc2libGU9dHJ1ZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJob21lcnVuXCIpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIGRlbGV0ZSBzdGFnZXNbXCJncm91bmRcIl0uaW5pdGlhbGl6ZSgpXG4gICAgICAgICAgICAgIHN0YWdlc1tcImdyb3VuZFwiXS5ob21lcnVuX2ltYWdlLnZpc2libGU9ZmFsc2VcbiAgICAgICAgICAgICAgY3VycmVudF9zdGF0ZSA9IGNvbmZpZy5TVEFURVNbXCJTVEFSVFwiXVxuICAgICAgICAgICAgICBjdXJyZW50X3N0YWdlID0gXCJob21lXCJcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRocm93QmFsbCgpXG4gICAgICAgICAgICAgIH0sMTAwMClcbiAgICAgICAgICAgIH0sMjAwMClcbiAgICAgICAgfSxcbiAgICAgICAgb25Gb3VsOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwiZm91bFwiKVxuICAgICAgICAgICAgc3RhZ2VzW1wiZ3JvdW5kXCJdLmZhdWxfaW1hZ2UudmlzaWJsZT10cnVlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdWxcIilcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgZGVsZXRlIHN0YWdlc1tcImdyb3VuZFwiXS5pbml0aWFsaXplKClcbiAgICAgICAgICAgICAgc3RhZ2VzW1wiZ3JvdW5kXCJdLmZhdWxfaW1hZ2UudmlzaWJsZT1mYWxzZVxuICAgICAgICAgICAgICBjdXJyZW50X3N0YXRlID0gY29uZmlnLlNUQVRFU1tcIlNUQVJUXCJdXG4gICAgICAgICAgICAgIGN1cnJlbnRfc3RhZ2UgPSBcImhvbWVcIlxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhyb3dCYWxsKClcbiAgICAgICAgICAgICAgfSwxMDAwKVxuICAgICAgICAgICAgfSwxMDAwKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25TcGVlZFplcm86ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3BlZWQgemVyb1wiKVxuICAgICAgICAgICAgZGVsZXRlIHN0YWdlc1tcImdyb3VuZFwiXS5pbml0aWFsaXplKClcbiAgICAgICAgICAgIGN1cnJlbnRfc3RhdGUgPSBjb25maWcuU1RBVEVTW1wiU1RBUlRcIl1cbiAgICAgICAgICAgIGN1cnJlbnRfc3RhZ2UgPSBcImhvbWVcIlxuICAgICAgICAgICAgc2V0VGltZW91dCh0aHJvd0JhbGwsMTAwMClcbiAgICAgICAgICB9XG4gICAgICAgIH0pKVxuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBjdXJyZW50X3N0YWdlPVwiZ3JvdW5kXCJcbiAgICAgICAgfSwwKVxuICAgICAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwiaGl0XCIpXG4gICAgICB9KVxuXG5cbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdGhyb3dCYWxsKClcbiAge1xuICAgIGlmKGN1cnJlbnRfc3RhdGUgIT0gY29uZmlnLlNUQVRFU1tcIlNUQVJUXCJdKSB7cmV0dXJuIHRydWV9XG4gICAgY29uc29sZS5sb2coXCJ0aHJvd1wiKVxuICAgIHZhciBiYWxsID1uZXcgQmFsbCh7eDpjb25maWcuV0lEVEgvMi0yMCAseToxMDAgLGFuZ2xlOk1hdGgvMixzcGVlZDo2fSlcblxuICAgIHN0YWdlc1tcImhvbWVcIl0ucGl0Y2goYmFsbClcbiAgICBjdXJyZW50X3N0YXRlPWNvbmZpZy5TVEFURVNbXCJUSFJPV1wiXVxuICB9XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIixvbkNsaWNrKVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLG9uQ2xpY2spXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsa2V5ZG93bilcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsa2V5dXApXG4gIHZhciB2eD0wXG4gIHZhciB2eT0wXG4gIGZ1bmN0aW9uIGtleXVwKGV2ZW50KXtcbiAgICBpZihldmVudC5rZXlDb2RlPT0zNyl7IHZ4PTAgfVxuICAgIGlmKGV2ZW50LmtleUNvZGU9PTM4KXsgdnk9MCB9XG4gICAgaWYoZXZlbnQua2V5Q29kZT09MzkpeyB2eD0wIH1cbiAgICBpZihldmVudC5rZXlDb2RlPT00MCl7IHZ5PTAgfVxuICB9XG4gIGZ1bmN0aW9uIGtleWRvd24oZXZlbnQpe1xuICAgIHZhciB2PTFcbiAgICBpZihldmVudC5rZXlDb2RlPT0xM3x8ZXZlbnQua2V5Q29kZT09MzIpeyByZXR1cm4gb25DbGljaygpIH1cbiAgICBpZihldmVudC5rZXlDb2RlPT0zNyl7IHZ4PS12IH1cbiAgICBpZihldmVudC5rZXlDb2RlPT0zOCl7IHZ5PS12IH1cbiAgICBpZihldmVudC5rZXlDb2RlPT0zOSl7IHZ4PXYgfVxuICAgIGlmKGV2ZW50LmtleUNvZGU9PTQwKXsgdnk9diB9XG4gIH1cbiAgZnVuY3Rpb24gbW92ZSgpe1xuICAgIGlmKCFzdGFnZXNbXCJob21lXCJdLmJhdHRlcl9tb3ZpZSl7cmV0dXJuIGZhbHNlfVxuICAgIHN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLnBvc2l0aW9uLngrPXZ4XG4gICAgc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueSs9dnlcbiAgICBzdGFnZXNbXCJob21lXCJdLml0ZW1zW1wiYmF0XCJdLngrPXZ4XG4gICAgc3RhZ2VzW1wiaG9tZVwiXS5pdGVtc1tcImJhdFwiXS55Kz12eVxuICB9XG4gIC8vIHJ1biB0aGUgcmVuZGVyIGxvb3BcbiAgc3RhZ2VzW1wiaG9tZVwiXS5hZGRDaGlsZChcImJhdFwiLG5ldyBCYXQoKSlcbiAgdmFyIG1ldGVyID0gbmV3IEZQU01ldGVyKCk7XG4gIHZhciBncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKClcbiAgLy8gc3RhZ2UuYWRkQ2hpbGQoZ3JhcGhpY3MpXG5cblxuICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgIGlmKGN1cnJlbnRfc3RhdGU9PWNvbmZpZy5TVEFURVNbXCJUSFJPV1wiXSl7XG4gICAgICBpZihzdGFnZXNbXCJob21lXCJdLml0ZW1zW1wiYmFsbFwiXSl7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHN0YWdlc1tcImhvbWVcIl0uaXRlbXNbXCJiYWxsXCJdLnkpXG4gICAgICAgIGlmKHN0YWdlc1tcImhvbWVcIl0uaXRlbXNbXCJiYWxsXCJdLnkgPj0gY29uZmlnLkhFSUdIVCs1MCl7XG4gICAgICAgICAgZGVsZXRlIHN0YWdlc1tcImhvbWVcIl0uaXRlbXNbXCJiYWxsXCJdXG4gICAgICAgICAgY3JlYXRlanMuU291bmQucGxheShcInN0cmlrZVwiKVxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNldFwiKVxuICAgICAgICAgICAgY3VycmVudF9zdGF0ZT1jb25maWcuU1RBVEVTW1wiU1RBUlRcIl1cbiAgICAgICAgICAgIHRocm93QmFsbCgpXG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbW92ZSgpXG4gICAgc3RhZ2VzW2N1cnJlbnRfc3RhZ2VdLmFuaW1hdGUoKVxuICAgIHJlbmRlcmVyLnJlbmRlcihzdGFnZXNbY3VycmVudF9zdGFnZV0uc3RhZ2UpXG4gICAgbWV0ZXIudGljaygpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggYW5pbWF0ZSApXG4gIH1cbiAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBhbmltYXRlIClcbiIsIiAvLyBjcmVhdGVqcy5Tb3VuZC5yZWdpc3RlclBsdWdpbnMoW2NyZWF0ZWpzLldlYkF1ZGlvUGx1Z2luLCBjcmVhdGVqcy5GbGFzaFBsdWdpbl0pO1xubGV0IHF1ZXVlID0gbmV3IGNyZWF0ZWpzLkxvYWRRdWV1ZShmYWxzZSlcbnF1ZXVlLmluc3RhbGxQbHVnaW4oY3JlYXRlanMuU291bmQpXG5sZXQgbG9hZFNvdW5kQ29tcGxldGU9ZnVuY3Rpb24oKXtcbiAgICAgIC8vIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJiZ21cIix7bG9vcDotMX0pXG4gICAgICAvLyBhbGVydCgxKVxufTtcbnF1ZXVlLmFkZEV2ZW50TGlzdGVuZXIoXCJjb21wbGV0ZVwiLGxvYWRTb3VuZENvbXBsZXRlKVxudmFyIG1hbmlmZXN0ID0gW1xuICB7c3JjOlwiL3NvdW5kL2JnbS5vZ2dcIiwgaWQ6XCJiZ21cIn0sXG4gIHtzcmM6XCIvc291bmQvZm91bC5tcDNcIiwgaWQ6XCJmb3VsXCJ9LFxuICB7c3JjOlwiL3NvdW5kL2hvbWVydW4ubXAzXCIsIGlkOlwiaG9tZXJ1blwifSxcbiAge3NyYzpcIi9zb3VuZC9ueXUzLm1wM1wiLCBpZDpcImJhbGxcIn0sXG4gIHtzcmM6XCIvc291bmQvc3RyaWtlMS5tcDNcIiwgaWQ6XCJoaXRcIn0sXG4gIHtzcmM6XCIvc291bmQvaGl0dGluZy5tcDNcIiwgaWQ6XCJzdHJpa2VcIn0sXG4gIHtzcmM6XCIvc291bmQvc3dpbmcubXAzXCIsIGlkOlwic3dpbmdcIn0sXG5dXG5xdWV1ZS5sb2FkTWFuaWZlc3QobWFuaWZlc3QpXG4iLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZUdyb3VuZCB7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5pdGVtcz1bXVxuICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKVxuXG4gICAgdmFyIHRleHR1cmUgPSBQSVhJLlRleHR1cmUuZnJvbUltYWdlKFwiaW1hZ2UvYmFja2dyb3VuZF9ncm91bmQucG5nXCIpO1xuICAgIC8vIGNyZWF0ZSBhIG5ldyBTcHJpdGUgdXNpbmcgdGhlIHRleHR1cmVcbiAgICB0aGlzLmdyb3VuZF9pbWFnZSA9IG5ldyBQSVhJLlNwcml0ZSh0ZXh0dXJlKTtcbiAgICB0aGlzLmluaXRpYWxpemUoKVxuXG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmdyb3VuZF9pbWFnZSk7XG4gICAgdGhpcy5ncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKClcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuZ3JhcGhpY3MpXG5cbiAgICB0aGlzLmZhdWxfaW1hZ2UgPSBuZXcgUElYSS5TcHJpdGUoUElYSS5UZXh0dXJlLmZyb21JbWFnZShcImltYWdlL2ZhdWwucG5nXCIpKTtcbiAgICB0aGlzLmZhdWxfaW1hZ2UucG9zaXRpb24ueD1jb25maWcuV0lEVEgvMi0xMDBcbiAgICB0aGlzLmZhdWxfaW1hZ2UucG9zaXRpb24ueT1jb25maWcuSEVJR0hULzItMjBcbiAgICB0aGlzLmZhdWxfaW1hZ2UudmlzaWJsZT1mYWxzZVxuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5mYXVsX2ltYWdlKTtcblxuICAgIHRoaXMuaG9tZXJ1bl9pbWFnZSA9IG5ldyBQSVhJLlNwcml0ZShQSVhJLlRleHR1cmUuZnJvbUltYWdlKFwiaW1hZ2UvaG9tZXJ1bi5wbmdcIikpO1xuICAgIHRoaXMuaG9tZXJ1bl9pbWFnZS5wb3NpdGlvbi54PWNvbmZpZy5XSURUSC8yLTEwMFxuICAgIHRoaXMuaG9tZXJ1bl9pbWFnZS5wb3NpdGlvbi55PWNvbmZpZy5IRUlHSFQvMi0yMFxuICAgIHRoaXMuaG9tZXJ1bl9pbWFnZS52aXNpYmxlPWZhbHNlXG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmhvbWVydW5faW1hZ2UpO1xufVxuaW5pdGlhbGl6ZSgpe1xuICBjb25zb2xlLmxvZyhcIm1hcCBpbml0XCIpXG5cbiAgLy8gbW92ZSB0aGUgc3ByaXRlIHQgdGhlIGNlbnRlciBvZiB0aGUgc2NyZWVuXG4gIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggPSAwO1xuICB0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi55ID0gMDtcbiAgdGhpcy5jYW1lcmE9Wy0zNjUsLTI3MF1cbiAgdGhpcy5tZWFzdXJlPTBcbn1cblxuYWRkQ2hpbGQoa2V5LG9iail7XG4gIHRoaXMuaXRlbXNba2V5XT1vYmpcbn1cblxuYW5pbWF0ZSgpe1xuICB0aGlzLmdyYXBoaWNzLmNsZWFyKClcbiAgdmFyIGJhbGwgPSB0aGlzLml0ZW1zW1wiYmFsbFwiXVxuICB2YXIgc2NhbGU9MC4xXG4gIGJhbGwubW92ZV9ncm91bmQoc2NhbGUpXG4gIHZhciB4PSBiYWxsLnhcbiAgdmFyIHk9IGJhbGwueVxuICB0aGlzLm1lYXN1cmUgKz0gTWF0aC5zcXJ0KGJhbGwueCAqIGJhbGwueCArIGJhbGwueSAqIGJhbGwueSlcbiAgLy8gY29uc29sZS5sb2codGhpcy5tZWFzdXJlKVxuICAvLyBjb25zb2xlLmxvZyhiYWxsLnkpXG4gIC8vIHZhciBzdG9wWD1mYWxzZTtcbiAgLy8gdmFyIHN0b3BZPWZhbHNlO1xuICBpZih0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi54ID4gLTcwMCAmJiB0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi54IDwgMCl7XG4gICAgdGhpcy5jYW1lcmFbMF0tPWJhbGwudnhcbiAgfVxuICAvLyBjb25zb2xlLmxvZyh0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi55KVxuICBpZih0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi55PDApe1xuICAgIHRoaXMuY2FtZXJhWzFdLT1iYWxsLnZ5XG4gIH1cbiAgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueCA9IHRoaXMuY2FtZXJhWzBdXG4gIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnkgPSB0aGlzLmNhbWVyYVsxXVxuXG4gIC8vIHRoaXMuZGlmZlggPSB0aGlzLmRpZmZYIHx8IDBcbiAgLy9cbiAgLy8gY29uc29sZS5sb2coeClcbiAgLy8gICAgIGlmKHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggPiAtNzAwICYmIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggPCAwKXtcbiAgLy8gICAgICAgaWYoeCA8IDUwKXt4PTUwOyBzdG9wWD10cnVlfVxuICAvLyAgICAgICBpZih4ID4gY29uZmlnLldJRFRILTUwKXt4PWNvbmZpZy5XSURUSC01MDtzdG9wWD10cnVlOyB9XG4gIC8vICAgICAgIGlmKHN0b3BYKXtcbiAgLy8gICAgICAgICAgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueCAtPSBiYWxsLnZ4IH1cbiAgLy8gICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueClcbiAgLy8gICAgIH1lbHNle1xuICAvLyAgICAgICB4ICs9dGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueFxuICAvLyAgICAgfVxuXG4gIC8vIGlmKHkgPCA1MCl7eT01MDtzdG9wWT10cnVlfVxuICAvLyBpZih5ID4gY29uZmlnLkhFSUdIVC01MCl7eT1jb25maWcuSEVJR0hULTUwO3N0b3BZPXRydWV9XG4gIC8vIGlmKHN0b3BZKXsgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueSAtPSBiYWxsLnZ5IH1cblxuICBpZih0aGlzLml0ZW1zW1wiYmFsbFwiXSkgdGhpcy5pdGVtc1tcImJhbGxcIl0uZHJhd19ncm91bmQoXG4gICAgdGhpcy5ncmFwaGljcyxcbiAgICB4LFxuICAgIHksXG4gICAgYmFsbC5yYWRpdXMpXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlSG9tZSB7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5pdGVtcz1bXVxuICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKVxuICAgIHRoaXMuZ3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpXG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmdyYXBoaWNzKVxuICAgIHRoaXMuYmcgPSBuZXcgUElYSS5TcHJpdGUoUElYSS5UZXh0dXJlLmZyb21JbWFnZShcImltYWdlL2JhY2tncm91bmRfaG9tZS5wbmdcIikpO1xuICAgIHRoaXMuYmcucG9zaXRpb24ueCA9IDA7XG4gICAgdGhpcy5iZy5wb3NpdGlvbi55ID0gMDtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkQXQodGhpcy5iZywwKTtcblxuICAgIGxldCBzZWxmPXRoaXNcbiAgICBQSVhJLmxvYWRlclxuICAgICAgICAuYWRkKCdzdWJhcnUnLCAnL2ltYWdlL3Nwcml0ZXNoZWV0Lmpzb24nKVxuICAgICAgICAuYWRkKCdwaXRjaGVyJywgJy9pbWFnZS9waXRjaGVyLmpzb24nKVxuICAgICAgICAubG9hZChmdW5jdGlvbigpe1xuICAgICAgICAgIHZhciBwaXRjaGVyX3RleHR1cmVzID0gW11cbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKylcbiAgICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcGl0Y2hlcl90ZXh0dXJlID0gUElYSS5UZXh0dXJlLmZyb21GcmFtZSgncGljaGVyXzAnICsgKGkrMSkgKyAnLnBuZycpO1xuICAgICAgICAgICAgcGl0Y2hlcl90ZXh0dXJlcy5wdXNoKHBpdGNoZXJfdGV4dHVyZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZSA9IG5ldyBQSVhJLmV4dHJhcy5Nb3ZpZUNsaXAocGl0Y2hlcl90ZXh0dXJlcyk7XG4gICAgICAgICAgc2VsZi5waXRjaGVyX21vdmllLnBvc2l0aW9uLng9MTEwXG4gICAgICAgICAgc2VsZi5waXRjaGVyX21vdmllLnBvc2l0aW9uLnk9NzBcbiAgICAgICAgICBzZWxmLnBpdGNoZXJfbW92aWUud2lkdGg9MTAwXG4gICAgICAgICAgc2VsZi5waXRjaGVyX21vdmllLmhlaWdodD0xMDBcbiAgICAgICAgICBzZWxmLnBpdGNoZXJfbW92aWUuYW5pbWF0aW9uU3BlZWQgPSAwLjA1O1xuICAgICAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS5sb29wID0gZmFsc2U7XG4gICAgICAgICAgc2VsZi5waXRjaGVyX21vdmllLmdvdG9BbmRQbGF5KDApO1xuXG4gICAgICAgICAgdmFyIHRleHR1cmVzID0gW11cbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKylcbiAgICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdGV4dHVyZSA9IFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUoJ2JhdF8wJyArIChpKzEpICsgJy5wbmcnKTtcbiAgICAgICAgICAgIHRleHR1cmVzLnB1c2godGV4dHVyZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYuYmF0dGVyX21vdmllID0gbmV3IFBJWEkuZXh0cmFzLk1vdmllQ2xpcCh0ZXh0dXJlcyk7XG5cbiAgICAgICAgICBzZWxmLmJhdHRlcl9tb3ZpZS5wb3NpdGlvbi54PTE1MFxuICAgICAgICAgIHNlbGYuYmF0dGVyX21vdmllLnBvc2l0aW9uLnk9MjAwXG4gICAgICAgICAgc2VsZi5iYXR0ZXJfbW92aWUud2lkdGg9MjAwXG4gICAgICAgICAgc2VsZi5iYXR0ZXJfbW92aWUuaGVpZ2h0PTIwMFxuICAgICAgICAgIHNlbGYuYmF0dGVyX21vdmllLmxvb3A9ZmFsc2VcbiAgICAgICAgICAvLyBzZWxmLmJhdHRlcl9tb3ZpZS5vbkNvbXBsZXRlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy8gICBzZXRUaW1lb3V0KGZ1bnRpb24oKXtcbiAgICAgICAgICAvLyAgICAgc2VsZi5iYXR0ZXJfbW92aWUuZ290b0FuZFN0b3AoMClcbiAgICAgICAgICAvLyAgIH0sNTAwKVxuICAgICAgICAgIC8vIH0pXG5cbiAgICAgICAgICBzZWxmLmJhdHRlcl9tb3ZpZS5hbmltYXRpb25TcGVlZCA9IDAuNTtcblxuICAgICAgICAgIHNlbGYuYmF0dGVyX21vdmllLmdvdG9BbmRTdG9wKDApO1xuICAgICAgICAgIHNlbGYuc3RhZ2UuYWRkQ2hpbGQoc2VsZi5iYXR0ZXJfbW92aWUpO1xuICAgICAgICAgIHNlbGYuc3RhZ2UuYWRkQ2hpbGQoc2VsZi5waXRjaGVyX21vdmllKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgfVxuXG4gICAgICBhZGRDaGlsZChrZXksb2JqKXtcbiAgICAgICAgdGhpcy5pdGVtc1trZXldPW9ialxuICAgICAgfVxuXG4gICAgICBiYWxsKCl7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zW1wiYmFsbFwiXVxuICAgICAgfVxuICAgICAgYmF0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zW1wiYmF0XCJdXG4gICAgICB9XG4gICAgICBwaXRjaChiYWxsKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJwaXRjaFwiKVxuICAgICAgICB0aGlzLnBpdGNoZWQ9ZmFsc2VcbiAgICAgICAgdmFyIHNlbGY9dGhpc1xuICAgICAgICB0aGlzLnBpdGNoZXJfbW92aWUuZ290b0FuZFBsYXkoMClcbiAgICAgICAgdGhpcy5vblBpdGNoPWZ1bmN0aW9uKCl7XG4gICAgICAgICAgY3JlYXRlanMuU291bmQucGxheShcImJhbGxcIilcbiAgICAgICAgICBzZWxmLmFkZENoaWxkKFwiYmFsbFwiLGJhbGwpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3dpbmcoc3VjY2Vzcyl7XG4gICAgICAgICAgY3JlYXRlanMuU291bmQucGxheShcInN3aW5nXCIpXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3dpbmdcIilcbiAgICAgICAgdGhpcy5zdWNjZXNzPXN1Y2Nlc3NcbiAgICAgICAgdGhpcy5oaXRlZD1mYWxzZVxuICAgICAgICB0aGlzLmJhdHRlcl9tb3ZpZS5nb3RvQW5kUGxheSgwKVxuICAgICAgfVxuXG4gICAgICBhbmltYXRlX2JhdHRlcigpe1xuICAgICAgICBpZih0aGlzLmhpdGVkPT1mYWxzZSAmJiB0aGlzLmJhdHRlcl9tb3ZpZS5jdXJyZW50RnJhbWU9PTMpe1xuICAgICAgICAgIHZhciBoaXQ9dGhpcy5iYXQoKS5oaXRDaGVjayh0aGlzLmJhbGwoKSlcbiAgICAgICAgICBpZihoaXQgIT0gZmFsc2Upe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoaXRcIilcbiAgICAgICAgICAgIHRoaXMuaGl0ZWQ9dHJ1ZVxuICAgICAgICAgICAgdGhpcy5iYWxsKCkuaGl0KGhpdFswXSxoaXRbMV0saGl0WzJdKVxuICAgICAgICAgICAgdGhpcy5zdWNjZXNzKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYW5pbWF0ZV9waXRjaGVyKCl7XG4gICAgICAgIGlmKHRoaXMucGl0Y2hlZClyZXR1cm4gZmFsc2VcbiAgICAgICAgaWYodGhpcy5waXRjaGVyX21vdmllLmN1cnJlbnRGcmFtZT09Myl7XG4gICAgICAgICAgdGhpcy5waXRjaGVkPXRydWVcbiAgICAgICAgICB0aGlzLm9uUGl0Y2goKVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgYW5pbWF0ZSgpe1xuICAgICAgICB0aGlzLmdyYXBoaWNzLmNsZWFyKClcbiAgICAgICAgaWYodGhpcy5iYXR0ZXJfbW92aWUpe3RoaXMuYW5pbWF0ZV9iYXR0ZXIoKSB9XG4gICAgICAgIGlmKHRoaXMucGl0Y2hlcl9tb3ZpZSl7dGhpcy5hbmltYXRlX3BpdGNoZXIoKSB9XG5cbiAgICAgICAgZm9yKHZhciBpIGluIHRoaXMuaXRlbXMpe1xuICAgICAgICAgIGlmKHRoaXMuaXRlbXNbaV0ubW92ZSgpKXtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZHJhdyh0aGlzLmdyYXBoaWNzKTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0uY2xlYXIodGhpcy5ncmFwaGljcylcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLml0ZW1zW2ldXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuIl19
