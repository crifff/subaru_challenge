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
      if (this.y > config.HEIGHT) {
        return false;
      }
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

      if (this.y > config.HEIGHT) {
        return false;
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
      x: 100,
      y: 300,
      width: 100,
      height: 100
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
      graphic.lineStyle(5, 0xFF0000);
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
// var renderer = PIXI.autoDetectRenderer(600, 480,{ antialias: true })
// document.body.appendChild(renderer.view)
// var stage = new PIXI.Container()
// var thing = new PIXI.Graphics()
// stage.addChild(thing)
// var x=300
// var y=100
// var angle=400*Math.PI/180
// var speed=10
// var vx=Math.cos(angle)*speed
// var vy=Math.sin(angle)*speed
// var g=0.68
// var restrection=0.6
// function animate() {
//   x+=vx
//   vy+=g
//   y+=vy
//   if(y>480){
//     y=480
//     vy *= -restrection
//   }
//   thing.clear()
//   thing.lineStyle(0)
//   thing.beginFill(0x00FFFF)
//   thing.drawCircle( x,y,10 )
//   thing.endFill()
//   renderer.render(stage)
// requestAnimationFrame( animate )
// }
// requestAnimationFrame( animate )
//
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

console.log(config);
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
}, 300);

var items = {};
function onClick() {
  stages["home"].movie.gotoAndPlay(0);
  if (current_state = "throw") {
    if (stages["home"].swing()) {

      current_state = config.STATES["HIT"];
      var ball = stages["home"].items["ball"];
      stages["ground"].addChild("ball", new _ballEs62["default"]({
        x: config.WIDTH / 2,
        y: 300,
        angle: ball.angle,
        speed: ball.speed,
        vx: ball.vx,
        vy: ball.vy,
        vz: ball.vz
      }));
      setTimeout(function () {
        current_stage = "ground";
      }, 1000);
      createjs.Sound.play("hit");
    }
  }
}
function throwBall() {
  if (current_state != config.STATES["START"]) {
    return true;
  }
  console.log("throw");
  createjs.Sound.play("ball");
  var ball = new _ballEs62["default"]({ x: config.WIDTH / 2, y: 50, angle: Math / 2, speed: 6 });

  stages["home"].addChild("ball", ball);
  current_state = config.STATES["THROW"];
}
document.addEventListener("mousedown", onClick);
document.addEventListener("touchstart", onClick);
// run the render loop
stages["home"].addChild("bat", new _batEs62["default"]());
var meter = new FPSMeter();
var graphics = new PIXI.Graphics();
// stage.addChild(graphics)

function animate() {
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
var manifest = [{ src: "/sound/nyu3.mp3", id: "ball" }, { src: "/sound/strike1.mp3", id: "hit" }];
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

    // center the sprites anchor point
    //  bunny.anchor.x = 0.5;
    //  bunny.anchor.y = 0.5;

    // move the sprite t the center of the screen
    this.ground_image.position.x = -300;
    this.ground_image.position.y = -300;

    this.stage.addChild(this.ground_image);
    this.graphics = new PIXI.Graphics();
    this.stage.addChild(this.graphics);
  }

  _createClass(StageGround, [{
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

      this.items["ball"].draw_ground(this.graphics, x, y, ball.radius);
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

    var self = this;
    PIXI.loader.add('subaru', '/image/spritesheet.json').load(function () {
      var textures = [];

      for (var i = 0; i < 5; i++) {
        var texture = PIXI.Texture.fromFrame('bat_0' + (i + 1) + '.png');
        textures.push(texture);
      }
      self.movie = new PIXI.extras.MovieClip(textures);

      self.movie.position.x = 150;
      self.movie.position.y = 200;
      self.movie.width = 200;
      self.movie.height = 200;
      self.movie.loop = false;
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
    key: 'swing',
    value: function swing() {
      if (this.bat().hitCheck(this.ball())) {
        this.ball().hit();
        return true;
      }
      return false;
    }
  }, {
    key: 'animate',
    value: function animate() {
      this.graphics.clear();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9iYWxsLmVzNiIsIi9Vc2Vycy9ob3NzeS9wcm9qZWN0L3N1YmFydV9jaGFsbGVuZ2UvZXM2L2JhdC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9jb25maWcuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvZ2FtZS5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zb3VuZC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zdGFnZV9ncm91bmQuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvc3RhZ2VfaG9tZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7eUJDQXdCLGNBQWM7O0lBQTFCLE1BQU07O0lBRUcsSUFBSTtBQUNaLFdBRFEsSUFBSSxDQUNYLFFBQVEsRUFBQzswQkFERixJQUFJOztBQUVyQixRQUFJLENBQUMsUUFBUSxHQUFDLFFBQVEsQ0FBQTtBQUN0QixRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDbkI7O2VBSmtCLElBQUk7O1dBTWIsc0JBQUU7QUFDVixVQUFJLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFBO0FBQzdCLFVBQUksQ0FBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDN0IsVUFBSSxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFFLENBQUMsQ0FB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QUksRUFBRSxFQUFDO0FBQ3RCLGNBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQyxNQUFJO0FBQ0gsY0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ2xDLGlCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDckI7T0FDRjtLQUNGOzs7U0F4RWMsU0FBUzs7O3FCQUFULFNBQVMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgY29uZmlnIGZyb20gXCIuL2NvbmZpZy5lczZcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWxse1xuICBjb25zdHJ1Y3RvcihkZWZhdWx0cyl7XG4gICAgdGhpcy5kZWZhdWx0cz1kZWZhdWx0c1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpe1xuICAgIHRoaXMueCA9dGhpcy5kZWZhdWx0c1tcInhcIl18fDBcbiAgICB0aGlzLnkgPXRoaXMuZGVmYXVsdHNbXCJ5XCJdfHwwXG4gICAgdGhpcy56ID10aGlzLmRlZmF1bHRzW1wielwiXXx8MFxuICAgIHRoaXMudnggPXRoaXMuZGVmYXVsdHNbXCJ2eFwiXXx8MFxuICAgIHRoaXMudnkgPXRoaXMuZGVmYXVsdHNbXCJ2eVwiXXx8MFxuICAgIHRoaXMudnogPXRoaXMuZGVmYXVsdHNbXCJ2elwiXXx8MFxuICAgIHRoaXMuYW5nbGUgPSB0aGlzLmRlZmF1bHRzW1wiYW5nbGVcIl18fE1hdGguUEkvMlxuICAgIHRoaXMuekFuZ2xlID0gdGhpcy5kZWZhdWx0c1tcInpBbmdsZVwiXXx8TWF0aC5QSS8yXG4gICAgdGhpcy5zcGVlZCA9IHRoaXMuZGVmYXVsdHNbXCJzcGVlZFwiXXx8MFxuICAgIHRoaXMucmFkaXVzID0gdGhpcy5kZWZhdWx0c1tcInJhZGl1c1wiXXx8MFxuICB9XG5cbiAgaGl0KCl7XG4gICAgbGV0IG1pbj1NYXRoLlBJXG4gICAgbGV0IG1heD1NYXRoLlBJKjJcbiAgICB0aGlzLmFuZ2xlPSggTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICkgKyBtaW47XG4gICAgdGhpcy5zcGVlZCA9NjBcblxuICAgIGxldCB6bWluPTI4MFxuICAgIGxldCB6bWF4PTM2MFxuICAgIHRoaXMuekFuZ2xlPSgoIE1hdGgucmFuZG9tKCkgKiAoem1heCAtIHptaW4pICkgKyB6bWluKSAqIE1hdGguUEkvMTgwO1xuICAgIHRoaXMudnogPSBNYXRoLnNpbih0aGlzLnpBbmdsZSkgKiB0aGlzLnNwZWVkXG4gIH1cblxuICBtb3ZlKCl7XG4gICAgdGhpcy52eSA9IE1hdGguc2luKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZFxuICAgIHRoaXMudnggPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWRcbiAgICB0aGlzLnkgKz0gdGhpcy52eVxuICAgIHRoaXMueCArPSB0aGlzLnZ4XG4gICAgdGhpcy5yYWRpdXMgPSB0aGlzLnkvMzBcbiAgICBpZih0aGlzLnkgPiBjb25maWcuSEVJR0hUKXtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgbW92ZV9ncm91bmQoc2NhbGUpe1xuICAgIHRoaXMudnkgPSBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQqc2NhbGVcbiAgICB0aGlzLnZ4ID0gTWF0aC5jb3ModGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkKnNjYWxlXG4gICAgdGhpcy52eiAtPSAwLjY4XG4gICAgdGhpcy55ICs9IHRoaXMudnlcbiAgICB0aGlzLnggKz0gdGhpcy52eFxuICAgIHRoaXMueiArPSB0aGlzLnZ6XG4gICAgaWYodGhpcy56PD0wKXtcbiAgICAgIHRoaXMuej0wXG4gICAgICB0aGlzLnNwZWVkKj0wLjlcbiAgICAgIHRoaXMudnoqPS0wLjVcbiAgICB9XG4gICAgdmFyIGNvZj0zMFxuICAgIGlmKHRoaXMuei9jb2Y8Myl7dGhpcy5yYWRpdXMgPSAzfVxuICAgIGVsc2UgaWYodGhpcy56L2NvZj4xMCl7dGhpcy5yYWRpdXM9MTB9XG4gICAgZWxzZXt0aGlzLnJhZGl1cz10aGlzLnovY29mfVxuXG4gICAgaWYodGhpcy55ID4gY29uZmlnLkhFSUdIVCl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG5cbiAgY2xlYXIoZ3JhcGhpYyl7XG4gICAgZ3JhcGhpYy5jbGVhcigpXG4gIH1cbiAgZHJhdyhncmFwaGljKXtcbiAgICAvLyB0aGlzLmNsZWFyKGdyYXBoaWMpO1xuICAgIGdyYXBoaWMubGluZVN0eWxlKDApXG4gICAgZ3JhcGhpYy5iZWdpbkZpbGwoMHhGRkZGRkYpXG4gICAgZ3JhcGhpYy5kcmF3Q2lyY2xlKFxuICAgICAgdGhpcy54LFxuICAgICAgdGhpcy55LFxuICAgICAgdGhpcy5yYWRpdXNcbiAgICApXG4gICAgZ3JhcGhpYy5lbmRGaWxsKClcbiAgfVxuXG4gIGRyYXdfZ3JvdW5kKGdyYXBoaWMseCx5LHJhZGl1cyl7XG4gICAgLy8gdGhpcy5jbGVhcihncmFwaGljKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLngqc2NhbGUrb2Zmc2V0X3gsdGhpcy55KnNjYWxlK29mZnNldF95KVxuICAgIGdyYXBoaWMubGluZVN0eWxlKDApXG4gICAgZ3JhcGhpYy5iZWdpbkZpbGwoMHhGRkZGRkYpXG4gICAgZ3JhcGhpYy5kcmF3Q2lyY2xlKHgseSxyYWRpdXMgKVxuICAgIGdyYXBoaWMuZW5kRmlsbCgpXG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIGNvbmZpZyBmcm9tIFwiLi9jb25maWcuZXM2XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmF0e1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuZGVmYXVsdHM9e1xuICAgICAgeDogMTAwLFxuICAgICAgeTogMzAwLFxuICAgICAgd2lkdGg6IDEwMCxcbiAgICAgIGhlaWdodDogMTAwXG4gICAgfVxuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpe1xuICAgIHRoaXMueCA9dGhpcy5kZWZhdWx0c1tcInhcIl1cbiAgICB0aGlzLnkgPXRoaXMuZGVmYXVsdHNbXCJ5XCJdXG4gICAgdGhpcy53aWR0aCA9IHRoaXMuZGVmYXVsdHNbXCJ3aWR0aFwiXVxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5kZWZhdWx0c1tcImhlaWdodFwiXVxuICB9XG5cbiAgaGl0Q2hlY2soYmFsbCl7XG4gICAgaWYoXG4gICAgICB0aGlzLnggPCBiYWxsLnggJiZcbiAgICAgIGJhbGwueCA8IHRoaXMueCArIHRoaXMud2lkdGggJiZcbiAgICAgICAgdGhpcy55IDwgYmFsbC55ICYmXG4gICAgICAgIGJhbGwueSA8IHRoaXMueSArIHRoaXMuaGVpZ2h0XG4gICAgKXtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIG1vdmUoKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNsZWFyKGdyYXBoaWMpe1xuICAgIGdyYXBoaWMuY2xlYXIoKVxuICB9XG4gIGRyYXcoZ3JhcGhpYyl7XG4gICAgLy8gdGhpcy5jbGVhcihncmFwaGljKTtcbiAgICBncmFwaGljLmxpbmVTdHlsZSg1LCAweEZGMDAwMCk7XG4gICAgZ3JhcGhpYy5kcmF3UmVjdChcbiAgICAgIHRoaXMueCxcbiAgICAgIHRoaXMueSxcbiAgICAgIHRoaXMud2lkdGgsXG4gICAgICB0aGlzLmhlaWdodFxuICAgICAgKVxuICB9XG5cbn1cbiIsImV4cG9ydCBjb25zdCBXSURUSD0zMjBcbmV4cG9ydCBjb25zdCBIRUlHSFQ9NDgwXG5leHBvcnQgY29uc3QgU1RBVEVTPXtcbiAgU1RBUlQ6IDAsXG4gIFRIUk9XOiAxLFxuICBISVQ6IDIsXG4gIEJPVU5EOiAzXG59XG4iLCIvLyB2YXIgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcig2MDAsIDQ4MCx7IGFudGlhbGlhczogdHJ1ZSB9KVxuLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KVxuLy8gdmFyIHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKClcbi8vIHZhciB0aGluZyA9IG5ldyBQSVhJLkdyYXBoaWNzKClcbi8vIHN0YWdlLmFkZENoaWxkKHRoaW5nKVxuLy8gdmFyIHg9MzAwXG4vLyB2YXIgeT0xMDBcbi8vIHZhciBhbmdsZT00MDAqTWF0aC5QSS8xODBcbi8vIHZhciBzcGVlZD0xMFxuLy8gdmFyIHZ4PU1hdGguY29zKGFuZ2xlKSpzcGVlZFxuLy8gdmFyIHZ5PU1hdGguc2luKGFuZ2xlKSpzcGVlZFxuLy8gdmFyIGc9MC42OFxuLy8gdmFyIHJlc3RyZWN0aW9uPTAuNlxuLy8gZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbi8vICAgeCs9dnhcbi8vICAgdnkrPWdcbi8vICAgeSs9dnlcbi8vICAgaWYoeT40ODApe1xuLy8gICAgIHk9NDgwXG4vLyAgICAgdnkgKj0gLXJlc3RyZWN0aW9uXG4vLyAgIH1cbi8vICAgdGhpbmcuY2xlYXIoKVxuLy8gICB0aGluZy5saW5lU3R5bGUoMClcbi8vICAgdGhpbmcuYmVnaW5GaWxsKDB4MDBGRkZGKVxuLy8gICB0aGluZy5kcmF3Q2lyY2xlKCB4LHksMTAgKVxuLy8gICB0aGluZy5lbmRGaWxsKClcbi8vICAgcmVuZGVyZXIucmVuZGVyKHN0YWdlKVxuLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBhbmltYXRlIClcbi8vIH1cbi8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSggYW5pbWF0ZSApXG4vL1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gXCIuL2NvbmZpZy5lczZcIlxuaW1wb3J0IFwiLi9zb3VuZC5lczZcIlxuaW1wb3J0IEJhbGwgZnJvbSBcIi4vYmFsbC5lczZcIlxuaW1wb3J0IEJhdCBmcm9tIFwiLi9iYXQuZXM2XCJcbmltcG9ydCBIb21lIGZyb20gXCIuL3N0YWdlX2hvbWUuZXM2XCJcbmltcG9ydCBHcm91bmQgZnJvbSBcIi4vc3RhZ2VfZ3JvdW5kLmVzNlwiXG5cbnZhciBjdXJyZW50X3N0YXRlPWNvbmZpZy5TVEFURVNbXCJTVEFSVFwiXVxuXG5jb25zb2xlLmxvZyhjb25maWcpXG52YXIgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcihjb25maWcuV0lEVEgsIGNvbmZpZy5IRUlHSFQseyBhbnRpYWxpYXM6IHRydWUgfSk7XG5yZW5kZXJlci52aWV3LnN0eWxlLndpZHRoID0gY29uZmlnLldJRFRIICsgXCJweFwiXG5yZW5kZXJlci52aWV3LnN0eWxlLmhlaWdodCA9IGNvbmZpZy5IRUlHSFQgKyBcInB4XCJcbnJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KVxuXG52YXIgc3RhZ2VzPXt9XG5zdGFnZXNbXCJob21lXCJdID0gbmV3IEhvbWUoKVxuc3RhZ2VzW1wiZ3JvdW5kXCJdID0gbmV3IEdyb3VuZCgpXG4vLyB2YXIgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKVxudmFyIGdyb3VuZCA9IG5ldyBQSVhJLkNvbnRhaW5lcigpXG52YXIgY3VycmVudF9zdGFnZT1cImhvbWVcIlxuLy9zdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWVcblxuLy92YXIgdGhpbmcgPSBuZXcgUElYSS5HcmFwaGljcygpXG4vL3N0YWdlLmFkZENoaWxkKHRoaW5nKVxuXG4vLyBzdGFnZS5vbignY2xpY2snLCBvbkNsaWNrKVxuLy8gc3RhZ2Uub24oJ3RhcCcsIG9uQ2xpY2spXG5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgdGhyb3dCYWxsKClcbn0sIDMwMCk7XG5cbnZhciBpdGVtcz17fVxuZnVuY3Rpb24gb25DbGljaygpe1xuICBzdGFnZXNbXCJob21lXCJdLm1vdmllLmdvdG9BbmRQbGF5KDApXG4gIGlmKGN1cnJlbnRfc3RhdGU9XCJ0aHJvd1wiKXtcbiAgICBpZihzdGFnZXNbXCJob21lXCJdLnN3aW5nKCkpe1xuXG4gICAgICBjdXJyZW50X3N0YXRlPWNvbmZpZy5TVEFURVNbXCJISVRcIl1cbiAgICAgIHZhciBiYWxsID1zdGFnZXNbXCJob21lXCJdLml0ZW1zW1wiYmFsbFwiXVxuICAgICAgc3RhZ2VzW1wiZ3JvdW5kXCJdLmFkZENoaWxkKFwiYmFsbFwiLCBuZXcgQmFsbCh7XG4gICAgICAgIHg6IGNvbmZpZy5XSURUSCAvIDIsXG4gICAgICAgIHk6IDMwMCxcbiAgICAgICAgYW5nbGU6YmFsbC5hbmdsZSxcbiAgICAgICAgc3BlZWQ6IGJhbGwuc3BlZWQsXG4gICAgICAgIHZ4OmJhbGwudngsXG4gICAgICAgIHZ5OmJhbGwudnksXG4gICAgICAgIHZ6OmJhbGwudnpcbiAgICAgIH0pKVxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBjdXJyZW50X3N0YWdlPVwiZ3JvdW5kXCJcbiAgICAgIH0sMTAwMClcbiAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJoaXRcIilcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHRocm93QmFsbCgpXG57XG4gIGlmKGN1cnJlbnRfc3RhdGUgIT0gY29uZmlnLlNUQVRFU1tcIlNUQVJUXCJdKSB7cmV0dXJuIHRydWV9XG4gIGNvbnNvbGUubG9nKFwidGhyb3dcIilcbiAgY3JlYXRlanMuU291bmQucGxheShcImJhbGxcIilcbiAgdmFyIGJhbGwgPW5ldyBCYWxsKHt4OmNvbmZpZy5XSURUSC8yICx5OjUwICxhbmdsZTpNYXRoLzIsc3BlZWQ6Nn0pXG5cbiAgc3RhZ2VzW1wiaG9tZVwiXS5hZGRDaGlsZChcImJhbGxcIiwgYmFsbClcbiAgY3VycmVudF9zdGF0ZT1jb25maWcuU1RBVEVTW1wiVEhST1dcIl1cbn1cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIixvbkNsaWNrKVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIixvbkNsaWNrKVxuLy8gcnVuIHRoZSByZW5kZXIgbG9vcFxuc3RhZ2VzW1wiaG9tZVwiXS5hZGRDaGlsZChcImJhdFwiLG5ldyBCYXQoKSlcbnZhciBtZXRlciA9IG5ldyBGUFNNZXRlcigpO1xudmFyIGdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKVxuLy8gc3RhZ2UuYWRkQ2hpbGQoZ3JhcGhpY3MpXG5cblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgc3RhZ2VzW2N1cnJlbnRfc3RhZ2VdLmFuaW1hdGUoKVxuICByZW5kZXJlci5yZW5kZXIoc3RhZ2VzW2N1cnJlbnRfc3RhZ2VdLnN0YWdlKVxuICBtZXRlci50aWNrKCk7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSggYW5pbWF0ZSApXG59XG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGFuaW1hdGUgKVxuIiwibGV0IHF1ZXVlID0gbmV3IGNyZWF0ZWpzLkxvYWRRdWV1ZShmYWxzZSlcbnF1ZXVlLmluc3RhbGxQbHVnaW4oY3JlYXRlanMuU291bmQpXG5sZXQgbG9hZFNvdW5kQ29tcGxldGU9ZnVuY3Rpb24oKXtcblxufTtcbnF1ZXVlLmFkZEV2ZW50TGlzdGVuZXIoXCJjb21wbGV0ZVwiLGxvYWRTb3VuZENvbXBsZXRlKVxudmFyIG1hbmlmZXN0ID0gW1xuICB7c3JjOlwiL3NvdW5kL255dTMubXAzXCIsIGlkOlwiYmFsbFwifSxcbiAge3NyYzpcIi9zb3VuZC9zdHJpa2UxLm1wM1wiLCBpZDpcImhpdFwifSxcbl1cbnF1ZXVlLmxvYWRNYW5pZmVzdChtYW5pZmVzdClcbiIsImltcG9ydCAqIGFzIGNvbmZpZyBmcm9tIFwiLi9jb25maWcuZXM2XCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlR3JvdW5kIHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLml0ZW1zPVtdXG4gICAgdGhpcy5zdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpXG5cbiAgICB2YXIgdGV4dHVyZSA9IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UoXCJpbWFnZS9iYWxscGFyazIuZ2lmXCIpO1xuICAgIC8vIGNyZWF0ZSBhIG5ldyBTcHJpdGUgdXNpbmcgdGhlIHRleHR1cmVcbiAgICB0aGlzLmdyb3VuZF9pbWFnZSA9IG5ldyBQSVhJLlNwcml0ZSh0ZXh0dXJlKTtcblxuICAgIC8vIGNlbnRlciB0aGUgc3ByaXRlcyBhbmNob3IgcG9pbnRcbiAgICAvLyAgYnVubnkuYW5jaG9yLnggPSAwLjU7XG4gICAgLy8gIGJ1bm55LmFuY2hvci55ID0gMC41O1xuXG4gICAgLy8gbW92ZSB0aGUgc3ByaXRlIHQgdGhlIGNlbnRlciBvZiB0aGUgc2NyZWVuXG4gICAgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueCA9IC0zMDA7XG4gICAgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueSA9IC0zMDA7XG5cbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuZ3JvdW5kX2ltYWdlKTtcbiAgICB0aGlzLmdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKVxuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5ncmFwaGljcylcbiAgfVxuXG4gIGFkZENoaWxkKGtleSxvYmope1xuICAgIHRoaXMuaXRlbXNba2V5XT1vYmpcbiAgfVxuXG4gIGFuaW1hdGUoKXtcbiAgICB0aGlzLmdyYXBoaWNzLmNsZWFyKClcbiAgICB2YXIgYmFsbD10aGlzLml0ZW1zW1wiYmFsbFwiXVxuICAgIHZhciBzY2FsZT0wLjFcbiAgICBiYWxsLm1vdmVfZ3JvdW5kKHNjYWxlKVxuICAgIHZhciB4PSBiYWxsLnhcbiAgICB2YXIgeT0gYmFsbC55XG4gICAgdmFyIHN0b3BYPWZhbHNlO1xuICAgIHZhciBzdG9wWT1mYWxzZTtcblxuICAgIGlmKHggPCA1MCl7eD01MDsgc3RvcFg9dHJ1ZX1cbiAgICBpZih4ID4gY29uZmlnLldJRFRILTUwKXt4PWNvbmZpZy5XSURUSC01MDtzdG9wWD10cnVlOyB9XG4gICAgaWYoc3RvcFgpeyB0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi54IC09IGJhbGwudnggfVxuICAgIGlmKHkgPCA1MCl7eT01MDtzdG9wWT10cnVlfVxuICAgIGlmKHkgPiBjb25maWcuSEVJR0hULTUwKXt5PWNvbmZpZy5IRUlHSFQtNTA7c3RvcFk9dHJ1ZX1cbiAgICBpZihzdG9wWSl7IHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnkgLT0gYmFsbC52eSB9XG5cbiAgICB0aGlzLml0ZW1zW1wiYmFsbFwiXS5kcmF3X2dyb3VuZChcbiAgICAgIHRoaXMuZ3JhcGhpY3MsXG4gICAgICB4LFxuICAgICAgeSxcbiAgICAgIGJhbGwucmFkaXVzKVxuICAgIH1cbiAgfVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2VIb21lIHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLml0ZW1zPVtdXG4gICAgdGhpcy5zdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpXG4gICAgdGhpcy5ncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKClcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuZ3JhcGhpY3MpXG5cblxuICAgIGxldCBzZWxmPXRoaXNcbiAgICBQSVhJLmxvYWRlclxuICAgICAgICAuYWRkKCdzdWJhcnUnLCAnL2ltYWdlL3Nwcml0ZXNoZWV0Lmpzb24nKVxuICAgICAgICAubG9hZChmdW5jdGlvbigpe1xuICAgICAgICAgIHZhciB0ZXh0dXJlcyA9IFtdXG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKylcbiAgICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdGV4dHVyZSA9IFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUoJ2JhdF8wJyArIChpKzEpICsgJy5wbmcnKTtcbiAgICAgICAgICAgIHRleHR1cmVzLnB1c2godGV4dHVyZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYubW92aWUgPSBuZXcgUElYSS5leHRyYXMuTW92aWVDbGlwKHRleHR1cmVzKTtcblxuICAgICAgICAgIHNlbGYubW92aWUucG9zaXRpb24ueD0xNTBcbiAgICAgICAgICBzZWxmLm1vdmllLnBvc2l0aW9uLnk9MjAwXG4gICAgICAgICAgc2VsZi5tb3ZpZS53aWR0aD0yMDBcbiAgICAgICAgICBzZWxmLm1vdmllLmhlaWdodD0yMDBcbiAgICAgICAgICBzZWxmLm1vdmllLmxvb3A9ZmFsc2VcbiAgICAgICAgICAvLyBzZWxmLm1vdmllLm9uQ29tcGxldGUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAvLyAgIHNldFRpbWVvdXQoZnVudGlvbigpe1xuICAgICAgICAgIC8vICAgICBzZWxmLm1vdmllLmdvdG9BbmRTdG9wKDApXG4gICAgICAgICAgLy8gICB9LDUwMClcbiAgICAgICAgICAvLyB9KVxuXG4gICAgICAgICAgc2VsZi5tb3ZpZS5hbmltYXRpb25TcGVlZCA9IDAuNTtcblxuICAgICAgICAgIHNlbGYubW92aWUuZ290b0FuZFN0b3AoMCk7XG5cbiAgICAgICAgICBzZWxmLnN0YWdlLmFkZENoaWxkKHNlbGYubW92aWUpO1xuICAgICAgICB9KTtcblxuXG5cbiAgICAgIH1cblxuICAgICAgYWRkQ2hpbGQoa2V5LG9iail7XG4gICAgICAgIHRoaXMuaXRlbXNba2V5XT1vYmpcbiAgICAgIH1cblxuICAgICAgYmFsbCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1tcImJhbGxcIl1cbiAgICAgIH1cbiAgICAgIGJhdCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1tcImJhdFwiXVxuICAgICAgfVxuXG4gICAgICBzd2luZygpe1xuICAgICAgICBpZih0aGlzLmJhdCgpLmhpdENoZWNrKHRoaXMuYmFsbCgpKSl7XG4gICAgICAgICAgdGhpcy5iYWxsKCkuaGl0KClcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICBhbmltYXRlKCl7XG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuY2xlYXIoKVxuICAgICAgICBmb3IodmFyIGkgaW4gdGhpcy5pdGVtcyl7XG4gICAgICAgICAgaWYodGhpcy5pdGVtc1tpXS5tb3ZlKCkpe1xuICAgICAgICAgICAgdGhpcy5pdGVtc1tpXS5kcmF3KHRoaXMuZ3JhcGhpY3MpO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5pdGVtc1tpXS5jbGVhcih0aGlzLmdyYXBoaWNzKVxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuaXRlbXNbaV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4iXX0=
