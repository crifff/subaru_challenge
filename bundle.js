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
      this.z = this.defaults["z"] || 0;
      this.vx = this.defaults["vx"] || 0;
      this.vy = this.defaults["vy"] || 0;
      this.vz = this.defaults["vz"] || 0;
      this.angle = this.defaults["angle"] || Math.PI / 2;
      this.zAngle = this.defaults["zAngle"] || Math.PI / 2;
      this.speed = this.defaults["speed"] || 0;
      this.radius = this.defaults["radius"] || 0;
      this.onSpeedZero = this.defaults["onSpeedZero"] || function () {};
      this.onFirstBound = this.defaults["onFirstBound"] || function () {};
      this.stoped = false;
    }
  }, {
    key: "hit",
    value: function hit() {
      var min = Math.PI;
      var max = Math.PI * 2;
      this.angle = Math.random() * (max - min) + min;
      this.speed = 60;

      var zmin = 280;
      var zmax = 360;
      this.zAngle = (Math.random() * (zmax - zmin) + zmin) * Math.PI / 180;
      this.vz = Math.sin(this.zAngle) * this.speed;
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
      if (this.z <= 0) {
        this.z = 0;
        this.speed *= 0.9;
        this.vz *= -0.5;
      }
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
        y: 300,
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
      }, 1000);
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

      if (stages["home"].items["ball"].y >= config.HEIGHT + 20) {
        delete stages["home"].items["ball"];
        setTimeout(function () {

          createjs.Sound.play("strike");
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

    var texture = PIXI.Texture.fromImage("image/ballpark2.gif");
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
      this.ground_image.position.x = -300;
      this.ground_image.position.y = -300;
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
      var stopX = false;
      var stopY = false;

      if (x < 50) {
        x = 50;stopX = true;
      }
      if (x > config.WIDTH - 50) {
        x = config.WIDTH - 50;stopX = true;
      }
      if (stopX) {
        this.ground_image.position.x -= ball.vx;
      }
      if (y < 50) {
        y = 50;stopY = true;
      }
      if (y > config.HEIGHT - 50) {
        y = config.HEIGHT - 50;stopY = true;
      }
      if (stopY) {
        this.ground_image.position.y -= ball.vy;
      }

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9iYWxsLmVzNiIsIi9Vc2Vycy9ob3NzeS9wcm9qZWN0L3N1YmFydV9jaGFsbGVuZ2UvZXM2L2JhdC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9jb25maWcuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvZ2FtZS5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zb3VuZC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zdGFnZV9ncm91bmQuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvc3RhZ2VfaG9tZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7eUJDQXdCLGNBQWM7O0lBQTFCLE1BQU07O0lBRUcsSUFBSTtBQUNaLFdBRFEsSUFBSSxDQUNYLFFBQVEsRUFBQzswQkFERixJQUFJOztBQUVyQixRQUFJLENBQUMsUUFBUSxHQUFDLFFBQVEsQ0FBQTtBQUN0QixRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDbkI7O2VBSmtCLElBQUk7O1dBTWIsc0JBQUU7QUFDVixVQUFJLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFBO0FBQzdCLFVBQUksQ0FBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDN0IsVUFBSSxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFFLENBQUMsQ0FB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QUFBO09BQUU7O0FBRS9DLFdBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBQztBQUN0QixZQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUM7QUFDdEIsY0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25DLE1BQUk7QUFDSCxjQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDbEMsaUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNyQjtPQUNGO0tBQ0Y7OztTQTFIYyxTQUFTOzs7cUJBQVQsU0FBUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGx7XG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRzKXtcbiAgICB0aGlzLmRlZmF1bHRzPWRlZmF1bHRzXG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICBpbml0aWFsaXplKCl7XG4gICAgdGhpcy54ID10aGlzLmRlZmF1bHRzW1wieFwiXXx8MFxuICAgIHRoaXMueSA9dGhpcy5kZWZhdWx0c1tcInlcIl18fDBcbiAgICB0aGlzLnogPXRoaXMuZGVmYXVsdHNbXCJ6XCJdfHwwXG4gICAgdGhpcy52eCA9dGhpcy5kZWZhdWx0c1tcInZ4XCJdfHwwXG4gICAgdGhpcy52eSA9dGhpcy5kZWZhdWx0c1tcInZ5XCJdfHwwXG4gICAgdGhpcy52eiA9dGhpcy5kZWZhdWx0c1tcInZ6XCJdfHwwXG4gICAgdGhpcy5hbmdsZSA9IHRoaXMuZGVmYXVsdHNbXCJhbmdsZVwiXXx8TWF0aC5QSS8yXG4gICAgdGhpcy56QW5nbGUgPSB0aGlzLmRlZmF1bHRzW1wiekFuZ2xlXCJdfHxNYXRoLlBJLzJcbiAgICB0aGlzLnNwZWVkID0gdGhpcy5kZWZhdWx0c1tcInNwZWVkXCJdfHwwXG4gICAgdGhpcy5yYWRpdXMgPSB0aGlzLmRlZmF1bHRzW1wicmFkaXVzXCJdfHwwXG4gICAgdGhpcy5vblNwZWVkWmVybyA9IHRoaXMuZGVmYXVsdHNbXCJvblNwZWVkWmVyb1wiXSB8fCBmdW5jdGlvbigpe31cbiAgICB0aGlzLm9uRmlyc3RCb3VuZCA9IHRoaXMuZGVmYXVsdHNbXCJvbkZpcnN0Qm91bmRcIl0gfHwgZnVuY3Rpb24oKXt9XG4gICAgdGhpcy5zdG9wZWQ9ZmFsc2VcbiAgfVxuXG4gIGhpdCgpe1xuICAgIGxldCBtaW49TWF0aC5QSVxuICAgIGxldCBtYXg9TWF0aC5QSSoyXG4gICAgdGhpcy5hbmdsZT0oIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSApICsgbWluO1xuICAgIHRoaXMuc3BlZWQgPTYwXG5cbiAgICBsZXQgem1pbj0yODBcbiAgICBsZXQgem1heD0zNjBcbiAgICB0aGlzLnpBbmdsZT0oKCBNYXRoLnJhbmRvbSgpICogKHptYXggLSB6bWluKSApICsgem1pbikgKiBNYXRoLlBJLzE4MDtcbiAgICB0aGlzLnZ6ID0gTWF0aC5zaW4odGhpcy56QW5nbGUpICogdGhpcy5zcGVlZFxuICB9XG5cbiAgbW92ZSgpe1xuICAgIHRoaXMudnkgPSBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWRcbiAgICB0aGlzLnZ4ID0gTWF0aC5jb3ModGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkXG4gICAgdGhpcy55ICs9IHRoaXMudnlcbiAgICB0aGlzLnggKz0gdGhpcy52eFxuICAgIHRoaXMucmFkaXVzID0gdGhpcy55LzMwXG4gICAgLy8gaWYodGhpcy55ID4gY29uZmlnLkhFSUdIVCl7XG5cbiAgICAvLyAgIHJldHVybiBmYWxzZVxuICAgIC8vIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBtb3ZlX2dyb3VuZChzY2FsZSl7XG4gICAgdGhpcy52eSA9IE1hdGguc2luKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZCpzY2FsZVxuICAgIHRoaXMudnggPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQqc2NhbGVcbiAgICB0aGlzLnZ6IC09IDAuNjhcbiAgICB0aGlzLnkgKz0gdGhpcy52eVxuICAgIHRoaXMueCArPSB0aGlzLnZ4XG4gICAgdGhpcy56ICs9IHRoaXMudnpcbiAgICBpZih0aGlzLno8PTApe1xuICAgICAgdGhpcy56PTBcbiAgICAgIHRoaXMuc3BlZWQqPTAuOVxuICAgICAgdGhpcy52eio9LTAuNVxuICAgIH1cbiAgICB2YXIgY29mPTMwXG4gICAgaWYodGhpcy56L2NvZjwzKXt0aGlzLnJhZGl1cyA9IDN9XG4gICAgZWxzZSBpZih0aGlzLnovY29mPjEwKXt0aGlzLnJhZGl1cz0xMH1cbiAgICBlbHNle3RoaXMucmFkaXVzPXRoaXMuei9jb2Z9XG4gICAgLy9cbiAgICAvLyBpZih0aGlzLnkgPiBjb25maWcuSEVJR0hUKXtcbiAgICAvLyAgIHJldHVybiBmYWxzZVxuICAgIC8vIH1cbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNwZWVkKVxuICAgIGlmKHRoaXMuc3RvcGVkPT1mYWxzZSAmJiB0aGlzLnNwZWVkIDwgMC4xKXtcbiAgICAgIHRoaXMuc3RvcGVkPXRydWVcbiAgICAgIHRoaXMuc3BlZWQ9MFxuICAgICAgdGhpcy5vblNwZWVkWmVybygpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGNsZWFyKGdyYXBoaWMpe1xuICAgIGdyYXBoaWMuY2xlYXIoKVxuICB9XG4gIGRyYXcoZ3JhcGhpYyl7XG4gICAgLy8gdGhpcy5jbGVhcihncmFwaGljKTtcbiAgICBncmFwaGljLmxpbmVTdHlsZSgwKVxuICAgIGdyYXBoaWMuYmVnaW5GaWxsKDB4RkZGRkZGKVxuICAgIGdyYXBoaWMuZHJhd0NpcmNsZShcbiAgICAgIHRoaXMueCxcbiAgICAgIHRoaXMueSxcbiAgICAgIHRoaXMucmFkaXVzXG4gICAgKVxuICAgIGdyYXBoaWMuZW5kRmlsbCgpXG4gIH1cblxuICBkcmF3X2dyb3VuZChncmFwaGljLHgseSxyYWRpdXMpe1xuICAgIC8vIHRoaXMuY2xlYXIoZ3JhcGhpYyk7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy54KnNjYWxlK29mZnNldF94LHRoaXMueSpzY2FsZStvZmZzZXRfeSlcbiAgICBncmFwaGljLmxpbmVTdHlsZSgwKVxuICAgIGdyYXBoaWMuYmVnaW5GaWxsKDB4RkZGRkZGKVxuICAgIGdyYXBoaWMuZHJhd0NpcmNsZSh4LHkscmFkaXVzIClcbiAgICBncmFwaGljLmVuZEZpbGwoKVxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhdHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLmRlZmF1bHRzPXtcbiAgICAgIHg6IDE1MCxcbiAgICAgIHk6IDI4MCxcbiAgICAgIHdpZHRoOiA2MCxcbiAgICAgIGhlaWdodDogNjBcbiAgICB9XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICBpbml0aWFsaXplKCl7XG4gICAgdGhpcy54ID10aGlzLmRlZmF1bHRzW1wieFwiXVxuICAgIHRoaXMueSA9dGhpcy5kZWZhdWx0c1tcInlcIl1cbiAgICB0aGlzLndpZHRoID0gdGhpcy5kZWZhdWx0c1tcIndpZHRoXCJdXG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmRlZmF1bHRzW1wiaGVpZ2h0XCJdXG4gIH1cblxuICBoaXRDaGVjayhiYWxsKXtcbiAgICBpZighYmFsbClyZXR1cm4gZmFsc2U7XG4gICAgaWYoXG4gICAgICB0aGlzLnggPCBiYWxsLnggJiZcbiAgICAgIGJhbGwueCA8IHRoaXMueCArIHRoaXMud2lkdGggJiZcbiAgICAgICAgdGhpcy55IDwgYmFsbC55ICYmXG4gICAgICAgIGJhbGwueSA8IHRoaXMueSArIHRoaXMuaGVpZ2h0XG4gICAgKXtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIG1vdmUoKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNsZWFyKGdyYXBoaWMpe1xuICAgIGdyYXBoaWMuY2xlYXIoKVxuICB9XG4gIGRyYXcoZ3JhcGhpYyl7XG4gICAgLy8gdGhpcy5jbGVhcihncmFwaGljKTtcbiAgICBncmFwaGljLmxpbmVTdHlsZSgyLCAweEZGMDAwMCk7XG4gICAgZ3JhcGhpYy5kcmF3UmVjdChcbiAgICAgIHRoaXMueCxcbiAgICAgIHRoaXMueSxcbiAgICAgIHRoaXMud2lkdGgsXG4gICAgICB0aGlzLmhlaWdodFxuICAgICAgKVxuICB9XG5cbn1cbiIsImV4cG9ydCBjb25zdCBXSURUSD0zMjBcbmV4cG9ydCBjb25zdCBIRUlHSFQ9NDgwXG5leHBvcnQgY29uc3QgU1RBVEVTPXtcbiAgU1RBUlQ6IDAsXG4gIFRIUk9XOiAxLFxuICBISVQ6IDIsXG4gIEJPVU5EOiAzXG59XG4iLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5pbXBvcnQgXCIuL3NvdW5kLmVzNlwiXG5pbXBvcnQgQmFsbCBmcm9tIFwiLi9iYWxsLmVzNlwiXG5pbXBvcnQgQmF0IGZyb20gXCIuL2JhdC5lczZcIlxuaW1wb3J0IEhvbWUgZnJvbSBcIi4vc3RhZ2VfaG9tZS5lczZcIlxuaW1wb3J0IEdyb3VuZCBmcm9tIFwiLi9zdGFnZV9ncm91bmQuZXM2XCJcblxudmFyIGN1cnJlbnRfc3RhdGU9Y29uZmlnLlNUQVRFU1tcIlNUQVJUXCJdXG5cbnZhciByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKGNvbmZpZy5XSURUSCwgY29uZmlnLkhFSUdIVCx7IGFudGlhbGlhczogdHJ1ZSB9KTtcbnJlbmRlcmVyLnZpZXcuc3R5bGUud2lkdGggPSBjb25maWcuV0lEVEggKyBcInB4XCJcbnJlbmRlcmVyLnZpZXcuc3R5bGUuaGVpZ2h0ID0gY29uZmlnLkhFSUdIVCArIFwicHhcIlxucmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpXG5cbnZhciBzdGFnZXM9e31cbnN0YWdlc1tcImhvbWVcIl0gPSBuZXcgSG9tZSgpXG5zdGFnZXNbXCJncm91bmRcIl0gPSBuZXcgR3JvdW5kKClcbi8vIHZhciBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpXG52YXIgZ3JvdW5kID0gbmV3IFBJWEkuQ29udGFpbmVyKClcbnZhciBjdXJyZW50X3N0YWdlID0gXCJob21lXCJcbi8vc3RhZ2UuaW50ZXJhY3RpdmUgPSB0cnVlXG5cbi8vdmFyIHRoaW5nID0gbmV3IFBJWEkuR3JhcGhpY3MoKVxuLy9zdGFnZS5hZGRDaGlsZCh0aGluZylcblxuLy8gc3RhZ2Uub24oJ2NsaWNrJywgb25DbGljaylcbi8vIHN0YWdlLm9uKCd0YXAnLCBvbkNsaWNrKVxuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gIHRocm93QmFsbCgpXG59LCAxMDAwKTtcblxudmFyIGl0ZW1zPXt9XG5mdW5jdGlvbiBvbkNsaWNrKCl7XG4gIC8vIHN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLmdvdG9BbmRQbGF5KDApXG4gIGlmKGN1cnJlbnRfc3RhdGUgPT0gY29uZmlnLlNUQVRFU1tcIlRIUk9XXCJdKXtcbiAgICBzdGFnZXNbXCJob21lXCJdLnN3aW5nKGZ1bmN0aW9uKCl7XG4gICAgICBjdXJyZW50X3N0YXRlID0gY29uZmlnLlNUQVRFU1tcIkhJVFwiXVxuXG4gICAgICB2YXIgYmFsbCA9IHN0YWdlc1tcImhvbWVcIl0uaXRlbXNbXCJiYWxsXCJdXG4gICAgICBjb25zb2xlLmxvZyhiYWxsKVxuICAgICAgc3RhZ2VzW1wiZ3JvdW5kXCJdLmFkZENoaWxkKFwiYmFsbFwiLCAgbmV3IEJhbGwoe1xuICAgICAgICB4OiBjb25maWcuV0lEVEggLyAyLFxuICAgICAgICB5OiAzMDAsXG4gICAgICAgIGFuZ2xlOiBiYWxsLmFuZ2xlLFxuICAgICAgICBzcGVlZDogYmFsbC5zcGVlZCxcbiAgICAgICAgdng6IGJhbGwudngsXG4gICAgICAgIHZ5OiBiYWxsLnZ5LFxuICAgICAgICB2ejogYmFsbC52eixcbiAgICAgICAgb25TcGVlZFplcm86ZnVuY3Rpb24oKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInNwZWVkIHplcm9cIilcbiAgICAgICAgICBkZWxldGUgc3RhZ2VzW1wiZ3JvdW5kXCJdLmluaXRpYWxpemUoKVxuICAgICAgICAgIGN1cnJlbnRfc3RhdGUgPSBjb25maWcuU1RBVEVTW1wiU1RBUlRcIl1cbiAgICAgICAgICBjdXJyZW50X3N0YWdlID0gXCJob21lXCJcbiAgICAgICAgICBzZXRUaW1lb3V0KHRocm93QmFsbCwxMDAwKVxuICAgICAgICB9XG4gICAgICB9KSlcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBjdXJyZW50X3N0YWdlPVwiZ3JvdW5kXCJcbiAgICAgIH0sMTAwMClcbiAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJoaXRcIilcbiAgICB9KVxuXG5cbiAgfVxufVxuZnVuY3Rpb24gdGhyb3dCYWxsKClcbntcbiAgaWYoY3VycmVudF9zdGF0ZSAhPSBjb25maWcuU1RBVEVTW1wiU1RBUlRcIl0pIHtyZXR1cm4gdHJ1ZX1cbiAgY29uc29sZS5sb2coXCJ0aHJvd1wiKVxuICB2YXIgYmFsbCA9bmV3IEJhbGwoe3g6Y29uZmlnLldJRFRILzItMjAgLHk6MTAwICxhbmdsZTpNYXRoLzIsc3BlZWQ6Nn0pXG5cbiAgc3RhZ2VzW1wiaG9tZVwiXS5waXRjaChiYWxsKVxuICBjdXJyZW50X3N0YXRlPWNvbmZpZy5TVEFURVNbXCJUSFJPV1wiXVxufVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLG9uQ2xpY2spXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLG9uQ2xpY2spXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLGtleWRvd24pXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIixrZXl1cClcbnZhciB2eD0wXG52YXIgdnk9MFxuZnVuY3Rpb24ga2V5dXAoZXZlbnQpe1xuICBpZihldmVudC5rZXlDb2RlPT0zNyl7IHZ4PTAgfVxuICBpZihldmVudC5rZXlDb2RlPT0zOCl7IHZ5PTAgfVxuICBpZihldmVudC5rZXlDb2RlPT0zOSl7IHZ4PTAgfVxuICBpZihldmVudC5rZXlDb2RlPT00MCl7IHZ5PTAgfVxufVxuZnVuY3Rpb24ga2V5ZG93bihldmVudCl7XG4gIHZhciB2PTFcbiAgaWYoZXZlbnQua2V5Q29kZT09MTN8fGV2ZW50LmtleUNvZGU9PTMyKXsgcmV0dXJuIG9uQ2xpY2soKSB9XG4gIGlmKGV2ZW50LmtleUNvZGU9PTM3KXsgdng9LXYgfVxuICBpZihldmVudC5rZXlDb2RlPT0zOCl7IHZ5PS12IH1cbiAgaWYoZXZlbnQua2V5Q29kZT09MzkpeyB2eD12IH1cbiAgaWYoZXZlbnQua2V5Q29kZT09NDApeyB2eT12IH1cbn1cbmZ1bmN0aW9uIG1vdmUoKXtcbiAgaWYoIXN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllKXtyZXR1cm4gZmFsc2V9XG4gIHN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLnBvc2l0aW9uLngrPXZ4XG4gIHN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLnBvc2l0aW9uLnkrPXZ5XG4gIHN0YWdlc1tcImhvbWVcIl0uaXRlbXNbXCJiYXRcIl0ueCs9dnhcbiAgc3RhZ2VzW1wiaG9tZVwiXS5pdGVtc1tcImJhdFwiXS55Kz12eVxufVxuLy8gcnVuIHRoZSByZW5kZXIgbG9vcFxuc3RhZ2VzW1wiaG9tZVwiXS5hZGRDaGlsZChcImJhdFwiLG5ldyBCYXQoKSlcbnZhciBtZXRlciA9IG5ldyBGUFNNZXRlcigpO1xudmFyIGdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKVxuLy8gc3RhZ2UuYWRkQ2hpbGQoZ3JhcGhpY3MpXG5cblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgaWYoY3VycmVudF9zdGF0ZT09Y29uZmlnLlNUQVRFU1tcIlRIUk9XXCJdKXtcbiAgICBpZihzdGFnZXNbXCJob21lXCJdLml0ZW1zW1wiYmFsbFwiXSl7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzdGFnZXNbXCJob21lXCJdLml0ZW1zW1wiYmFsbFwiXS55KVxuXG4gICAgICBpZihzdGFnZXNbXCJob21lXCJdLml0ZW1zW1wiYmFsbFwiXS55ID49IGNvbmZpZy5IRUlHSFQrMjApe1xuICAgICAgICBkZWxldGUgc3RhZ2VzW1wiaG9tZVwiXS5pdGVtc1tcImJhbGxcIl1cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwic3RyaWtlXCIpXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZXNldFwiKVxuICAgICAgICAgIGN1cnJlbnRfc3RhdGU9Y29uZmlnLlNUQVRFU1tcIlNUQVJUXCJdXG4gICAgICAgICAgdGhyb3dCYWxsKClcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG1vdmUoKVxuICBzdGFnZXNbY3VycmVudF9zdGFnZV0uYW5pbWF0ZSgpXG4gIHJlbmRlcmVyLnJlbmRlcihzdGFnZXNbY3VycmVudF9zdGFnZV0uc3RhZ2UpXG4gIG1ldGVyLnRpY2soKTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBhbmltYXRlIClcbn1cbnJlcXVlc3RBbmltYXRpb25GcmFtZSggYW5pbWF0ZSApXG4iLCJsZXQgcXVldWUgPSBuZXcgY3JlYXRlanMuTG9hZFF1ZXVlKGZhbHNlKVxucXVldWUuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZClcbmxldCBsb2FkU291bmRDb21wbGV0ZT1mdW5jdGlvbigpe1xuXG59O1xucXVldWUuYWRkRXZlbnRMaXN0ZW5lcihcImNvbXBsZXRlXCIsbG9hZFNvdW5kQ29tcGxldGUpXG52YXIgbWFuaWZlc3QgPSBbXG4gIHtzcmM6XCIvc291bmQvbnl1My5tcDNcIiwgaWQ6XCJiYWxsXCJ9LFxuICB7c3JjOlwiL3NvdW5kL3N0cmlrZTEubXAzXCIsIGlkOlwiaGl0XCJ9LFxuICB7c3JjOlwiL3NvdW5kL2hpdHRpbmcubXAzXCIsIGlkOlwic3RyaWtlXCJ9LFxuICB7c3JjOlwiL3NvdW5kL3N3aW5nLm1wM1wiLCBpZDpcInN3aW5nXCJ9LFxuXVxucXVldWUubG9hZE1hbmlmZXN0KG1hbmlmZXN0KVxuIiwiaW1wb3J0ICogYXMgY29uZmlnIGZyb20gXCIuL2NvbmZpZy5lczZcIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2VHcm91bmQge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuaXRlbXM9W11cbiAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKClcblxuICAgIHZhciB0ZXh0dXJlID0gUElYSS5UZXh0dXJlLmZyb21JbWFnZShcImltYWdlL2JhbGxwYXJrMi5naWZcIik7XG4gICAgLy8gY3JlYXRlIGEgbmV3IFNwcml0ZSB1c2luZyB0aGUgdGV4dHVyZVxuICAgIHRoaXMuZ3JvdW5kX2ltYWdlID0gbmV3IFBJWEkuU3ByaXRlKHRleHR1cmUpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpXG5cbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuZ3JvdW5kX2ltYWdlKTtcbiAgICB0aGlzLmdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKVxuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5ncmFwaGljcylcbiAgfVxuICBpbml0aWFsaXplKCl7XG4gICAgY29uc29sZS5sb2coXCJtYXAgaW5pdFwiKVxuICAgIFxuICAgIC8vIG1vdmUgdGhlIHNwcml0ZSB0IHRoZSBjZW50ZXIgb2YgdGhlIHNjcmVlblxuICAgIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggPSAtMzAwO1xuICAgIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnkgPSAtMzAwO1xuICB9XG5cbiAgYWRkQ2hpbGQoa2V5LG9iail7XG4gICAgdGhpcy5pdGVtc1trZXldPW9ialxuICB9XG5cbiAgYW5pbWF0ZSgpe1xuICAgIHRoaXMuZ3JhcGhpY3MuY2xlYXIoKVxuICAgIHZhciBiYWxsID0gdGhpcy5pdGVtc1tcImJhbGxcIl1cbiAgICB2YXIgc2NhbGU9MC4xXG4gICAgYmFsbC5tb3ZlX2dyb3VuZChzY2FsZSlcbiAgICB2YXIgeD0gYmFsbC54XG4gICAgdmFyIHk9IGJhbGwueVxuICAgIHZhciBzdG9wWD1mYWxzZTtcbiAgICB2YXIgc3RvcFk9ZmFsc2U7XG5cbiAgICBpZih4IDwgNTApe3g9NTA7IHN0b3BYPXRydWV9XG4gICAgaWYoeCA+IGNvbmZpZy5XSURUSC01MCl7eD1jb25maWcuV0lEVEgtNTA7c3RvcFg9dHJ1ZTsgfVxuICAgIGlmKHN0b3BYKXsgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueCAtPSBiYWxsLnZ4IH1cbiAgICBpZih5IDwgNTApe3k9NTA7c3RvcFk9dHJ1ZX1cbiAgICBpZih5ID4gY29uZmlnLkhFSUdIVC01MCl7eT1jb25maWcuSEVJR0hULTUwO3N0b3BZPXRydWV9XG4gICAgaWYoc3RvcFkpeyB0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi55IC09IGJhbGwudnkgfVxuXG4gICAgaWYodGhpcy5pdGVtc1tcImJhbGxcIl0pIHRoaXMuaXRlbXNbXCJiYWxsXCJdLmRyYXdfZ3JvdW5kKFxuICAgICAgdGhpcy5ncmFwaGljcyxcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgYmFsbC5yYWRpdXMpXG4gICAgfVxuICB9XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZUhvbWUge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuaXRlbXM9W11cbiAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKClcbiAgICB0aGlzLmdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKVxuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5ncmFwaGljcylcbiAgICB0aGlzLmJnID0gbmV3IFBJWEkuU3ByaXRlKFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UoXCJpbWFnZS9iYWNrZ3JvdW5kX2hvbWUucG5nXCIpKTtcbiAgICB0aGlzLmJnLnBvc2l0aW9uLnggPSAwO1xuICAgIHRoaXMuYmcucG9zaXRpb24ueSA9IDA7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZEF0KHRoaXMuYmcsMCk7XG5cbiAgICBsZXQgc2VsZj10aGlzXG4gICAgUElYSS5sb2FkZXJcbiAgICAgICAgLmFkZCgnc3ViYXJ1JywgJy9pbWFnZS9zcHJpdGVzaGVldC5qc29uJylcbiAgICAgICAgLmFkZCgncGl0Y2hlcicsICcvaW1hZ2UvcGl0Y2hlci5qc29uJylcbiAgICAgICAgLmxvYWQoZnVuY3Rpb24oKXtcbiAgICAgICAgICB2YXIgcGl0Y2hlcl90ZXh0dXJlcyA9IFtdXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspXG4gICAgICAgICAge1xuICAgICAgICAgICAgdmFyIHBpdGNoZXJfdGV4dHVyZSA9IFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUoJ3BpY2hlcl8wJyArIChpKzEpICsgJy5wbmcnKTtcbiAgICAgICAgICAgIHBpdGNoZXJfdGV4dHVyZXMucHVzaChwaXRjaGVyX3RleHR1cmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWxmLnBpdGNoZXJfbW92aWUgPSBuZXcgUElYSS5leHRyYXMuTW92aWVDbGlwKHBpdGNoZXJfdGV4dHVyZXMpO1xuICAgICAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS5wb3NpdGlvbi54PTExMFxuICAgICAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS5wb3NpdGlvbi55PTcwXG4gICAgICAgICAgc2VsZi5waXRjaGVyX21vdmllLndpZHRoPTEwMFxuICAgICAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS5oZWlnaHQ9MTAwXG4gICAgICAgICAgc2VsZi5waXRjaGVyX21vdmllLmFuaW1hdGlvblNwZWVkID0gMC4wNTtcbiAgICAgICAgICBzZWxmLnBpdGNoZXJfbW92aWUubG9vcCA9IGZhbHNlO1xuICAgICAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS5nb3RvQW5kUGxheSgwKTtcblxuICAgICAgICAgIHZhciB0ZXh0dXJlcyA9IFtdXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspXG4gICAgICAgICAge1xuICAgICAgICAgICAgdmFyIHRleHR1cmUgPSBQSVhJLlRleHR1cmUuZnJvbUZyYW1lKCdiYXRfMCcgKyAoaSsxKSArICcucG5nJyk7XG4gICAgICAgICAgICB0ZXh0dXJlcy5wdXNoKHRleHR1cmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWxmLmJhdHRlcl9tb3ZpZSA9IG5ldyBQSVhJLmV4dHJhcy5Nb3ZpZUNsaXAodGV4dHVyZXMpO1xuXG4gICAgICAgICAgc2VsZi5iYXR0ZXJfbW92aWUucG9zaXRpb24ueD0xNTBcbiAgICAgICAgICBzZWxmLmJhdHRlcl9tb3ZpZS5wb3NpdGlvbi55PTIwMFxuICAgICAgICAgIHNlbGYuYmF0dGVyX21vdmllLndpZHRoPTIwMFxuICAgICAgICAgIHNlbGYuYmF0dGVyX21vdmllLmhlaWdodD0yMDBcbiAgICAgICAgICBzZWxmLmJhdHRlcl9tb3ZpZS5sb29wPWZhbHNlXG4gICAgICAgICAgLy8gc2VsZi5iYXR0ZXJfbW92aWUub25Db21wbGV0ZShmdW5jdGlvbigpe1xuICAgICAgICAgIC8vICAgc2V0VGltZW91dChmdW50aW9uKCl7XG4gICAgICAgICAgLy8gICAgIHNlbGYuYmF0dGVyX21vdmllLmdvdG9BbmRTdG9wKDApXG4gICAgICAgICAgLy8gICB9LDUwMClcbiAgICAgICAgICAvLyB9KVxuXG4gICAgICAgICAgc2VsZi5iYXR0ZXJfbW92aWUuYW5pbWF0aW9uU3BlZWQgPSAwLjU7XG5cbiAgICAgICAgICBzZWxmLmJhdHRlcl9tb3ZpZS5nb3RvQW5kU3RvcCgwKTtcbiAgICAgICAgICBzZWxmLnN0YWdlLmFkZENoaWxkKHNlbGYuYmF0dGVyX21vdmllKTtcbiAgICAgICAgICBzZWxmLnN0YWdlLmFkZENoaWxkKHNlbGYucGl0Y2hlcl9tb3ZpZSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgIH1cblxuICAgICAgYWRkQ2hpbGQoa2V5LG9iail7XG4gICAgICAgIHRoaXMuaXRlbXNba2V5XT1vYmpcbiAgICAgIH1cblxuICAgICAgYmFsbCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1tcImJhbGxcIl1cbiAgICAgIH1cbiAgICAgIGJhdCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1tcImJhdFwiXVxuICAgICAgfVxuICAgICAgcGl0Y2goYmFsbCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicGl0Y2hcIilcbiAgICAgICAgdGhpcy5waXRjaGVkPWZhbHNlXG4gICAgICAgIHZhciBzZWxmPXRoaXNcbiAgICAgICAgdGhpcy5waXRjaGVyX21vdmllLmdvdG9BbmRQbGF5KDApXG4gICAgICAgIHRoaXMub25QaXRjaD1mdW5jdGlvbigpe1xuICAgICAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJiYWxsXCIpXG4gICAgICAgICAgc2VsZi5hZGRDaGlsZChcImJhbGxcIixiYWxsKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN3aW5nKHN1Y2Nlc3Mpe1xuICAgICAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJzd2luZ1wiKVxuICAgICAgICBjb25zb2xlLmxvZyhcInN3aW5nXCIpXG4gICAgICAgIHRoaXMuc3VjY2Vzcz1zdWNjZXNzXG4gICAgICAgIHRoaXMuaGl0ZWQ9ZmFsc2VcbiAgICAgICAgdGhpcy5iYXR0ZXJfbW92aWUuZ290b0FuZFBsYXkoMClcbiAgICAgIH1cblxuICAgICAgYW5pbWF0ZV9iYXR0ZXIoKXtcbiAgICAgICAgaWYodGhpcy5oaXRlZD09ZmFsc2UgJiYgdGhpcy5iYXR0ZXJfbW92aWUuY3VycmVudEZyYW1lPT0zKXtcbiAgICAgICAgICBpZih0aGlzLmJhdCgpLmhpdENoZWNrKHRoaXMuYmFsbCgpKSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhpdFwiKVxuICAgICAgICAgICAgdGhpcy5oaXRlZD10cnVlXG4gICAgICAgICAgICB0aGlzLmJhbGwoKS5oaXQoKVxuICAgICAgICAgICAgdGhpcy5zdWNjZXNzKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYW5pbWF0ZV9waXRjaGVyKCl7XG4gICAgICAgIGlmKHRoaXMucGl0Y2hlZClyZXR1cm4gZmFsc2VcbiAgICAgICAgaWYodGhpcy5waXRjaGVyX21vdmllLmN1cnJlbnRGcmFtZT09Myl7XG4gICAgICAgICAgdGhpcy5waXRjaGVkPXRydWVcbiAgICAgICAgICB0aGlzLm9uUGl0Y2goKVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgYW5pbWF0ZSgpe1xuICAgICAgICB0aGlzLmdyYXBoaWNzLmNsZWFyKClcbiAgICAgICAgaWYodGhpcy5iYXR0ZXJfbW92aWUpe3RoaXMuYW5pbWF0ZV9iYXR0ZXIoKSB9XG4gICAgICAgIGlmKHRoaXMucGl0Y2hlcl9tb3ZpZSl7dGhpcy5hbmltYXRlX3BpdGNoZXIoKSB9XG5cbiAgICAgICAgZm9yKHZhciBpIGluIHRoaXMuaXRlbXMpe1xuICAgICAgICAgIGlmKHRoaXMuaXRlbXNbaV0ubW92ZSgpKXtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZHJhdyh0aGlzLmdyYXBoaWNzKTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0uY2xlYXIodGhpcy5ncmFwaGljcylcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLml0ZW1zW2ldXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuIl19
