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
      this.onFirstBound = this.defaults["onFirstBound"] || function () {};
      this.stoped = false;
    }
  }, {
    key: "hit",
    value: function hit() {
      var min = 180;
      var max = 360;
      this.angle = (Math.random() * (max - min) + min) * Math.PI / 180;
      // this.angle=min//debug
      this.speed = 20;

      var zmin = 10;
      var zmax = 80;
      this.zAngle = (Math.random() * (zmax - zmin) + zmin) * Math.PI / 180;
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
        this.z = 0;
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
        if (this.measure > 350) {
          this.stoped = true;
          this.speed = 0;
          this.onSpeedZero();
          console.log("home run");
        }
        var digree = this.angle / Math.PI * 180;
        if (315 <= digree) {
          this.stoped = true;
          this.speed = 0;
          this.onSpeedZero();
          alert("faul");
        }
        if (225 >= digree) {
          this.stoped = true;
          this.speed = 0;
          this.onSpeedZero();
          alert("faul");
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
      x: 150,
      y: 280,
      width: 60,
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
        return true;
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
  START: 0,
  THROW: 1,
  HIT: 2,
  BOUND: 3
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

var current_state = config.STATES["START"];

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
var current_stage = "home";
//stage.interactive = true

//var thing = new PIXI.Graphics()
//stage.addChild(thing)

// stage.on('click', onClick)
// stage.on('tap', onClick)
setTimeout(function () {
  throwBall();
}, 1000);

var items = {};
function onClick() {
  // stages["home"].batter_movie.gotoAndPlay(0)
  if (current_state == config.STATES["THROW"]) {
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
requestAnimationFrame(animate);

},{"./ball.es6":1,"./bat.es6":2,"./config.es6":3,"./sound.es6":5,"./stage_ground.es6":6,"./stage_home.es6":7}],5:[function(require,module,exports){
"use strict";

var queue = new createjs.LoadQueue(false);
queue.installPlugin(createjs.Sound);
var loadSoundComplete = function loadSoundComplete() {};
queue.addEventListener("complete", loadSoundComplete);
var manifest = [{ src: "/sound/nyu3.mp3", id: "ball" }, { src: "/sound/strike1.mp3", id: "hit" }, { src: "/sound/hitting.mp3", id: "strike" }, { src: "/sound/swing.mp3", id: "swing" }];
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
        if (this.bat().hitCheck(this.ball())) {
          console.log("hit");
          this.hited = true;
          this.ball().hit();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9iYWxsLmVzNiIsIi9Vc2Vycy9ob3NzeS9wcm9qZWN0L3N1YmFydV9jaGFsbGVuZ2UvZXM2L2JhdC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9jb25maWcuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvZ2FtZS5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zb3VuZC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zdGFnZV9ncm91bmQuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvc3RhZ2VfaG9tZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7eUJDQXdCLGNBQWM7O0lBQTFCLE1BQU07O0lBRUcsSUFBSTtBQUNaLFdBRFEsSUFBSSxDQUNYLFFBQVEsRUFBQzswQkFERixJQUFJOztBQUVyQixRQUFJLENBQUMsUUFBUSxHQUFDLFFBQVEsQ0FBQTtBQUN0QixRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDbkI7O2VBSmtCLElBQUk7O1dBTWIsc0JBQUU7QUFDVixVQUFJLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFBO0FBQzdCLFVBQUksQ0FBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDN0IsVUFBSSxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUE7QUFDVCxVQUFJLENBQUMsRUFBRSxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUUsQ0FBQyxDQUFBO0FBQy9CLFVBQUksQ0FBQyxFQUFFLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDL0IsVUFBSSxDQUFDLEVBQUUsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFFLENBQUMsQ0FBQTtBQUMvQixVQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUUsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUE7QUFDOUMsVUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFFLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFBO0FBQ2hELFVBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDdEMsVUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFFLENBQUMsQ0FBQTtBQUN4QyxVQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQTtBQUNkLFVBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFDcEIsVUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFlBQVUsRUFBRSxDQUFBO0FBQy9ELFVBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxZQUFVLEVBQUUsQ0FBQTtBQUNqRSxVQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtLQUNsQjs7O1dBRUUsZUFBRTtBQUNILFVBQUksR0FBRyxHQUFDLEdBQUcsQ0FBQTtBQUNYLFVBQUksR0FBRyxHQUFDLEdBQUcsQ0FBQTtBQUNYLFVBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxBQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFBLEFBQUMsR0FBSyxHQUFHLENBQUEsR0FBSSxJQUFJLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQzs7QUFFakUsVUFBSSxDQUFDLEtBQUssR0FBRSxFQUFFLENBQUE7O0FBRWQsVUFBSSxJQUFJLEdBQUMsRUFBRSxDQUFBO0FBQ1gsVUFBSSxJQUFJLEdBQUMsRUFBRSxDQUFBO0FBQ1gsVUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEFBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUEsQUFBQyxHQUFLLElBQUksQ0FBQSxHQUFJLElBQUksQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDOztBQUVyRSxVQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7O0FBRTVDLFVBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7O0tBRW5COzs7V0FFRyxnQkFBRTtBQUNKLFVBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtBQUMzQyxVQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFDM0MsVUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFBO0FBQ2pCLFVBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQTtBQUNqQixVQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFBOzs7Ozs7QUFNdkIsYUFBTyxJQUFJLENBQUE7S0FDWjs7O1dBRVUscUJBQUMsS0FBSyxFQUFDO0FBQ2hCLFVBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUE7QUFDakQsVUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFDLEtBQUssQ0FBQTtBQUNqRCxVQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQTtBQUNmLFVBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQTtBQUNqQixVQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUE7QUFDakIsVUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFBOztBQUVqQixVQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxFQUFFLENBQUE7QUFDeEIsVUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsRUFBRSxDQUFBO0FBQ3hCLFVBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEFBQUMsQ0FBQyxDQUFBOztBQUUvRixVQUFHLElBQUksQ0FBQyxDQUFDLElBQUUsQ0FBQyxFQUFDO0FBQ1gsWUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7QUFDUixZQUFJLENBQUMsS0FBSyxJQUFFLEdBQUcsQ0FBQTtBQUNmLFlBQUksQ0FBQyxFQUFFLElBQUUsQ0FBQyxHQUFHLENBQUE7O09BRWQ7O0FBRUQsVUFBRyxJQUFJLENBQUMsQ0FBQyxHQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsRUFBQztBQUN0RCxZQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQTs7OztBQUloQixZQUFJLENBQUMsS0FBSyxJQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ2QsWUFBSSxDQUFDLEVBQUUsSUFBRSxDQUFDLENBQUMsQ0FBQTtPQUNaOztBQUVELFVBQUksR0FBRyxHQUFDLEVBQUUsQ0FBQTtBQUNWLFVBQUcsSUFBSSxDQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxFQUFDO0FBQUMsWUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7T0FBQyxNQUM1QixJQUFHLElBQUksQ0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLEVBQUUsRUFBQztBQUFDLFlBQUksQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFBO09BQUMsTUFDbEM7QUFBQyxZQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFBO09BQUM7Ozs7OztBQU01QixVQUFHLElBQUksQ0FBQyxNQUFNLElBQUUsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFDO0FBQ3hDLFlBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO0FBQ2hCLFlBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBO0FBQ1osWUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO09BQ25CO0FBQ0QsVUFBRyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQzs7QUFFVixZQUFHLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxFQUFDO0FBQ2xCLGNBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO0FBQ2hCLGNBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBO0FBQ1osY0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0FBQ2xCLGlCQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1NBQ3hCO0FBQ0QsWUFBSSxNQUFNLEdBQUUsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQTtBQUNsQyxZQUFHLEdBQUcsSUFBSSxNQUFNLEVBQUM7QUFDZixjQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtBQUNoQixjQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQTtBQUNaLGNBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtBQUNsQixlQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDZDtBQUNELFlBQUcsR0FBRyxJQUFJLE1BQU0sRUFBQztBQUNmLGNBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO0FBQ2hCLGNBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBO0FBQ1osY0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0FBQ2xCLGVBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUNkO09BRUY7O0FBRUQsYUFBTyxJQUFJLENBQUE7S0FDWjs7O1dBRUksZUFBQyxPQUFPLEVBQUM7QUFDWixhQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7S0FDaEI7OztXQUNHLGNBQUMsT0FBTyxFQUFDOztBQUVYLGFBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDcEIsYUFBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUMzQixhQUFPLENBQUMsVUFBVSxDQUNoQixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLE1BQU0sQ0FDWixDQUFBO0FBQ0QsYUFBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0tBQ2xCOzs7V0FFVSxxQkFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUM7OztBQUc3QixhQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3BCLGFBQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDM0IsYUFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLE1BQU0sQ0FBRSxDQUFBO0FBQy9CLGFBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtLQUNsQjs7O1NBbEprQixJQUFJOzs7cUJBQUosSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozt5QkNGRCxjQUFjOztJQUExQixNQUFNOztJQUVHLEdBQUc7QUFDWCxXQURRLEdBQUcsR0FDVDswQkFETSxHQUFHOztBQUVwQixRQUFJLENBQUMsUUFBUSxHQUFDO0FBQ1osT0FBQyxFQUFFLEdBQUc7QUFDTixPQUFDLEVBQUUsR0FBRztBQUNOLFdBQUssRUFBRSxFQUFFO0FBQ1QsWUFBTSxFQUFFLEVBQUU7S0FDWCxDQUFBO0FBQ0QsUUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0dBQ25COztlQVRrQixHQUFHOztXQVdaLHNCQUFFO0FBQ1YsVUFBSSxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzFCLFVBQUksQ0FBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMxQixVQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDbkMsVUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ3RDOzs7V0FFTyxrQkFBQyxJQUFJLEVBQUM7QUFDWixVQUFHLENBQUMsSUFBSSxFQUFDLE9BQU8sS0FBSyxDQUFDO0FBQ3RCLFVBQ0UsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUNmLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUMxQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQ2YsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQ2hDO0FBQ0MsZUFBTyxJQUFJLENBQUE7T0FDWjtBQUNELGFBQU8sS0FBSyxDQUFBO0tBQ2I7OztXQUNHLGdCQUFFO0FBQ0osYUFBTyxJQUFJLENBQUM7S0FDYjs7O1dBRUksZUFBQyxPQUFPLEVBQUM7QUFDWixhQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7S0FDaEI7OztXQUNHLGNBQUMsT0FBTyxFQUFDOztBQUVYLGFBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLGFBQU8sQ0FBQyxRQUFRLENBQ2QsSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxLQUFLLEVBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FDVixDQUFBO0tBQ0o7OztTQTlDa0IsR0FBRzs7O3FCQUFILEdBQUc7Ozs7Ozs7OztBQ0ZqQixJQUFNLEtBQUssR0FBQyxHQUFHLENBQUE7O0FBQ2YsSUFBTSxNQUFNLEdBQUMsR0FBRyxDQUFBOztBQUNoQixJQUFNLE1BQU0sR0FBQztBQUNsQixPQUFLLEVBQUUsQ0FBQztBQUNSLE9BQUssRUFBRSxDQUFDO0FBQ1IsS0FBRyxFQUFFLENBQUM7QUFDTixPQUFLLEVBQUUsQ0FBQztDQUNULENBQUE7Ozs7Ozs7Ozs7eUJDUHVCLGNBQWM7O0lBQTFCLE1BQU07O1FBQ1gsYUFBYTs7dUJBQ0gsWUFBWTs7OztzQkFDYixXQUFXOzs7OzZCQUNWLGtCQUFrQjs7OzsrQkFDaEIsb0JBQW9COzs7O0FBRXZDLElBQUksYUFBYSxHQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7O0FBRXhDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN4RixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7QUFDL0MsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO0FBQ2pELFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7QUFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBOztBQUV4QyxJQUFJLE1BQU0sR0FBQyxFQUFFLENBQUE7QUFDYixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsZ0NBQVUsQ0FBQTtBQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsa0NBQVksQ0FBQTs7QUFFL0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7QUFDakMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFBOzs7Ozs7OztBQVExQixVQUFVLENBQUMsWUFBWTtBQUNyQixXQUFTLEVBQUUsQ0FBQTtDQUNaLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRVQsSUFBSSxLQUFLLEdBQUMsRUFBRSxDQUFBO0FBQ1osU0FBUyxPQUFPLEdBQUU7O0FBRWhCLE1BQUcsYUFBYSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUM7QUFDekMsVUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFVO0FBQzdCLG1CQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTs7QUFFcEMsVUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUN2QyxhQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2pCLFlBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFHLHlCQUFTO0FBQzFDLFNBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUM7QUFDbkIsU0FBQyxFQUFFLEdBQUc7QUFDTixhQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7QUFDakIsYUFBSyxFQUFFLElBQUksQ0FBQyxLQUFLO0FBQ2pCLFVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtBQUNYLFVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtBQUNYLFVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtBQUNYLG1CQUFXLEVBQUMsdUJBQVU7QUFDcEIsaUJBQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDekIsaUJBQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFBO0FBQ3BDLHVCQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUN0Qyx1QkFBYSxHQUFHLE1BQU0sQ0FBQTtBQUN0QixvQkFBVSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQTtTQUMzQjtPQUNGLENBQUMsQ0FBQyxDQUFBOztBQUVILGdCQUFVLENBQUMsWUFBVTtBQUNuQixxQkFBYSxHQUFDLFFBQVEsQ0FBQTtPQUN2QixFQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ0osY0FBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDM0IsQ0FBQyxDQUFBO0dBR0g7Q0FDRjtBQUNELFNBQVMsU0FBUyxHQUNsQjtBQUNFLE1BQUcsYUFBYSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFBQyxXQUFPLElBQUksQ0FBQTtHQUFDO0FBQ3pELFNBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDcEIsTUFBSSxJQUFJLEdBQUUseUJBQVMsRUFBQyxDQUFDLEVBQUMsTUFBTSxDQUFDLEtBQUssR0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFFLENBQUMsRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFDLElBQUksR0FBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7O0FBRXRFLFFBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDMUIsZUFBYSxHQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7Q0FDckM7QUFDRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzlDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUMsT0FBTyxDQUFDLENBQUE7QUFDL0MsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQTtBQUM1QyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3hDLElBQUksRUFBRSxHQUFDLENBQUMsQ0FBQTtBQUNSLElBQUksRUFBRSxHQUFDLENBQUMsQ0FBQTtBQUNSLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBQztBQUNuQixNQUFHLEtBQUssQ0FBQyxPQUFPLElBQUUsRUFBRSxFQUFDO0FBQUUsTUFBRSxHQUFDLENBQUMsQ0FBQTtHQUFFO0FBQzdCLE1BQUcsS0FBSyxDQUFDLE9BQU8sSUFBRSxFQUFFLEVBQUM7QUFBRSxNQUFFLEdBQUMsQ0FBQyxDQUFBO0dBQUU7QUFDN0IsTUFBRyxLQUFLLENBQUMsT0FBTyxJQUFFLEVBQUUsRUFBQztBQUFFLE1BQUUsR0FBQyxDQUFDLENBQUE7R0FBRTtBQUM3QixNQUFHLEtBQUssQ0FBQyxPQUFPLElBQUUsRUFBRSxFQUFDO0FBQUUsTUFBRSxHQUFDLENBQUMsQ0FBQTtHQUFFO0NBQzlCO0FBQ0QsU0FBUyxPQUFPLENBQUMsS0FBSyxFQUFDO0FBQ3JCLE1BQUksQ0FBQyxHQUFDLENBQUMsQ0FBQTtBQUNQLE1BQUcsS0FBSyxDQUFDLE9BQU8sSUFBRSxFQUFFLElBQUUsS0FBSyxDQUFDLE9BQU8sSUFBRSxFQUFFLEVBQUM7QUFBRSxXQUFPLE9BQU8sRUFBRSxDQUFBO0dBQUU7QUFDNUQsTUFBRyxLQUFLLENBQUMsT0FBTyxJQUFFLEVBQUUsRUFBQztBQUFFLE1BQUUsR0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFFO0FBQzlCLE1BQUcsS0FBSyxDQUFDLE9BQU8sSUFBRSxFQUFFLEVBQUM7QUFBRSxNQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUE7R0FBRTtBQUM5QixNQUFHLEtBQUssQ0FBQyxPQUFPLElBQUUsRUFBRSxFQUFDO0FBQUUsTUFBRSxHQUFDLENBQUMsQ0FBQTtHQUFFO0FBQzdCLE1BQUcsS0FBSyxDQUFDLE9BQU8sSUFBRSxFQUFFLEVBQUM7QUFBRSxNQUFFLEdBQUMsQ0FBQyxDQUFBO0dBQUU7Q0FDOUI7QUFDRCxTQUFTLElBQUksR0FBRTtBQUNiLE1BQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFDO0FBQUMsV0FBTyxLQUFLLENBQUE7R0FBQztBQUM5QyxRQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFBO0FBQzFDLFFBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUE7QUFDMUMsUUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFBO0FBQ2pDLFFBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQTtDQUNsQzs7QUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBQyx5QkFBUyxDQUFDLENBQUE7QUFDeEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztBQUMzQixJQUFJLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTs7O0FBSWxDLFNBQVMsT0FBTyxHQUFHO0FBQ2pCLE1BQUcsYUFBYSxJQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUM7QUFDdkMsUUFBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFDOztBQUU5QixVQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUMsRUFBRSxFQUFDO0FBQ3BELGVBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNuQyxnQkFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDN0Isa0JBQVUsQ0FBQyxZQUFZO0FBQ3JCLGlCQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3BCLHVCQUFhLEdBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUNwQyxtQkFBUyxFQUFFLENBQUE7U0FDWixFQUFFLElBQUksQ0FBQyxDQUFDO09BQ1Y7S0FDRjtHQUNGO0FBQ0QsTUFBSSxFQUFFLENBQUE7QUFDTixRQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDL0IsVUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDNUMsT0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2IsdUJBQXFCLENBQUUsT0FBTyxDQUFFLENBQUE7Q0FDakM7QUFDRCxxQkFBcUIsQ0FBRSxPQUFPLENBQUUsQ0FBQTs7Ozs7QUNuSWhDLElBQUksS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN6QyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNuQyxJQUFJLGlCQUFpQixHQUFDLFNBQWxCLGlCQUFpQixHQUFXLEVBRS9CLENBQUM7QUFDRixLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFDLGlCQUFpQixDQUFDLENBQUE7QUFDcEQsSUFBSSxRQUFRLEdBQUcsQ0FDYixFQUFDLEdBQUcsRUFBQyxpQkFBaUIsRUFBRSxFQUFFLEVBQUMsTUFBTSxFQUFDLEVBQ2xDLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUMsRUFDcEMsRUFBQyxHQUFHLEVBQUMsb0JBQW9CLEVBQUUsRUFBRSxFQUFDLFFBQVEsRUFBQyxFQUN2QyxFQUFDLEdBQUcsRUFBQyxrQkFBa0IsRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQ3JDLENBQUE7QUFDRCxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7eUJDWkosY0FBYzs7SUFBMUIsTUFBTTs7SUFDRyxXQUFXO0FBQ25CLFdBRFEsV0FBVyxHQUNqQjswQkFETSxXQUFXOztBQUU1QixRQUFJLENBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQTtBQUNiLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7O0FBRWpDLFFBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLDZCQUE2QixDQUFDLENBQUM7O0FBRXBFLFFBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdDLFFBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTs7QUFFakIsUUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZDLFFBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDbkMsUUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0dBQ25DOztlQWJrQixXQUFXOztXQWNwQixzQkFBRTtBQUNWLGFBQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7OztBQUd2QixVQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLFVBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakMsVUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDdkIsVUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUE7S0FDZjs7O1dBRU8sa0JBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQztBQUNmLFVBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUMsR0FBRyxDQUFBO0tBQ3BCOzs7V0FFTSxtQkFBRTtBQUNQLFVBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUE7QUFDckIsVUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM3QixVQUFJLEtBQUssR0FBQyxHQUFHLENBQUE7QUFDYixVQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3ZCLFVBQUksQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDYixVQUFJLENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQ2IsVUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTs7Ozs7QUFLNUQsVUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQztBQUN6RSxZQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxFQUFFLENBQUE7T0FDeEI7O0FBRUQsVUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDO0FBQ2hDLFlBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQTtPQUN4QjtBQUNELFVBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzdDLFVBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUI3QyxVQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQ25ELElBQUksQ0FBQyxRQUFRLEVBQ2IsQ0FBQyxFQUNELENBQUMsRUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDYjs7O1NBeEVnQixXQUFXOzs7cUJBQVgsV0FBVzs7Ozs7Ozs7Ozs7Ozs7SUNEWCxTQUFTO0FBQ2pCLFdBRFEsU0FBUyxHQUNmOzBCQURNLFNBQVM7O0FBRTFCLFFBQUksQ0FBQyxLQUFLLEdBQUMsRUFBRSxDQUFBO0FBQ2IsUUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtBQUNqQyxRQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQ25DLFFBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNsQyxRQUFJLENBQUMsRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUM7QUFDL0UsUUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QixRQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLFFBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRWpDLFFBQUksSUFBSSxHQUFDLElBQUksQ0FBQTtBQUNiLFFBQUksQ0FBQyxNQUFNLENBQ04sR0FBRyxDQUFDLFFBQVEsRUFBRSx5QkFBeUIsQ0FBQyxDQUN4QyxHQUFHLENBQUMsU0FBUyxFQUFFLHFCQUFxQixDQUFDLENBQ3JDLElBQUksQ0FBQyxZQUFVO0FBQ2QsVUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUE7QUFDekIsV0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFDMUI7QUFDRSxZQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDMUUsd0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO09BQ3hDO0FBQ0QsVUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDakUsVUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQTtBQUNqQyxVQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFBO0FBQ2hDLFVBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFDLEdBQUcsQ0FBQTtBQUM1QixVQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBQyxHQUFHLENBQUE7QUFDN0IsVUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBQ3pDLFVBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztBQUNoQyxVQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFbEMsVUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO0FBQ2pCLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQzFCO0FBQ0UsWUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBQy9ELGdCQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO09BQ3hCO0FBQ0QsVUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUV4RCxVQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFBO0FBQ2hDLFVBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUE7QUFDaEMsVUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUMsR0FBRyxDQUFBO0FBQzNCLFVBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQTtBQUM1QixVQUFJLENBQUMsWUFBWSxDQUFDLElBQUksR0FBQyxLQUFLLENBQUE7Ozs7Ozs7QUFPNUIsVUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDOztBQUV2QyxVQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyxVQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkMsVUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQ3pDLENBQUMsQ0FBQztHQUdKOztlQTFEYyxTQUFTOztXQTREaEIsa0JBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQztBQUNmLFVBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUMsR0FBRyxDQUFBO0tBQ3BCOzs7V0FFRyxnQkFBRTtBQUNKLGFBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUMxQjs7O1dBQ0UsZUFBRTtBQUNILGFBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUN6Qjs7O1dBQ0ksZUFBQyxJQUFJLEVBQUM7QUFDVCxhQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3BCLFVBQUksQ0FBQyxPQUFPLEdBQUMsS0FBSyxDQUFBO0FBQ2xCLFVBQUksSUFBSSxHQUFDLElBQUksQ0FBQTtBQUNiLFVBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLFVBQUksQ0FBQyxPQUFPLEdBQUMsWUFBVTtBQUNyQixnQkFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDM0IsWUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLENBQUE7T0FDM0IsQ0FBQTtLQUNGOzs7V0FFSSxlQUFDLE9BQU8sRUFBQztBQUNWLGNBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzlCLGFBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDcEIsVUFBSSxDQUFDLE9BQU8sR0FBQyxPQUFPLENBQUE7QUFDcEIsVUFBSSxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUE7QUFDaEIsVUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDakM7OztXQUVhLDBCQUFFO0FBQ2QsVUFBRyxJQUFJLENBQUMsS0FBSyxJQUFFLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksSUFBRSxDQUFDLEVBQUM7QUFDeEQsWUFBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFDO0FBQ2xDLGlCQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ2xCLGNBQUksQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFBO0FBQ2YsY0FBSSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ2pCLGNBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNmO09BQ0Y7S0FDRjs7O1dBRWMsMkJBQUU7QUFDZixVQUFHLElBQUksQ0FBQyxPQUFPLEVBQUMsT0FBTyxLQUFLLENBQUE7QUFDNUIsVUFBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksSUFBRSxDQUFDLEVBQUM7QUFDcEMsWUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUE7QUFDakIsWUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO09BQ2Y7S0FFRjs7O1dBRU0sbUJBQUU7QUFDUCxVQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFBO0FBQ3JCLFVBQUcsSUFBSSxDQUFDLFlBQVksRUFBQztBQUFDLFlBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtPQUFFO0FBQzdDLFVBQUcsSUFBSSxDQUFDLGFBQWEsRUFBQztBQUFDLFlBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtPQUFFOztBQUUvQyxXQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUM7QUFDdEIsWUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFDO0FBQ3RCLGNBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQyxNQUFJO0FBQ0gsY0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ2xDLGlCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDckI7T0FDRjtLQUNGOzs7U0ExSGMsU0FBUzs7O3FCQUFULFNBQVMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgY29uZmlnIGZyb20gXCIuL2NvbmZpZy5lczZcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWxse1xuICBjb25zdHJ1Y3RvcihkZWZhdWx0cyl7XG4gICAgdGhpcy5kZWZhdWx0cz1kZWZhdWx0c1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpe1xuICAgIHRoaXMueCA9dGhpcy5kZWZhdWx0c1tcInhcIl18fDBcbiAgICB0aGlzLnkgPXRoaXMuZGVmYXVsdHNbXCJ5XCJdfHwwXG4gICAgdGhpcy56ID01XG4gICAgdGhpcy52eCA9dGhpcy5kZWZhdWx0c1tcInZ4XCJdfHwwXG4gICAgdGhpcy52eSA9dGhpcy5kZWZhdWx0c1tcInZ5XCJdfHwwXG4gICAgdGhpcy52eiA9dGhpcy5kZWZhdWx0c1tcInZ6XCJdfHwwXG4gICAgdGhpcy5hbmdsZSA9IHRoaXMuZGVmYXVsdHNbXCJhbmdsZVwiXXx8TWF0aC5QSS8yXG4gICAgdGhpcy56QW5nbGUgPSB0aGlzLmRlZmF1bHRzW1wiekFuZ2xlXCJdfHxNYXRoLlBJLzJcbiAgICB0aGlzLnNwZWVkID0gdGhpcy5kZWZhdWx0c1tcInNwZWVkXCJdfHwwXG4gICAgdGhpcy5yYWRpdXMgPSB0aGlzLmRlZmF1bHRzW1wicmFkaXVzXCJdfHwwXG4gICAgdGhpcy5tZWFzdXJlID0gMFxuICAgICAgdGhpcy5ob21lQm94PVswLDBdXG4gICAgdGhpcy5vblNwZWVkWmVybyA9IHRoaXMuZGVmYXVsdHNbXCJvblNwZWVkWmVyb1wiXSB8fCBmdW5jdGlvbigpe31cbiAgICB0aGlzLm9uRmlyc3RCb3VuZCA9IHRoaXMuZGVmYXVsdHNbXCJvbkZpcnN0Qm91bmRcIl0gfHwgZnVuY3Rpb24oKXt9XG4gICAgdGhpcy5zdG9wZWQ9ZmFsc2VcbiAgfVxuXG4gIGhpdCgpe1xuICAgIGxldCBtaW49MTgwXG4gICAgbGV0IG1heD0zNjBcbiAgICB0aGlzLmFuZ2xlPSgoIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSApICsgbWluKSAqIE1hdGguUEkvMTgwO1xuICAgIC8vIHRoaXMuYW5nbGU9bWluLy9kZWJ1Z1xuICAgIHRoaXMuc3BlZWQgPTIwXG5cbiAgICBsZXQgem1pbj0xMFxuICAgIGxldCB6bWF4PTgwXG4gICAgdGhpcy56QW5nbGU9KCggTWF0aC5yYW5kb20oKSAqICh6bWF4IC0gem1pbikgKSArIHptaW4pICogTWF0aC5QSS8xODA7XG4gICAgLy8gdGhpcy56QW5nbGU9MzAwKiBNYXRoLlBJLzE4MDsvL2RlYnVnXG4gICAgdGhpcy52eiA9IE1hdGguc2luKHRoaXMuekFuZ2xlKSAqIHRoaXMuc3BlZWRcblxuICAgIHRoaXMuaG9tZUJveD1bMCwwXVxuICAgIC8vIGNvbnNvbGUubG9nKFwiSGl0XCIsdGhpcy54LHRoaXMueSlcbiAgfVxuXG4gIG1vdmUoKXtcbiAgICB0aGlzLnZ5ID0gTWF0aC5zaW4odGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkXG4gICAgdGhpcy52eCA9IE1hdGguY29zKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZFxuICAgIHRoaXMueSArPSB0aGlzLnZ5XG4gICAgdGhpcy54ICs9IHRoaXMudnhcbiAgICB0aGlzLnJhZGl1cyA9IHRoaXMueS8zMFxuICAgIC8vIGlmKHRoaXMueSA+IGNvbmZpZy5IRUlHSFQpe1xuXG4gICAgLy8gICByZXR1cm4gZmFsc2VcbiAgICAvLyB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgbW92ZV9ncm91bmQoc2NhbGUpe1xuICAgIHRoaXMudnkgPSBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQqc2NhbGVcbiAgICB0aGlzLnZ4ID0gTWF0aC5jb3ModGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkKnNjYWxlXG4gICAgdGhpcy52eiAtPSAwLjY4XG4gICAgdGhpcy55ICs9IHRoaXMudnlcbiAgICB0aGlzLnggKz0gdGhpcy52eFxuICAgIHRoaXMueiArPSB0aGlzLnZ6XG4gICAgLy8gY29uc29sZS5sb2codGhpcy56KVxuICAgIHRoaXMuaG9tZUJveFswXSs9dGhpcy52eFxuICAgIHRoaXMuaG9tZUJveFsxXSs9dGhpcy52eVxuICAgIHRoaXMubWVhc3VyZSA9IE1hdGguc3FydCgodGhpcy5ob21lQm94WzBdKnRoaXMuaG9tZUJveFswXSkgKyAodGhpcy5ob21lQm94WzFdKnRoaXMuaG9tZUJveFsxXSkpXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5tZWFzdXJlKVxuICAgIGlmKHRoaXMuejw9MCl7XG4gICAgICB0aGlzLno9MFxuICAgICAgdGhpcy5zcGVlZCo9MC45XG4gICAgICB0aGlzLnZ6Kj0tMC41XG4gICAgICAvLyB0aGlzLnZ6Kj0tMS8vZGVidWdcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2codGhpcy56KVxuICAgIGlmKHRoaXMuejwxMDAgJiYgdGhpcy5tZWFzdXJlID4gMzAwICYmIHRoaXMubWVhc3VyZTwzNTApe1xuICAgICAgdGhpcy5tZWFzdXJlPTMwMFxuICAgICAgLy8gY29uc29sZS5sb2coXCJyZWZyZWN0XCIpXG4gICAgICAvLyB0aGlzLnk9OTBcbiAgICAgIC8vIHRoaXMudnkqPS0xXG4gICAgICB0aGlzLmFuZ2xlKj0tMVxuICAgICAgdGhpcy52eio9LTFcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2codGhpcy55KVxuICAgIHZhciBjb2Y9MzBcbiAgICBpZih0aGlzLnovY29mPDMpe3RoaXMucmFkaXVzID0gM31cbiAgICBlbHNlIGlmKHRoaXMuei9jb2Y+MTApe3RoaXMucmFkaXVzPTEwfVxuICAgIGVsc2V7dGhpcy5yYWRpdXM9dGhpcy56L2NvZn1cbiAgICAvL1xuICAgIC8vIGlmKHRoaXMueSA+IGNvbmZpZy5IRUlHSFQpe1xuICAgIC8vICAgcmV0dXJuIGZhbHNlXG4gICAgLy8gfVxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3BlZWQpXG4gICAgaWYodGhpcy5zdG9wZWQ9PWZhbHNlICYmIHRoaXMuc3BlZWQgPCAwLjEpe1xuICAgICAgdGhpcy5zdG9wZWQ9dHJ1ZVxuICAgICAgdGhpcy5zcGVlZD0wXG4gICAgICB0aGlzLm9uU3BlZWRaZXJvKClcbiAgICB9XG4gICAgaWYodGhpcy56PDEpe1xuICAgICAgLy9ob21lcnVuXG4gICAgICBpZih0aGlzLm1lYXN1cmU+MzUwKXtcbiAgICAgICAgdGhpcy5zdG9wZWQ9dHJ1ZVxuICAgICAgICB0aGlzLnNwZWVkPTBcbiAgICAgICAgdGhpcy5vblNwZWVkWmVybygpXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaG9tZSBydW5cIilcbiAgICAgIH1cbiAgICAgIHZhciBkaWdyZWUgPXRoaXMuYW5nbGUvTWF0aC5QSSoxODBcbiAgICAgIGlmKDMxNSA8PSBkaWdyZWUpe1xuICAgICAgICB0aGlzLnN0b3BlZD10cnVlXG4gICAgICAgIHRoaXMuc3BlZWQ9MFxuICAgICAgICB0aGlzLm9uU3BlZWRaZXJvKClcbiAgICAgICAgYWxlcnQoXCJmYXVsXCIpXG4gICAgICB9XG4gICAgICBpZigyMjUgPj0gZGlncmVlKXtcbiAgICAgICAgdGhpcy5zdG9wZWQ9dHJ1ZVxuICAgICAgICB0aGlzLnNwZWVkPTBcbiAgICAgICAgdGhpcy5vblNwZWVkWmVybygpXG4gICAgICAgIGFsZXJ0KFwiZmF1bFwiKVxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGNsZWFyKGdyYXBoaWMpe1xuICAgIGdyYXBoaWMuY2xlYXIoKVxuICB9XG4gIGRyYXcoZ3JhcGhpYyl7XG4gICAgLy8gdGhpcy5jbGVhcihncmFwaGljKTtcbiAgICBncmFwaGljLmxpbmVTdHlsZSgwKVxuICAgIGdyYXBoaWMuYmVnaW5GaWxsKDB4RkZGRkZGKVxuICAgIGdyYXBoaWMuZHJhd0NpcmNsZShcbiAgICAgIHRoaXMueCxcbiAgICAgIHRoaXMueSxcbiAgICAgIHRoaXMucmFkaXVzXG4gICAgKVxuICAgIGdyYXBoaWMuZW5kRmlsbCgpXG4gIH1cblxuICBkcmF3X2dyb3VuZChncmFwaGljLHgseSxyYWRpdXMpe1xuICAgIC8vIHRoaXMuY2xlYXIoZ3JhcGhpYyk7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy54KnNjYWxlK29mZnNldF94LHRoaXMueSpzY2FsZStvZmZzZXRfeSlcbiAgICBncmFwaGljLmxpbmVTdHlsZSgwKVxuICAgIGdyYXBoaWMuYmVnaW5GaWxsKDB4RkZGRkZGKVxuICAgIGdyYXBoaWMuZHJhd0NpcmNsZSh4LHkscmFkaXVzIClcbiAgICBncmFwaGljLmVuZEZpbGwoKVxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhdHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLmRlZmF1bHRzPXtcbiAgICAgIHg6IDE1MCxcbiAgICAgIHk6IDI4MCxcbiAgICAgIHdpZHRoOiA2MCxcbiAgICAgIGhlaWdodDogNjBcbiAgICB9XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICBpbml0aWFsaXplKCl7XG4gICAgdGhpcy54ID10aGlzLmRlZmF1bHRzW1wieFwiXVxuICAgIHRoaXMueSA9dGhpcy5kZWZhdWx0c1tcInlcIl1cbiAgICB0aGlzLndpZHRoID0gdGhpcy5kZWZhdWx0c1tcIndpZHRoXCJdXG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmRlZmF1bHRzW1wiaGVpZ2h0XCJdXG4gIH1cblxuICBoaXRDaGVjayhiYWxsKXtcbiAgICBpZighYmFsbClyZXR1cm4gZmFsc2U7XG4gICAgaWYoXG4gICAgICB0aGlzLnggPCBiYWxsLnggJiZcbiAgICAgIGJhbGwueCA8IHRoaXMueCArIHRoaXMud2lkdGggJiZcbiAgICAgICAgdGhpcy55IDwgYmFsbC55ICYmXG4gICAgICAgIGJhbGwueSA8IHRoaXMueSArIHRoaXMuaGVpZ2h0XG4gICAgKXtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIG1vdmUoKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNsZWFyKGdyYXBoaWMpe1xuICAgIGdyYXBoaWMuY2xlYXIoKVxuICB9XG4gIGRyYXcoZ3JhcGhpYyl7XG4gICAgLy8gdGhpcy5jbGVhcihncmFwaGljKTtcbiAgICBncmFwaGljLmxpbmVTdHlsZSgyLCAweEZGMDAwMCk7XG4gICAgZ3JhcGhpYy5kcmF3UmVjdChcbiAgICAgIHRoaXMueCxcbiAgICAgIHRoaXMueSxcbiAgICAgIHRoaXMud2lkdGgsXG4gICAgICB0aGlzLmhlaWdodFxuICAgICAgKVxuICB9XG5cbn1cbiIsImV4cG9ydCBjb25zdCBXSURUSD0zMjBcbmV4cG9ydCBjb25zdCBIRUlHSFQ9NDgwXG5leHBvcnQgY29uc3QgU1RBVEVTPXtcbiAgU1RBUlQ6IDAsXG4gIFRIUk9XOiAxLFxuICBISVQ6IDIsXG4gIEJPVU5EOiAzXG59XG4iLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5pbXBvcnQgXCIuL3NvdW5kLmVzNlwiXG5pbXBvcnQgQmFsbCBmcm9tIFwiLi9iYWxsLmVzNlwiXG5pbXBvcnQgQmF0IGZyb20gXCIuL2JhdC5lczZcIlxuaW1wb3J0IEhvbWUgZnJvbSBcIi4vc3RhZ2VfaG9tZS5lczZcIlxuaW1wb3J0IEdyb3VuZCBmcm9tIFwiLi9zdGFnZV9ncm91bmQuZXM2XCJcblxudmFyIGN1cnJlbnRfc3RhdGU9Y29uZmlnLlNUQVRFU1tcIlNUQVJUXCJdXG5cbnZhciByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKGNvbmZpZy5XSURUSCwgY29uZmlnLkhFSUdIVCx7IGFudGlhbGlhczogdHJ1ZSB9KTtcbnJlbmRlcmVyLnZpZXcuc3R5bGUud2lkdGggPSBjb25maWcuV0lEVEggKyBcInB4XCJcbnJlbmRlcmVyLnZpZXcuc3R5bGUuaGVpZ2h0ID0gY29uZmlnLkhFSUdIVCArIFwicHhcIlxucmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpXG5cbnZhciBzdGFnZXM9e31cbnN0YWdlc1tcImhvbWVcIl0gPSBuZXcgSG9tZSgpXG5zdGFnZXNbXCJncm91bmRcIl0gPSBuZXcgR3JvdW5kKClcbi8vIHZhciBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpXG52YXIgZ3JvdW5kID0gbmV3IFBJWEkuQ29udGFpbmVyKClcbnZhciBjdXJyZW50X3N0YWdlID0gXCJob21lXCJcbi8vc3RhZ2UuaW50ZXJhY3RpdmUgPSB0cnVlXG5cbi8vdmFyIHRoaW5nID0gbmV3IFBJWEkuR3JhcGhpY3MoKVxuLy9zdGFnZS5hZGRDaGlsZCh0aGluZylcblxuLy8gc3RhZ2Uub24oJ2NsaWNrJywgb25DbGljaylcbi8vIHN0YWdlLm9uKCd0YXAnLCBvbkNsaWNrKVxuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gIHRocm93QmFsbCgpXG59LCAxMDAwKTtcblxudmFyIGl0ZW1zPXt9XG5mdW5jdGlvbiBvbkNsaWNrKCl7XG4gIC8vIHN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLmdvdG9BbmRQbGF5KDApXG4gIGlmKGN1cnJlbnRfc3RhdGUgPT0gY29uZmlnLlNUQVRFU1tcIlRIUk9XXCJdKXtcbiAgICBzdGFnZXNbXCJob21lXCJdLnN3aW5nKGZ1bmN0aW9uKCl7XG4gICAgICBjdXJyZW50X3N0YXRlID0gY29uZmlnLlNUQVRFU1tcIkhJVFwiXVxuXG4gICAgICB2YXIgYmFsbCA9IHN0YWdlc1tcImhvbWVcIl0uaXRlbXNbXCJiYWxsXCJdXG4gICAgICBjb25zb2xlLmxvZyhiYWxsKVxuICAgICAgc3RhZ2VzW1wiZ3JvdW5kXCJdLmFkZENoaWxkKFwiYmFsbFwiLCAgbmV3IEJhbGwoe1xuICAgICAgICB4OiBjb25maWcuV0lEVEggLyAyLFxuICAgICAgICB5OiA0MDAsXG4gICAgICAgIGFuZ2xlOiBiYWxsLmFuZ2xlLFxuICAgICAgICBzcGVlZDogYmFsbC5zcGVlZCxcbiAgICAgICAgdng6IGJhbGwudngsXG4gICAgICAgIHZ5OiBiYWxsLnZ5LFxuICAgICAgICB2ejogYmFsbC52eixcbiAgICAgICAgb25TcGVlZFplcm86ZnVuY3Rpb24oKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInNwZWVkIHplcm9cIilcbiAgICAgICAgICBkZWxldGUgc3RhZ2VzW1wiZ3JvdW5kXCJdLmluaXRpYWxpemUoKVxuICAgICAgICAgIGN1cnJlbnRfc3RhdGUgPSBjb25maWcuU1RBVEVTW1wiU1RBUlRcIl1cbiAgICAgICAgICBjdXJyZW50X3N0YWdlID0gXCJob21lXCJcbiAgICAgICAgICBzZXRUaW1lb3V0KHRocm93QmFsbCwxMDAwKVxuICAgICAgICB9XG4gICAgICB9KSlcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBjdXJyZW50X3N0YWdlPVwiZ3JvdW5kXCJcbiAgICAgIH0sMClcbiAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJoaXRcIilcbiAgICB9KVxuXG5cbiAgfVxufVxuZnVuY3Rpb24gdGhyb3dCYWxsKClcbntcbiAgaWYoY3VycmVudF9zdGF0ZSAhPSBjb25maWcuU1RBVEVTW1wiU1RBUlRcIl0pIHtyZXR1cm4gdHJ1ZX1cbiAgY29uc29sZS5sb2coXCJ0aHJvd1wiKVxuICB2YXIgYmFsbCA9bmV3IEJhbGwoe3g6Y29uZmlnLldJRFRILzItMjAgLHk6MTAwICxhbmdsZTpNYXRoLzIsc3BlZWQ6Nn0pXG5cbiAgc3RhZ2VzW1wiaG9tZVwiXS5waXRjaChiYWxsKVxuICBjdXJyZW50X3N0YXRlPWNvbmZpZy5TVEFURVNbXCJUSFJPV1wiXVxufVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLG9uQ2xpY2spXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLG9uQ2xpY2spXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLGtleWRvd24pXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIixrZXl1cClcbnZhciB2eD0wXG52YXIgdnk9MFxuZnVuY3Rpb24ga2V5dXAoZXZlbnQpe1xuICBpZihldmVudC5rZXlDb2RlPT0zNyl7IHZ4PTAgfVxuICBpZihldmVudC5rZXlDb2RlPT0zOCl7IHZ5PTAgfVxuICBpZihldmVudC5rZXlDb2RlPT0zOSl7IHZ4PTAgfVxuICBpZihldmVudC5rZXlDb2RlPT00MCl7IHZ5PTAgfVxufVxuZnVuY3Rpb24ga2V5ZG93bihldmVudCl7XG4gIHZhciB2PTFcbiAgaWYoZXZlbnQua2V5Q29kZT09MTN8fGV2ZW50LmtleUNvZGU9PTMyKXsgcmV0dXJuIG9uQ2xpY2soKSB9XG4gIGlmKGV2ZW50LmtleUNvZGU9PTM3KXsgdng9LXYgfVxuICBpZihldmVudC5rZXlDb2RlPT0zOCl7IHZ5PS12IH1cbiAgaWYoZXZlbnQua2V5Q29kZT09MzkpeyB2eD12IH1cbiAgaWYoZXZlbnQua2V5Q29kZT09NDApeyB2eT12IH1cbn1cbmZ1bmN0aW9uIG1vdmUoKXtcbiAgaWYoIXN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllKXtyZXR1cm4gZmFsc2V9XG4gIHN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLnBvc2l0aW9uLngrPXZ4XG4gIHN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLnBvc2l0aW9uLnkrPXZ5XG4gIHN0YWdlc1tcImhvbWVcIl0uaXRlbXNbXCJiYXRcIl0ueCs9dnhcbiAgc3RhZ2VzW1wiaG9tZVwiXS5pdGVtc1tcImJhdFwiXS55Kz12eVxufVxuLy8gcnVuIHRoZSByZW5kZXIgbG9vcFxuc3RhZ2VzW1wiaG9tZVwiXS5hZGRDaGlsZChcImJhdFwiLG5ldyBCYXQoKSlcbnZhciBtZXRlciA9IG5ldyBGUFNNZXRlcigpO1xudmFyIGdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKVxuLy8gc3RhZ2UuYWRkQ2hpbGQoZ3JhcGhpY3MpXG5cblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgaWYoY3VycmVudF9zdGF0ZT09Y29uZmlnLlNUQVRFU1tcIlRIUk9XXCJdKXtcbiAgICBpZihzdGFnZXNbXCJob21lXCJdLml0ZW1zW1wiYmFsbFwiXSl7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzdGFnZXNbXCJob21lXCJdLml0ZW1zW1wiYmFsbFwiXS55KVxuICAgICAgaWYoc3RhZ2VzW1wiaG9tZVwiXS5pdGVtc1tcImJhbGxcIl0ueSA+PSBjb25maWcuSEVJR0hUKzUwKXtcbiAgICAgICAgZGVsZXRlIHN0YWdlc1tcImhvbWVcIl0uaXRlbXNbXCJiYWxsXCJdXG4gICAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJzdHJpa2VcIilcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZXNldFwiKVxuICAgICAgICAgIGN1cnJlbnRfc3RhdGU9Y29uZmlnLlNUQVRFU1tcIlNUQVJUXCJdXG4gICAgICAgICAgdGhyb3dCYWxsKClcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG1vdmUoKVxuICBzdGFnZXNbY3VycmVudF9zdGFnZV0uYW5pbWF0ZSgpXG4gIHJlbmRlcmVyLnJlbmRlcihzdGFnZXNbY3VycmVudF9zdGFnZV0uc3RhZ2UpXG4gIG1ldGVyLnRpY2soKTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBhbmltYXRlIClcbn1cbnJlcXVlc3RBbmltYXRpb25GcmFtZSggYW5pbWF0ZSApXG4iLCJsZXQgcXVldWUgPSBuZXcgY3JlYXRlanMuTG9hZFF1ZXVlKGZhbHNlKVxucXVldWUuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZClcbmxldCBsb2FkU291bmRDb21wbGV0ZT1mdW5jdGlvbigpe1xuXG59O1xucXVldWUuYWRkRXZlbnRMaXN0ZW5lcihcImNvbXBsZXRlXCIsbG9hZFNvdW5kQ29tcGxldGUpXG52YXIgbWFuaWZlc3QgPSBbXG4gIHtzcmM6XCIvc291bmQvbnl1My5tcDNcIiwgaWQ6XCJiYWxsXCJ9LFxuICB7c3JjOlwiL3NvdW5kL3N0cmlrZTEubXAzXCIsIGlkOlwiaGl0XCJ9LFxuICB7c3JjOlwiL3NvdW5kL2hpdHRpbmcubXAzXCIsIGlkOlwic3RyaWtlXCJ9LFxuICB7c3JjOlwiL3NvdW5kL3N3aW5nLm1wM1wiLCBpZDpcInN3aW5nXCJ9LFxuXVxucXVldWUubG9hZE1hbmlmZXN0KG1hbmlmZXN0KVxuIiwiaW1wb3J0ICogYXMgY29uZmlnIGZyb20gXCIuL2NvbmZpZy5lczZcIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2VHcm91bmQge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuaXRlbXM9W11cbiAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKClcblxuICAgIHZhciB0ZXh0dXJlID0gUElYSS5UZXh0dXJlLmZyb21JbWFnZShcImltYWdlL2JhY2tncm91bmRfZ3JvdW5kLnBuZ1wiKTtcbiAgICAvLyBjcmVhdGUgYSBuZXcgU3ByaXRlIHVzaW5nIHRoZSB0ZXh0dXJlXG4gICAgdGhpcy5ncm91bmRfaW1hZ2UgPSBuZXcgUElYSS5TcHJpdGUodGV4dHVyZSk7XG4gICAgdGhpcy5pbml0aWFsaXplKClcblxuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5ncm91bmRfaW1hZ2UpO1xuICAgIHRoaXMuZ3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpXG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmdyYXBoaWNzKVxuICB9XG4gIGluaXRpYWxpemUoKXtcbiAgICBjb25zb2xlLmxvZyhcIm1hcCBpbml0XCIpXG5cbiAgICAvLyBtb3ZlIHRoZSBzcHJpdGUgdCB0aGUgY2VudGVyIG9mIHRoZSBzY3JlZW5cbiAgICB0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi54ID0gMDtcbiAgICB0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi55ID0gMDtcbiAgICB0aGlzLmNhbWVyYT1bLTM2NSwtMjcwXVxuICAgIHRoaXMubWVhc3VyZT0wXG4gIH1cblxuICBhZGRDaGlsZChrZXksb2JqKXtcbiAgICB0aGlzLml0ZW1zW2tleV09b2JqXG4gIH1cblxuICBhbmltYXRlKCl7XG4gICAgdGhpcy5ncmFwaGljcy5jbGVhcigpXG4gICAgdmFyIGJhbGwgPSB0aGlzLml0ZW1zW1wiYmFsbFwiXVxuICAgIHZhciBzY2FsZT0wLjFcbiAgICBiYWxsLm1vdmVfZ3JvdW5kKHNjYWxlKVxuICAgIHZhciB4PSBiYWxsLnhcbiAgICB2YXIgeT0gYmFsbC55XG4gICAgdGhpcy5tZWFzdXJlICs9IE1hdGguc3FydChiYWxsLnggKiBiYWxsLnggKyBiYWxsLnkgKiBiYWxsLnkpXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5tZWFzdXJlKVxuICAgIC8vIGNvbnNvbGUubG9nKGJhbGwueSlcbiAgICAvLyB2YXIgc3RvcFg9ZmFsc2U7XG4gICAgLy8gdmFyIHN0b3BZPWZhbHNlO1xuICAgIGlmKHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggPiAtNzAwICYmIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggPCAwKXtcbiAgICAgIHRoaXMuY2FtZXJhWzBdLT1iYWxsLnZ4XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnkpXG4gICAgaWYodGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueTwwKXtcbiAgICAgIHRoaXMuY2FtZXJhWzFdLT1iYWxsLnZ5XG4gICAgfVxuICAgIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggPSB0aGlzLmNhbWVyYVswXVxuICAgIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnkgPSB0aGlzLmNhbWVyYVsxXVxuXG4gICAgLy8gdGhpcy5kaWZmWCA9IHRoaXMuZGlmZlggfHwgMFxuICAgIC8vXG4gICAgLy8gY29uc29sZS5sb2coeClcbiAgICAvLyAgICAgaWYodGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueCA+IC03MDAgJiYgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueCA8IDApe1xuICAgIC8vICAgICAgIGlmKHggPCA1MCl7eD01MDsgc3RvcFg9dHJ1ZX1cbiAgICAvLyAgICAgICBpZih4ID4gY29uZmlnLldJRFRILTUwKXt4PWNvbmZpZy5XSURUSC01MDtzdG9wWD10cnVlOyB9XG4gICAgLy8gICAgICAgaWYoc3RvcFgpe1xuICAgIC8vICAgICAgICAgIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggLT0gYmFsbC52eCB9XG4gICAgLy8gICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueClcbiAgICAvLyAgICAgfWVsc2V7XG4gICAgLy8gICAgICAgeCArPXRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnhcbiAgICAvLyAgICAgfVxuXG4gICAgLy8gaWYoeSA8IDUwKXt5PTUwO3N0b3BZPXRydWV9XG4gICAgLy8gaWYoeSA+IGNvbmZpZy5IRUlHSFQtNTApe3k9Y29uZmlnLkhFSUdIVC01MDtzdG9wWT10cnVlfVxuICAgIC8vIGlmKHN0b3BZKXsgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueSAtPSBiYWxsLnZ5IH1cblxuICAgIGlmKHRoaXMuaXRlbXNbXCJiYWxsXCJdKSB0aGlzLml0ZW1zW1wiYmFsbFwiXS5kcmF3X2dyb3VuZChcbiAgICAgIHRoaXMuZ3JhcGhpY3MsXG4gICAgICB4LFxuICAgICAgeSxcbiAgICAgIGJhbGwucmFkaXVzKVxuICAgIH1cbiAgfVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2VIb21lIHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLml0ZW1zPVtdXG4gICAgdGhpcy5zdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpXG4gICAgdGhpcy5ncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKClcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuZ3JhcGhpY3MpXG4gICAgdGhpcy5iZyA9IG5ldyBQSVhJLlNwcml0ZShQSVhJLlRleHR1cmUuZnJvbUltYWdlKFwiaW1hZ2UvYmFja2dyb3VuZF9ob21lLnBuZ1wiKSk7XG4gICAgdGhpcy5iZy5wb3NpdGlvbi54ID0gMDtcbiAgICB0aGlzLmJnLnBvc2l0aW9uLnkgPSAwO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGRBdCh0aGlzLmJnLDApO1xuXG4gICAgbGV0IHNlbGY9dGhpc1xuICAgIFBJWEkubG9hZGVyXG4gICAgICAgIC5hZGQoJ3N1YmFydScsICcvaW1hZ2Uvc3ByaXRlc2hlZXQuanNvbicpXG4gICAgICAgIC5hZGQoJ3BpdGNoZXInLCAnL2ltYWdlL3BpdGNoZXIuanNvbicpXG4gICAgICAgIC5sb2FkKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyIHBpdGNoZXJfdGV4dHVyZXMgPSBbXVxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHZhciBwaXRjaGVyX3RleHR1cmUgPSBQSVhJLlRleHR1cmUuZnJvbUZyYW1lKCdwaWNoZXJfMCcgKyAoaSsxKSArICcucG5nJyk7XG4gICAgICAgICAgICBwaXRjaGVyX3RleHR1cmVzLnB1c2gocGl0Y2hlcl90ZXh0dXJlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VsZi5waXRjaGVyX21vdmllID0gbmV3IFBJWEkuZXh0cmFzLk1vdmllQ2xpcChwaXRjaGVyX3RleHR1cmVzKTtcbiAgICAgICAgICBzZWxmLnBpdGNoZXJfbW92aWUucG9zaXRpb24ueD0xMTBcbiAgICAgICAgICBzZWxmLnBpdGNoZXJfbW92aWUucG9zaXRpb24ueT03MFxuICAgICAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS53aWR0aD0xMDBcbiAgICAgICAgICBzZWxmLnBpdGNoZXJfbW92aWUuaGVpZ2h0PTEwMFxuICAgICAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS5hbmltYXRpb25TcGVlZCA9IDAuMDU7XG4gICAgICAgICAgc2VsZi5waXRjaGVyX21vdmllLmxvb3AgPSBmYWxzZTtcbiAgICAgICAgICBzZWxmLnBpdGNoZXJfbW92aWUuZ290b0FuZFBsYXkoMCk7XG5cbiAgICAgICAgICB2YXIgdGV4dHVyZXMgPSBbXVxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gUElYSS5UZXh0dXJlLmZyb21GcmFtZSgnYmF0XzAnICsgKGkrMSkgKyAnLnBuZycpO1xuICAgICAgICAgICAgdGV4dHVyZXMucHVzaCh0ZXh0dXJlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VsZi5iYXR0ZXJfbW92aWUgPSBuZXcgUElYSS5leHRyYXMuTW92aWVDbGlwKHRleHR1cmVzKTtcblxuICAgICAgICAgIHNlbGYuYmF0dGVyX21vdmllLnBvc2l0aW9uLng9MTUwXG4gICAgICAgICAgc2VsZi5iYXR0ZXJfbW92aWUucG9zaXRpb24ueT0yMDBcbiAgICAgICAgICBzZWxmLmJhdHRlcl9tb3ZpZS53aWR0aD0yMDBcbiAgICAgICAgICBzZWxmLmJhdHRlcl9tb3ZpZS5oZWlnaHQ9MjAwXG4gICAgICAgICAgc2VsZi5iYXR0ZXJfbW92aWUubG9vcD1mYWxzZVxuICAgICAgICAgIC8vIHNlbGYuYmF0dGVyX21vdmllLm9uQ29tcGxldGUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAvLyAgIHNldFRpbWVvdXQoZnVudGlvbigpe1xuICAgICAgICAgIC8vICAgICBzZWxmLmJhdHRlcl9tb3ZpZS5nb3RvQW5kU3RvcCgwKVxuICAgICAgICAgIC8vICAgfSw1MDApXG4gICAgICAgICAgLy8gfSlcblxuICAgICAgICAgIHNlbGYuYmF0dGVyX21vdmllLmFuaW1hdGlvblNwZWVkID0gMC41O1xuXG4gICAgICAgICAgc2VsZi5iYXR0ZXJfbW92aWUuZ290b0FuZFN0b3AoMCk7XG4gICAgICAgICAgc2VsZi5zdGFnZS5hZGRDaGlsZChzZWxmLmJhdHRlcl9tb3ZpZSk7XG4gICAgICAgICAgc2VsZi5zdGFnZS5hZGRDaGlsZChzZWxmLnBpdGNoZXJfbW92aWUpO1xuICAgICAgICB9KTtcblxuXG4gICAgICB9XG5cbiAgICAgIGFkZENoaWxkKGtleSxvYmope1xuICAgICAgICB0aGlzLml0ZW1zW2tleV09b2JqXG4gICAgICB9XG5cbiAgICAgIGJhbGwoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXNbXCJiYWxsXCJdXG4gICAgICB9XG4gICAgICBiYXQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXNbXCJiYXRcIl1cbiAgICAgIH1cbiAgICAgIHBpdGNoKGJhbGwpe1xuICAgICAgICBjb25zb2xlLmxvZyhcInBpdGNoXCIpXG4gICAgICAgIHRoaXMucGl0Y2hlZD1mYWxzZVxuICAgICAgICB2YXIgc2VsZj10aGlzXG4gICAgICAgIHRoaXMucGl0Y2hlcl9tb3ZpZS5nb3RvQW5kUGxheSgwKVxuICAgICAgICB0aGlzLm9uUGl0Y2g9ZnVuY3Rpb24oKXtcbiAgICAgICAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwiYmFsbFwiKVxuICAgICAgICAgIHNlbGYuYWRkQ2hpbGQoXCJiYWxsXCIsYmFsbClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzd2luZyhzdWNjZXNzKXtcbiAgICAgICAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwic3dpbmdcIilcbiAgICAgICAgY29uc29sZS5sb2coXCJzd2luZ1wiKVxuICAgICAgICB0aGlzLnN1Y2Nlc3M9c3VjY2Vzc1xuICAgICAgICB0aGlzLmhpdGVkPWZhbHNlXG4gICAgICAgIHRoaXMuYmF0dGVyX21vdmllLmdvdG9BbmRQbGF5KDApXG4gICAgICB9XG5cbiAgICAgIGFuaW1hdGVfYmF0dGVyKCl7XG4gICAgICAgIGlmKHRoaXMuaGl0ZWQ9PWZhbHNlICYmIHRoaXMuYmF0dGVyX21vdmllLmN1cnJlbnRGcmFtZT09Myl7XG4gICAgICAgICAgaWYodGhpcy5iYXQoKS5oaXRDaGVjayh0aGlzLmJhbGwoKSkpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoaXRcIilcbiAgICAgICAgICAgIHRoaXMuaGl0ZWQ9dHJ1ZVxuICAgICAgICAgICAgdGhpcy5iYWxsKCkuaGl0KClcbiAgICAgICAgICAgIHRoaXMuc3VjY2VzcygpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGFuaW1hdGVfcGl0Y2hlcigpe1xuICAgICAgICBpZih0aGlzLnBpdGNoZWQpcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmKHRoaXMucGl0Y2hlcl9tb3ZpZS5jdXJyZW50RnJhbWU9PTMpe1xuICAgICAgICAgIHRoaXMucGl0Y2hlZD10cnVlXG4gICAgICAgICAgdGhpcy5vblBpdGNoKClcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIGFuaW1hdGUoKXtcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jbGVhcigpXG4gICAgICAgIGlmKHRoaXMuYmF0dGVyX21vdmllKXt0aGlzLmFuaW1hdGVfYmF0dGVyKCkgfVxuICAgICAgICBpZih0aGlzLnBpdGNoZXJfbW92aWUpe3RoaXMuYW5pbWF0ZV9waXRjaGVyKCkgfVxuXG4gICAgICAgIGZvcih2YXIgaSBpbiB0aGlzLml0ZW1zKXtcbiAgICAgICAgICBpZih0aGlzLml0ZW1zW2ldLm1vdmUoKSl7XG4gICAgICAgICAgICB0aGlzLml0ZW1zW2ldLmRyYXcodGhpcy5ncmFwaGljcyk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLml0ZW1zW2ldLmNsZWFyKHRoaXMuZ3JhcGhpY3MpXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5pdGVtc1tpXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiJdfQ==
