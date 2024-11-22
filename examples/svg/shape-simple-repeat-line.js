
let xres = 8, yres = 8
let xedge = 800/xres
let yedge = 800/yres
let shape = joy
  .rectangle({ w: xedge, h: yedge, 'fill': 'magenta', 'stroke': 'black', 'stroke-width': 2 })
  .translate({ x: xedge / 2, y: yedge / 2 })
  .repeat({
    n: xres,
    transform: joy.translate({ x: xedge, y: 0 }),
  });


let renderer = new joy.SVGRenderer(document);
renderer.show(shape);
