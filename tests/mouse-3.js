let joy 
function setup() {
  let canvas = createCanvas(400, 400)
  joy = joyP5.initJoyP5(canvas);
}

function draw() {
  background('whitesmoke')
  translate(width/2, height/2)
  strokeWeight(2)

  let angle = mouseX

  joy.line()
  .translate({x: -100, y: 0})
  .rotate({angle: 90})
  .repeat({
    n: 20,
    transform: (index) => 
      joy
        .translate({x: 0, y: index*10})
        .rotate({angle: index*2+angle})
  })
  .show()

}