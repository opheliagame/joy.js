let joy = joyP5.joy();

let xres = 8,
  yres = 8;
let xedge = 800 / xres;
let yedge = 800 / yres;
let shape = joy
  .rectangle({ w: xedge, h: yedge, fill: 'magenta', stroke: 'black', 'stroke-width': 2 })
  .translate({ x: xedge / 2, y: yedge / 2 })
  .repeat({
    n: xres * yres,
    transform: (index) => {
      let x = index % xres;
      let y = Math.floor(index / xres);

      return {
        transform: joy.translate({ x: x * xedge, y: y * yedge }),
        style: {
          fill: `rgba(${joyP5.map(x, 0, xres, 0, 255)}, ${joyP5.map(y, 0, yres, 0, 255)}, 100, 1)`,
        },
      };
    },
  });

let renderer = new joyP5.SVGRenderer(document);
renderer.show(shape);