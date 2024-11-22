// TODO example not finished
function setup() {
  createCanvas(400, 400);

  background(220);

  let xres = 8,
    yres = 8;
  
  let xedge = width / xres;
  let yedge = width / yres;

  stroke('black')
  push();
  translate(-width / 2, -height / 2);
  
  let shape = joy
    .rectangle({ w: xedge-10, h: yedge-10 })
    .translate({ x: xedge / 2, y: yedge / 2 })
  .repeat({
    n: xres,
    transform: (index) => joy.translate({ x: index * xedge }).rotate({angle: index})
  })
  .repeat({
    n: yres,
    transform: (index) => joy.translate({ y: index * yedge })
  })
  
  let renderer = new joy.P5Renderer(this)
  renderer.show(shape)

  console.log(shape.toString())
  console.log(renderer.printDebug(shape))

  pop();
}
