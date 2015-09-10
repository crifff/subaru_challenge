// Matter.js module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Constraint = Matter.Constraint;

// create a Matter.js engine
var engine = Engine.create({
    render: {
        element: document.body,
        controller: Matter.RenderPixi
    }
});

// create two boxes and a ground
var boxA = Bodies.circle(400, 0,  20,{
  density: 0.0001,
  restitution: 1
});

var boxB = Bodies.rectangle(380, 400, 120, 20, {
  // isStatic: true
  density: 0.001,
  // restitution: 0.2,
  // force: { x: 0.01, y: -0.1 }
  // torque:-10
});

var human = Bodies.circle(300, 400,  20,{
  density: 0.01,
  torque:0.1
});
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });



// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground,human]);

cons=Constraint.create({
    bodyA: human,
    pointA: {x: 0, y: 0},
    bodyB: boxB,
    pointB: {x: -60, y: 0},
    stiffness:1
});
World.addConstraint(engine.world, cons)

// run the engine
Engine.run(engine);
// var renderer, stage, container, drawBall, zoom,
//           world, boxShape, boxBody, planeBody, planeShape;
//
//       init();
//       animate();
//
//       function init(){
//
//           // Init p2.js
//           world = new p2.World( {gravity:[0, 0]});
//           //
//           // // Add a box
//           // boxShape = new p2.Box({ width: 2, height: 1 });
//           // boxBody = new p2.Body({
//           //     mass:1,
//           //     position:[0,0],
//           //     angularVelocity:0
//           // });
//           // boxBody.addShape(boxShape);
//           // // world.addBody(boxBody);
//
//
//           ball = new p2.Body({
//               mass: 1,
//               position: [200, 0],
//               angle: 0,
//               velocity: [0, 40],
//               angularVelocity: 0
//           });
//           ball.addShape(new p2.Circle({ radius: 10 }));
//           world.addBody(ball);
//
//           human = new p2.Body({
//               mass: 0,
//               position: [100, 100],
//               angle: 0,
//               velocity: [0, 0],
//               angularVelocity: 0
//           });
//           var humanShape= new p2.Circle({ radius: 10 });
//           human.addShape(humanShape);
//
//           bat= new p2.Body({
//               mass: 100,
//               position: [110, 100],
//               angle: 0,
//               velocity: [0,0],
//               angularVelocity: 0
//           })
//           var batShape=new p2.Box({ width: 200, height: 20 });
//           bat.addShape(batShape);
//
//
//           world.addBody(bat);
//           world.addBody(human);
//
//           var constraint = new p2.LockConstraint(human, bat);
//           world.addConstraint(constraint);
//
//           // // Add a plane
//           // planeShape = new p2.Plane();
//           // planeBody = new p2.Body({ position:[0,-1] });
//           // planeBody.addShape(planeShape);
//           // world.addBody(planeBody);
//
//           // Pixi.js zoom level
//           zoom = 10;
//
//           // Initialize the stage
//           renderer =  PIXI.autoDetectRenderer(600, 400),
//
//           stage = new PIXI.Container(),
//
//           // Add the canvas to the DOM
//           document.body.appendChild(renderer.view);
//
//           // Add transform to the container
//           // stage.position.x =  renderer.width/2; // center at origin
//           // stage.position.y =  renderer.height/2;
//           // stage.scale.x =  zoom;  // zoom in
//           // stage.scale.y = -zoom; // Note: we flip the y axis to make "up" the physics "up"
//
//           // Draw the ball.
//           drawBall = new PIXI.Graphics();
//           drawBall.moveTo(0,0);
//           drawBall.beginFill(0xff0000);
//           drawBall.drawCircle(ball.position[0], ball.position[1],ball.shapes[0].radius);
//           stage.addChild(drawBall);
//
//
//           // graphics = new PIXI.Graphics();
//           //
//           // graphics.beginFill(0x00ff00);
//           // graphics.drawCircle(human.position[0], human.position[1],human.shapes[0].radius);
//           // graphics.endFill();
//           //
//           // graphics.beginFill(0x0000ff);
//           // graphics.drawRect(bat.position[0], bat.position[1], batShape.width, batShape.height);
//           // graphics.endFill();
//           //
//           //
//           // stage.addChild(graphics);
//
//           drawHuman = new PIXI.Graphics();
//           drawHuman.moveTo(0,0);
//           drawHuman.beginFill(0x00ff00);
//           drawHuman.drawCircle(human.position[0], human.position[1],human.shapes[0].radius);
//           stage.addChild(drawHuman);
//
//           // Draw the bat.
//           drawBat = new PIXI.Graphics();
//           drawBat.moveTo(0,0);
//           drawBat.beginFill(0x0000ff);
//           drawBat.drawRect( batShape.width/2,  -batShape.height/2, batShape.width, batShape.height);
//           stage.addChild(drawBat);
//       }
//
//       function trans(src, dist){
//         dist.position.x = src.position[0];
//         dist.position.y = src.position[1];
//         dist.rotation =   src.angle;
//       }
//
//       // Animation loop
//       function animate(t){
//           t = t || 0;
//           requestAnimationFrame(animate);
//
//           // Move physics bodies forward in time
//           world.step(1/60);
//
//           // Transfer positions of the physics objects to Pixi.js
//           trans(ball,drawBall)
//           trans(human,drawHuman)
//           trans(bat,drawBat)
//
//
//           // Render scene
//           renderer.render(stage);
//       }
//
// //
// // var renderer = new PIXI.WebGLRenderer(320, 480);
// // document.body.appendChild(renderer.view);
// // var stage = new PIXI.Container();
// // var drawing = new PIXI.Graphics();
// // stage.addChild(drawing);
// // // kick off the animation loop (defined below)
// //
// //
// //   var world = new p2.World({
// //       gravity:[0, 0]
// // });
// //
// //
// // var ball = new p2.Body({
// //     mass: 1,
// //     position: [200,80],
// //     angle: 0,
// //     velocity: [0, 90],
// //     angularVelocity: 0
// // });
// // ball.addShape(new p2.Circle({ radius: 5 }));
// // world.addBody(ball);
// //
// //
// // var human = new p2.Body({
// //     mass: 0,
// //     position: [100, 300],
// //     angle: 0,
// //     velocity: [0, 0],
// //     angularVelocity: 0
// // });
// // var bat= new p2.Body({
// //     mass: 1,
// //     position: [100, 400],
// //     angle: Math.PI/2,
// //     velocity: [0,0],
// //     angularVelocity: 0
// // });
// //
// //
// // document.addEventListener('mousedown', function(){
// //   console.log("down")
// //   human.angularVelocity=-3;
// //   setTimeout(function(){
// //     human.sleep();
// //     human.angularVelocity=0;
// //     human.angle = 0;
// //   },500)
// //   // bat.sleep()
// //   // bat.velocity=[0,0]
// //   // bat.position= [100, 400]
// //   // bat.angle= Math.PI/2
// //   // if(bat.angularVelocity==0){
// //   //   bat.angularVelocity=-2;
// //   //   bat.wakeUp()
// //   // }else{
// //   //   bat.angularVelocity=0;
// //   // }
// // });
// //
// // var humanShape= new p2.Circle({ radius: 10 });
// // human.addShape(humanShape);
// // var batShape=new p2.Box({ width: 200, height: 20 });
// // bat.addShape(batShape);
// //
// //
// // world.addBody(bat);
// // world.addBody(human);
// //
// // var constraint = new p2.LockConstraint(human, bat);
// // world.addConstraint(constraint);
// //
// //
// //
// // drawBall = new PIXI.Graphics();
// // drawBall.beginFill(0xff0000);
// // drawBall.drawRect(bat.position[0], bat.position[1], batShape.width, batShape.height);
// // stage.addChild(drawBall);
// //
// // drawBall2 = new PIXI.Graphics();
// // drawBall2.beginFill(0x00ff00);
// // drawBall2.drawCircle(0,0,0);
// // // // Add the box to our container
// // stage.addChild(drawBall2);
// //
// // var timeStep = 1 / 16; // seconds
// //
// //
// // animate();
// // function animate() {
// //     // start the timer for the next animation loop
// //     requestAnimationFrame(animate);
// //
// //     world.step(timeStep);
// //
// //     drawing.clear();
// //
// //    // draw circle
// //    drawing.beginFill(0x999999);
// //    drawing.drawCircle(world.bodies[0].position[0],world.bodies[0].position[1],world.bodies[0].shapes[0].radius);
// //
// //
// //     drawBall2.position.x = human.position[0];
// //     drawBall2.position.y = human.position[1];
// //     drawBall2.rotation =   human.angle;
// //   //  bat.angularVelocity*=1.3;
// //     drawBall.position.x = bat.position[0];
// //     drawBall.position.y = bat.position[1];
// //     drawBall.rotation = bat.angle;
// //     // each frame we spin the bunny around a bit
// //     // // bunny.rotation += 0.1;
// //     // bunny.position.x=world.bodies[0].position[0];
// //     // bunny.position.y=world.bodies[0].position[1];
// //     //console.log(circle);
// //
// //
// //     // this is the main render call that makes pixi draw your container and its children.
// //     renderer.render(stage);
// // }
