;

let d = 30 
let x1 = -d/2, x2 = d/2

function setup() {
  createCanvas(400, 400);

  
// }

// function draw() {
  background("black");

  stroke("magenta");

  let t = millis() / 3000;
  let angle = sin(t) * 137.5 * 2;
  angle = floor(angle % 50);

  let center = joy.circle({r: 2, 'fill': 'red', 'stroke': 'red'})

  // let c = joy.line({x1: x1, x2: x2})
  // // .repeat({
  // //   n: 14,
  // //   transform: joy.translate({ x: d }).rotate({angle: 30}).translate({y: -d})
  // // });

  // let c = joy.line({x1: x1, x2: x2})
  // .rotate({angle: 90}).translate({x: d/2})
  // .repeat({
  //   n: 7,
  //   transform: joy.translate({ x: d/2 }).rotate({angle: 20}).translate({x: d/2})
  // });

  // let c = joy.line({x1: x1, x2: x2})
  // .rotate({angle: 90}).translate({x: d/2})
  // .repeat({
  //   n: 2,
  //   transform: (i) => joy.translate({ x: d/2 }).rotate({angle: i == 0 ? -20: 20}).translate({x: d/2})
  // })
  // .repeat({
  //   n: 4,
  //   transform: joy.translate({ x: d/2 }).rotate({angle: 30}).translate({x: d/2})
  // });


  let l = joy.line({x1: x1, x2: x2})

  let c = joy.line({x1: x1, x2: x2})
  .rotate({angle: 90})
  .repeat({
    n: 2,
    transform: (i) => joy
    .translate({x: d/2})
    .rotate({angle: -60})
    .repeat({
      n: i,
      // transform: (i) => joy.rotate({angle: i == 2 ? 10 : -10})
      transform: joy.rotate({angle: 60/2})
    })
    .translate({x: d/2})
    // .translate({x: d/2})
    
  });




  let renderer = new joy.P5Renderer(document);
  renderer.show(c);  
  renderer.show(center);

  let printString = renderer.printDebug(c)
  console.log(printString)


}
