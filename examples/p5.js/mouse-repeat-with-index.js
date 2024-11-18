 
function setup() {
  let canvas = createCanvas(400, 400)
  
}

function draw() {
  background('whitesmoke')
  strokeWeight(2)

  let angle = mouseX

  let shape = joy.line()
  .translate({x: -100, y: 0})
  .rotate({angle: 90})
  .repeat({
    n: 20,
    transform: (index) => 
      joy
        .translate({x: 0, y: index*10})
        .rotate({angle: index*2+angle})
  })
  
  let renderer = new joy.P5Renderer(this)
  renderer.show(shape)

}