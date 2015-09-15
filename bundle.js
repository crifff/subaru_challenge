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
  function Ball(x, y, radius) {
    _classCallCheck(this, Ball);

    this.defaults = {
      x: x,
      y: y,
      radius: radius,
      angle: Math.PI / 2,
      speed: 9.2
    };
    this.initialize();
  }

  _createClass(Ball, [{
    key: "initialize",
    value: function initialize() {
      this.x = this.defaults["x"];
      this.y = this.defaults["y"];
      this.angle = this.defaults["angle"];
      this.speed = this.defaults["speed"];
      this.radius = this.defaults["radius"];
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
      this.y += Math.sin(this.angle) * this.speed;
      this.x += Math.cos(this.angle) * this.speed;
      this.radius = this.y / 30;
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

console.log(config);
var renderer = PIXI.autoDetectRenderer(config.WIDTH, config.HEIGHT, { antialias: true });
renderer.view.style.width = config.WIDTH + "px";
renderer.view.style.height = config.HEIGHT + "px";
renderer.view.style.display = "block";
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
//stage.interactive = true

//var thing = new PIXI.Graphics()
//stage.addChild(thing)

// stage.on('click', onClick)
// stage.on('tap', onClick)
setInterval(function () {
  throwBall();
}, 3000);

var items = {};
function onClick() {
  if (items["ball"]) {

    if (items["bat"].hitCheck(items["ball"])) {
      items["ball"].hit();
      createjs.Sound.play("hit");
    }
  }
}
function throwBall() {
  console.log("throw");
  createjs.Sound.play("ball");
  items["ball"] = new _ballEs62["default"](config.WIDTH / 2, 50, 5);
}
document.addEventListener("mousedown", onClick);
document.addEventListener("touchstart", onClick);
// run the render loop
items["bat"] = new _batEs62["default"]();
var meter = new FPSMeter();
var graphics = new PIXI.Graphics();
stage.addChild(graphics);

function animate() {
  graphics.clear();
  for (var i in items) {
    if (items[i].move()) {
      items[i].draw(graphics);
    } else {
      items[i].clear(graphics);
      delete items[i];
    }
  }
  renderer.render(stage);
  meter.tick();
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

},{"./ball.es6":1,"./bat.es6":2,"./config.es6":3,"./sound.es6":5}],5:[function(require,module,exports){
"use strict";

var queue = new createjs.LoadQueue(false);
queue.installPlugin(createjs.Sound);
var loadSoundComplete = function loadSoundComplete() {};
queue.addEventListener("complete", loadSoundComplete);
var manifest = [{ src: "/sound/nyu3.mp3", id: "ball" }, { src: "/sound/strike1.mp3", id: "hit" }];
queue.loadManifest(manifest);

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9iYWxsLmVzNiIsIi9Vc2Vycy9ob3NzeS9wcm9qZWN0L3N1YmFydV9jaGFsbGVuZ2UvZXM2L2JhdC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9jb25maWcuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvZ2FtZS5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zb3VuZC5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7eUJDQXdCLGNBQWM7O0lBQTFCLE1BQU07O0lBRUcsSUFBSTtBQUNaLFdBRFEsSUFBSSxDQUNYLENBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDOzBCQURKLElBQUk7O0FBRXJCLFFBQUksQ0FBQyxRQUFRLEdBQUM7QUFDWixPQUFDLEVBQUUsQ0FBQztBQUNKLE9BQUMsRUFBRSxDQUFDO0FBQ0osWUFBTSxFQUFFLE1BQU07QUFDZCxXQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDO0FBQ2hCLFdBQUssRUFBRSxHQUFHO0tBQ1gsQ0FBQTtBQUNELFFBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztHQUNuQjs7ZUFWa0IsSUFBSTs7V0FZYixzQkFBRTtBQUNWLFVBQUksQ0FBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMxQixVQUFJLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDMUIsVUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ25DLFVB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bGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGx7XG4gIGNvbnN0cnVjdG9yKHgseSxyYWRpdXMpe1xuICAgIHRoaXMuZGVmYXVsdHM9e1xuICAgICAgeDogeCxcbiAgICAgIHk6IHksXG4gICAgICByYWRpdXM6IHJhZGl1cyxcbiAgICAgIGFuZ2xlOiBNYXRoLlBJLzIsXG4gICAgICBzcGVlZDogOS4yXG4gICAgfVxuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpe1xuICAgIHRoaXMueCA9dGhpcy5kZWZhdWx0c1tcInhcIl1cbiAgICB0aGlzLnkgPXRoaXMuZGVmYXVsdHNbXCJ5XCJdXG4gICAgdGhpcy5hbmdsZSA9IHRoaXMuZGVmYXVsdHNbXCJhbmdsZVwiXVxuICAgIHRoaXMuc3BlZWQgPSB0aGlzLmRlZmF1bHRzW1wic3BlZWRcIl1cbiAgICB0aGlzLnJhZGl1cyA9IHRoaXMuZGVmYXVsdHNbXCJyYWRpdXNcIl1cbiAgfVxuXG4gIGhpdCgpe1xuICAgIGxldCBtaW49TWF0aC5QSVxuICAgIGxldCBtYXg9TWF0aC5QSSoyXG4gICAgdGhpcy5hbmdsZT0oIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSApICsgbWluO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuYW5nbGUpXG4gICAgdGhpcy5zcGVlZCA9MjBcbiAgfVxuXG4gIG1vdmUoKXtcbiAgICB0aGlzLnkgKz0gTWF0aC5zaW4odGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkXG4gICAgdGhpcy54ICs9IE1hdGguY29zKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZFxuICAgIHRoaXMucmFkaXVzID0gdGhpcy55LzMwXG4gICAgaWYodGhpcy55ID4gY29uZmlnLkhFSUdIVCl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGNsZWFyKGdyYXBoaWMpe1xuICAgIGdyYXBoaWMuY2xlYXIoKVxuICB9XG4gIGRyYXcoZ3JhcGhpYyl7XG4gICAgLy8gdGhpcy5jbGVhcihncmFwaGljKTtcbiAgICBncmFwaGljLmxpbmVTdHlsZSgwKVxuICAgIGdyYXBoaWMuYmVnaW5GaWxsKDB4RkZGRkZGKVxuICAgIGdyYXBoaWMuZHJhd0NpcmNsZShcbiAgICAgIHRoaXMueCxcbiAgICAgIHRoaXMueSxcbiAgICAgIHRoaXMucmFkaXVzXG4gICAgICApXG4gICAgZ3JhcGhpYy5lbmRGaWxsKClcbiAgfVxuXG59XG4iLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhdHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLmRlZmF1bHRzPXtcbiAgICAgIHg6IDEwMCxcbiAgICAgIHk6IDMwMCxcbiAgICAgIHdpZHRoOiAxMDAsXG4gICAgICBoZWlnaHQ6IDEwMFxuICAgIH1cbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKXtcbiAgICB0aGlzLnggPXRoaXMuZGVmYXVsdHNbXCJ4XCJdXG4gICAgdGhpcy55ID10aGlzLmRlZmF1bHRzW1wieVwiXVxuICAgIHRoaXMud2lkdGggPSB0aGlzLmRlZmF1bHRzW1wid2lkdGhcIl1cbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuZGVmYXVsdHNbXCJoZWlnaHRcIl1cbiAgfVxuXG4gIGhpdENoZWNrKGJhbGwpe1xuICAgIGlmKFxuICAgICAgdGhpcy54IDwgYmFsbC54ICYmXG4gICAgICBiYWxsLnggPCB0aGlzLnggKyB0aGlzLndpZHRoICYmXG4gICAgICAgIHRoaXMueSA8IGJhbGwueSAmJlxuICAgICAgICBiYWxsLnkgPCB0aGlzLnkgKyB0aGlzLmhlaWdodFxuICAgICl7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBtb3ZlKCl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjbGVhcihncmFwaGljKXtcbiAgICBncmFwaGljLmNsZWFyKClcbiAgfVxuICBkcmF3KGdyYXBoaWMpe1xuICAgIC8vIHRoaXMuY2xlYXIoZ3JhcGhpYyk7XG4gICAgZ3JhcGhpYy5saW5lU3R5bGUoNSwgMHhGRjAwMDApO1xuICAgIGdyYXBoaWMuZHJhd1JlY3QoXG4gICAgICB0aGlzLngsXG4gICAgICB0aGlzLnksXG4gICAgICB0aGlzLndpZHRoLFxuICAgICAgdGhpcy5oZWlnaHRcbiAgICAgIClcbiAgfVxuXG59XG4iLCJleHBvcnQgY29uc3QgV0lEVEg9MzIwXG5leHBvcnQgY29uc3QgSEVJR0hUPTQ4MFxuIiwiaW1wb3J0ICogYXMgY29uZmlnIGZyb20gXCIuL2NvbmZpZy5lczZcIlxuaW1wb3J0IFwiLi9zb3VuZC5lczZcIlxuaW1wb3J0IEJhbGwgZnJvbSBcIi4vYmFsbC5lczZcIlxuaW1wb3J0IEJhdCBmcm9tIFwiLi9iYXQuZXM2XCJcblxuY29uc29sZS5sb2coY29uZmlnKVxudmFyIHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIoY29uZmlnLldJRFRILCBjb25maWcuSEVJR0hULHsgYW50aWFsaWFzOiB0cnVlIH0pO1xucmVuZGVyZXIudmlldy5zdHlsZS53aWR0aCA9IGNvbmZpZy5XSURUSCArIFwicHhcIlxucmVuZGVyZXIudmlldy5zdHlsZS5oZWlnaHQgPSBjb25maWcuSEVJR0hUICsgXCJweFwiXG5yZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldylcblxudmFyIHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKClcbi8vc3RhZ2UuaW50ZXJhY3RpdmUgPSB0cnVlXG5cbi8vdmFyIHRoaW5nID0gbmV3IFBJWEkuR3JhcGhpY3MoKVxuLy9zdGFnZS5hZGRDaGlsZCh0aGluZylcblxuLy8gc3RhZ2Uub24oJ2NsaWNrJywgb25DbGljaylcbi8vIHN0YWdlLm9uKCd0YXAnLCBvbkNsaWNrKVxuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICB0aHJvd0JhbGwoKVxufSwgMzAwMCk7XG5cbnZhciBpdGVtcz17fVxuZnVuY3Rpb24gb25DbGljaygpe1xuICBpZihpdGVtc1tcImJhbGxcIl0pe1xuXG4gIGlmKGl0ZW1zW1wiYmF0XCJdLmhpdENoZWNrKGl0ZW1zW1wiYmFsbFwiXSkpe1xuICAgIGl0ZW1zW1wiYmFsbFwiXS5oaXQoKVxuICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJoaXRcIilcbiAgfVxuICB9XG59XG5mdW5jdGlvbiB0aHJvd0JhbGwoKVxue1xuICBjb25zb2xlLmxvZyhcInRocm93XCIpXG4gIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJiYWxsXCIpXG4gIGl0ZW1zW1wiYmFsbFwiXT0gbmV3IEJhbGwoY29uZmlnLldJRFRILzIgLDUwICw1KVxufVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLG9uQ2xpY2spXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLG9uQ2xpY2spXG4vLyBydW4gdGhlIHJlbmRlciBsb29wXG5pdGVtc1tcImJhdFwiXT0gbmV3IEJhdCgpXG52YXIgbWV0ZXIgPSBuZXcgRlBTTWV0ZXIoKTtcbnZhciBncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKClcbnN0YWdlLmFkZENoaWxkKGdyYXBoaWNzKVxuXG5mdW5jdGlvbiBhbmltYXRlKCkge1xuICBncmFwaGljcy5jbGVhcigpXG4gIGZvcih2YXIgaSBpbiBpdGVtcyl7XG4gICAgaWYoaXRlbXNbaV0ubW92ZSgpKXtcbiAgICAgIGl0ZW1zW2ldLmRyYXcoZ3JhcGhpY3MpO1xuICAgIH1lbHNle1xuICAgICAgaXRlbXNbaV0uY2xlYXIoZ3JhcGhpY3MpXG4gICAgICBkZWxldGUgaXRlbXNbaV1cbiAgICB9XG4gIH1cbiAgcmVuZGVyZXIucmVuZGVyKHN0YWdlKVxuICAgIG1ldGVyLnRpY2soKTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBhbmltYXRlIClcbn1cbnJlcXVlc3RBbmltYXRpb25GcmFtZSggYW5pbWF0ZSApXG4iLCJsZXQgcXVldWUgPSBuZXcgY3JlYXRlanMuTG9hZFF1ZXVlKGZhbHNlKVxucXVldWUuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZClcbmxldCBsb2FkU291bmRDb21wbGV0ZT1mdW5jdGlvbigpe1xuXG59O1xucXVldWUuYWRkRXZlbnRMaXN0ZW5lcihcImNvbXBsZXRlXCIsbG9hZFNvdW5kQ29tcGxldGUpXG52YXIgbWFuaWZlc3QgPSBbXG4gIHtzcmM6XCIvc291bmQvbnl1My5tcDNcIiwgaWQ6XCJiYWxsXCJ9LFxuICB7c3JjOlwiL3NvdW5kL3N0cmlrZTEubXAzXCIsIGlkOlwiaGl0XCJ9LFxuXVxucXVldWUubG9hZE1hbmlmZXN0KG1hbmlmZXN0KVxuIl19
