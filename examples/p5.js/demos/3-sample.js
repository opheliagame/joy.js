
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("black");

  stroke('yellow')
  strokeWeight(2)

  let n = 4
  let side = 50
  let chord = 2*side*Math.PI/n

  let l = joy
  .line({x1: -chord/2, x2: chord/2, 'stroke': 'yellow' })
  .rotate({ angle: 90 })
  .translate({ y: side })
  .repeat({
    n: n,
    transform: joy
      .rotate({ angle: 360/n/2 }).translate({ x: chord })
      .rotate({ angle: 360/n/2 })
  })
  .translate({ y: -side })
  .repeat({
    n: 2,
    transform: joy.scale({x: 1.1, y: 1.1})
  })

  let s = joy.rectangle({w: 10, h:10})
  .translate({ y: side })
  .repeat({
    n: n,
    transform: joy
      .rotate({ angle: 360/n/2 }).translate({ x: chord })
      .rotate({ angle: 360/n/2 })
  })
  // .translate({ y: -side })
  .repeat({
    n: 2,
    transform: joy.scale({x: 1.1, y: 1.1})
  })
  // .translate({ y: -side })
  


  let renderer = new joy.P5Renderer(document);
  renderer.show(joy.circle({r: 2, 'fill': 'red', 'stroke': 'red'}));
  // renderer.show(l)
  renderer.show(s)

  console.log(l)
  console.log(s.toString())

  console.log(renderer.printDebug(s))
  // console.log(renderer.printTransformDebug(tr))

  noLoop()

}
