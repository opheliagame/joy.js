
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
  let t = millis()/10

  let shape = joy.rectangle({w: 100 * abs(sin(t)) + 20, h: 100})
  
  let renderer = new joy.P5Renderer(this)
  renderer.show(shape)

}