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
      radius: radius
    };
    this.initialize();
  }

  _createClass(Ball, [{
    key: "initialize",
    value: function initialize() {
      this.x = this.defaults["x"];
      this.y = this.defaults["y"];
      this.radius = this.defaults["radius"];
    }
  }, {
    key: "move",
    value: function move() {
      this.y += 3;
      this.radius += 0.05;
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
      this.clear(graphic);
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

},{"./config.es6":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var WIDTH = 320;
exports.WIDTH = WIDTH;
var HEIGHT = 480;
exports.HEIGHT = HEIGHT;

},{}],3:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _configEs6 = require("./config.es6");

var config = _interopRequireWildcard(_configEs6);

require("./sound.es6");

var _ballEs6 = require("./ball.es6");

var _ballEs62 = _interopRequireDefault(_ballEs6);

console.log(config);
var renderer = PIXI.autoDetectRenderer(config.WIDTH, config.HEIGHT, { antialias: true });
renderer.view.style.width = window.innerWidth + "px";
renderer.view.style.height = window.innerHeight + "px";
renderer.view.style.display = "block";
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
//stage.interactive = true

//var thing = new PIXI.Graphics()
//stage.addChild(thing)

// stage.on('click', onClick)
// stage.on('tap', onClick)

var items = {};
function onClick() {
  console.log("throw");
  createjs.Sound.play("ball");

  // var graphic = new PIXI.Graphics()
  // stage.addChild(graphic)
  items["ball"] = new _ballEs62["default"](config.WIDTH / 2, 0, 5);
}
document.addEventListener("click", onClick);
document.addEventListener("touchstart", onClick);
// run the render loop
animate();

var graphics = new PIXI.Graphics();
stage.addChild(graphics);

function animate() {
  for (var i in items) {
    if (items[i].move()) {
      items[i].draw(graphics);
    } else {
      items[i].clear(graphics);
      delete items[i];
    }
  }
  renderer.render(stage);
  requestAnimationFrame(animate);
}

},{"./ball.es6":1,"./config.es6":2,"./sound.es6":4}],4:[function(require,module,exports){
"use strict";

var queue = new createjs.LoadQueue(false);
queue.installPlugin(createjs.Sound);
var loadSoundComplete = function loadSoundComplete() {};
queue.addEventListener("complete", loadSoundComplete);
var manifest = [{ src: "/sound/nyu3.mp3", id: "ball" }, { src: "/sound/strike1.mp3", id: "hit" }];
queue.loadManifest(manifest);

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9iYWxsLmVzNiIsIi9Vc2Vycy9ob3NzeS9wcm9qZWN0L3N1YmFydV9jaGFsbGVuZ2UvZXM2L2NvbmZpZy5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9nYW1lLmVzNiIsIi9Vc2Vycy9ob3NzeS9wcm9qZWN0L3N1YmFydV9jaGFsbGVuZ2UvZXM2L3NvdW5kLmVzNiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozt5QkNBd0IsY0FBYzs7SUFBMUIsTUFBTTs7SUFFRyxJQUFJO0FBQ1osV0FEUSxJQUFJLENBQ1gsQ0FBQyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUM7MEJBREosSUFBSTs7QUFFckIsUUFBSSxDQUFDLFFBQVEsR0FBQztBQUNaLE9BQUMsRUFBRSxDQUFDO0FBQ0osT0FBQyxFQUFFLENBQUM7QUFDSixZQUFNLEVBQUUsTUFBTTtLQUNmLENBQUE7QUFDRCxRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDbkI7O2VBUmtCLElBQUk7O1dBVWIsc0JBQUU7QUFDVixVQUFJLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDMUIsVUFBSSxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzFCLFVBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUN0Qzs7O1dBRUcsZ0JBQUU7QUFDSixVQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNYLFVBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFBO0FBQ25CLFVBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxN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QU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN0Qix1QkFBcUIsQ0FBRSxPQUFPLENBQUUsQ0FBQTtDQUNqQzs7Ozs7QUNqREgsSUFBSSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3pDLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ25DLElBQUksaUJBQWlCLEdBQUMsU0FBbEIsaUJBQWlCLEdBQVcsRUFFL0IsQ0FBQztBQUNGLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUNwRCxJQUFJLFFBQVEsR0FBRyxDQUNiLEVBQUMsR0FBRyxFQUFDLGlCQUFpQixFQUFFLEVBQUUsRUFBQyxNQUFNLEVBQUMsRUFDbEMsRUFBQyxHQUFHLEVBQUMsb0JBQW9CLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBQyxDQUNyQyxDQUFBO0FBQ0QsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGx7XG4gIGNvbnN0cnVjdG9yKHgseSxyYWRpdXMpe1xuICAgIHRoaXMuZGVmYXVsdHM9e1xuICAgICAgeDogeCxcbiAgICAgIHk6IHksXG4gICAgICByYWRpdXM6IHJhZGl1c1xuICAgIH1cbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKXtcbiAgICB0aGlzLnggPXRoaXMuZGVmYXVsdHNbXCJ4XCJdXG4gICAgdGhpcy55ID10aGlzLmRlZmF1bHRzW1wieVwiXVxuICAgIHRoaXMucmFkaXVzID0gdGhpcy5kZWZhdWx0c1tcInJhZGl1c1wiXVxuICB9XG5cbiAgbW92ZSgpe1xuICAgIHRoaXMueSArPSAzXG4gICAgdGhpcy5yYWRpdXMgKz0gMC4wNVxuICAgIGlmKHRoaXMueSA+IGNvbmZpZy5IRUlHSFQpe1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBjbGVhcihncmFwaGljKXtcbiAgICBncmFwaGljLmNsZWFyKClcbiAgfVxuICBkcmF3KGdyYXBoaWMpe1xuICAgIHRoaXMuY2xlYXIoZ3JhcGhpYyk7XG4gICAgZ3JhcGhpYy5saW5lU3R5bGUoMClcbiAgICBncmFwaGljLmJlZ2luRmlsbCgweEZGRkZGRilcbiAgICBncmFwaGljLmRyYXdDaXJjbGUoXG4gICAgICB0aGlzLngsXG4gICAgICB0aGlzLnksXG4gICAgICB0aGlzLnJhZGl1c1xuICAgICAgKVxuICAgIGdyYXBoaWMuZW5kRmlsbCgpXG4gIH1cblxufVxuIiwiZXhwb3J0IGNvbnN0IFdJRFRIPTMyMFxuZXhwb3J0IGNvbnN0IEhFSUdIVD00ODBcbiIsImltcG9ydCAqIGFzIGNvbmZpZyBmcm9tIFwiLi9jb25maWcuZXM2XCJcbmltcG9ydCBcIi4vc291bmQuZXM2XCJcbmltcG9ydCBCYWxsIGZyb20gXCIuL2JhbGwuZXM2XCJcblxuY29uc29sZS5sb2coY29uZmlnKVxudmFyIHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIoY29uZmlnLldJRFRILCBjb25maWcuSEVJR0hULHsgYW50aWFsaWFzOiB0cnVlIH0pO1xucmVuZGVyZXIudmlldy5zdHlsZS53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICsgXCJweFwiXG5yZW5kZXJlci52aWV3LnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArIFwicHhcIlxucmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpXG5cbnZhciBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpXG4vL3N0YWdlLmludGVyYWN0aXZlID0gdHJ1ZVxuXG4vL3ZhciB0aGluZyA9IG5ldyBQSVhJLkdyYXBoaWNzKClcbi8vc3RhZ2UuYWRkQ2hpbGQodGhpbmcpXG5cbi8vIHN0YWdlLm9uKCdjbGljaycsIG9uQ2xpY2spXG4vLyBzdGFnZS5vbigndGFwJywgb25DbGljaylcblxudmFyIGl0ZW1zPXt9XG5mdW5jdGlvbiBvbkNsaWNrKClcbntcbiAgY29uc29sZS5sb2coXCJ0aHJvd1wiKVxuICBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwiYmFsbFwiKVxuXG4vLyB2YXIgZ3JhcGhpYyA9IG5ldyBQSVhJLkdyYXBoaWNzKClcbi8vIHN0YWdlLmFkZENoaWxkKGdyYXBoaWMpXG4gIGl0ZW1zW1wiYmFsbFwiXT0gbmV3IEJhbGwoY29uZmlnLldJRFRILzIgLDAgLDUpXG59XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixvbkNsaWNrKVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIixvbkNsaWNrKVxuLy8gcnVuIHRoZSByZW5kZXIgbG9vcFxuYW5pbWF0ZSgpXG5cbnZhciBncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKClcbnN0YWdlLmFkZENoaWxkKGdyYXBoaWNzKVxuXG5mdW5jdGlvbiBhbmltYXRlKCkge1xuICAgIGZvcih2YXIgaSBpbiBpdGVtcyl7XG4gICAgICBpZihpdGVtc1tpXS5tb3ZlKCkpe1xuICAgICAgICBpdGVtc1tpXS5kcmF3KGdyYXBoaWNzKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBpdGVtc1tpXS5jbGVhcihncmFwaGljcylcbiAgICAgICAgZGVsZXRlIGl0ZW1zW2ldXG4gICAgICB9XG4gICAgfVxuICAgIHJlbmRlcmVyLnJlbmRlcihzdGFnZSlcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGFuaW1hdGUgKVxuICB9XG4iLCJsZXQgcXVldWUgPSBuZXcgY3JlYXRlanMuTG9hZFF1ZXVlKGZhbHNlKVxucXVldWUuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZClcbmxldCBsb2FkU291bmRDb21wbGV0ZT1mdW5jdGlvbigpe1xuXG59O1xucXVldWUuYWRkRXZlbnRMaXN0ZW5lcihcImNvbXBsZXRlXCIsbG9hZFNvdW5kQ29tcGxldGUpXG52YXIgbWFuaWZlc3QgPSBbXG4gIHtzcmM6XCIvc291bmQvbnl1My5tcDNcIiwgaWQ6XCJiYWxsXCJ9LFxuICB7c3JjOlwiL3NvdW5kL3N0cmlrZTEubXAzXCIsIGlkOlwiaGl0XCJ9LFxuXVxucXVldWUubG9hZE1hbmlmZXN0KG1hbmlmZXN0KVxuIl19
