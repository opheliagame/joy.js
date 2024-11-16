let joy
let img 

function preload() {
  img = loadImage('./assets/altar-small.png')
}

function setup() {
  let canvas = createCanvas(400, 400, WEBGL)
  joy = joyP5.initJoyP5(canvas);
}

function draw() {
  background('whitesmoke')

  texture(img)
  joy.rectangle().show()

}