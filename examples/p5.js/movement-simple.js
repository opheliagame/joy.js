 
function setup() {
  createCanvas(400, 400)
  
}

function draw() {
  background('whitesmoke')

  let shape = joy.rectangle().rotate({angle: millis()/50})

  let renderer = new joy.P5Renderer(this)
  renderer.show(shape)

}