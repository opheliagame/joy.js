// TODO fix example

let img1

function preload() {
  img1 = loadImage('./assets/gradient.jpg')
}

function setup() {
  createCanvas(400, 400, WEBGL)

  background('whitesmoke')
  texture(img1)
  noStroke()
  translate(-width / 2, -height / 2)

  let xres = 4
  let yres = 4
  let nrotations = xres * yres
  let w = width / xres
  let h = width / yres

  let shape = joy.rectangle({ w: w, h: h})
  .repeat({ 
    n: nrotations, 
    transform: (index) => {
      let angle = 360/(nrotations*4)
      let neww = w * cos(angle) + h * sin(angle)
      let newh = w * sin(angle) + h * cos(angle)
      let a = max(1, min(w/neww, h/newh))

      let sx = a*neww/w
      let sy = a*newh/h

      return joy.rotate({ angle: angle*index }).scale({x: sx, y: sy})
    } 
  })

  let renderer = new joy.P5Renderer(document);
  renderer.show(shape);  

}