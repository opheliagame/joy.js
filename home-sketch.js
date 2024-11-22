const introTexts = [
  "hello from joy.js",
  "joy.js is a tiny creative coding library",
  "it is a way to think about shapes and patterns",
  "it is simple and concise",
]
const seed = Math.random()*Date.now()

function setup() {
  createCanvas(windowWidth, windowHeight, document.getElementById("home-canvas"))
  textFont("Itim")
  textSize(36)

  drawText()

}

function draw() {
  background('white')

  randomSeed(seed)

  push()
  drawJoyjsLogo()
  pop()


  
  
 
}

function drawJoyjsLogo() {
  let t = millis() / 100;
  let angle = random([137.5, 250, 20, 400, 100, 320])
  // let angle = sin(t) * 137.5 * 2;
  // angle = floor(angle % 50);

  let n = floor(abs(sin(t)) * 60)
  let beat = floor(frameCount/60)
  let isblinking = beat % 2 == 0

  strokeWeight(2)
  let side = 5
  let or = 60/2/2, ir = 48/2/2
  let innerCircle = joy.circle({r: ir, 'fill': isblinking ? 'white' : 'magenta', 'stroke': 'magenta'}).rotate({angle: 180-360/side}).translate({x: -(or-ir)/2, y: -(or-ir)/2})
  let shape = joy.circle({r: or, 'fill': isblinking ? 'magenta' : 'white', 'stroke': isblinking ? 'white' : 'magenta'}).add(innerCircle)
  .translate({y: -or})
  .rotate({angle: 72/4})
  .repeat({
    n: side,
    transform: joy.rotate({angle: -72}).translate({y: -or})
  })
  .repeat({
    n: n,
    transform: (i) => joy.rotate({ angle: angle * i + (beat * 10) }).translate({ x: Math.sqrt(i) * 60 }),
  })
  
  
  let renderer = new joy.P5Renderer(this)
  renderer.show(shape)
}

function drawText() {

  for(let i = 0; i < introTexts.length; i++) {
    let x = random(width/2)
    let y = random(height/2)

    let p = document.createElement('p')
    p.innerText = introTexts[i]
    // p.style.top = `${y}px`
    // p.style.left = `${x}px`
    // p.style.width = random(width/5, width/3)
    // p.style.height = random(height/5, height/3)
    p.classList.add('intro-text')

    document.body.querySelector('article').appendChild(p)

    
  }


}