// TODO not finished
function setup() {
  let canvas = createCanvas(400, 400);
  let joy = joyP5.initJoyP5(canvas);

  background(220);

  let xres = 8,
    yres = 8;
  
  let xedge = width / xres;
  let yedge = width / yres;

  stroke('black')
  push();
  translate(-width / 2, -height / 2);
  joy
    .rectangle({ w: xedge-10, h: yedge-10 })
    .translate({ x: xedge / 2, y: yedge / 2 })
  .repeat({
    n: xres,
    transform: (index) => joy.translate({ x: index * xedge, y: 0 }).rotate({angle: index})
  })
  .repeat({
    n: yres,
    transform: (index) => joy.translate({x: 0, y: index * yedge})
  })
  .show()
  pop();
}
