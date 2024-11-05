function setup() {
  let canvas = createCanvas(400, 400)
  let joy = joyP5.initJoyP5()

  background('whitesmoke')

  // fill('magenta')
  noStroke()

  let or = 60, ir = 48

  let innerCircle = joy.circle({r: ir, 'fill': 'white'}).rotate({angle: 180-72}).translate({x: -(or-ir)/2, y: -(or-ir)/2})
  joy.circle({r: or, 'fill': 'magenta'}).add(innerCircle)
  .translate({y: -or*1.5})
  .rotate({angle: 72/4})
  .repeat({
    n: 6,
    transform: joy.rotate({angle: -72}).translate({y: -or*2})
  })
  .show()

  

}
