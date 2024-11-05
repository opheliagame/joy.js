let joy 
function setup() {
  let canvas = createCanvas(400, 400)
  joy = joyP5.initJoyP5(canvas);
}

function draw() {
  background('whitesmoke')
  translate(width/2, height/2)

  joy.rectangle().rotate({angle: millis()}).show()

}