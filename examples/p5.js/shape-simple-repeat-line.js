function setup() {
  let canvas = createCanvas(400, 400)
  let joy = joyP5.joy(canvas)

  console.log(joy)

  background(220)

  let xres = 8, yres = 8
  let rn = xres*yres
  let ws = Array(rn).fill(0).map((i, index) => index*10)
  let randomColors = Array(rn).fill(0).map(() => color(random(255), random(255), random(255)))

  let xedge = width/xres
  let yedge = width/yres



  push()
  translate(-width/2, -height/2)

  let shape = joy.rectangle({ w: xedge, h: yedge })
  .translate({x: xedge/2, y: yedge/2})
  .repeat({
    n: xres,
    transform: joy.translate({x: xedge, y: 0})
  })

  console.log(shape)

  let renderer = new joyP5.P5Renderer(this)
  renderer.show(shape)
  // renderer.show(shape1)
  pop()

}