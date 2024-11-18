function setup() {
  createCanvas(400, 400)

  background(220)

  let xres = 8, yres = 8
  let xedge = width/xres
  let yedge = width/yres

  push()
  translate(-width/2, -height/2)

  let shape = joy.rectangle({ w: xedge/2, h: yedge })
  .translate({x: xedge/2, y: yedge/2})
  .repeat({
    n: xres,
    transform: joy.translate({x: xedge/2, y: 0})
  })

  let renderer = new joy.P5Renderer(this)
  renderer.show(shape)
  pop()

  // console.log(renderer.printDebug(shape))

}