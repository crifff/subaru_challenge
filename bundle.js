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
      console.log(this.angle);
      this.speed = 20;
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
      this.y += this.vy;
      this.x += this.vx;
      this.radius = this.z;
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
  if (current_state = "throw") {
    if (stages["home"].swing()) {

      current_state = config.STATES["HIT"];
      var ball = stages["home"].items["ball"];
      stages["ground"].addChild("ball", new _ballEs62["default"]({
        x: config.WIDTH / 2,
        y: 300,
        vx: ball.vx,
        vy: ball.vy,
        vz: ball.yz,
        speed: ball.speed,
        angle: ball.angle
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

      this.items["ball"].draw_ground(this.graphics, x, y, 10);
    }
  }]);

  return StageGround;
})();

exports["default"] = StageGround;
module.exports = exports["default"];

},{"./config.es6":3}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StageHome = (function () {
  function StageHome() {
    _classCallCheck(this, StageHome);

    this.items = [];
    this.stage = new PIXI.Container();
    this.graphics = new PIXI.Graphics();
    this.stage.addChild(this.graphics);
  }

  _createClass(StageHome, [{
    key: "addChild",
    value: function addChild(key, obj) {
      this.items[key] = obj;
    }
  }, {
    key: "ball",
    value: function ball() {
      return this.items["ball"];
    }
  }, {
    key: "bat",
    value: function bat() {
      return this.items["bat"];
    }
  }, {
    key: "swing",
    value: function swing() {
      if (this.bat().hitCheck(this.ball())) {
        this.ball().hit();
        return true;
      }
      return false;
    }
  }, {
    key: "animate",
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

exports["default"] = StageHome;
module.exports = exports["default"];

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9iYWxsLmVzNiIsIi9Vc2Vycy9ob3NzeS9wcm9qZWN0L3N1YmFydV9jaGFsbGVuZ2UvZXM2L2JhdC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9jb25maWcuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvZ2FtZS5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zb3VuZC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zdGFnZV9ncm91bmQuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvc3RhZ2VfaG9tZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7eUJDQXdCLGNBQWM7O0lBQTFCLE1BQU07O0lBRUcsSUFBSTtBQUNaLFdBRFEsSUFBSSxDQUNYLFFBQVEsRUFBQzswQkFERixJQUFJOztBQUVyQixRQUFJLENBQUMsUUFBUSxHQUFDLFFBQVEsQ0FBQTtBQUN0QixRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDbkI7O2VBSmtCLElBQUk7O1dBTWIsc0JBQUU7QUFDVixVQUFJLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFBO0FBQzdCLFVBQUksQ0FBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDN0IsVUFBSSxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFFLENBQUMsQ0FB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QUMsS0FBSyxFQUFFLENBQUE7QUFDckIsV0FBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFDO0FBQ3RCLFlBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBQztBQUN0QixjQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkMsTUFBSTtBQUNILGNBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNsQyxpQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3JCO09BQ0Y7S0FDRjs7O1NBckNrQixTQUFTOzs7cUJBQVQsU0FBUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGx7XG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRzKXtcbiAgICB0aGlzLmRlZmF1bHRzPWRlZmF1bHRzXG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICBpbml0aWFsaXplKCl7XG4gICAgdGhpcy54ID10aGlzLmRlZmF1bHRzW1wieFwiXXx8MFxuICAgIHRoaXMueSA9dGhpcy5kZWZhdWx0c1tcInlcIl18fDBcbiAgICB0aGlzLnogPXRoaXMuZGVmYXVsdHNbXCJ6XCJdfHwwXG4gICAgdGhpcy52eCA9dGhpcy5kZWZhdWx0c1tcInZ4XCJdfHwwXG4gICAgdGhpcy52eSA9dGhpcy5kZWZhdWx0c1tcInZ5XCJdfHwwXG4gICAgdGhpcy52eiA9dGhpcy5kZWZhdWx0c1tcInZ6XCJdfHwwXG4gICAgdGhpcy5hbmdsZSA9IHRoaXMuZGVmYXVsdHNbXCJhbmdsZVwiXXx8TWF0aC5QSS8yXG4gICAgdGhpcy56QW5nbGUgPSB0aGlzLmRlZmF1bHRzW1wiekFuZ2xlXCJdfHxNYXRoLlBJLzJcbiAgICB0aGlzLnNwZWVkID0gdGhpcy5kZWZhdWx0c1tcInNwZWVkXCJdfHwwXG4gICAgdGhpcy5yYWRpdXMgPSB0aGlzLmRlZmF1bHRzW1wicmFkaXVzXCJdfHwwXG4gIH1cblxuICBoaXQoKXtcbiAgICBsZXQgbWluPU1hdGguUElcbiAgICBsZXQgbWF4PU1hdGguUEkqMlxuICAgIHRoaXMuYW5nbGU9KCBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKSArIG1pbjtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmFuZ2xlKVxuICAgIHRoaXMuc3BlZWQgPTIwXG4gIH1cblxuICBtb3ZlKCl7XG4gICAgdGhpcy52eSA9IE1hdGguc2luKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZFxuICAgIHRoaXMudnggPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWRcbiAgICB0aGlzLnkgKz0gdGhpcy52eVxuICAgIHRoaXMueCArPSB0aGlzLnZ4XG4gICAgdGhpcy5yYWRpdXMgPSB0aGlzLnkvMzBcbiAgICBpZih0aGlzLnkgPiBjb25maWcuSEVJR0hUKXtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgbW92ZV9ncm91bmQoc2NhbGUpe1xuICAgIHRoaXMudnkgPSBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQqc2NhbGVcbiAgICB0aGlzLnZ4ID0gTWF0aC5jb3ModGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkKnNjYWxlXG4gICAgdGhpcy55ICs9IHRoaXMudnlcbiAgICB0aGlzLnggKz0gdGhpcy52eFxuICAgIHRoaXMucmFkaXVzID0gdGhpcy56XG4gICAgaWYodGhpcy55ID4gY29uZmlnLkhFSUdIVCl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG5cbiAgY2xlYXIoZ3JhcGhpYyl7XG4gICAgZ3JhcGhpYy5jbGVhcigpXG4gIH1cbiAgZHJhdyhncmFwaGljKXtcbiAgICAvLyB0aGlzLmNsZWFyKGdyYXBoaWMpO1xuICAgIGdyYXBoaWMubGluZVN0eWxlKDApXG4gICAgZ3JhcGhpYy5iZWdpbkZpbGwoMHhGRkZGRkYpXG4gICAgZ3JhcGhpYy5kcmF3Q2lyY2xlKFxuICAgICAgdGhpcy54LFxuICAgICAgdGhpcy55LFxuICAgICAgdGhpcy5yYWRpdXNcbiAgICApXG4gICAgZ3JhcGhpYy5lbmRGaWxsKClcbiAgfVxuXG4gIGRyYXdfZ3JvdW5kKGdyYXBoaWMseCx5LHJhZGl1cyl7XG4gICAgLy8gdGhpcy5jbGVhcihncmFwaGljKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLngqc2NhbGUrb2Zmc2V0X3gsdGhpcy55KnNjYWxlK29mZnNldF95KVxuICAgIGdyYXBoaWMubGluZVN0eWxlKDApXG4gICAgZ3JhcGhpYy5iZWdpbkZpbGwoMHhGRkZGRkYpXG4gICAgZ3JhcGhpYy5kcmF3Q2lyY2xlKHgseSxyYWRpdXMgKVxuICAgIGdyYXBoaWMuZW5kRmlsbCgpXG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIGNvbmZpZyBmcm9tIFwiLi9jb25maWcuZXM2XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmF0e1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuZGVmYXVsdHM9e1xuICAgICAgeDogMTAwLFxuICAgICAgeTogMzAwLFxuICAgICAgd2lkdGg6IDEwMCxcbiAgICAgIGhlaWdodDogMTAwXG4gICAgfVxuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpe1xuICAgIHRoaXMueCA9dGhpcy5kZWZhdWx0c1tcInhcIl1cbiAgICB0aGlzLnkgPXRoaXMuZGVmYXVsdHNbXCJ5XCJdXG4gICAgdGhpcy53aWR0aCA9IHRoaXMuZGVmYXVsdHNbXCJ3aWR0aFwiXVxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5kZWZhdWx0c1tcImhlaWdodFwiXVxuICB9XG5cbiAgaGl0Q2hlY2soYmFsbCl7XG4gICAgaWYoXG4gICAgICB0aGlzLnggPCBiYWxsLnggJiZcbiAgICAgIGJhbGwueCA8IHRoaXMueCArIHRoaXMud2lkdGggJiZcbiAgICAgICAgdGhpcy55IDwgYmFsbC55ICYmXG4gICAgICAgIGJhbGwueSA8IHRoaXMueSArIHRoaXMuaGVpZ2h0XG4gICAgKXtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIG1vdmUoKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNsZWFyKGdyYXBoaWMpe1xuICAgIGdyYXBoaWMuY2xlYXIoKVxuICB9XG4gIGRyYXcoZ3JhcGhpYyl7XG4gICAgLy8gdGhpcy5jbGVhcihncmFwaGljKTtcbiAgICBncmFwaGljLmxpbmVTdHlsZSg1LCAweEZGMDAwMCk7XG4gICAgZ3JhcGhpYy5kcmF3UmVjdChcbiAgICAgIHRoaXMueCxcbiAgICAgIHRoaXMueSxcbiAgICAgIHRoaXMud2lkdGgsXG4gICAgICB0aGlzLmhlaWdodFxuICAgICAgKVxuICB9XG5cbn1cbiIsImV4cG9ydCBjb25zdCBXSURUSD0zMjBcbmV4cG9ydCBjb25zdCBIRUlHSFQ9NDgwXG5leHBvcnQgY29uc3QgU1RBVEVTPXtcbiAgU1RBUlQ6IDAsXG4gIFRIUk9XOiAxLFxuICBISVQ6IDIsXG4gIEJPVU5EOiAzXG59XG4iLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5pbXBvcnQgXCIuL3NvdW5kLmVzNlwiXG5pbXBvcnQgQmFsbCBmcm9tIFwiLi9iYWxsLmVzNlwiXG5pbXBvcnQgQmF0IGZyb20gXCIuL2JhdC5lczZcIlxuaW1wb3J0IEhvbWUgZnJvbSBcIi4vc3RhZ2VfaG9tZS5lczZcIlxuaW1wb3J0IEdyb3VuZCBmcm9tIFwiLi9zdGFnZV9ncm91bmQuZXM2XCJcblxudmFyIGN1cnJlbnRfc3RhdGU9Y29uZmlnLlNUQVRFU1tcIlNUQVJUXCJdXG5cbmNvbnNvbGUubG9nKGNvbmZpZylcbnZhciByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKGNvbmZpZy5XSURUSCwgY29uZmlnLkhFSUdIVCx7IGFudGlhbGlhczogdHJ1ZSB9KTtcbnJlbmRlcmVyLnZpZXcuc3R5bGUud2lkdGggPSBjb25maWcuV0lEVEggKyBcInB4XCJcbnJlbmRlcmVyLnZpZXcuc3R5bGUuaGVpZ2h0ID0gY29uZmlnLkhFSUdIVCArIFwicHhcIlxucmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpXG5cbnZhciBzdGFnZXM9e31cbnN0YWdlc1tcImhvbWVcIl0gPSBuZXcgSG9tZSgpXG5zdGFnZXNbXCJncm91bmRcIl0gPSBuZXcgR3JvdW5kKClcbi8vIHZhciBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpXG52YXIgZ3JvdW5kID0gbmV3IFBJWEkuQ29udGFpbmVyKClcbnZhciBjdXJyZW50X3N0YWdlPVwiaG9tZVwiXG4vL3N0YWdlLmludGVyYWN0aXZlID0gdHJ1ZVxuXG4vL3ZhciB0aGluZyA9IG5ldyBQSVhJLkdyYXBoaWNzKClcbi8vc3RhZ2UuYWRkQ2hpbGQodGhpbmcpXG5cbi8vIHN0YWdlLm9uKCdjbGljaycsIG9uQ2xpY2spXG4vLyBzdGFnZS5vbigndGFwJywgb25DbGljaylcbnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICB0aHJvd0JhbGwoKVxufSwgMzAwKTtcblxudmFyIGl0ZW1zPXt9XG5mdW5jdGlvbiBvbkNsaWNrKCl7XG4gIGlmKGN1cnJlbnRfc3RhdGU9XCJ0aHJvd1wiKXtcbiAgICBpZihzdGFnZXNbXCJob21lXCJdLnN3aW5nKCkpe1xuXG4gICAgICBjdXJyZW50X3N0YXRlPWNvbmZpZy5TVEFURVNbXCJISVRcIl1cbiAgICAgIHZhciBiYWxsID1zdGFnZXNbXCJob21lXCJdLml0ZW1zW1wiYmFsbFwiXVxuICAgICAgc3RhZ2VzW1wiZ3JvdW5kXCJdLmFkZENoaWxkKFwiYmFsbFwiLCBuZXcgQmFsbCh7XG4gICAgICAgIHg6Y29uZmlnLldJRFRILzIsXG4gICAgICAgIHk6MzAwLFxuICAgICAgICB2eDpiYWxsLnZ4LFxuICAgICAgICB2eTpiYWxsLnZ5LFxuICAgICAgICB2ejpiYWxsLnl6LFxuICAgICAgICBzcGVlZDpiYWxsLnNwZWVkLFxuICAgICAgICBhbmdsZTpiYWxsLmFuZ2xlLFxuICAgICAgfSkpXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIGN1cnJlbnRfc3RhZ2U9XCJncm91bmRcIlxuICAgICAgfSwxMDAwKVxuICAgICAgY3JlYXRlanMuU291bmQucGxheShcImhpdFwiKVxuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gdGhyb3dCYWxsKClcbntcbiAgaWYoY3VycmVudF9zdGF0ZSAhPSBjb25maWcuU1RBVEVTW1wiU1RBUlRcIl0pIHtyZXR1cm4gdHJ1ZX1cbiAgY29uc29sZS5sb2coXCJ0aHJvd1wiKVxuICBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwiYmFsbFwiKVxuICB2YXIgYmFsbCA9bmV3IEJhbGwoe3g6Y29uZmlnLldJRFRILzIgLHk6NTAgLGFuZ2xlOk1hdGgvMixzcGVlZDo2fSlcblxuICBzdGFnZXNbXCJob21lXCJdLmFkZENoaWxkKFwiYmFsbFwiLCBiYWxsKVxuICBjdXJyZW50X3N0YXRlPWNvbmZpZy5TVEFURVNbXCJUSFJPV1wiXVxufVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLG9uQ2xpY2spXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLG9uQ2xpY2spXG4vLyBydW4gdGhlIHJlbmRlciBsb29wXG5zdGFnZXNbXCJob21lXCJdLmFkZENoaWxkKFwiYmF0XCIsbmV3IEJhdCgpKVxudmFyIG1ldGVyID0gbmV3IEZQU01ldGVyKCk7XG52YXIgZ3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpXG4vLyBzdGFnZS5hZGRDaGlsZChncmFwaGljcylcblxuXG5mdW5jdGlvbiBhbmltYXRlKCkge1xuICBzdGFnZXNbY3VycmVudF9zdGFnZV0uYW5pbWF0ZSgpXG4gIHJlbmRlcmVyLnJlbmRlcihzdGFnZXNbY3VycmVudF9zdGFnZV0uc3RhZ2UpXG4gIG1ldGVyLnRpY2soKTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBhbmltYXRlIClcbn1cbnJlcXVlc3RBbmltYXRpb25GcmFtZSggYW5pbWF0ZSApXG4iLCJsZXQgcXVldWUgPSBuZXcgY3JlYXRlanMuTG9hZFF1ZXVlKGZhbHNlKVxucXVldWUuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZClcbmxldCBsb2FkU291bmRDb21wbGV0ZT1mdW5jdGlvbigpe1xuXG59O1xucXVldWUuYWRkRXZlbnRMaXN0ZW5lcihcImNvbXBsZXRlXCIsbG9hZFNvdW5kQ29tcGxldGUpXG52YXIgbWFuaWZlc3QgPSBbXG4gIHtzcmM6XCIvc291bmQvbnl1My5tcDNcIiwgaWQ6XCJiYWxsXCJ9LFxuICB7c3JjOlwiL3NvdW5kL3N0cmlrZTEubXAzXCIsIGlkOlwiaGl0XCJ9LFxuXVxucXVldWUubG9hZE1hbmlmZXN0KG1hbmlmZXN0KVxuIiwiaW1wb3J0ICogYXMgY29uZmlnIGZyb20gXCIuL2NvbmZpZy5lczZcIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2VHcm91bmQge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuaXRlbXM9W11cbiAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKClcblxuICAgIHZhciB0ZXh0dXJlID0gUElYSS5UZXh0dXJlLmZyb21JbWFnZShcImltYWdlL2JhbGxwYXJrMi5naWZcIik7XG4gICAgLy8gY3JlYXRlIGEgbmV3IFNwcml0ZSB1c2luZyB0aGUgdGV4dHVyZVxuICAgIHRoaXMuZ3JvdW5kX2ltYWdlID0gbmV3IFBJWEkuU3ByaXRlKHRleHR1cmUpO1xuXG4gICAgLy8gY2VudGVyIHRoZSBzcHJpdGVzIGFuY2hvciBwb2ludFxuICAgIC8vICBidW5ueS5hbmNob3IueCA9IDAuNTtcbiAgICAvLyAgYnVubnkuYW5jaG9yLnkgPSAwLjU7XG5cbiAgICAvLyBtb3ZlIHRoZSBzcHJpdGUgdCB0aGUgY2VudGVyIG9mIHRoZSBzY3JlZW5cbiAgICB0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi54ID0gLTMwMDtcbiAgICB0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi55ID0gLTMwMDtcblxuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5ncm91bmRfaW1hZ2UpO1xuICAgIHRoaXMuZ3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpXG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmdyYXBoaWNzKVxuICB9XG5cbiAgYWRkQ2hpbGQoa2V5LG9iail7XG4gICAgdGhpcy5pdGVtc1trZXldPW9ialxuICB9XG5cbiAgYW5pbWF0ZSgpe1xuICAgIHRoaXMuZ3JhcGhpY3MuY2xlYXIoKVxuICAgIHZhciBiYWxsPXRoaXMuaXRlbXNbXCJiYWxsXCJdXG4gICAgdmFyIHNjYWxlPTAuMVxuICAgIGJhbGwubW92ZV9ncm91bmQoc2NhbGUpXG4gICAgdmFyIHg9IGJhbGwueFxuICAgIHZhciB5PSBiYWxsLnlcbiAgICB2YXIgc3RvcFg9ZmFsc2U7XG4gICAgdmFyIHN0b3BZPWZhbHNlO1xuXG4gICAgaWYoeCA8IDUwKXt4PTUwOyBzdG9wWD10cnVlfVxuICAgIGlmKHggPiBjb25maWcuV0lEVEgtNTApe3g9Y29uZmlnLldJRFRILTUwO3N0b3BYPXRydWU7IH1cbiAgICBpZihzdG9wWCl7IHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggLT0gYmFsbC52eCB9XG4gICAgaWYoeSA8IDUwKXt5PTUwO3N0b3BZPXRydWV9XG4gICAgaWYoeSA+IGNvbmZpZy5IRUlHSFQtNTApe3k9Y29uZmlnLkhFSUdIVC01MDtzdG9wWT10cnVlfVxuICAgIGlmKHN0b3BZKXsgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueSAtPSBiYWxsLnZ5IH1cblxuICAgIHRoaXMuaXRlbXNbXCJiYWxsXCJdLmRyYXdfZ3JvdW5kKFxuICAgICAgdGhpcy5ncmFwaGljcyxcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgMTApXG4gICAgfVxuICB9XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZUhvbWUge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuaXRlbXM9W11cbiAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKClcbiAgICB0aGlzLmdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKVxuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5ncmFwaGljcylcbiAgfVxuXG4gIGFkZENoaWxkKGtleSxvYmope1xuICAgIHRoaXMuaXRlbXNba2V5XT1vYmpcbiAgfVxuXG4gIGJhbGwoKXtcbiAgICByZXR1cm4gdGhpcy5pdGVtc1tcImJhbGxcIl1cbiAgfVxuICBiYXQoKXtcbiAgICByZXR1cm4gdGhpcy5pdGVtc1tcImJhdFwiXVxuICB9XG5cbiAgc3dpbmcoKXtcbiAgICBpZih0aGlzLmJhdCgpLmhpdENoZWNrKHRoaXMuYmFsbCgpKSl7XG4gICAgICB0aGlzLmJhbGwoKS5oaXQoKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBhbmltYXRlKCl7XG4gICAgdGhpcy5ncmFwaGljcy5jbGVhcigpXG4gICAgZm9yKHZhciBpIGluIHRoaXMuaXRlbXMpe1xuICAgICAgaWYodGhpcy5pdGVtc1tpXS5tb3ZlKCkpe1xuICAgICAgICB0aGlzLml0ZW1zW2ldLmRyYXcodGhpcy5ncmFwaGljcyk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5pdGVtc1tpXS5jbGVhcih0aGlzLmdyYXBoaWNzKVxuICAgICAgICBkZWxldGUgdGhpcy5pdGVtc1tpXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19
