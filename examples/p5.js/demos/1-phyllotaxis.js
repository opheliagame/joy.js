
function setup() {
  createCanvas(400, 400);

  
}

function draw() {
  background("black");

  noStroke();
  fill("magenta");

  let t = millis() / 3000;
  let angle = sin(t) * 137.5 * 2;
  angle = floor(angle % 50);

  let c = joy
  .circle({ r: 10 })
  // .line()
  .repeat({
    n: 100,
    transform: (i) =>
      joy.rotate({ angle: angle * i }).translate({ x: Math.sqrt(i) * 12 }),
  });

  let renderer = new joy.P5Renderer(document);
  renderer.show(c);

}
