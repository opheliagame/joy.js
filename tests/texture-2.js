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
  let t = millis()/10

  joy.rectangle({w: 100 * abs(sin(t)) + 20, h: 100})
  .show()

}