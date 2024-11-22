function setup() {
  let canvas = createCanvas(400, 400)

  background('whitesmoke')
  noStroke()

  let or = 60/2, ir = 48/2

  let innerCircle = joy.circle({r: ir, 'fill': 'white'}).rotate({angle: 180-72}).translate({x: -(or-ir)/2, y: -(or-ir)/2})
  let shape = joy.circle({r: or, 'fill': 'magenta'})
  // .add(innerCircle)
  .translate({y: -or*1.5})
  .rotate({angle: 72/4})
  .repeat({
    n: 5,
    transform: joy.rotate({angle: -72}).translate({y: -or})
  })
  
  let renderer = new joy.P5Renderer(this)
  renderer.show(shape)

  console.log(shape.toString())
  console.log(renderer.printDebug(shape))

}