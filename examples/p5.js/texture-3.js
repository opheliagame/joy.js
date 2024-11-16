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
  // background()

  let t = millis()/10
  let xres = 4, yres = floor(noise(floor(t/100)) * 8)
  let xedge = width/xres
  let yedge = width/yres
  texture(img)

  push()
  translate(-width/2, -height/2)
  noStroke()

  joy.rectangle({ w: xedge/2 * abs(sin(noise(t))) + 20, h: yedge })
  .translate({ x: xedge/2, y: yedge/2 })
  .repeat({
    n: xres*yres,
    transform: (index) => {
      let x = (index % xres)  
      let y = Math.floor(index / xres) 
      return joy.translate({x: x * xedge, y: y * yedge})
        .rotate({angle: index*10 + noise(index+t)*10 + t/10})
        .scale({x: abs(sin(t)) + 0.2, y: abs(sin(t+PI)) + 0.2})
    },
  })
  .show()

}