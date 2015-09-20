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
      if (this.z < 50 && this.measure > 300 && this.measure < 350) {
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
        } else if (this.firstBound && 220 >= digree) {
            if (this.stoped == false) this.onFoul();
            this.stoped = true;
            // this.speed=0
            // this.onSpeedZero()
            // alert("faul")
          } else if (this.firstBound && this.measure > 350) {
              if (this.stoped == false) this.onHomerun(this.measure);
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
    //   current_state=config.STATES["START"]
    //   current_stage="home"
    //   requestAnimationFrame( animate )
    //   createjs.Sound.play("bgm", {loop:-1})
    // setTimeout(function () { throwBall() }, 2000);

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
          onHomerun: function onHomerun(measure) {
            createjs.Sound.play("homerun");
            homerunCount++;
            stages["ground"].homerun_image.visible = true;
            var point = Math.floor(measure);
            totalPoint += point;
            stages["ground"].score.text = point + " pt";
            setTimeout(function () {
              delete stages["ground"].initialize();
              stages["ground"].homerun_image.visible = false;
              stages["ground"].score.text = '';

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
var ballCount = 0;
var totalPoint = 0;
var homerunCount = 0;
function ending() {
  var page = $("#ending");
  page.find(".score .result").text(homerunCount);
  page.find(".point .result").text(totalPoint);
  if (homerunCount >= 5) {
    $(".success.message").show();
    $(".fail.message").hide();
    $(".tweetButtonWrapper").html("<a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-size=\"large\" data-hashtags=\"subaru_challenge\" data-dnt=\"true\" data-text=\"10球中" + homerunCount + "ホームランでチャレンジ成功！" + totalPoint + "pt獲得しました\" data-lang=\"ja\">ツイート</a>");
    twttr.widgets.load();
  } else {
    $(".success.message").hide();
    $(".fail.message").show();
  }
  page.show();
}
$("#retry").click(retry);
function retry() {
  ballCount = 0;
  totalPoint = 0;
  homerunCount = 0;
  // stages["home"].score.text=`${ballCount}/10`
  refleshBallCount();
  $("#ending").hide();
  $("#opening").show();
}
function throwBall() {
  if (ballCount == 10) {
    createjs.Sound.stop("bgm");
    createjs.Sound.play("whistle");
    ending();
    return;
  }
  if (current_state != config.STATES["START"]) {
    return true;
  }
  console.log("throw");
  var speed = _.random(3, 10);
  var ball = new _ballEs62["default"]({
    x: config.WIDTH / 2 - 20,
    y: 100,
    angle: Math.PI / (_.random(197, 215) / 100),
    speed: speed
  });

  stages["home"].pitch(ball);
  current_state = config.STATES["THROW"];
  ballCount++;
  console.log(ballCount);
  refleshBallCount();
}
function refleshBallCount() {
  var text = "CHALLENGE " + ballCount + "/10\nHOMERUN " + homerunCount;
  stages["home"].score.text = text;
}

$("#opening .startBtn").click(function () {
  $('#opening').hide();
  current_state = config.STATES["START"];
  current_stage = "home";
  requestAnimationFrame(animate);
  createjs.Sound.play("bgm", { loop: -1 });
  setTimeout(function () {
    throwBall();
  }, 2000);
});

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
  stages["home"].items["bat"].x = stages["home"].batter_movie.position.x;
  stages["home"].items["bat"].y = stages["home"].batter_movie.position.y + 80;
  if (stages["home"].batter_movie.position.x < 110) stages["home"].batter_movie.position.x = 110;
  if (stages["home"].batter_movie.position.x > 170) stages["home"].batter_movie.position.x = 170;
  if (stages["home"].batter_movie.position.y < 160) stages["home"].batter_movie.position.y = 160;
  if (stages["home"].batter_movie.position.y > 280) stages["home"].batter_movie.position.y = 280;
}
// run the render loop
stages["home"].addChild("bat", new _batEs62["default"]());
// var meter = new FPSMeter();
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
  // meter.tick();
  requestAnimationFrame(animate);
}
// requestAnimationFrame( animate )

var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
window.addEventListener("devicemotion", function (evt) {

  //加速度
  var x = evt.acceleration.x;
  var y = evt.acceleration.y;
  var z = evt.acceleration.z;

  //傾き
  var xg = evt.accelerationIncludingGravity.x;
  var yg = evt.accelerationIncludingGravity.y;
  var zg = evt.accelerationIncludingGravity.z;

  if (iOS) {
    vx = xg / 3;
    vy = -yg / 3;
  } else {
    vx = -xg / 3;
    vy = yg / 3;
  }
  // $("#console").html(xg)
}, true);

},{"./ball.es6":1,"./bat.es6":2,"./config.es6":3,"./sound.es6":5,"./stage_ground.es6":6,"./stage_home.es6":7}],5:[function(require,module,exports){
// createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin]);
"use strict";

var queue = new createjs.LoadQueue(false);
queue.installPlugin(createjs.Sound);
var loadSoundComplete = function loadSoundComplete() {
  // createjs.Sound.play("bgm",{loop:-1})
  // alert(1)
  $(".loading").hide();
  $(".startBtn").show();
};
queue.addEventListener("complete", loadSoundComplete);
var manifest = [{ src: "/sound/bgm.mp3", id: "bgm" }, { src: "/sound/foul.mp3", id: "foul" }, { src: "/sound/homerun.mp3", id: "homerun" }, { src: "/sound/nyu3.mp3", id: "ball" }, { src: "/sound/strike1.mp3", id: "hit" }, { src: "/sound/hitting.mp3", id: "strike" }, { src: "/sound/swing.mp3", id: "swing" }, { src: "/sound/whistle.mp3", id: "whistle" }];
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

    this.score = new PIXI.Text('', { font: 'bold 20px Arial', fill: '#ffffff', align: 'center' });
    this.score.x = this.homerun_image.position.x + 25;
    this.score.y = this.homerun_image.position.y + 40;

    this.stage.addChild(this.score);
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

    this.score = new PIXI.Text('CHALLENGE 0/10\nHOMERUN 0', { font: 'bold 16px Arial', fill: '#cccccc' });
    this.score.x = 30;
    this.score.y = 2;

    this.stage.addChild(this.score);

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
      if (typeof this.onPitch == 'undefined') return false;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9iYWxsLmVzNiIsIi9Vc2Vycy9ob3NzeS9wcm9qZWN0L3N1YmFydV9jaGFsbGVuZ2UvZXM2L2JhdC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9jb25maWcuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvZ2FtZS5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zb3VuZC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zdGFnZV9ncm91bmQuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvc3RhZ2VfaG9tZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7eUJDQXdCLGNBQWM7O0lBQTFCLE1BQU07O0lBRUcsSUFBSTtBQUNaLFdBRFEsSUFBSSxDQUNYLFFBQVEsRUFBQzswQkFERixJQUFJOztBQUVyQixRQUFJLENBQUMsUUFBUSxHQUFDLFFBQVEsQ0FBQTtBQUN0QixRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDbkI7O2VBSmtCLElBQUk7O1dBTWIsc0JBQUU7QUFDVixVQUFJLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFBO0FBQzdCLFVBQUksQ0FBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDN0IsVUFBSSxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUE7QUFDVCxVQUFJLENBQUMsRUFBRSxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUUsQ0FBQyxDQUFBO0FBQy9CLFVBQUksQ0FBQyxFQUFFLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDL0IsVUFBSSxDQUFDLEVBQUUsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFFLENBQUMsQ0FBQTtBQUMvQixVQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUUsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUE7QUFDOUMsVUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFFLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFBO0FBQ2hELFVBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDdEMsVUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFFLENBQUMsQ0FBQTtBQUN4QyxVQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQTtBQUNkLFVBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFDcEIsVUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFlBQVUsRUFBRSxDQUFBO0FBQy9ELFVBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxZQUFVLEVBQUUsQ0FBQTtBQUNyRCxVQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksWUFBVSxFQUFFLENBQUE7QUFDM0QsVUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLFlBQVUsRUFBRSxDQUFBO0FB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QUUsR0FBQyxDQUFDLENBQUE7R0FBRTtBQUM3QixNQUFHLEtBQUssQ0FBQyxPQUFPLElBQUUsRUFBRSxFQUFDO0FBQUUsTUFBRSxHQUFDLENBQUMsQ0FBQTtHQUFFO0NBQzlCO0FBQ0QsU0FBUyxPQUFPLENBQUMsS0FBSyxFQUFDO0FBQ3JCLE1BQUksQ0FBQyxHQUFDLENBQUMsQ0FBQTtBQUNQLE1BQUcsS0FBSyxDQUFDLE9BQU8sSUFBRSxFQUFFLElBQUUsS0FBSyxDQUFDLE9BQU8sSUFBRSxFQUFFLEVBQUM7QUFBRSxXQUFPLE9BQU8sRUFBRSxDQUFBO0dBQUU7QUFDNUQsTUFBRyxLQUFLLENBQUMsT0FBTyxJQUFFLEVBQUUsRUFBQztBQUFFLE1BQUUsR0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFFO0FBQzlCLE1BQUcsS0FBSyxDQUFDLE9BQU8sSUFBRSxFQUFFLEVBQUM7QUFBRSxNQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUE7R0FBRTtBQUM5QixNQUFHLEtBQUssQ0FBQyxPQUFPLElBQUUsRUFBRSxFQUFDO0FBQUUsTUFBRSxHQUFDLENBQUMsQ0FBQTtHQUFFO0FBQzdCLE1BQUcsS0FBSyxDQUFDLE9BQU8sSUFBRSxFQUFFLEVBQUM7QUFBRSxNQUFFLEdBQUMsQ0FBQyxDQUFBO0dBQUU7Q0FDOUI7QUFDRCxTQUFTLElBQUksR0FBRTtBQUNiLE1BQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFDO0FBQUMsV0FBTyxLQUFLLENBQUE7R0FBQztBQUM5QyxRQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFBO0FBQzFDLFFBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUE7QUFDMUMsUUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0FBQ3RFLFFBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUE7QUFDdkUsTUFBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsR0FBRyxFQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUE7QUFDeEYsTUFBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsR0FBRyxFQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUE7QUFDeEYsTUFBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsR0FBRyxFQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUE7QUFDeEYsTUFBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsR0FBRyxFQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUE7Q0FDekY7O0FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUMseUJBQVMsQ0FBQyxDQUFBOztBQUV4QyxJQUFJLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTs7O0FBSWxDLFNBQVMsT0FBTyxHQUFHO0FBQ2pCLE1BQUcsYUFBYSxJQUFFLE1BQU0sQ0FBQyxNQUFNLENB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T0FBTyxJQUFHLFdBQVcsRUFBQyxPQUFPLEtBQUssQ0FBQztBQUNsRCxVQUFHLElBQUksQ0FBQyxPQUFPLEVBQUMsT0FBTyxLQUFLLENBQUE7QUFDNUIsVUFBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksSUFBRSxDQUFDLEVBQUM7QUFDcEMsWUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUE7QUFDakIsWUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO09BQ2Y7S0FFRjs7O1dBRU0sbUJBQUU7QUFDUCxVQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFBO0FBQ3JCLFVBQUcsSUFBSSxDQUFDLFlBQVksRUFBQztBQUFDLFlBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtPQUFFO0FBQzdDLFVBQUcsSUFBSSxDQUFDLGFBQWEsRUFBQztBQUFDLFlBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtPQUFFOztBQUUvQyxXQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUM7QUFDdEIsWUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFDO0FBQ3RCLGNBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQyxNQUFJO0FBQ0gsY0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ2xDLGlCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDckI7T0FDRjtLQUNGOzs7U0FsSWtCLFNBQVM7OztxQkFBVCxTQUFTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzIGNvbmZpZyBmcm9tIFwiLi9jb25maWcuZXM2XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFsbHtcbiAgY29uc3RydWN0b3IoZGVmYXVsdHMpe1xuICAgIHRoaXMuZGVmYXVsdHM9ZGVmYXVsdHNcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKXtcbiAgICB0aGlzLnggPXRoaXMuZGVmYXVsdHNbXCJ4XCJdfHwwXG4gICAgdGhpcy55ID10aGlzLmRlZmF1bHRzW1wieVwiXXx8MFxuICAgIHRoaXMueiA9NVxuICAgIHRoaXMudnggPXRoaXMuZGVmYXVsdHNbXCJ2eFwiXXx8MFxuICAgIHRoaXMudnkgPXRoaXMuZGVmYXVsdHNbXCJ2eVwiXXx8MFxuICAgIHRoaXMudnogPXRoaXMuZGVmYXVsdHNbXCJ2elwiXXx8MFxuICAgIHRoaXMuYW5nbGUgPSB0aGlzLmRlZmF1bHRzW1wiYW5nbGVcIl18fE1hdGguUEkvMlxuICAgIHRoaXMuekFuZ2xlID0gdGhpcy5kZWZhdWx0c1tcInpBbmdsZVwiXXx8TWF0aC5QSS8yXG4gICAgdGhpcy5zcGVlZCA9IHRoaXMuZGVmYXVsdHNbXCJzcGVlZFwiXXx8MFxuICAgIHRoaXMucmFkaXVzID0gdGhpcy5kZWZhdWx0c1tcInJhZGl1c1wiXXx8MFxuICAgIHRoaXMubWVhc3VyZSA9IDBcbiAgICAgIHRoaXMuaG9tZUJveD1bMCwwXVxuICAgIHRoaXMub25TcGVlZFplcm8gPSB0aGlzLmRlZmF1bHRzW1wib25TcGVlZFplcm9cIl0gfHwgZnVuY3Rpb24oKXt9XG4gICAgdGhpcy5vbkZvdWwgPSB0aGlzLmRlZmF1bHRzW1wib25Gb3VsXCJdIHx8IGZ1bmN0aW9uKCl7fVxuICAgIHRoaXMub25Ib21lcnVuID0gdGhpcy5kZWZhdWx0c1tcIm9uSG9tZXJ1blwiXSB8fCBmdW5jdGlvbigpe31cbiAgICB0aGlzLm9uRmlyc3RCb3VuZCA9IHRoaXMuZGVmYXVsdHNbXCJvbkZpcnN0Qm91bmRcIl0gfHwgZnVuY3Rpb24oKXt9XG4gICAgdGhpcy5ib3VudENvdW50PTBcbiAgICB0aGlzLmZpcnN0Qm91bmQ9dHJ1ZVxuICAgIHRoaXMuc3RvcGVkPWZhbHNlXG4gIH1cblxuICBoaXQoYW5nbGUsekFuZ2xlLHBvdyl7XG4gICAgLy8gbGV0IG1pbj0xODBcbiAgICAvLyBsZXQgbWF4PTM2MFxuICAgIC8vIHRoaXMuYW5nbGU9KCggTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICkgKyBtaW4pICogTWF0aC5QSS8xODA7XG4gICAgLy8gdGhpcy5hbmdsZT1taW4vL2RlYnVnXG4gICAgdGhpcy5hbmdsZT0oYW5nbGUgKzE4MCs5MCkqTWF0aC5QSS8xODBcbiAgICB0aGlzLnNwZWVkID1wb3dcblxuICAgIC8vIGxldCB6bWluPTEwXG4gICAgLy8gbGV0IHptYXg9ODBcbiAgICAvLyB0aGlzLnpBbmdsZT0oKCBNYXRoLnJhbmRvbSgpICogKHptYXggLSB6bWluKSApICsgem1pbikgKiBNYXRoLlBJLzE4MDtcbiAgICB0aGlzLnpBbmdsZT0oekFuZ2xlKzQ1KSpNYXRoLlBJLzE4MFxuICAgIC8vIHRoaXMuekFuZ2xlPTMwMCogTWF0aC5QSS8xODA7Ly9kZWJ1Z1xuICAgIHRoaXMudnogPSBNYXRoLnNpbih0aGlzLnpBbmdsZSkgKiB0aGlzLnNwZWVkXG5cbiAgICB0aGlzLmhvbWVCb3g9WzAsMF1cbiAgICAvLyBjb25zb2xlLmxvZyhcIkhpdFwiLHRoaXMueCx0aGlzLnkpXG4gIH1cblxuICBtb3ZlKCl7XG4gICAgdGhpcy52eSA9IE1hdGguc2luKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZFxuICAgIHRoaXMudnggPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWRcbiAgICB0aGlzLnkgKz0gdGhpcy52eVxuICAgIHRoaXMueCArPSB0aGlzLnZ4XG4gICAgdGhpcy5yYWRpdXMgPSB0aGlzLnkvMzBcbiAgICAvLyBpZih0aGlzLnkgPiBjb25maWcuSEVJR0hUKXtcblxuICAgIC8vICAgcmV0dXJuIGZhbHNlXG4gICAgLy8gfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIG1vdmVfZ3JvdW5kKHNjYWxlKXtcbiAgICB0aGlzLnZ5ID0gTWF0aC5zaW4odGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkKnNjYWxlXG4gICAgdGhpcy52eCA9IE1hdGguY29zKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZCpzY2FsZVxuICAgIHRoaXMudnogLT0gMC42OFxuICAgIHRoaXMueSArPSB0aGlzLnZ5XG4gICAgdGhpcy54ICs9IHRoaXMudnhcbiAgICB0aGlzLnogKz0gdGhpcy52elxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMueilcbiAgICB0aGlzLmhvbWVCb3hbMF0rPXRoaXMudnhcbiAgICB0aGlzLmhvbWVCb3hbMV0rPXRoaXMudnlcbiAgICB0aGlzLm1lYXN1cmUgPSBNYXRoLnNxcnQoKHRoaXMuaG9tZUJveFswXSp0aGlzLmhvbWVCb3hbMF0pICsgKHRoaXMuaG9tZUJveFsxXSp0aGlzLmhvbWVCb3hbMV0pKVxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubWVhc3VyZSlcbiAgICBpZih0aGlzLno8PTApe1xuICAgICAgdGhpcy5maXJzdEJvdW5kXG4gICAgICB0aGlzLno9MFxuICAgICAgdGhpcy5ib3VudENvdW50KytcbiAgICAgIHRoaXMuc3BlZWQqPTAuOVxuICAgICAgdGhpcy52eio9LTAuNVxuICAgICAgLy8gdGhpcy52eio9LTEvL2RlYnVnXG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMueilcbiAgICBpZih0aGlzLno8NTAgJiYgdGhpcy5tZWFzdXJlID4gMzAwICYmIHRoaXMubWVhc3VyZTwzNTApe1xuICAgICAgdGhpcy5tZWFzdXJlPTMwMFxuICAgICAgLy8gY29uc29sZS5sb2coXCJyZWZyZWN0XCIpXG4gICAgICAvLyB0aGlzLnk9OTBcbiAgICAgIC8vIHRoaXMudnkqPS0xXG4gICAgICB0aGlzLmFuZ2xlKj0tMVxuICAgICAgdGhpcy52eio9LTFcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2codGhpcy55KVxuICAgIHZhciBjb2Y9MzBcbiAgICBpZih0aGlzLnovY29mPDMpe3RoaXMucmFkaXVzID0gM31cbiAgICBlbHNlIGlmKHRoaXMuei9jb2Y+MTApe3RoaXMucmFkaXVzPTEwfVxuICAgIGVsc2V7dGhpcy5yYWRpdXM9dGhpcy56L2NvZn1cbiAgICAvL1xuICAgIC8vIGlmKHRoaXMueSA+IGNvbmZpZy5IRUlHSFQpe1xuICAgIC8vICAgcmV0dXJuIGZhbHNlXG4gICAgLy8gfVxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3BlZWQpXG4gICAgaWYodGhpcy5zdG9wZWQ9PWZhbHNlICYmIHRoaXMuc3BlZWQgPCAwLjEpe1xuICAgICAgdGhpcy5zdG9wZWQ9dHJ1ZVxuICAgICAgdGhpcy5zcGVlZD0wXG4gICAgICB0aGlzLm9uU3BlZWRaZXJvKClcbiAgICB9XG4gICAgaWYodGhpcy56PDEpe1xuICAgICAgLy9ob21lcnVuXG4gICAgICB2YXIgZGlncmVlID10aGlzLmFuZ2xlKigxODAvTWF0aC5QSSlcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYW5nbGUsZGlncmVlKVxuICAgICAgLy8gZXhpdDtcbiAgICAgIGlmKHRoaXMuZmlyc3RCb3VuZCAmJiAzMTUgPD0gZGlncmVlKXtcbiAgICAgICAgaWYodGhpcy5zdG9wZWQ9PWZhbHNlKXRoaXMub25Gb3VsKClcbiAgICAgICAgdGhpcy5zdG9wZWQ9dHJ1ZVxuICAgICAgICAvLyB0aGlzLnNwZWVkPTBcbiAgICAgICAgLy8gdGhpcy5vblNwZWVkWmVybygpXG4gICAgICAgIC8vIGFsZXJ0KFwiZmF1bFwiKVxuICAgICAgfSBlbHNlIGlmKHRoaXMuZmlyc3RCb3VuZCAmJiAyMjAgPj0gZGlncmVlKXtcbiAgICAgICAgaWYodGhpcy5zdG9wZWQ9PWZhbHNlKXRoaXMub25Gb3VsKClcbiAgICAgICAgdGhpcy5zdG9wZWQ9dHJ1ZVxuICAgICAgICAvLyB0aGlzLnNwZWVkPTBcbiAgICAgICAgLy8gdGhpcy5vblNwZWVkWmVybygpXG4gICAgICAgIC8vIGFsZXJ0KFwiZmF1bFwiKVxuICAgICAgfWVsc2UgaWYodGhpcy5maXJzdEJvdW5kICYmIHRoaXMubWVhc3VyZT4zNTApe1xuICAgICAgICBpZih0aGlzLnN0b3BlZD09ZmFsc2UpdGhpcy5vbkhvbWVydW4odGhpcy5tZWFzdXJlKVxuICAgICAgICB0aGlzLnN0b3BlZD10cnVlXG4gICAgICAgIC8vIHRoaXMuc3BlZWQ9MFxuICAgICAgICAvLyB0aGlzLm9uU3BlZWRaZXJvKClcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJob21lIHJ1blwiKVxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGNsZWFyKGdyYXBoaWMpe1xuICAgIGdyYXBoaWMuY2xlYXIoKVxuICB9XG4gIGRyYXcoZ3JhcGhpYyl7XG4gICAgLy8gdGhpcy5jbGVhcihncmFwaGljKTtcbiAgICBncmFwaGljLmxpbmVTdHlsZSgwKVxuICAgIGdyYXBoaWMuYmVnaW5GaWxsKDB4RkZGRkZGKVxuICAgIGdyYXBoaWMuZHJhd0NpcmNsZShcbiAgICAgIHRoaXMueCxcbiAgICAgIHRoaXMueSxcbiAgICAgIHRoaXMucmFkaXVzXG4gICAgKVxuICAgIGdyYXBoaWMuZW5kRmlsbCgpXG4gIH1cblxuICBkcmF3X2dyb3VuZChncmFwaGljLHgseSxyYWRpdXMpe1xuICAgIC8vIHRoaXMuY2xlYXIoZ3JhcGhpYyk7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy54KnNjYWxlK29mZnNldF94LHRoaXMueSpzY2FsZStvZmZzZXRfeSlcbiAgICBncmFwaGljLmxpbmVTdHlsZSgwKVxuICAgIGdyYXBoaWMuYmVnaW5GaWxsKDB4RkZGRkZGKVxuICAgIGdyYXBoaWMuZHJhd0NpcmNsZSh4LHkscmFkaXVzIClcbiAgICBncmFwaGljLmVuZEZpbGwoKVxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhdHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLmRlZmF1bHRzPXtcbiAgICAgIHg6IDUwLFxuICAgICAgeTogMjgwLFxuICAgICAgd2lkdGg6IDYwLFxuICAgICAgaGVpZ2h0OiA2MFxuICAgIH1cbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKXtcbiAgICB0aGlzLnggPXRoaXMuZGVmYXVsdHNbXCJ4XCJdXG4gICAgdGhpcy55ID10aGlzLmRlZmF1bHRzW1wieVwiXVxuICAgIHRoaXMud2lkdGggPSB0aGlzLmRlZmF1bHRzW1wid2lkdGhcIl1cbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuZGVmYXVsdHNbXCJoZWlnaHRcIl1cbiAgfVxuXG4gIGhpdENoZWNrKGJhbGwpe1xuICAgIGlmKCFiYWxsKXJldHVybiBmYWxzZTtcbiAgICBpZihcbiAgICAgIHRoaXMueCA8IGJhbGwueCAmJlxuICAgICAgYmFsbC54IDwgdGhpcy54ICsgdGhpcy53aWR0aCAmJlxuICAgICAgICB0aGlzLnkgPCBiYWxsLnkgJiZcbiAgICAgICAgYmFsbC55IDwgdGhpcy55ICsgdGhpcy5oZWlnaHRcbiAgICApe1xuICAgICAgLy8gY29uc29sZS5sb2coYmFsbC54ICwgdGhpcy54LCB0aGlzLndpZHRoKVxuICAgICAgLy8gIGV4aXQoKVxuICAgICAgdmFyIGFuZ2xlPU1hdGguYXRhbjIoXG4gICAgICAgIChiYWxsLngtKHRoaXMueCt0aGlzLndpZHRoLzIpKSAvIHRoaXMud2lkdGgqNCAsXG4gICAgICAgICAxXG4gICAgICAgKVxuICAgICAgIHZhciB6QW5nbGU9TWF0aC5hdGFuMihcbiAgICAgICAgIChiYWxsLnktKHRoaXMueSt0aGlzLmhlaWdodC8yKSkgLyB0aGlzLmhlaWdodCo0ICxcbiAgICAgICAgICAxXG4gICAgICAgIClcbiAgICAgIHZhciBwb3cgPTYwIC0gNSogTWF0aC5zcXJ0KE1hdGguYWJzKCh0aGlzLngrdGhpcy53aWR0aC8yKS1iYWxsLngpLCBNYXRoLmFicygodGhpcy55K3RoaXMuaGVpZ2h0LzIpLWJhbGwueCkpXG4gICAgICAvLyBjb25zb2xlLmxvZyhiYWxsLnkgLCB0aGlzLnksIHRoaXMuaGVpZ2h0KVxuICAgICAgLy8gIGV4aXQoKVxuICAgICAgLy8gICBjb25zb2xlLmxvZyh6QW5nbGUqIDE4MC8gTWF0aC5QSSlcbiAgICAgIC8vICAgZXhpdCgpO1xuICAgICAgY29uc29sZS5sb2cocG93KVxuICAgICAgcmV0dXJuIFthbmdsZSAqIDE4MC8gTWF0aC5QSSwgekFuZ2xlKiAxODAvIE1hdGguUEkscG93XVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBtb3ZlKCl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjbGVhcihncmFwaGljKXtcbiAgICBncmFwaGljLmNsZWFyKClcbiAgfVxuICBkcmF3KGdyYXBoaWMpe1xuICAgIC8vIHRoaXMuY2xlYXIoZ3JhcGhpYyk7XG4gICAgZ3JhcGhpYy5saW5lU3R5bGUoMiwgMHhGRjAwMDApO1xuICAgIGdyYXBoaWMuZHJhd1JlY3QoXG4gICAgICB0aGlzLngsXG4gICAgICB0aGlzLnksXG4gICAgICB0aGlzLndpZHRoLFxuICAgICAgdGhpcy5oZWlnaHRcbiAgICAgIClcbiAgfVxuXG59XG4iLCJleHBvcnQgY29uc3QgV0lEVEg9MzIwXG5leHBvcnQgY29uc3QgSEVJR0hUPTQ4MFxuZXhwb3J0IGNvbnN0IFNUQVRFUz17XG4gIE9QRU5JTkc6MCxcbiAgU1RBUlQ6IDEsXG4gIFRIUk9XOiAyLFxuICBISVQ6IDMsXG4gIEJPVU5EOiA0XG59XG4iLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5pbXBvcnQgXCIuL3NvdW5kLmVzNlwiXG5pbXBvcnQgQmFsbCBmcm9tIFwiLi9iYWxsLmVzNlwiXG5pbXBvcnQgQmF0IGZyb20gXCIuL2JhdC5lczZcIlxuaW1wb3J0IEhvbWUgZnJvbSBcIi4vc3RhZ2VfaG9tZS5lczZcIlxuaW1wb3J0IEdyb3VuZCBmcm9tIFwiLi9zdGFnZV9ncm91bmQuZXM2XCJcblxudmFyIGN1cnJlbnRfc3RhdGU9Y29uZmlnLlNUQVRFU1tcIk9QRU5JTkdcIl1cblxudmFyIHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIoY29uZmlnLldJRFRILCBjb25maWcuSEVJR0hULHsgYW50aWFsaWFzOiB0cnVlIH0pO1xucmVuZGVyZXIudmlldy5zdHlsZS53aWR0aCA9IGNvbmZpZy5XSURUSCArIFwicHhcIlxucmVuZGVyZXIudmlldy5zdHlsZS5oZWlnaHQgPSBjb25maWcuSEVJR0hUICsgXCJweFwiXG5yZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldylcblxuXG5cbnZhciBzdGFnZXM9e31cbnN0YWdlc1tcImhvbWVcIl0gPSBuZXcgSG9tZSgpXG5zdGFnZXNbXCJncm91bmRcIl0gPSBuZXcgR3JvdW5kKClcbi8vIHZhciBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpXG52YXIgZ3JvdW5kID0gbmV3IFBJWEkuQ29udGFpbmVyKClcbnZhciBvcGVuaW5nID0gbmV3IFBJWEkuQ29udGFpbmVyKClcbnZhciBjdXJyZW50X3N0YWdlID0gXCJvcGVuaW5nXCJcblxuXG5cbi8vc3RhZ2UuaW50ZXJhY3RpdmUgPSB0cnVlXG5cbi8vdmFyIHRoaW5nID0gbmV3IFBJWEkuR3JhcGhpY3MoKVxuLy9zdGFnZS5hZGRDaGlsZCh0aGluZylcblxuLy8gc3RhZ2Uub24oJ2NsaWNrJywgb25DbGljaylcbi8vIHN0YWdlLm9uKCd0YXAnLCBvbkNsaWNrKVxuLy8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4vLyAgIHRocm93QmFsbCgpXG4vLyB9LCAxMDAwKTtcblxudmFyIGl0ZW1zPXt9XG52YXIgc2VsZj10aGlzXG5mdW5jdGlvbiBvbkNsaWNrKCl7XG4gIC8vIHJldHVyblxuICBpZihjdXJyZW50X3N0YXRlID09IGNvbmZpZy5TVEFURVNbXCJPUEVOSU5HXCJdKXtcbiAgICAvLyAgIGN1cnJlbnRfc3RhdGU9Y29uZmlnLlNUQVRFU1tcIlNUQVJUXCJdXG4gICAgLy8gICBjdXJyZW50X3N0YWdlPVwiaG9tZVwiXG4gICAgLy8gICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGFuaW1hdGUgKVxuICAgIC8vICAgY3JlYXRlanMuU291bmQucGxheShcImJnbVwiLCB7bG9vcDotMX0pXG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHRocm93QmFsbCgpIH0sIDIwMDApO1xuXG4gIH0gZWxzZSBpZihjdXJyZW50X3N0YXRlID09IGNvbmZpZy5TVEFURVNbXCJUSFJPV1wiXSl7XG4gICAgc3RhZ2VzW1wiaG9tZVwiXS5zd2luZyhmdW5jdGlvbigpe1xuICAgICAgY3VycmVudF9zdGF0ZSA9IGNvbmZpZy5TVEFURVNbXCJISVRcIl1cblxuICAgICAgdmFyIGJhbGwgPSBzdGFnZXNbXCJob21lXCJdLml0ZW1zW1wiYmFsbFwiXVxuICAgICAgY29uc29sZS5sb2coYmFsbClcbiAgICAgIHN0YWdlc1tcImdyb3VuZFwiXS5hZGRDaGlsZChcImJhbGxcIiwgIG5ldyBCYWxsKHtcbiAgICAgICAgeDogY29uZmlnLldJRFRIIC8gMixcbiAgICAgICAgeTogNDAwLFxuICAgICAgICBhbmdsZTogYmFsbC5hbmdsZSxcbiAgICAgICAgc3BlZWQ6IGJhbGwuc3BlZWQsXG4gICAgICAgIHZ4OiBiYWxsLnZ4LFxuICAgICAgICB2eTogYmFsbC52eSxcbiAgICAgICAgdno6IGJhbGwudnosXG4gICAgICAgIG9uSG9tZXJ1bjpmdW5jdGlvbihtZWFzdXJlKXtcbiAgICAgICAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwiaG9tZXJ1blwiKVxuICAgICAgICAgIGhvbWVydW5Db3VudCsrO1xuICAgICAgICAgIHN0YWdlc1tcImdyb3VuZFwiXS5ob21lcnVuX2ltYWdlLnZpc2libGU9dHJ1ZVxuICAgICAgICAgIHZhciBwb2ludCA9TWF0aC5mbG9vcihtZWFzdXJlKVxuICAgICAgICAgIHRvdGFsUG9pbnQrPXBvaW50O1xuICAgICAgICAgICAgc3RhZ2VzW1wiZ3JvdW5kXCJdLnNjb3JlLnRleHQ9YCR7cG9pbnR9IHB0YFxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGRlbGV0ZSBzdGFnZXNbXCJncm91bmRcIl0uaW5pdGlhbGl6ZSgpXG4gICAgICAgICAgICBzdGFnZXNbXCJncm91bmRcIl0uaG9tZXJ1bl9pbWFnZS52aXNpYmxlPWZhbHNlXG4gICAgICAgICAgICBzdGFnZXNbXCJncm91bmRcIl0uc2NvcmUudGV4dD0nJ1xuXG4gICAgICAgICAgICBjdXJyZW50X3N0YXRlID0gY29uZmlnLlNUQVRFU1tcIlNUQVJUXCJdXG4gICAgICAgICAgICBjdXJyZW50X3N0YWdlID0gXCJob21lXCJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgdGhyb3dCYWxsKClcbiAgICAgICAgICAgIH0sMTAwMClcbiAgICAgICAgICB9LDIwMDApXG4gICAgICAgIH0sXG4gICAgICAgIG9uRm91bDpmdW5jdGlvbigpe1xuICAgICAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJmb3VsXCIpXG4gICAgICAgICAgc3RhZ2VzW1wiZ3JvdW5kXCJdLmZhdWxfaW1hZ2UudmlzaWJsZT10cnVlXG4gICAgICAgICAgY29uc29sZS5sb2coXCJmb3VsXCIpXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgZGVsZXRlIHN0YWdlc1tcImdyb3VuZFwiXS5pbml0aWFsaXplKClcbiAgICAgICAgICAgIHN0YWdlc1tcImdyb3VuZFwiXS5mYXVsX2ltYWdlLnZpc2libGU9ZmFsc2VcbiAgICAgICAgICAgIGN1cnJlbnRfc3RhdGUgPSBjb25maWcuU1RBVEVTW1wiU1RBUlRcIl1cbiAgICAgICAgICAgIGN1cnJlbnRfc3RhZ2UgPSBcImhvbWVcIlxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICB0aHJvd0JhbGwoKVxuICAgICAgICAgICAgfSwxMDAwKVxuICAgICAgICAgIH0sMTAwMClcbiAgICAgICAgfSxcbiAgICAgICAgb25TcGVlZFplcm86ZnVuY3Rpb24oKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInNwZWVkIHplcm9cIilcbiAgICAgICAgICBkZWxldGUgc3RhZ2VzW1wiZ3JvdW5kXCJdLmluaXRpYWxpemUoKVxuICAgICAgICAgIGN1cnJlbnRfc3RhdGUgPSBjb25maWcuU1RBVEVTW1wiU1RBUlRcIl1cbiAgICAgICAgICBjdXJyZW50X3N0YWdlID0gXCJob21lXCJcbiAgICAgICAgICBzZXRUaW1lb3V0KHRocm93QmFsbCwxMDAwKVxuICAgICAgICB9XG4gICAgICB9KSlcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBjdXJyZW50X3N0YWdlPVwiZ3JvdW5kXCJcbiAgICAgIH0sMClcbiAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJoaXRcIilcbiAgICB9KVxuXG5cbiAgfVxufVxudmFyIGJhbGxDb3VudD0wXG52YXIgdG90YWxQb2ludD0wXG52YXIgaG9tZXJ1bkNvdW50PTA7XG5mdW5jdGlvbiBlbmRpbmcoKXtcbiAgdmFyIHBhZ2U9ICQoXCIjZW5kaW5nXCIpXG4gIHBhZ2UuZmluZChcIi5zY29yZSAucmVzdWx0XCIpLnRleHQoaG9tZXJ1bkNvdW50KVxuICBwYWdlLmZpbmQoXCIucG9pbnQgLnJlc3VsdFwiKS50ZXh0KHRvdGFsUG9pbnQpXG4gIGlmKGhvbWVydW5Db3VudD49NSl7XG4gICAgJChcIi5zdWNjZXNzLm1lc3NhZ2VcIikuc2hvdygpXG4gICAgJChcIi5mYWlsLm1lc3NhZ2VcIikuaGlkZSgpXG4gICAgJChcIi50d2VldEJ1dHRvbldyYXBwZXJcIikuaHRtbChcbiAgICAgIGA8YSBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9zaGFyZVwiIGNsYXNzPVwidHdpdHRlci1zaGFyZS1idXR0b25cIiBkYXRhLXNpemU9XCJsYXJnZVwiIGRhdGEtaGFzaHRhZ3M9XCJzdWJhcnVfY2hhbGxlbmdlXCIgZGF0YS1kbnQ9XCJ0cnVlXCIgZGF0YS10ZXh0PVwiMTDnkIPkuK0ke2hvbWVydW5Db3VudH3jg5vjg7zjg6Djg6njg7Pjgafjg4Hjg6Pjg6zjg7PjgrjmiJDlip/vvIEke3RvdGFsUG9pbnR9cHTnjbLlvpfjgZfjgb7jgZfjgZ9cIiBkYXRhLWxhbmc9XCJqYVwiPuODhOOCpOODvOODiDwvYT5gXG4gICAgKVxuICAgIHR3dHRyLndpZGdldHMubG9hZCgpXG4gIH1lbHNle1xuICAgICQoXCIuc3VjY2Vzcy5tZXNzYWdlXCIpLmhpZGUoKVxuICAgICQoXCIuZmFpbC5tZXNzYWdlXCIpLnNob3coKVxuXG4gIH1cbiAgcGFnZS5zaG93KClcbn1cbiQoXCIjcmV0cnlcIikuY2xpY2socmV0cnkpXG5mdW5jdGlvbiByZXRyeSgpe1xuICBiYWxsQ291bnQ9MDtcbiAgdG90YWxQb2ludD0wO1xuICBob21lcnVuQ291bnQ9MDtcbiAgLy8gc3RhZ2VzW1wiaG9tZVwiXS5zY29yZS50ZXh0PWAke2JhbGxDb3VudH0vMTBgXG4gIHJlZmxlc2hCYWxsQ291bnQoKVxuICAkKFwiI2VuZGluZ1wiKS5oaWRlKClcbiAgJChcIiNvcGVuaW5nXCIpLnNob3coKVxufVxuZnVuY3Rpb24gdGhyb3dCYWxsKClcbntcbiAgaWYoYmFsbENvdW50PT0xMCl7XG4gICAgY3JlYXRlanMuU291bmQuc3RvcChcImJnbVwiKVxuICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJ3aGlzdGxlXCIpXG4gICAgZW5kaW5nKClcbiAgICByZXR1cm47XG4gIH1cbiAgaWYoY3VycmVudF9zdGF0ZSAhPSBjb25maWcuU1RBVEVTW1wiU1RBUlRcIl0pIHtyZXR1cm4gdHJ1ZX1cbiAgY29uc29sZS5sb2coXCJ0aHJvd1wiKVxuICB2YXIgc3BlZWQ9Xy5yYW5kb20oMywxMClcbiAgdmFyIGJhbGwgPW5ldyBCYWxsKHtcbiAgICB4OmNvbmZpZy5XSURUSC8yLTIwICxcbiAgICB5OjEwMCAsXG4gICAgYW5nbGU6IE1hdGguUEkvKF8ucmFuZG9tKDE5NywgMjE1KS8xMDApLFxuICAgIHNwZWVkOiBzcGVlZFxuICB9KVxuXG4gIHN0YWdlc1tcImhvbWVcIl0ucGl0Y2goYmFsbClcbiAgY3VycmVudF9zdGF0ZT1jb25maWcuU1RBVEVTW1wiVEhST1dcIl1cbiAgYmFsbENvdW50Kys7XG4gIGNvbnNvbGUubG9nKGJhbGxDb3VudClcbiAgcmVmbGVzaEJhbGxDb3VudCgpXG59XG5mdW5jdGlvbiByZWZsZXNoQmFsbENvdW50KCl7XG4gIHZhciB0ZXh0ID0gYENIQUxMRU5HRSAke2JhbGxDb3VudH0vMTBcXG5IT01FUlVOICR7aG9tZXJ1bkNvdW50fWBcbiAgc3RhZ2VzW1wiaG9tZVwiXS5zY29yZS50ZXh0PXRleHRcblxufVxuXG5cbiQoXCIjb3BlbmluZyAuc3RhcnRCdG5cIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgJCgnI29wZW5pbmcnKS5oaWRlKClcbiAgY3VycmVudF9zdGF0ZT1jb25maWcuU1RBVEVTW1wiU1RBUlRcIl1cbiAgY3VycmVudF9zdGFnZT1cImhvbWVcIlxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGFuaW1hdGUgKVxuICBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwiYmdtXCIsIHtsb29wOi0xfSlcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHRocm93QmFsbCgpIH0sIDIwMDApO1xufSlcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLG9uQ2xpY2spXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLG9uQ2xpY2spXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLGtleWRvd24pXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIixrZXl1cClcbnZhciB2eD0wXG52YXIgdnk9MFxuZnVuY3Rpb24ga2V5dXAoZXZlbnQpe1xuICBpZihldmVudC5rZXlDb2RlPT0zNyl7IHZ4PTAgfVxuICBpZihldmVudC5rZXlDb2RlPT0zOCl7IHZ5PTAgfVxuICBpZihldmVudC5rZXlDb2RlPT0zOSl7IHZ4PTAgfVxuICBpZihldmVudC5rZXlDb2RlPT00MCl7IHZ5PTAgfVxufVxuZnVuY3Rpb24ga2V5ZG93bihldmVudCl7XG4gIHZhciB2PTFcbiAgaWYoZXZlbnQua2V5Q29kZT09MTN8fGV2ZW50LmtleUNvZGU9PTMyKXsgcmV0dXJuIG9uQ2xpY2soKSB9XG4gIGlmKGV2ZW50LmtleUNvZGU9PTM3KXsgdng9LXYgfVxuICBpZihldmVudC5rZXlDb2RlPT0zOCl7IHZ5PS12IH1cbiAgaWYoZXZlbnQua2V5Q29kZT09MzkpeyB2eD12IH1cbiAgaWYoZXZlbnQua2V5Q29kZT09NDApeyB2eT12IH1cbn1cbmZ1bmN0aW9uIG1vdmUoKXtcbiAgaWYoIXN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllKXtyZXR1cm4gZmFsc2V9XG4gIHN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLnBvc2l0aW9uLngrPXZ4XG4gIHN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLnBvc2l0aW9uLnkrPXZ5XG4gIHN0YWdlc1tcImhvbWVcIl0uaXRlbXNbXCJiYXRcIl0ueD0gIHN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLnBvc2l0aW9uLnhcbiAgc3RhZ2VzW1wiaG9tZVwiXS5pdGVtc1tcImJhdFwiXS55PXN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLnBvc2l0aW9uLnkrODBcbiAgaWYoc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueDwxMTApc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueD0xMTBcbiAgaWYoc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueD4xNzApc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueD0xNzBcbiAgaWYoc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueTwxNjApc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueT0xNjBcbiAgaWYoc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueT4yODApc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueT0yODBcbn1cbi8vIHJ1biB0aGUgcmVuZGVyIGxvb3BcbnN0YWdlc1tcImhvbWVcIl0uYWRkQ2hpbGQoXCJiYXRcIixuZXcgQmF0KCkpXG4vLyB2YXIgbWV0ZXIgPSBuZXcgRlBTTWV0ZXIoKTtcbnZhciBncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKClcbi8vIHN0YWdlLmFkZENoaWxkKGdyYXBoaWNzKVxuXG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gIGlmKGN1cnJlbnRfc3RhdGU9PWNvbmZpZy5TVEFURVNbXCJUSFJPV1wiXSl7XG4gICAgaWYoc3RhZ2VzW1wiaG9tZVwiXS5pdGVtc1tcImJhbGxcIl0pe1xuICAgICAgLy8gY29uc29sZS5sb2coc3RhZ2VzW1wiaG9tZVwiXS5pdGVtc1tcImJhbGxcIl0ueSlcbiAgICAgIGlmKHN0YWdlc1tcImhvbWVcIl0uaXRlbXNbXCJiYWxsXCJdLnkgPj0gY29uZmlnLkhFSUdIVCs1MCl7XG4gICAgICAgIGRlbGV0ZSBzdGFnZXNbXCJob21lXCJdLml0ZW1zW1wiYmFsbFwiXVxuICAgICAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwic3RyaWtlXCIpXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzZXRcIilcbiAgICAgICAgICBjdXJyZW50X3N0YXRlPWNvbmZpZy5TVEFURVNbXCJTVEFSVFwiXVxuICAgICAgICAgIHRocm93QmFsbCgpXG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBtb3ZlKClcbiAgc3RhZ2VzW2N1cnJlbnRfc3RhZ2VdLmFuaW1hdGUoKVxuICByZW5kZXJlci5yZW5kZXIoc3RhZ2VzW2N1cnJlbnRfc3RhZ2VdLnN0YWdlKVxuICAvLyBtZXRlci50aWNrKCk7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSggYW5pbWF0ZSApXG59XG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGFuaW1hdGUgKVxuXG52YXIgaU9TID0gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlbW90aW9uXCIsIGZ1bmN0aW9uKGV2dCl7XG5cbiAgLy/liqDpgJ/luqZcbiAgdmFyIHggPSBldnQuYWNjZWxlcmF0aW9uLng7XG4gIHZhciB5ID0gZXZ0LmFjY2VsZXJhdGlvbi55O1xuICB2YXIgeiA9IGV2dC5hY2NlbGVyYXRpb24uejtcblxuXG4gIC8v5YK+44GNXG4gIHZhciB4ZyA9IGV2dC5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lng7XG4gIHZhciB5ZyA9IGV2dC5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lnk7XG4gIHZhciB6ZyA9IGV2dC5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lno7XG5cbiAgaWYoaU9TKXtcbiAgICB2eD14Zy8zXG4gICAgdnk9LXlnLzNcbiAgfWVsc2V7XG4gICAgdng9LXhnLzNcbiAgICB2eT15Zy8zXG4gIH1cbiAgLy8gJChcIiNjb25zb2xlXCIpLmh0bWwoeGcpXG5cbn0sdHJ1ZSk7XG4iLCIgLy8gY3JlYXRlanMuU291bmQucmVnaXN0ZXJQbHVnaW5zKFtjcmVhdGVqcy5XZWJBdWRpb1BsdWdpbiwgY3JlYXRlanMuRmxhc2hQbHVnaW5dKTtcbmxldCBxdWV1ZSA9IG5ldyBjcmVhdGVqcy5Mb2FkUXVldWUoZmFsc2UpXG5xdWV1ZS5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKVxubGV0IGxvYWRTb3VuZENvbXBsZXRlPWZ1bmN0aW9uKCl7XG4gICAgICAvLyBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwiYmdtXCIse2xvb3A6LTF9KVxuICAgICAgLy8gYWxlcnQoMSlcbiAgICAgICQoXCIubG9hZGluZ1wiKS5oaWRlKClcbiAgICAgICQoXCIuc3RhcnRCdG5cIikuc2hvdygpXG59O1xucXVldWUuYWRkRXZlbnRMaXN0ZW5lcihcImNvbXBsZXRlXCIsbG9hZFNvdW5kQ29tcGxldGUpXG52YXIgbWFuaWZlc3QgPSBbXG4gIHtzcmM6XCIvc291bmQvYmdtLm1wM1wiLCBpZDpcImJnbVwifSxcbiAge3NyYzpcIi9zb3VuZC9mb3VsLm1wM1wiLCBpZDpcImZvdWxcIn0sXG4gIHtzcmM6XCIvc291bmQvaG9tZXJ1bi5tcDNcIiwgaWQ6XCJob21lcnVuXCJ9LFxuICB7c3JjOlwiL3NvdW5kL255dTMubXAzXCIsIGlkOlwiYmFsbFwifSxcbiAge3NyYzpcIi9zb3VuZC9zdHJpa2UxLm1wM1wiLCBpZDpcImhpdFwifSxcbiAge3NyYzpcIi9zb3VuZC9oaXR0aW5nLm1wM1wiLCBpZDpcInN0cmlrZVwifSxcbiAge3NyYzpcIi9zb3VuZC9zd2luZy5tcDNcIiwgaWQ6XCJzd2luZ1wifSxcbiAge3NyYzpcIi9zb3VuZC93aGlzdGxlLm1wM1wiLCBpZDpcIndoaXN0bGVcIn0sXG5dXG5xdWV1ZS5sb2FkTWFuaWZlc3QobWFuaWZlc3QpXG4iLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZUdyb3VuZCB7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5pdGVtcz1bXVxuICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKVxuXG4gICAgdmFyIHRleHR1cmUgPSBQSVhJLlRleHR1cmUuZnJvbUltYWdlKFwiaW1hZ2UvYmFja2dyb3VuZF9ncm91bmQucG5nXCIpO1xuICAgIC8vIGNyZWF0ZSBhIG5ldyBTcHJpdGUgdXNpbmcgdGhlIHRleHR1cmVcbiAgICB0aGlzLmdyb3VuZF9pbWFnZSA9IG5ldyBQSVhJLlNwcml0ZSh0ZXh0dXJlKTtcbiAgICB0aGlzLmluaXRpYWxpemUoKVxuXG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmdyb3VuZF9pbWFnZSk7XG4gICAgdGhpcy5ncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKClcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuZ3JhcGhpY3MpXG5cbiAgICB0aGlzLmZhdWxfaW1hZ2UgPSBuZXcgUElYSS5TcHJpdGUoUElYSS5UZXh0dXJlLmZyb21JbWFnZShcImltYWdlL2ZhdWwucG5nXCIpKTtcbiAgICB0aGlzLmZhdWxfaW1hZ2UucG9zaXRpb24ueD1jb25maWcuV0lEVEgvMi0xMDBcbiAgICB0aGlzLmZhdWxfaW1hZ2UucG9zaXRpb24ueT1jb25maWcuSEVJR0hULzItMjBcbiAgICB0aGlzLmZhdWxfaW1hZ2UudmlzaWJsZT1mYWxzZVxuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5mYXVsX2ltYWdlKTtcblxuICAgIHRoaXMuaG9tZXJ1bl9pbWFnZSA9IG5ldyBQSVhJLlNwcml0ZShQSVhJLlRleHR1cmUuZnJvbUltYWdlKFwiaW1hZ2UvaG9tZXJ1bi5wbmdcIikpO1xuICAgIHRoaXMuaG9tZXJ1bl9pbWFnZS5wb3NpdGlvbi54PWNvbmZpZy5XSURUSC8yLTEwMFxuICAgIHRoaXMuaG9tZXJ1bl9pbWFnZS5wb3NpdGlvbi55PWNvbmZpZy5IRUlHSFQvMi0yMFxuICAgIHRoaXMuaG9tZXJ1bl9pbWFnZS52aXNpYmxlPWZhbHNlXG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmhvbWVydW5faW1hZ2UpO1xuXG4gdGhpcy5zY29yZSA9IG5ldyBQSVhJLlRleHQoJycsIHsgZm9udDogJ2JvbGQgMjBweCBBcmlhbCcsIGZpbGw6ICcjZmZmZmZmJywgYWxpZ246ICdjZW50ZXInIH0pO1xuIHRoaXMuc2NvcmUueCA9IHRoaXMuaG9tZXJ1bl9pbWFnZS5wb3NpdGlvbi54KzI1O1xuIHRoaXMuc2NvcmUueSA9IHRoaXMuaG9tZXJ1bl9pbWFnZS5wb3NpdGlvbi55KzQwO1xuXG50aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuc2NvcmUpO1xufVxuaW5pdGlhbGl6ZSgpe1xuICBjb25zb2xlLmxvZyhcIm1hcCBpbml0XCIpXG5cbiAgLy8gbW92ZSB0aGUgc3ByaXRlIHQgdGhlIGNlbnRlciBvZiB0aGUgc2NyZWVuXG4gIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggPSAwO1xuICB0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi55ID0gMDtcbiAgdGhpcy5jYW1lcmE9Wy0zNjUsLTI3MF1cbiAgdGhpcy5tZWFzdXJlPTBcbn1cblxuYWRkQ2hpbGQoa2V5LG9iail7XG4gIHRoaXMuaXRlbXNba2V5XT1vYmpcbn1cblxuYW5pbWF0ZSgpe1xuICB0aGlzLmdyYXBoaWNzLmNsZWFyKClcbiAgdmFyIGJhbGwgPSB0aGlzLml0ZW1zW1wiYmFsbFwiXVxuICB2YXIgc2NhbGU9MC4xXG4gIGJhbGwubW92ZV9ncm91bmQoc2NhbGUpXG4gIHZhciB4PSBiYWxsLnhcbiAgdmFyIHk9IGJhbGwueVxuICB0aGlzLm1lYXN1cmUgKz0gTWF0aC5zcXJ0KGJhbGwueCAqIGJhbGwueCArIGJhbGwueSAqIGJhbGwueSlcbiAgLy8gY29uc29sZS5sb2codGhpcy5tZWFzdXJlKVxuICAvLyBjb25zb2xlLmxvZyhiYWxsLnkpXG4gIC8vIHZhciBzdG9wWD1mYWxzZTtcbiAgLy8gdmFyIHN0b3BZPWZhbHNlO1xuICBpZih0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi54ID4gLTcwMCAmJiB0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi54IDwgMCl7XG4gICAgdGhpcy5jYW1lcmFbMF0tPWJhbGwudnhcbiAgfVxuICAvLyBjb25zb2xlLmxvZyh0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi55KVxuICBpZih0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi55PDApe1xuICAgIHRoaXMuY2FtZXJhWzFdLT1iYWxsLnZ5XG4gIH1cbiAgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueCA9IHRoaXMuY2FtZXJhWzBdXG4gIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnkgPSB0aGlzLmNhbWVyYVsxXVxuXG4gIC8vIHRoaXMuZGlmZlggPSB0aGlzLmRpZmZYIHx8IDBcbiAgLy9cbiAgLy8gY29uc29sZS5sb2coeClcbiAgLy8gICAgIGlmKHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggPiAtNzAwICYmIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggPCAwKXtcbiAgLy8gICAgICAgaWYoeCA8IDUwKXt4PTUwOyBzdG9wWD10cnVlfVxuICAvLyAgICAgICBpZih4ID4gY29uZmlnLldJRFRILTUwKXt4PWNvbmZpZy5XSURUSC01MDtzdG9wWD10cnVlOyB9XG4gIC8vICAgICAgIGlmKHN0b3BYKXtcbiAgLy8gICAgICAgICAgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueCAtPSBiYWxsLnZ4IH1cbiAgLy8gICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueClcbiAgLy8gICAgIH1lbHNle1xuICAvLyAgICAgICB4ICs9dGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueFxuICAvLyAgICAgfVxuXG4gIC8vIGlmKHkgPCA1MCl7eT01MDtzdG9wWT10cnVlfVxuICAvLyBpZih5ID4gY29uZmlnLkhFSUdIVC01MCl7eT1jb25maWcuSEVJR0hULTUwO3N0b3BZPXRydWV9XG4gIC8vIGlmKHN0b3BZKXsgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueSAtPSBiYWxsLnZ5IH1cblxuICBpZih0aGlzLml0ZW1zW1wiYmFsbFwiXSkgdGhpcy5pdGVtc1tcImJhbGxcIl0uZHJhd19ncm91bmQoXG4gICAgdGhpcy5ncmFwaGljcyxcbiAgICB4LFxuICAgIHksXG4gICAgYmFsbC5yYWRpdXMpXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlSG9tZSB7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5pdGVtcz1bXVxuICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKVxuICAgIHRoaXMuZ3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpXG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmdyYXBoaWNzKVxuICAgIHRoaXMuYmcgPSBuZXcgUElYSS5TcHJpdGUoUElYSS5UZXh0dXJlLmZyb21JbWFnZShcImltYWdlL2JhY2tncm91bmRfaG9tZS5wbmdcIikpO1xuICAgIHRoaXMuYmcucG9zaXRpb24ueCA9IDA7XG4gICAgdGhpcy5iZy5wb3NpdGlvbi55ID0gMDtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkQXQodGhpcy5iZywwKTtcblxuICAgIHRoaXMuc2NvcmUgPSBuZXcgUElYSS5UZXh0KCdDSEFMTEVOR0UgMC8xMFxcbkhPTUVSVU4gMCcsIHsgZm9udDogJ2JvbGQgMTZweCBBcmlhbCcsIGZpbGw6ICcjY2NjY2NjJ30pO1xuICAgIHRoaXMuc2NvcmUueCA9IDMwO1xuICAgIHRoaXMuc2NvcmUueSA9IDI7XG5cbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKCB0aGlzLnNjb3JlKTtcblxuICAgIGxldCBzZWxmPXRoaXNcbiAgICBQSVhJLmxvYWRlclxuICAgIC5hZGQoJ3N1YmFydScsICcvaW1hZ2Uvc3ByaXRlc2hlZXQuanNvbicpXG4gICAgLmFkZCgncGl0Y2hlcicsICcvaW1hZ2UvcGl0Y2hlci5qc29uJylcbiAgICAubG9hZChmdW5jdGlvbigpe1xuICAgICAgdmFyIHBpdGNoZXJfdGV4dHVyZXMgPSBbXVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspXG4gICAgICB7XG4gICAgICAgIHZhciBwaXRjaGVyX3RleHR1cmUgPSBQSVhJLlRleHR1cmUuZnJvbUZyYW1lKCdwaWNoZXJfMCcgKyAoaSsxKSArICcucG5nJyk7XG4gICAgICAgIHBpdGNoZXJfdGV4dHVyZXMucHVzaChwaXRjaGVyX3RleHR1cmUpO1xuICAgICAgfVxuICAgICAgc2VsZi5waXRjaGVyX21vdmllID0gbmV3IFBJWEkuZXh0cmFzLk1vdmllQ2xpcChwaXRjaGVyX3RleHR1cmVzKTtcbiAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS5wb3NpdGlvbi54PTExMFxuICAgICAgc2VsZi5waXRjaGVyX21vdmllLnBvc2l0aW9uLnk9NzBcbiAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS53aWR0aD0xMDBcbiAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS5oZWlnaHQ9MTAwXG4gICAgICBzZWxmLnBpdGNoZXJfbW92aWUuYW5pbWF0aW9uU3BlZWQgPSAwLjA1O1xuICAgICAgc2VsZi5waXRjaGVyX21vdmllLmxvb3AgPSBmYWxzZTtcbiAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS5nb3RvQW5kUGxheSgwKTtcblxuICAgICAgdmFyIHRleHR1cmVzID0gW11cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKVxuICAgICAge1xuICAgICAgICB2YXIgdGV4dHVyZSA9IFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUoJ2JhdF8wJyArIChpKzEpICsgJy5wbmcnKTtcbiAgICAgICAgdGV4dHVyZXMucHVzaCh0ZXh0dXJlKTtcbiAgICAgIH1cbiAgICAgIHNlbGYuYmF0dGVyX21vdmllID0gbmV3IFBJWEkuZXh0cmFzLk1vdmllQ2xpcCh0ZXh0dXJlcyk7XG5cbiAgICAgIHNlbGYuYmF0dGVyX21vdmllLnBvc2l0aW9uLng9MTUwXG4gICAgICBzZWxmLmJhdHRlcl9tb3ZpZS5wb3NpdGlvbi55PTIwMFxuICAgICAgc2VsZi5iYXR0ZXJfbW92aWUud2lkdGg9MjAwXG4gICAgICBzZWxmLmJhdHRlcl9tb3ZpZS5oZWlnaHQ9MjAwXG4gICAgICBzZWxmLmJhdHRlcl9tb3ZpZS5sb29wPWZhbHNlXG4gICAgICAvLyBzZWxmLmJhdHRlcl9tb3ZpZS5vbkNvbXBsZXRlKGZ1bmN0aW9uKCl7XG4gICAgICAvLyAgIHNldFRpbWVvdXQoZnVudGlvbigpe1xuICAgICAgLy8gICAgIHNlbGYuYmF0dGVyX21vdmllLmdvdG9BbmRTdG9wKDApXG4gICAgICAvLyAgIH0sNTAwKVxuICAgICAgLy8gfSlcblxuICAgICAgc2VsZi5iYXR0ZXJfbW92aWUuYW5pbWF0aW9uU3BlZWQgPSAwLjU7XG5cbiAgICAgIHNlbGYuYmF0dGVyX21vdmllLmdvdG9BbmRTdG9wKDApO1xuICAgICAgc2VsZi5zdGFnZS5hZGRDaGlsZChzZWxmLmJhdHRlcl9tb3ZpZSk7XG4gICAgICBzZWxmLnN0YWdlLmFkZENoaWxkKHNlbGYucGl0Y2hlcl9tb3ZpZSk7XG4gICAgfSk7XG5cblxuICB9XG5cbiAgYWRkQ2hpbGQoa2V5LG9iail7XG4gICAgdGhpcy5pdGVtc1trZXldPW9ialxuICB9XG5cbiAgYmFsbCgpe1xuICAgIHJldHVybiB0aGlzLml0ZW1zW1wiYmFsbFwiXVxuICB9XG4gIGJhdCgpe1xuICAgIHJldHVybiB0aGlzLml0ZW1zW1wiYmF0XCJdXG4gIH1cbiAgcGl0Y2goYmFsbCl7XG4gICAgY29uc29sZS5sb2coXCJwaXRjaFwiKVxuICAgIHRoaXMucGl0Y2hlZD1mYWxzZVxuICAgIHZhciBzZWxmPXRoaXNcbiAgICB0aGlzLnBpdGNoZXJfbW92aWUuZ290b0FuZFBsYXkoMClcbiAgICB0aGlzLm9uUGl0Y2g9ZnVuY3Rpb24oKXtcbiAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJiYWxsXCIpXG4gICAgICBzZWxmLmFkZENoaWxkKFwiYmFsbFwiLGJhbGwpXG4gICAgfVxuICB9XG5cbiAgc3dpbmcoc3VjY2Vzcyl7XG4gICAgY3JlYXRlanMuU291bmQucGxheShcInN3aW5nXCIpXG4gICAgY29uc29sZS5sb2coXCJzd2luZ1wiKVxuICAgIHRoaXMuc3VjY2Vzcz1zdWNjZXNzXG4gICAgdGhpcy5oaXRlZD1mYWxzZVxuICAgIHRoaXMuYmF0dGVyX21vdmllLmdvdG9BbmRQbGF5KDApXG4gIH1cblxuICBhbmltYXRlX2JhdHRlcigpe1xuICAgIGlmKHRoaXMuaGl0ZWQ9PWZhbHNlICYmIHRoaXMuYmF0dGVyX21vdmllLmN1cnJlbnRGcmFtZT09Myl7XG4gICAgICB2YXIgaGl0PXRoaXMuYmF0KCkuaGl0Q2hlY2sodGhpcy5iYWxsKCkpXG4gICAgICBpZihoaXQgIT0gZmFsc2Upe1xuICAgICAgICBjb25zb2xlLmxvZyhcImhpdFwiKVxuICAgICAgICB0aGlzLmhpdGVkPXRydWVcbiAgICAgICAgdGhpcy5iYWxsKCkuaGl0KGhpdFswXSxoaXRbMV0saGl0WzJdKVxuICAgICAgICB0aGlzLnN1Y2Nlc3MoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFuaW1hdGVfcGl0Y2hlcigpe1xuICAgIGlmKHR5cGVvZiB0aGlzLm9uUGl0Y2ggPT0ndW5kZWZpbmVkJylyZXR1cm4gZmFsc2U7XG4gICAgaWYodGhpcy5waXRjaGVkKXJldHVybiBmYWxzZVxuICAgIGlmKHRoaXMucGl0Y2hlcl9tb3ZpZS5jdXJyZW50RnJhbWU9PTMpe1xuICAgICAgdGhpcy5waXRjaGVkPXRydWVcbiAgICAgIHRoaXMub25QaXRjaCgpXG4gICAgfVxuXG4gIH1cblxuICBhbmltYXRlKCl7XG4gICAgdGhpcy5ncmFwaGljcy5jbGVhcigpXG4gICAgaWYodGhpcy5iYXR0ZXJfbW92aWUpe3RoaXMuYW5pbWF0ZV9iYXR0ZXIoKSB9XG4gICAgaWYodGhpcy5waXRjaGVyX21vdmllKXt0aGlzLmFuaW1hdGVfcGl0Y2hlcigpIH1cblxuICAgIGZvcih2YXIgaSBpbiB0aGlzLml0ZW1zKXtcbiAgICAgIGlmKHRoaXMuaXRlbXNbaV0ubW92ZSgpKXtcbiAgICAgICAgdGhpcy5pdGVtc1tpXS5kcmF3KHRoaXMuZ3JhcGhpY3MpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuaXRlbXNbaV0uY2xlYXIodGhpcy5ncmFwaGljcylcbiAgICAgICAgZGVsZXRlIHRoaXMuaXRlbXNbaV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==
