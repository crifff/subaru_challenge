Physics.behavior('pin-constraints', function( parent ){
    return {
        init: function( opts ){
            parent.init.call( this, opts );
            this.pins = [];
        },

        add: function( body, targetPos ){
            this.pins.push({
                body: body,
                target: Physics.vector( targetPos )
            });
        },

        behave: function( data ){

            var pins = this.pins
                ,pin
                ;

            for (var i = 0, l = pins.length; i < l; i++){
                pin = pins[ i ];
                // move body to correct position
                pin.body.state.pos.clone( pin.target );
            }
        }
    };
});

Physics({
    // set the timestep
    timestep: 1000.0 / 160,
    // maximum number of iterations per step
    maxIPF: 16,
    // set the integrator (may also be set with world.add())
    integrator: 'verlet'
},function(world) {
  var viewWidth = 360;
  var viewHeight = 520;

  var renderer = Physics.renderer('pixi', {
    el: 'viewport',
    width: viewWidth,
    height: viewHeight,
    meta: true, // don't display meta data
    styles: {
      // set colors for the circle bodies
      'circle': {
        strokeStyle: '0xE8900C',
        lineWidth: 3,
        fillStyle: '0xD5DE4C',
        angleIndicator: '0xE8900C'
      }
    }
  });

  // add the renderer
  world.add(renderer);
  // render on each step
  world.on('step', function() {
    world.render();
  });

  // bounds of the window
  var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

  // constrain objects to these bounds
  world.add(Physics.behavior('edge-collision-detection', {
    aabb: viewportBounds,
    restitution: 1,
    cof: 0.009
  }));

  rect=Physics.body('rectangle', {
    mass: 3,
    // angularVelocity:0.01,
    // angle: Math.PI/3,
    restitution: 1,
    x: 100, // x-coordinate
    y: 350, // y-coordinate
    width:50,
    height:150,
    vx: 0.2, // velocity in x-direction
    vy: -0.5, // velocity in y-direction
    radius: 20
  })

  var pinConstraints = Physics.behavior('pin-constraints');
    // add a pin constraint constraining the shelf's center to its current position
    pinConstraints.add( rect, Physics.vector(100,350) );
    world.add(pinConstraints);
  ball =  Physics.body('circle', {
      mass: 1,
      restitution: 1,
      x: 50, // x-coordinate
      y: 30, // y-coordinate
      vx: 0.2, // velocity in x-direction
      vy: 0.1, // velocity in y-direction
      radius: 20
    })
  // add a circle
  world.add(ball

  );
  world.add(rect);

  // ensure objects bounce when edge collision is detected
  world.add([
      Physics.behavior('constant-acceleration')
      ,Physics.behavior('body-impulse-response')
      ,Physics.behavior('body-collision-detection')
      ,Physics.behavior('sweep-prune')
      ]);
      world.add(Physics.behavior('interactive', { el: renderer.container }));

  // subscribe to ticker to advance the simulation
  Physics.util.ticker.on(function(time, dt) {
    world.step(time);
  });

  // start the ticker
  Physics.util.ticker.start();
});
