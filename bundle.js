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
  if (homerunCount >= 1) {
    $(".success.message").show();
    $(".fail.message").hide();
    $(".tweetButtonWrapper").html("<a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-size=\"large\" data-hashtags=\"subaruChallenge\" data-dnt=\"true\" data-text=\"10球中" + homerunCount + "ホームランでチャレンジ成功！" + totalPoint + "pt獲得しました\" data-lang=\"ja\">ツイート</a>");
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
  if (ballCount == 3) {
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
  var text = "CHALLENGE " + ballCount + "\nHOMERUN " + homerunCount;
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

    this.score = new PIXI.Text('CHALLENGE 0\nHOMERUN 0', { font: 'bold 16px Arial', fill: '#cccccc' });
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9iYWxsLmVzNiIsIi9Vc2Vycy9ob3NzeS9wcm9qZWN0L3N1YmFydV9jaGFsbGVuZ2UvZXM2L2JhdC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9jb25maWcuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvZ2FtZS5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zb3VuZC5lczYiLCIvVXNlcnMvaG9zc3kvcHJvamVjdC9zdWJhcnVfY2hhbGxlbmdlL2VzNi9zdGFnZV9ncm91bmQuZXM2IiwiL1VzZXJzL2hvc3N5L3Byb2plY3Qvc3ViYXJ1X2NoYWxsZW5nZS9lczYvc3RhZ2VfaG9tZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7eUJDQXdCLGNBQWM7O0lBQTFCLE1BQU07O0lBRUcsSUFBSTtBQUNaLFdBRFEsSUFBSSxDQUNYLFFBQVEsRUFBQzswQkFERixJQUFJOztBQUVyQixRQUFJLENBQUMsUUFBUSxHQUFDLFFBQVEsQ0FBQTtBQUN0QixRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDbkI7O2VBSmtCLElBQUk7O1dBTWIsc0JBQUU7QUFDVixVQUFJLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFBO0FBQzdCLFVBQUksQ0FBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDN0IsVUFBSSxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUE7QUFDVCxVQUFJLENBQUMsRUFBRSxHQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUUsQ0FBQyxDQUFBO0FBQy9CLFVBQUksQ0FBQyxFQUFFLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDL0IsVUFBSSxDQUFDLEVBQUUsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFFLENBQUMsQ0FBQTtBQUMvQixVQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUUsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUE7QUFDOUMsVUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFFLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFBO0FBQ2hELFVBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBRSxDQUFDLENBQUE7QUFDdEMsVUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFFLENBQUMsQ0FBQTtBQUN4QyxVQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQTtBQUNkLFVBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFDcEIsVUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFlBQVUsRUFBRSxDQUFBO0FBQy9ELFVBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxZQUFVLEVBQUUsQ0FBQTtBQUNyRCxVQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksWUFBVSxFQUFFLENBQUE7QUFDM0QsVUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLFlBQVUsRUFBRSxDQUFBO0FB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QUFPLElBQUcsV0FBVyxFQUFDLE9BQU8sS0FBSyxDQUFDO0FBQ2xELFVBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQyxPQUFPLEtBQUssQ0FBQTtBQUM1QixVQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxJQUFFLENBQUMsRUFBQztBQUNwQyxZQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQTtBQUNqQixZQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7T0FDZjtLQUVGOzs7V0FFTSxtQkFBRTtBQUNQLFVBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUE7QUFDckIsVUFBRyxJQUFJLENBQUMsWUFBWSxFQUFDO0FBQUMsWUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO09BQUU7QUFDN0MsVUFBRyxJQUFJLENBQUMsYUFBYSxFQUFDO0FBQUMsWUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO09BQUU7O0FBRS9DLFdBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBQztBQUN0QixZQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUM7QUFDdEIsY0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25DLE1BQUk7QUFDSCxjQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDbEMsaUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNyQjtPQUNGO0tBQ0Y7OztTQWxJa0IsU0FBUzs7O3FCQUFULFNBQVMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgY29uZmlnIGZyb20gXCIuL2NvbmZpZy5lczZcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWxse1xuICBjb25zdHJ1Y3RvcihkZWZhdWx0cyl7XG4gICAgdGhpcy5kZWZhdWx0cz1kZWZhdWx0c1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpe1xuICAgIHRoaXMueCA9dGhpcy5kZWZhdWx0c1tcInhcIl18fDBcbiAgICB0aGlzLnkgPXRoaXMuZGVmYXVsdHNbXCJ5XCJdfHwwXG4gICAgdGhpcy56ID01XG4gICAgdGhpcy52eCA9dGhpcy5kZWZhdWx0c1tcInZ4XCJdfHwwXG4gICAgdGhpcy52eSA9dGhpcy5kZWZhdWx0c1tcInZ5XCJdfHwwXG4gICAgdGhpcy52eiA9dGhpcy5kZWZhdWx0c1tcInZ6XCJdfHwwXG4gICAgdGhpcy5hbmdsZSA9IHRoaXMuZGVmYXVsdHNbXCJhbmdsZVwiXXx8TWF0aC5QSS8yXG4gICAgdGhpcy56QW5nbGUgPSB0aGlzLmRlZmF1bHRzW1wiekFuZ2xlXCJdfHxNYXRoLlBJLzJcbiAgICB0aGlzLnNwZWVkID0gdGhpcy5kZWZhdWx0c1tcInNwZWVkXCJdfHwwXG4gICAgdGhpcy5yYWRpdXMgPSB0aGlzLmRlZmF1bHRzW1wicmFkaXVzXCJdfHwwXG4gICAgdGhpcy5tZWFzdXJlID0gMFxuICAgICAgdGhpcy5ob21lQm94PVswLDBdXG4gICAgdGhpcy5vblNwZWVkWmVybyA9IHRoaXMuZGVmYXVsdHNbXCJvblNwZWVkWmVyb1wiXSB8fCBmdW5jdGlvbigpe31cbiAgICB0aGlzLm9uRm91bCA9IHRoaXMuZGVmYXVsdHNbXCJvbkZvdWxcIl0gfHwgZnVuY3Rpb24oKXt9XG4gICAgdGhpcy5vbkhvbWVydW4gPSB0aGlzLmRlZmF1bHRzW1wib25Ib21lcnVuXCJdIHx8IGZ1bmN0aW9uKCl7fVxuICAgIHRoaXMub25GaXJzdEJvdW5kID0gdGhpcy5kZWZhdWx0c1tcIm9uRmlyc3RCb3VuZFwiXSB8fCBmdW5jdGlvbigpe31cbiAgICB0aGlzLmJvdW50Q291bnQ9MFxuICAgIHRoaXMuZmlyc3RCb3VuZD10cnVlXG4gICAgdGhpcy5zdG9wZWQ9ZmFsc2VcbiAgfVxuXG4gIGhpdChhbmdsZSx6QW5nbGUscG93KXtcbiAgICAvLyBsZXQgbWluPTE4MFxuICAgIC8vIGxldCBtYXg9MzYwXG4gICAgLy8gdGhpcy5hbmdsZT0oKCBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKSArIG1pbikgKiBNYXRoLlBJLzE4MDtcbiAgICAvLyB0aGlzLmFuZ2xlPW1pbi8vZGVidWdcbiAgICB0aGlzLmFuZ2xlPShhbmdsZSArMTgwKzkwKSpNYXRoLlBJLzE4MFxuICAgIHRoaXMuc3BlZWQgPXBvd1xuXG4gICAgLy8gbGV0IHptaW49MTBcbiAgICAvLyBsZXQgem1heD04MFxuICAgIC8vIHRoaXMuekFuZ2xlPSgoIE1hdGgucmFuZG9tKCkgKiAoem1heCAtIHptaW4pICkgKyB6bWluKSAqIE1hdGguUEkvMTgwO1xuICAgIHRoaXMuekFuZ2xlPSh6QW5nbGUrNDUpKk1hdGguUEkvMTgwXG4gICAgLy8gdGhpcy56QW5nbGU9MzAwKiBNYXRoLlBJLzE4MDsvL2RlYnVnXG4gICAgdGhpcy52eiA9IE1hdGguc2luKHRoaXMuekFuZ2xlKSAqIHRoaXMuc3BlZWRcblxuICAgIHRoaXMuaG9tZUJveD1bMCwwXVxuICAgIC8vIGNvbnNvbGUubG9nKFwiSGl0XCIsdGhpcy54LHRoaXMueSlcbiAgfVxuXG4gIG1vdmUoKXtcbiAgICB0aGlzLnZ5ID0gTWF0aC5zaW4odGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkXG4gICAgdGhpcy52eCA9IE1hdGguY29zKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZFxuICAgIHRoaXMueSArPSB0aGlzLnZ5XG4gICAgdGhpcy54ICs9IHRoaXMudnhcbiAgICB0aGlzLnJhZGl1cyA9IHRoaXMueS8zMFxuICAgIC8vIGlmKHRoaXMueSA+IGNvbmZpZy5IRUlHSFQpe1xuXG4gICAgLy8gICByZXR1cm4gZmFsc2VcbiAgICAvLyB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgbW92ZV9ncm91bmQoc2NhbGUpe1xuICAgIHRoaXMudnkgPSBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQqc2NhbGVcbiAgICB0aGlzLnZ4ID0gTWF0aC5jb3ModGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkKnNjYWxlXG4gICAgdGhpcy52eiAtPSAwLjY4XG4gICAgdGhpcy55ICs9IHRoaXMudnlcbiAgICB0aGlzLnggKz0gdGhpcy52eFxuICAgIHRoaXMueiArPSB0aGlzLnZ6XG4gICAgLy8gY29uc29sZS5sb2codGhpcy56KVxuICAgIHRoaXMuaG9tZUJveFswXSs9dGhpcy52eFxuICAgIHRoaXMuaG9tZUJveFsxXSs9dGhpcy52eVxuICAgIHRoaXMubWVhc3VyZSA9IE1hdGguc3FydCgodGhpcy5ob21lQm94WzBdKnRoaXMuaG9tZUJveFswXSkgKyAodGhpcy5ob21lQm94WzFdKnRoaXMuaG9tZUJveFsxXSkpXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5tZWFzdXJlKVxuICAgIGlmKHRoaXMuejw9MCl7XG4gICAgICB0aGlzLmZpcnN0Qm91bmRcbiAgICAgIHRoaXMuej0wXG4gICAgICB0aGlzLmJvdW50Q291bnQrK1xuICAgICAgdGhpcy5zcGVlZCo9MC45XG4gICAgICB0aGlzLnZ6Kj0tMC41XG4gICAgICAvLyB0aGlzLnZ6Kj0tMS8vZGVidWdcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2codGhpcy56KVxuICAgIGlmKHRoaXMuejw1MCAmJiB0aGlzLm1lYXN1cmUgPiAzMDAgJiYgdGhpcy5tZWFzdXJlPDM1MCl7XG4gICAgICB0aGlzLm1lYXN1cmU9MzAwXG4gICAgICAvLyBjb25zb2xlLmxvZyhcInJlZnJlY3RcIilcbiAgICAgIC8vIHRoaXMueT05MFxuICAgICAgLy8gdGhpcy52eSo9LTFcbiAgICAgIHRoaXMuYW5nbGUqPS0xXG4gICAgICB0aGlzLnZ6Kj0tMVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnkpXG4gICAgdmFyIGNvZj0zMFxuICAgIGlmKHRoaXMuei9jb2Y8Myl7dGhpcy5yYWRpdXMgPSAzfVxuICAgIGVsc2UgaWYodGhpcy56L2NvZj4xMCl7dGhpcy5yYWRpdXM9MTB9XG4gICAgZWxzZXt0aGlzLnJhZGl1cz10aGlzLnovY29mfVxuICAgIC8vXG4gICAgLy8gaWYodGhpcy55ID4gY29uZmlnLkhFSUdIVCl7XG4gICAgLy8gICByZXR1cm4gZmFsc2VcbiAgICAvLyB9XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5zcGVlZClcbiAgICBpZih0aGlzLnN0b3BlZD09ZmFsc2UgJiYgdGhpcy5zcGVlZCA8IDAuMSl7XG4gICAgICB0aGlzLnN0b3BlZD10cnVlXG4gICAgICB0aGlzLnNwZWVkPTBcbiAgICAgIHRoaXMub25TcGVlZFplcm8oKVxuICAgIH1cbiAgICBpZih0aGlzLno8MSl7XG4gICAgICAvL2hvbWVydW5cbiAgICAgIHZhciBkaWdyZWUgPXRoaXMuYW5nbGUqKDE4MC9NYXRoLlBJKVxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5hbmdsZSxkaWdyZWUpXG4gICAgICAvLyBleGl0O1xuICAgICAgaWYodGhpcy5maXJzdEJvdW5kICYmIDMxNSA8PSBkaWdyZWUpe1xuICAgICAgICBpZih0aGlzLnN0b3BlZD09ZmFsc2UpdGhpcy5vbkZvdWwoKVxuICAgICAgICB0aGlzLnN0b3BlZD10cnVlXG4gICAgICAgIC8vIHRoaXMuc3BlZWQ9MFxuICAgICAgICAvLyB0aGlzLm9uU3BlZWRaZXJvKClcbiAgICAgICAgLy8gYWxlcnQoXCJmYXVsXCIpXG4gICAgICB9IGVsc2UgaWYodGhpcy5maXJzdEJvdW5kICYmIDIyMCA+PSBkaWdyZWUpe1xuICAgICAgICBpZih0aGlzLnN0b3BlZD09ZmFsc2UpdGhpcy5vbkZvdWwoKVxuICAgICAgICB0aGlzLnN0b3BlZD10cnVlXG4gICAgICAgIC8vIHRoaXMuc3BlZWQ9MFxuICAgICAgICAvLyB0aGlzLm9uU3BlZWRaZXJvKClcbiAgICAgICAgLy8gYWxlcnQoXCJmYXVsXCIpXG4gICAgICB9ZWxzZSBpZih0aGlzLmZpcnN0Qm91bmQgJiYgdGhpcy5tZWFzdXJlPjM1MCl7XG4gICAgICAgIGlmKHRoaXMuc3RvcGVkPT1mYWxzZSl0aGlzLm9uSG9tZXJ1bih0aGlzLm1lYXN1cmUpXG4gICAgICAgIHRoaXMuc3RvcGVkPXRydWVcbiAgICAgICAgLy8gdGhpcy5zcGVlZD0wXG4gICAgICAgIC8vIHRoaXMub25TcGVlZFplcm8oKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhvbWUgcnVuXCIpXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgY2xlYXIoZ3JhcGhpYyl7XG4gICAgZ3JhcGhpYy5jbGVhcigpXG4gIH1cbiAgZHJhdyhncmFwaGljKXtcbiAgICAvLyB0aGlzLmNsZWFyKGdyYXBoaWMpO1xuICAgIGdyYXBoaWMubGluZVN0eWxlKDApXG4gICAgZ3JhcGhpYy5iZWdpbkZpbGwoMHhGRkZGRkYpXG4gICAgZ3JhcGhpYy5kcmF3Q2lyY2xlKFxuICAgICAgdGhpcy54LFxuICAgICAgdGhpcy55LFxuICAgICAgdGhpcy5yYWRpdXNcbiAgICApXG4gICAgZ3JhcGhpYy5lbmRGaWxsKClcbiAgfVxuXG4gIGRyYXdfZ3JvdW5kKGdyYXBoaWMseCx5LHJhZGl1cyl7XG4gICAgLy8gdGhpcy5jbGVhcihncmFwaGljKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLngqc2NhbGUrb2Zmc2V0X3gsdGhpcy55KnNjYWxlK29mZnNldF95KVxuICAgIGdyYXBoaWMubGluZVN0eWxlKDApXG4gICAgZ3JhcGhpYy5iZWdpbkZpbGwoMHhGRkZGRkYpXG4gICAgZ3JhcGhpYy5kcmF3Q2lyY2xlKHgseSxyYWRpdXMgKVxuICAgIGdyYXBoaWMuZW5kRmlsbCgpXG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIGNvbmZpZyBmcm9tIFwiLi9jb25maWcuZXM2XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmF0e1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuZGVmYXVsdHM9e1xuICAgICAgeDogNTAsXG4gICAgICB5OiAyODAsXG4gICAgICB3aWR0aDogNjAsXG4gICAgICBoZWlnaHQ6IDYwXG4gICAgfVxuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpe1xuICAgIHRoaXMueCA9dGhpcy5kZWZhdWx0c1tcInhcIl1cbiAgICB0aGlzLnkgPXRoaXMuZGVmYXVsdHNbXCJ5XCJdXG4gICAgdGhpcy53aWR0aCA9IHRoaXMuZGVmYXVsdHNbXCJ3aWR0aFwiXVxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5kZWZhdWx0c1tcImhlaWdodFwiXVxuICB9XG5cbiAgaGl0Q2hlY2soYmFsbCl7XG4gICAgaWYoIWJhbGwpcmV0dXJuIGZhbHNlO1xuICAgIGlmKFxuICAgICAgdGhpcy54IDwgYmFsbC54ICYmXG4gICAgICBiYWxsLnggPCB0aGlzLnggKyB0aGlzLndpZHRoICYmXG4gICAgICAgIHRoaXMueSA8IGJhbGwueSAmJlxuICAgICAgICBiYWxsLnkgPCB0aGlzLnkgKyB0aGlzLmhlaWdodFxuICAgICl7XG4gICAgICAvLyBjb25zb2xlLmxvZyhiYWxsLnggLCB0aGlzLngsIHRoaXMud2lkdGgpXG4gICAgICAvLyAgZXhpdCgpXG4gICAgICB2YXIgYW5nbGU9TWF0aC5hdGFuMihcbiAgICAgICAgKGJhbGwueC0odGhpcy54K3RoaXMud2lkdGgvMikpIC8gdGhpcy53aWR0aCo0ICxcbiAgICAgICAgIDFcbiAgICAgICApXG4gICAgICAgdmFyIHpBbmdsZT1NYXRoLmF0YW4yKFxuICAgICAgICAgKGJhbGwueS0odGhpcy55K3RoaXMuaGVpZ2h0LzIpKSAvIHRoaXMuaGVpZ2h0KjQgLFxuICAgICAgICAgIDFcbiAgICAgICAgKVxuICAgICAgdmFyIHBvdyA9NjAgLSA1KiBNYXRoLnNxcnQoTWF0aC5hYnMoKHRoaXMueCt0aGlzLndpZHRoLzIpLWJhbGwueCksIE1hdGguYWJzKCh0aGlzLnkrdGhpcy5oZWlnaHQvMiktYmFsbC54KSlcbiAgICAgIC8vIGNvbnNvbGUubG9nKGJhbGwueSAsIHRoaXMueSwgdGhpcy5oZWlnaHQpXG4gICAgICAvLyAgZXhpdCgpXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHpBbmdsZSogMTgwLyBNYXRoLlBJKVxuICAgICAgLy8gICBleGl0KCk7XG4gICAgICBjb25zb2xlLmxvZyhwb3cpXG4gICAgICByZXR1cm4gW2FuZ2xlICogMTgwLyBNYXRoLlBJLCB6QW5nbGUqIDE4MC8gTWF0aC5QSSxwb3ddXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIG1vdmUoKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNsZWFyKGdyYXBoaWMpe1xuICAgIGdyYXBoaWMuY2xlYXIoKVxuICB9XG4gIGRyYXcoZ3JhcGhpYyl7XG4gICAgLy8gdGhpcy5jbGVhcihncmFwaGljKTtcbiAgICBncmFwaGljLmxpbmVTdHlsZSgyLCAweEZGMDAwMCk7XG4gICAgZ3JhcGhpYy5kcmF3UmVjdChcbiAgICAgIHRoaXMueCxcbiAgICAgIHRoaXMueSxcbiAgICAgIHRoaXMud2lkdGgsXG4gICAgICB0aGlzLmhlaWdodFxuICAgICAgKVxuICB9XG5cbn1cbiIsImV4cG9ydCBjb25zdCBXSURUSD0zMjBcbmV4cG9ydCBjb25zdCBIRUlHSFQ9NDgwXG5leHBvcnQgY29uc3QgU1RBVEVTPXtcbiAgT1BFTklORzowLFxuICBTVEFSVDogMSxcbiAgVEhST1c6IDIsXG4gIEhJVDogMyxcbiAgQk9VTkQ6IDRcbn1cbiIsImltcG9ydCAqIGFzIGNvbmZpZyBmcm9tIFwiLi9jb25maWcuZXM2XCJcbmltcG9ydCBcIi4vc291bmQuZXM2XCJcbmltcG9ydCBCYWxsIGZyb20gXCIuL2JhbGwuZXM2XCJcbmltcG9ydCBCYXQgZnJvbSBcIi4vYmF0LmVzNlwiXG5pbXBvcnQgSG9tZSBmcm9tIFwiLi9zdGFnZV9ob21lLmVzNlwiXG5pbXBvcnQgR3JvdW5kIGZyb20gXCIuL3N0YWdlX2dyb3VuZC5lczZcIlxuXG52YXIgY3VycmVudF9zdGF0ZT1jb25maWcuU1RBVEVTW1wiT1BFTklOR1wiXVxuXG52YXIgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcihjb25maWcuV0lEVEgsIGNvbmZpZy5IRUlHSFQseyBhbnRpYWxpYXM6IHRydWUgfSk7XG5yZW5kZXJlci52aWV3LnN0eWxlLndpZHRoID0gY29uZmlnLldJRFRIICsgXCJweFwiXG5yZW5kZXJlci52aWV3LnN0eWxlLmhlaWdodCA9IGNvbmZpZy5IRUlHSFQgKyBcInB4XCJcbnJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KVxuXG5cblxudmFyIHN0YWdlcz17fVxuc3RhZ2VzW1wiaG9tZVwiXSA9IG5ldyBIb21lKClcbnN0YWdlc1tcImdyb3VuZFwiXSA9IG5ldyBHcm91bmQoKVxuLy8gdmFyIHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKClcbnZhciBncm91bmQgPSBuZXcgUElYSS5Db250YWluZXIoKVxudmFyIG9wZW5pbmcgPSBuZXcgUElYSS5Db250YWluZXIoKVxudmFyIGN1cnJlbnRfc3RhZ2UgPSBcIm9wZW5pbmdcIlxuXG5cblxuLy9zdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWVcblxuLy92YXIgdGhpbmcgPSBuZXcgUElYSS5HcmFwaGljcygpXG4vL3N0YWdlLmFkZENoaWxkKHRoaW5nKVxuXG4vLyBzdGFnZS5vbignY2xpY2snLCBvbkNsaWNrKVxuLy8gc3RhZ2Uub24oJ3RhcCcsIG9uQ2xpY2spXG4vLyBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbi8vICAgdGhyb3dCYWxsKClcbi8vIH0sIDEwMDApO1xuXG52YXIgaXRlbXM9e31cbnZhciBzZWxmPXRoaXNcbmZ1bmN0aW9uIG9uQ2xpY2soKXtcbiAgLy8gcmV0dXJuXG4gIGlmKGN1cnJlbnRfc3RhdGUgPT0gY29uZmlnLlNUQVRFU1tcIk9QRU5JTkdcIl0pe1xuICAgIC8vICAgY3VycmVudF9zdGF0ZT1jb25maWcuU1RBVEVTW1wiU1RBUlRcIl1cbiAgICAvLyAgIGN1cnJlbnRfc3RhZ2U9XCJob21lXCJcbiAgICAvLyAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggYW5pbWF0ZSApXG4gICAgLy8gICBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwiYmdtXCIsIHtsb29wOi0xfSlcbiAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgdGhyb3dCYWxsKCkgfSwgMjAwMCk7XG5cbiAgfSBlbHNlIGlmKGN1cnJlbnRfc3RhdGUgPT0gY29uZmlnLlNUQVRFU1tcIlRIUk9XXCJdKXtcbiAgICBzdGFnZXNbXCJob21lXCJdLnN3aW5nKGZ1bmN0aW9uKCl7XG4gICAgICBjdXJyZW50X3N0YXRlID0gY29uZmlnLlNUQVRFU1tcIkhJVFwiXVxuXG4gICAgICB2YXIgYmFsbCA9IHN0YWdlc1tcImhvbWVcIl0uaXRlbXNbXCJiYWxsXCJdXG4gICAgICBjb25zb2xlLmxvZyhiYWxsKVxuICAgICAgc3RhZ2VzW1wiZ3JvdW5kXCJdLmFkZENoaWxkKFwiYmFsbFwiLCAgbmV3IEJhbGwoe1xuICAgICAgICB4OiBjb25maWcuV0lEVEggLyAyLFxuICAgICAgICB5OiA0MDAsXG4gICAgICAgIGFuZ2xlOiBiYWxsLmFuZ2xlLFxuICAgICAgICBzcGVlZDogYmFsbC5zcGVlZCxcbiAgICAgICAgdng6IGJhbGwudngsXG4gICAgICAgIHZ5OiBiYWxsLnZ5LFxuICAgICAgICB2ejogYmFsbC52eixcbiAgICAgICAgb25Ib21lcnVuOmZ1bmN0aW9uKG1lYXN1cmUpe1xuICAgICAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJob21lcnVuXCIpXG4gICAgICAgICAgaG9tZXJ1bkNvdW50Kys7XG4gICAgICAgICAgc3RhZ2VzW1wiZ3JvdW5kXCJdLmhvbWVydW5faW1hZ2UudmlzaWJsZT10cnVlXG4gICAgICAgICAgdmFyIHBvaW50ID1NYXRoLmZsb29yKG1lYXN1cmUpXG4gICAgICAgICAgdG90YWxQb2ludCs9cG9pbnQ7XG4gICAgICAgICAgICBzdGFnZXNbXCJncm91bmRcIl0uc2NvcmUudGV4dD1gJHtwb2ludH0gcHRgXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgZGVsZXRlIHN0YWdlc1tcImdyb3VuZFwiXS5pbml0aWFsaXplKClcbiAgICAgICAgICAgIHN0YWdlc1tcImdyb3VuZFwiXS5ob21lcnVuX2ltYWdlLnZpc2libGU9ZmFsc2VcbiAgICAgICAgICAgIHN0YWdlc1tcImdyb3VuZFwiXS5zY29yZS50ZXh0PScnXG5cbiAgICAgICAgICAgIGN1cnJlbnRfc3RhdGUgPSBjb25maWcuU1RBVEVTW1wiU1RBUlRcIl1cbiAgICAgICAgICAgIGN1cnJlbnRfc3RhZ2UgPSBcImhvbWVcIlxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICB0aHJvd0JhbGwoKVxuICAgICAgICAgICAgfSwxMDAwKVxuICAgICAgICAgIH0sMjAwMClcbiAgICAgICAgfSxcbiAgICAgICAgb25Gb3VsOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgY3JlYXRlanMuU291bmQucGxheShcImZvdWxcIilcbiAgICAgICAgICBzdGFnZXNbXCJncm91bmRcIl0uZmF1bF9pbWFnZS52aXNpYmxlPXRydWVcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdWxcIilcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBkZWxldGUgc3RhZ2VzW1wiZ3JvdW5kXCJdLmluaXRpYWxpemUoKVxuICAgICAgICAgICAgc3RhZ2VzW1wiZ3JvdW5kXCJdLmZhdWxfaW1hZ2UudmlzaWJsZT1mYWxzZVxuICAgICAgICAgICAgY3VycmVudF9zdGF0ZSA9IGNvbmZpZy5TVEFURVNbXCJTVEFSVFwiXVxuICAgICAgICAgICAgY3VycmVudF9zdGFnZSA9IFwiaG9tZVwiXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHRocm93QmFsbCgpXG4gICAgICAgICAgICB9LDEwMDApXG4gICAgICAgICAgfSwxMDAwKVxuICAgICAgICB9LFxuICAgICAgICBvblNwZWVkWmVybzpmdW5jdGlvbigpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwic3BlZWQgemVyb1wiKVxuICAgICAgICAgIGRlbGV0ZSBzdGFnZXNbXCJncm91bmRcIl0uaW5pdGlhbGl6ZSgpXG4gICAgICAgICAgY3VycmVudF9zdGF0ZSA9IGNvbmZpZy5TVEFURVNbXCJTVEFSVFwiXVxuICAgICAgICAgIGN1cnJlbnRfc3RhZ2UgPSBcImhvbWVcIlxuICAgICAgICAgIHNldFRpbWVvdXQodGhyb3dCYWxsLDEwMDApXG4gICAgICAgIH1cbiAgICAgIH0pKVxuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIGN1cnJlbnRfc3RhZ2U9XCJncm91bmRcIlxuICAgICAgfSwwKVxuICAgICAgY3JlYXRlanMuU291bmQucGxheShcImhpdFwiKVxuICAgIH0pXG5cblxuICB9XG59XG52YXIgYmFsbENvdW50PTBcbnZhciB0b3RhbFBvaW50PTBcbnZhciBob21lcnVuQ291bnQ9MDtcbmZ1bmN0aW9uIGVuZGluZygpe1xuICB2YXIgcGFnZT0gJChcIiNlbmRpbmdcIilcbiAgcGFnZS5maW5kKFwiLnNjb3JlIC5yZXN1bHRcIikudGV4dChob21lcnVuQ291bnQpXG4gIHBhZ2UuZmluZChcIi5wb2ludCAucmVzdWx0XCIpLnRleHQodG90YWxQb2ludClcbiAgaWYoaG9tZXJ1bkNvdW50Pj0xKXtcbiAgICAkKFwiLnN1Y2Nlc3MubWVzc2FnZVwiKS5zaG93KClcbiAgICAkKFwiLmZhaWwubWVzc2FnZVwiKS5oaWRlKClcbiAgICAkKFwiLnR3ZWV0QnV0dG9uV3JhcHBlclwiKS5odG1sKFxuICAgICAgYDxhIGhyZWY9XCJodHRwczovL3R3aXR0ZXIuY29tL3NoYXJlXCIgY2xhc3M9XCJ0d2l0dGVyLXNoYXJlLWJ1dHRvblwiIGRhdGEtc2l6ZT1cImxhcmdlXCIgZGF0YS1oYXNodGFncz1cInN1YmFydUNoYWxsZW5nZVwiIGRhdGEtZG50PVwidHJ1ZVwiIGRhdGEtdGV4dD1cIjEw55CD5LitJHtob21lcnVuQ291bnR944Ob44O844Og44Op44Oz44Gn44OB44Oj44Os44Oz44K45oiQ5Yqf77yBJHt0b3RhbFBvaW50fXB0542y5b6X44GX44G+44GX44GfXCIgZGF0YS1sYW5nPVwiamFcIj7jg4TjgqTjg7zjg4g8L2E+YFxuICAgIClcbiAgICB0d3R0ci53aWRnZXRzLmxvYWQoKVxuICB9ZWxzZXtcbiAgICAkKFwiLnN1Y2Nlc3MubWVzc2FnZVwiKS5oaWRlKClcbiAgICAkKFwiLmZhaWwubWVzc2FnZVwiKS5zaG93KClcblxuICB9XG4gIHBhZ2Uuc2hvdygpXG59XG4kKFwiI3JldHJ5XCIpLmNsaWNrKHJldHJ5KVxuZnVuY3Rpb24gcmV0cnkoKXtcbiAgYmFsbENvdW50PTA7XG4gIHRvdGFsUG9pbnQ9MDtcbiAgaG9tZXJ1bkNvdW50PTA7XG4gIC8vIHN0YWdlc1tcImhvbWVcIl0uc2NvcmUudGV4dD1gJHtiYWxsQ291bnR9LzEwYFxuICByZWZsZXNoQmFsbENvdW50KClcbiAgJChcIiNlbmRpbmdcIikuaGlkZSgpXG4gICQoXCIjb3BlbmluZ1wiKS5zaG93KClcbn1cbmZ1bmN0aW9uIHRocm93QmFsbCgpXG57XG4gIGlmKGJhbGxDb3VudD09Myl7XG4gICAgY3JlYXRlanMuU291bmQuc3RvcChcImJnbVwiKVxuICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJ3aGlzdGxlXCIpXG4gICAgZW5kaW5nKClcbiAgICByZXR1cm47XG4gIH1cbiAgaWYoY3VycmVudF9zdGF0ZSAhPSBjb25maWcuU1RBVEVTW1wiU1RBUlRcIl0pIHtyZXR1cm4gdHJ1ZX1cbiAgY29uc29sZS5sb2coXCJ0aHJvd1wiKVxuICB2YXIgc3BlZWQ9Xy5yYW5kb20oMywxMClcbiAgdmFyIGJhbGwgPW5ldyBCYWxsKHtcbiAgICB4OmNvbmZpZy5XSURUSC8yLTIwICxcbiAgICB5OjEwMCAsXG4gICAgYW5nbGU6IE1hdGguUEkvKF8ucmFuZG9tKDE5NywgMjE1KS8xMDApLFxuICAgIHNwZWVkOiBzcGVlZFxuICB9KVxuXG4gIHN0YWdlc1tcImhvbWVcIl0ucGl0Y2goYmFsbClcbiAgY3VycmVudF9zdGF0ZT1jb25maWcuU1RBVEVTW1wiVEhST1dcIl1cbiAgYmFsbENvdW50Kys7XG4gIGNvbnNvbGUubG9nKGJhbGxDb3VudClcbiAgcmVmbGVzaEJhbGxDb3VudCgpXG59XG5mdW5jdGlvbiByZWZsZXNoQmFsbENvdW50KCl7XG4gIHZhciB0ZXh0ID0gYENIQUxMRU5HRSAke2JhbGxDb3VudH1cXG5IT01FUlVOICR7aG9tZXJ1bkNvdW50fWBcbiAgc3RhZ2VzW1wiaG9tZVwiXS5zY29yZS50ZXh0PXRleHRcblxufVxuXG5cbiQoXCIjb3BlbmluZyAuc3RhcnRCdG5cIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgJCgnI29wZW5pbmcnKS5oaWRlKClcbiAgY3VycmVudF9zdGF0ZT1jb25maWcuU1RBVEVTW1wiU1RBUlRcIl1cbiAgY3VycmVudF9zdGFnZT1cImhvbWVcIlxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGFuaW1hdGUgKVxuICBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwiYmdtXCIsIHtsb29wOi0xfSlcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHRocm93QmFsbCgpIH0sIDIwMDApO1xufSlcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLG9uQ2xpY2spXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLG9uQ2xpY2spXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLGtleWRvd24pXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIixrZXl1cClcbnZhciB2eD0wXG52YXIgdnk9MFxuZnVuY3Rpb24ga2V5dXAoZXZlbnQpe1xuICBpZihldmVudC5rZXlDb2RlPT0zNyl7IHZ4PTAgfVxuICBpZihldmVudC5rZXlDb2RlPT0zOCl7IHZ5PTAgfVxuICBpZihldmVudC5rZXlDb2RlPT0zOSl7IHZ4PTAgfVxuICBpZihldmVudC5rZXlDb2RlPT00MCl7IHZ5PTAgfVxufVxuZnVuY3Rpb24ga2V5ZG93bihldmVudCl7XG4gIHZhciB2PTFcbiAgaWYoZXZlbnQua2V5Q29kZT09MTN8fGV2ZW50LmtleUNvZGU9PTMyKXsgcmV0dXJuIG9uQ2xpY2soKSB9XG4gIGlmKGV2ZW50LmtleUNvZGU9PTM3KXsgdng9LXYgfVxuICBpZihldmVudC5rZXlDb2RlPT0zOCl7IHZ5PS12IH1cbiAgaWYoZXZlbnQua2V5Q29kZT09MzkpeyB2eD12IH1cbiAgaWYoZXZlbnQua2V5Q29kZT09NDApeyB2eT12IH1cbn1cbmZ1bmN0aW9uIG1vdmUoKXtcbiAgaWYoIXN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllKXtyZXR1cm4gZmFsc2V9XG4gIHN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLnBvc2l0aW9uLngrPXZ4XG4gIHN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLnBvc2l0aW9uLnkrPXZ5XG4gIHN0YWdlc1tcImhvbWVcIl0uaXRlbXNbXCJiYXRcIl0ueD0gIHN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLnBvc2l0aW9uLnhcbiAgc3RhZ2VzW1wiaG9tZVwiXS5pdGVtc1tcImJhdFwiXS55PXN0YWdlc1tcImhvbWVcIl0uYmF0dGVyX21vdmllLnBvc2l0aW9uLnkrODBcbiAgaWYoc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueDwxMTApc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueD0xMTBcbiAgaWYoc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueD4xNzApc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueD0xNzBcbiAgaWYoc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueTwxNjApc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueT0xNjBcbiAgaWYoc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueT4yODApc3RhZ2VzW1wiaG9tZVwiXS5iYXR0ZXJfbW92aWUucG9zaXRpb24ueT0yODBcbn1cbi8vIHJ1biB0aGUgcmVuZGVyIGxvb3BcbnN0YWdlc1tcImhvbWVcIl0uYWRkQ2hpbGQoXCJiYXRcIixuZXcgQmF0KCkpXG4vLyB2YXIgbWV0ZXIgPSBuZXcgRlBTTWV0ZXIoKTtcbnZhciBncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKClcbi8vIHN0YWdlLmFkZENoaWxkKGdyYXBoaWNzKVxuXG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gIGlmKGN1cnJlbnRfc3RhdGU9PWNvbmZpZy5TVEFURVNbXCJUSFJPV1wiXSl7XG4gICAgaWYoc3RhZ2VzW1wiaG9tZVwiXS5pdGVtc1tcImJhbGxcIl0pe1xuICAgICAgLy8gY29uc29sZS5sb2coc3RhZ2VzW1wiaG9tZVwiXS5pdGVtc1tcImJhbGxcIl0ueSlcbiAgICAgIGlmKHN0YWdlc1tcImhvbWVcIl0uaXRlbXNbXCJiYWxsXCJdLnkgPj0gY29uZmlnLkhFSUdIVCs1MCl7XG4gICAgICAgIGRlbGV0ZSBzdGFnZXNbXCJob21lXCJdLml0ZW1zW1wiYmFsbFwiXVxuICAgICAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwic3RyaWtlXCIpXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzZXRcIilcbiAgICAgICAgICBjdXJyZW50X3N0YXRlPWNvbmZpZy5TVEFURVNbXCJTVEFSVFwiXVxuICAgICAgICAgIHRocm93QmFsbCgpXG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBtb3ZlKClcbiAgc3RhZ2VzW2N1cnJlbnRfc3RhZ2VdLmFuaW1hdGUoKVxuICByZW5kZXJlci5yZW5kZXIoc3RhZ2VzW2N1cnJlbnRfc3RhZ2VdLnN0YWdlKVxuICAvLyBtZXRlci50aWNrKCk7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSggYW5pbWF0ZSApXG59XG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGFuaW1hdGUgKVxuXG52YXIgaU9TID0gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlbW90aW9uXCIsIGZ1bmN0aW9uKGV2dCl7XG5cbiAgLy/liqDpgJ/luqZcbiAgdmFyIHggPSBldnQuYWNjZWxlcmF0aW9uLng7XG4gIHZhciB5ID0gZXZ0LmFjY2VsZXJhdGlvbi55O1xuICB2YXIgeiA9IGV2dC5hY2NlbGVyYXRpb24uejtcblxuXG4gIC8v5YK+44GNXG4gIHZhciB4ZyA9IGV2dC5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lng7XG4gIHZhciB5ZyA9IGV2dC5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lnk7XG4gIHZhciB6ZyA9IGV2dC5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lno7XG5cbiAgaWYoaU9TKXtcbiAgICB2eD14Zy8zXG4gICAgdnk9LXlnLzNcbiAgfWVsc2V7XG4gICAgdng9LXhnLzNcbiAgICB2eT15Zy8zXG4gIH1cbiAgLy8gJChcIiNjb25zb2xlXCIpLmh0bWwoeGcpXG5cbn0sdHJ1ZSk7XG4iLCIgLy8gY3JlYXRlanMuU291bmQucmVnaXN0ZXJQbHVnaW5zKFtjcmVhdGVqcy5XZWJBdWRpb1BsdWdpbiwgY3JlYXRlanMuRmxhc2hQbHVnaW5dKTtcbmxldCBxdWV1ZSA9IG5ldyBjcmVhdGVqcy5Mb2FkUXVldWUoZmFsc2UpXG5xdWV1ZS5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKVxubGV0IGxvYWRTb3VuZENvbXBsZXRlPWZ1bmN0aW9uKCl7XG4gICAgICAvLyBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwiYmdtXCIse2xvb3A6LTF9KVxuICAgICAgLy8gYWxlcnQoMSlcbiAgICAgICQoXCIubG9hZGluZ1wiKS5oaWRlKClcbiAgICAgICQoXCIuc3RhcnRCdG5cIikuc2hvdygpXG59O1xucXVldWUuYWRkRXZlbnRMaXN0ZW5lcihcImNvbXBsZXRlXCIsbG9hZFNvdW5kQ29tcGxldGUpXG52YXIgbWFuaWZlc3QgPSBbXG4gIHtzcmM6XCIvc291bmQvYmdtLm1wM1wiLCBpZDpcImJnbVwifSxcbiAge3NyYzpcIi9zb3VuZC9mb3VsLm1wM1wiLCBpZDpcImZvdWxcIn0sXG4gIHtzcmM6XCIvc291bmQvaG9tZXJ1bi5tcDNcIiwgaWQ6XCJob21lcnVuXCJ9LFxuICB7c3JjOlwiL3NvdW5kL255dTMubXAzXCIsIGlkOlwiYmFsbFwifSxcbiAge3NyYzpcIi9zb3VuZC9zdHJpa2UxLm1wM1wiLCBpZDpcImhpdFwifSxcbiAge3NyYzpcIi9zb3VuZC9oaXR0aW5nLm1wM1wiLCBpZDpcInN0cmlrZVwifSxcbiAge3NyYzpcIi9zb3VuZC9zd2luZy5tcDNcIiwgaWQ6XCJzd2luZ1wifSxcbiAge3NyYzpcIi9zb3VuZC93aGlzdGxlLm1wM1wiLCBpZDpcIndoaXN0bGVcIn0sXG5dXG5xdWV1ZS5sb2FkTWFuaWZlc3QobWFuaWZlc3QpXG4iLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmVzNlwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZUdyb3VuZCB7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5pdGVtcz1bXVxuICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKVxuXG4gICAgdmFyIHRleHR1cmUgPSBQSVhJLlRleHR1cmUuZnJvbUltYWdlKFwiaW1hZ2UvYmFja2dyb3VuZF9ncm91bmQucG5nXCIpO1xuICAgIC8vIGNyZWF0ZSBhIG5ldyBTcHJpdGUgdXNpbmcgdGhlIHRleHR1cmVcbiAgICB0aGlzLmdyb3VuZF9pbWFnZSA9IG5ldyBQSVhJLlNwcml0ZSh0ZXh0dXJlKTtcbiAgICB0aGlzLmluaXRpYWxpemUoKVxuXG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmdyb3VuZF9pbWFnZSk7XG4gICAgdGhpcy5ncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKClcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuZ3JhcGhpY3MpXG5cbiAgICB0aGlzLmZhdWxfaW1hZ2UgPSBuZXcgUElYSS5TcHJpdGUoUElYSS5UZXh0dXJlLmZyb21JbWFnZShcImltYWdlL2ZhdWwucG5nXCIpKTtcbiAgICB0aGlzLmZhdWxfaW1hZ2UucG9zaXRpb24ueD1jb25maWcuV0lEVEgvMi0xMDBcbiAgICB0aGlzLmZhdWxfaW1hZ2UucG9zaXRpb24ueT1jb25maWcuSEVJR0hULzItMjBcbiAgICB0aGlzLmZhdWxfaW1hZ2UudmlzaWJsZT1mYWxzZVxuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5mYXVsX2ltYWdlKTtcblxuICAgIHRoaXMuaG9tZXJ1bl9pbWFnZSA9IG5ldyBQSVhJLlNwcml0ZShQSVhJLlRleHR1cmUuZnJvbUltYWdlKFwiaW1hZ2UvaG9tZXJ1bi5wbmdcIikpO1xuICAgIHRoaXMuaG9tZXJ1bl9pbWFnZS5wb3NpdGlvbi54PWNvbmZpZy5XSURUSC8yLTEwMFxuICAgIHRoaXMuaG9tZXJ1bl9pbWFnZS5wb3NpdGlvbi55PWNvbmZpZy5IRUlHSFQvMi0yMFxuICAgIHRoaXMuaG9tZXJ1bl9pbWFnZS52aXNpYmxlPWZhbHNlXG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmhvbWVydW5faW1hZ2UpO1xuXG4gdGhpcy5zY29yZSA9IG5ldyBQSVhJLlRleHQoJycsIHsgZm9udDogJ2JvbGQgMjBweCBBcmlhbCcsIGZpbGw6ICcjZmZmZmZmJywgYWxpZ246ICdjZW50ZXInIH0pO1xuIHRoaXMuc2NvcmUueCA9IHRoaXMuaG9tZXJ1bl9pbWFnZS5wb3NpdGlvbi54KzI1O1xuIHRoaXMuc2NvcmUueSA9IHRoaXMuaG9tZXJ1bl9pbWFnZS5wb3NpdGlvbi55KzQwO1xuXG50aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuc2NvcmUpO1xufVxuaW5pdGlhbGl6ZSgpe1xuICBjb25zb2xlLmxvZyhcIm1hcCBpbml0XCIpXG5cbiAgLy8gbW92ZSB0aGUgc3ByaXRlIHQgdGhlIGNlbnRlciBvZiB0aGUgc2NyZWVuXG4gIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggPSAwO1xuICB0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi55ID0gMDtcbiAgdGhpcy5jYW1lcmE9Wy0zNjUsLTI3MF1cbiAgdGhpcy5tZWFzdXJlPTBcbn1cblxuYWRkQ2hpbGQoa2V5LG9iail7XG4gIHRoaXMuaXRlbXNba2V5XT1vYmpcbn1cblxuYW5pbWF0ZSgpe1xuICB0aGlzLmdyYXBoaWNzLmNsZWFyKClcbiAgdmFyIGJhbGwgPSB0aGlzLml0ZW1zW1wiYmFsbFwiXVxuICB2YXIgc2NhbGU9MC4xXG4gIGJhbGwubW92ZV9ncm91bmQoc2NhbGUpXG4gIHZhciB4PSBiYWxsLnhcbiAgdmFyIHk9IGJhbGwueVxuICB0aGlzLm1lYXN1cmUgKz0gTWF0aC5zcXJ0KGJhbGwueCAqIGJhbGwueCArIGJhbGwueSAqIGJhbGwueSlcbiAgLy8gY29uc29sZS5sb2codGhpcy5tZWFzdXJlKVxuICAvLyBjb25zb2xlLmxvZyhiYWxsLnkpXG4gIC8vIHZhciBzdG9wWD1mYWxzZTtcbiAgLy8gdmFyIHN0b3BZPWZhbHNlO1xuICBpZih0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi54ID4gLTcwMCAmJiB0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi54IDwgMCl7XG4gICAgdGhpcy5jYW1lcmFbMF0tPWJhbGwudnhcbiAgfVxuICAvLyBjb25zb2xlLmxvZyh0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi55KVxuICBpZih0aGlzLmdyb3VuZF9pbWFnZS5wb3NpdGlvbi55PDApe1xuICAgIHRoaXMuY2FtZXJhWzFdLT1iYWxsLnZ5XG4gIH1cbiAgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueCA9IHRoaXMuY2FtZXJhWzBdXG4gIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnkgPSB0aGlzLmNhbWVyYVsxXVxuXG4gIC8vIHRoaXMuZGlmZlggPSB0aGlzLmRpZmZYIHx8IDBcbiAgLy9cbiAgLy8gY29uc29sZS5sb2coeClcbiAgLy8gICAgIGlmKHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggPiAtNzAwICYmIHRoaXMuZ3JvdW5kX2ltYWdlLnBvc2l0aW9uLnggPCAwKXtcbiAgLy8gICAgICAgaWYoeCA8IDUwKXt4PTUwOyBzdG9wWD10cnVlfVxuICAvLyAgICAgICBpZih4ID4gY29uZmlnLldJRFRILTUwKXt4PWNvbmZpZy5XSURUSC01MDtzdG9wWD10cnVlOyB9XG4gIC8vICAgICAgIGlmKHN0b3BYKXtcbiAgLy8gICAgICAgICAgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueCAtPSBiYWxsLnZ4IH1cbiAgLy8gICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueClcbiAgLy8gICAgIH1lbHNle1xuICAvLyAgICAgICB4ICs9dGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueFxuICAvLyAgICAgfVxuXG4gIC8vIGlmKHkgPCA1MCl7eT01MDtzdG9wWT10cnVlfVxuICAvLyBpZih5ID4gY29uZmlnLkhFSUdIVC01MCl7eT1jb25maWcuSEVJR0hULTUwO3N0b3BZPXRydWV9XG4gIC8vIGlmKHN0b3BZKXsgdGhpcy5ncm91bmRfaW1hZ2UucG9zaXRpb24ueSAtPSBiYWxsLnZ5IH1cblxuICBpZih0aGlzLml0ZW1zW1wiYmFsbFwiXSkgdGhpcy5pdGVtc1tcImJhbGxcIl0uZHJhd19ncm91bmQoXG4gICAgdGhpcy5ncmFwaGljcyxcbiAgICB4LFxuICAgIHksXG4gICAgYmFsbC5yYWRpdXMpXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlSG9tZSB7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5pdGVtcz1bXVxuICAgIHRoaXMuc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKVxuICAgIHRoaXMuZ3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpXG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmdyYXBoaWNzKVxuICAgIHRoaXMuYmcgPSBuZXcgUElYSS5TcHJpdGUoUElYSS5UZXh0dXJlLmZyb21JbWFnZShcImltYWdlL2JhY2tncm91bmRfaG9tZS5wbmdcIikpO1xuICAgIHRoaXMuYmcucG9zaXRpb24ueCA9IDA7XG4gICAgdGhpcy5iZy5wb3NpdGlvbi55ID0gMDtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkQXQodGhpcy5iZywwKTtcblxuICAgIHRoaXMuc2NvcmUgPSBuZXcgUElYSS5UZXh0KCdDSEFMTEVOR0UgMFxcbkhPTUVSVU4gMCcsIHsgZm9udDogJ2JvbGQgMTZweCBBcmlhbCcsIGZpbGw6ICcjY2NjY2NjJ30pO1xuICAgIHRoaXMuc2NvcmUueCA9IDMwO1xuICAgIHRoaXMuc2NvcmUueSA9IDI7XG5cbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKCB0aGlzLnNjb3JlKTtcblxuICAgIGxldCBzZWxmPXRoaXNcbiAgICBQSVhJLmxvYWRlclxuICAgIC5hZGQoJ3N1YmFydScsICcvaW1hZ2Uvc3ByaXRlc2hlZXQuanNvbicpXG4gICAgLmFkZCgncGl0Y2hlcicsICcvaW1hZ2UvcGl0Y2hlci5qc29uJylcbiAgICAubG9hZChmdW5jdGlvbigpe1xuICAgICAgdmFyIHBpdGNoZXJfdGV4dHVyZXMgPSBbXVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspXG4gICAgICB7XG4gICAgICAgIHZhciBwaXRjaGVyX3RleHR1cmUgPSBQSVhJLlRleHR1cmUuZnJvbUZyYW1lKCdwaWNoZXJfMCcgKyAoaSsxKSArICcucG5nJyk7XG4gICAgICAgIHBpdGNoZXJfdGV4dHVyZXMucHVzaChwaXRjaGVyX3RleHR1cmUpO1xuICAgICAgfVxuICAgICAgc2VsZi5waXRjaGVyX21vdmllID0gbmV3IFBJWEkuZXh0cmFzLk1vdmllQ2xpcChwaXRjaGVyX3RleHR1cmVzKTtcbiAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS5wb3NpdGlvbi54PTExMFxuICAgICAgc2VsZi5waXRjaGVyX21vdmllLnBvc2l0aW9uLnk9NzBcbiAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS53aWR0aD0xMDBcbiAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS5oZWlnaHQ9MTAwXG4gICAgICBzZWxmLnBpdGNoZXJfbW92aWUuYW5pbWF0aW9uU3BlZWQgPSAwLjA1O1xuICAgICAgc2VsZi5waXRjaGVyX21vdmllLmxvb3AgPSBmYWxzZTtcbiAgICAgIHNlbGYucGl0Y2hlcl9tb3ZpZS5nb3RvQW5kUGxheSgwKTtcblxuICAgICAgdmFyIHRleHR1cmVzID0gW11cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKVxuICAgICAge1xuICAgICAgICB2YXIgdGV4dHVyZSA9IFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUoJ2JhdF8wJyArIChpKzEpICsgJy5wbmcnKTtcbiAgICAgICAgdGV4dHVyZXMucHVzaCh0ZXh0dXJlKTtcbiAgICAgIH1cbiAgICAgIHNlbGYuYmF0dGVyX21vdmllID0gbmV3IFBJWEkuZXh0cmFzLk1vdmllQ2xpcCh0ZXh0dXJlcyk7XG5cbiAgICAgIHNlbGYuYmF0dGVyX21vdmllLnBvc2l0aW9uLng9MTUwXG4gICAgICBzZWxmLmJhdHRlcl9tb3ZpZS5wb3NpdGlvbi55PTIwMFxuICAgICAgc2VsZi5iYXR0ZXJfbW92aWUud2lkdGg9MjAwXG4gICAgICBzZWxmLmJhdHRlcl9tb3ZpZS5oZWlnaHQ9MjAwXG4gICAgICBzZWxmLmJhdHRlcl9tb3ZpZS5sb29wPWZhbHNlXG4gICAgICAvLyBzZWxmLmJhdHRlcl9tb3ZpZS5vbkNvbXBsZXRlKGZ1bmN0aW9uKCl7XG4gICAgICAvLyAgIHNldFRpbWVvdXQoZnVudGlvbigpe1xuICAgICAgLy8gICAgIHNlbGYuYmF0dGVyX21vdmllLmdvdG9BbmRTdG9wKDApXG4gICAgICAvLyAgIH0sNTAwKVxuICAgICAgLy8gfSlcblxuICAgICAgc2VsZi5iYXR0ZXJfbW92aWUuYW5pbWF0aW9uU3BlZWQgPSAwLjU7XG5cbiAgICAgIHNlbGYuYmF0dGVyX21vdmllLmdvdG9BbmRTdG9wKDApO1xuICAgICAgc2VsZi5zdGFnZS5hZGRDaGlsZChzZWxmLmJhdHRlcl9tb3ZpZSk7XG4gICAgICBzZWxmLnN0YWdlLmFkZENoaWxkKHNlbGYucGl0Y2hlcl9tb3ZpZSk7XG4gICAgfSk7XG5cblxuICB9XG5cbiAgYWRkQ2hpbGQoa2V5LG9iail7XG4gICAgdGhpcy5pdGVtc1trZXldPW9ialxuICB9XG5cbiAgYmFsbCgpe1xuICAgIHJldHVybiB0aGlzLml0ZW1zW1wiYmFsbFwiXVxuICB9XG4gIGJhdCgpe1xuICAgIHJldHVybiB0aGlzLml0ZW1zW1wiYmF0XCJdXG4gIH1cbiAgcGl0Y2goYmFsbCl7XG4gICAgY29uc29sZS5sb2coXCJwaXRjaFwiKVxuICAgIHRoaXMucGl0Y2hlZD1mYWxzZVxuICAgIHZhciBzZWxmPXRoaXNcbiAgICB0aGlzLnBpdGNoZXJfbW92aWUuZ290b0FuZFBsYXkoMClcbiAgICB0aGlzLm9uUGl0Y2g9ZnVuY3Rpb24oKXtcbiAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJiYWxsXCIpXG4gICAgICBzZWxmLmFkZENoaWxkKFwiYmFsbFwiLGJhbGwpXG4gICAgfVxuICB9XG5cbiAgc3dpbmcoc3VjY2Vzcyl7XG4gICAgY3JlYXRlanMuU291bmQucGxheShcInN3aW5nXCIpXG4gICAgY29uc29sZS5sb2coXCJzd2luZ1wiKVxuICAgIHRoaXMuc3VjY2Vzcz1zdWNjZXNzXG4gICAgdGhpcy5oaXRlZD1mYWxzZVxuICAgIHRoaXMuYmF0dGVyX21vdmllLmdvdG9BbmRQbGF5KDApXG4gIH1cblxuICBhbmltYXRlX2JhdHRlcigpe1xuICAgIGlmKHRoaXMuaGl0ZWQ9PWZhbHNlICYmIHRoaXMuYmF0dGVyX21vdmllLmN1cnJlbnRGcmFtZT09Myl7XG4gICAgICB2YXIgaGl0PXRoaXMuYmF0KCkuaGl0Q2hlY2sodGhpcy5iYWxsKCkpXG4gICAgICBpZihoaXQgIT0gZmFsc2Upe1xuICAgICAgICBjb25zb2xlLmxvZyhcImhpdFwiKVxuICAgICAgICB0aGlzLmhpdGVkPXRydWVcbiAgICAgICAgdGhpcy5iYWxsKCkuaGl0KGhpdFswXSxoaXRbMV0saGl0WzJdKVxuICAgICAgICB0aGlzLnN1Y2Nlc3MoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFuaW1hdGVfcGl0Y2hlcigpe1xuICAgIGlmKHR5cGVvZiB0aGlzLm9uUGl0Y2ggPT0ndW5kZWZpbmVkJylyZXR1cm4gZmFsc2U7XG4gICAgaWYodGhpcy5waXRjaGVkKXJldHVybiBmYWxzZVxuICAgIGlmKHRoaXMucGl0Y2hlcl9tb3ZpZS5jdXJyZW50RnJhbWU9PTMpe1xuICAgICAgdGhpcy5waXRjaGVkPXRydWVcbiAgICAgIHRoaXMub25QaXRjaCgpXG4gICAgfVxuXG4gIH1cblxuICBhbmltYXRlKCl7XG4gICAgdGhpcy5ncmFwaGljcy5jbGVhcigpXG4gICAgaWYodGhpcy5iYXR0ZXJfbW92aWUpe3RoaXMuYW5pbWF0ZV9iYXR0ZXIoKSB9XG4gICAgaWYodGhpcy5waXRjaGVyX21vdmllKXt0aGlzLmFuaW1hdGVfcGl0Y2hlcigpIH1cblxuICAgIGZvcih2YXIgaSBpbiB0aGlzLml0ZW1zKXtcbiAgICAgIGlmKHRoaXMuaXRlbXNbaV0ubW92ZSgpKXtcbiAgICAgICAgdGhpcy5pdGVtc1tpXS5kcmF3KHRoaXMuZ3JhcGhpY3MpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuaXRlbXNbaV0uY2xlYXIodGhpcy5ncmFwaGljcylcbiAgICAgICAgZGVsZXRlIHRoaXMuaXRlbXNbaV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==
