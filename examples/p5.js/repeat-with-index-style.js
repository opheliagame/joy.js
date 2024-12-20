function setup() {
  let canvas = createCanvas(400, 400)

  background(220)

  let xres = 8, yres = 8
  let xedge = width/xres
  let yedge = width/yres

  push()
  translate(-width/2, -height/2)
  noStroke()

  let shape = joy.rectangle({ w: xedge, h: yedge })
  .translate({ x: xedge/2, y: yedge/2 })
  .repeat({
    n: xres*yres,
    transform: (index) => {
      let x = (index % xres)  
      let y = Math.floor(index / xres) 
      return {
        transform: joy.translate({x: x * xedge, y: y * yedge}),
        style: {
          'fill': [map(x, 0, xres, 0, 255), map(y, 0, yres, 0, 255), 100]
        }
      }
    },
  })
  
  let renderer = new joy.P5Renderer(this)
  renderer.show(shape)
  
  pop()

}