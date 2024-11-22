
function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);

  let t = millis()/15

  let n = floor(abs(sin(t /10)) * 10)
  let side = width/2-20*n
  // side = 100
  let chord = 2*side*Math.PI/n

  let iscomb1 = n <= 5
  let col1 = iscomb1 ? 'magenta' : 'yellow'
  let col2 = iscomb1 ? 'yellow' : 'magenta'


  // .repeat({
  //   n: n,
  //   transform: joy
  //     .rotate({ angle: 360/n/2 }).translate({ x: chord })
  //     .rotate({ angle: 360/n/2 })
  // })

  let l = joy
  .circle({r: width/n/5, 'stroke': col1, 'fill': col1,  })
  // .line({ l: 100/2, 'stroke': 'yellow', 'strokeWeight': 10 })
  // .translate({ x: -200, y: -200 })
  // .add(joy.line({l: 10, 'stroke': 'magenta', 'strokeWeight': 10 }))
  .add(joy.line({ l: width/n, 'stroke': col2, 'strokeWeight': (25-n*2) }))
  .rotate({ angle: 90 })
  .rotate({ angle: t })
  .repeat({
    n: n,
    transform: (i) => joy.rotate({ angle: 360/n*i + t })
  })
  .translate({ y: side }) 
  .repeat({
    n: 2,
    transform: joy
      .rotate({ angle: 360/n/2 }).translate({ x: chord })
      .rotate({ angle: 360/n/2 })
  })
  .repeat({
    n: (10-n),
    transform: joy.translate({ x: chord }).scale({x: 1.1, y: 1.1})
  })
  .repeat({
    n: n,
    transform: joy
      .rotate({ angle: 360/n/2 + t }).translate({ x: chord })
      .rotate({ angle: 360/n/2 - t})
  })


  // .translate({ x: 200, y: 200 })
  // .translate({ x: -100, y: -100 })
  



  let renderer = new joy.P5Renderer(document);
  renderer.show(joy.circle({r: 2, 'fill': 'magenta', 'stroke': 'magenta'}));
  renderer.show(l)
  // renderer.show(l1)

  // console.log(l)
  // console.log(l.toString())

  // console.log(renderer.printDebug(l))

  // noLoop()

}
