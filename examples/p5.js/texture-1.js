
let img 

function preload() {
  img = loadImage('./assets/altar-small.png')
}

function setup() {
  let canvas = createCanvas(400, 400, WEBGL)
  
}

function draw() {
  background('whitesmoke')

  translate(-width/2, -height/2)
  texture(img)
  let shape = joy.rectangle()

  let renderer = new joy.P5Renderer(this)
  renderer.show(shape)

}