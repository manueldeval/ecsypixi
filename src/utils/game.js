export function gameLoop(world){
  function run() {
    // Compute delta and elapsed time
    var time = performance.now();
    var delta = time - lastTime;
    // Run all the systems
    world.execute(delta, time);
    lastTime = time;
    requestAnimationFrame(run);
  }
  var lastTime = performance.now();
  run();
}