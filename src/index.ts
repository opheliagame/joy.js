import p5 from "p5";
import { ShapeType, Circle, Ellipse, Line, Point, Rectangle, Repeat, Rotate, Scale, Shape, Transformation, Translate } from './joy'
import { map } from "./utils";


export class Joy {
  renderer: Renderer | undefined

  constructor(renderer?: Renderer) {
    this.renderer = renderer
    
  }

  point({
    x = 0, 
    y = 0,
    ...kwargs
  }={}) {
    // Creates a Point with x and y coordinates.
    let drawable = new Point(x, y, kwargs)
    // drawable.show(this.renderer)
    return drawable
  }
  
  circle({
    x = 0, 
    y = 0,
    r = 100, 
    ...kwargs
  }={}) {
    let drawable = new Circle(new Point(x=x, y=y), r, kwargs)
    // TODO : possibly remove show in constructor because it stops chaining 
    // drawable.show(this.renderer)
    return drawable
  }
  
  rectangle({
    x = 0, 
    y = 0,
    w = 200,
    h = 100,
    ...kwargs
  }={}) {
    let drawable = new Rectangle(new Point(x=x, y=y), w, h, kwargs)
    // drawable.show(this.renderer)
    return drawable
  }
  
  ellipse({
    x = 0, 
    y = 0,
    w = 200,
    h = 100,
    ...kwargs
  }={}) {
    let drawable = new Ellipse(new Point(x=x, y=y), w, h, kwargs)
    // drawable.show(this.renderer)
    return drawable
  }
  
  line({
    x1 = -100, 
    y1 = 0,
    x2 = 100,
    y2 = 0,
    ...kwargs
  }={}) {
    let drawable = new Line(new Point(x1, y1), new Point(x2, y2), kwargs)
    // drawable.show(this.renderer)
    return drawable
  }
  
  translate({
    x = 0,
    y = 0
  }={x: 0, y: 0}) {
    let drawable = new Translate(x, y)
    // drawable.show()
    return drawable
  }
  
  rotate({
    angle = 0
  }={angle: 0}) {
    let drawable = new Rotate(angle)
    // drawable.show()
    return drawable
  }
  
  scale({
    x = 1, 
    y = 1
  }={x: 1, y: 1}) {
    let drawable = new Scale(x, y)
    // drawable.show()
    return drawable
  }

  repeat({
    n,
    transform,
    fnkwargs = null
  }: {n: number, transform: Transformation, fnkwargs: any}) {
    let drawable = new Repeat(n, transform)
    return drawable
  }

}


abstract class Renderer {
  renderer: any
  
  constructor(renderer: any) {
    this.renderer = renderer
  }

  show(shape: Shape) {}
  showTransform(transform: Transformation) {}
}

declare global {
  interface Window {
    p5: typeof p5; 
  }
}

export class P5Renderer extends Renderer {
  renderer: any;

  constructor(renderer: typeof window.p5) {
    super(renderer) 
    this.renderer = (window.self as any) as p5 
    this.renderer.translate(this.renderer.width/2, this.renderer.height/2)
  
    // make rectMode CENTER
    this.renderer.rectMode(this.renderer.CENTER)
  
    // make angleMode DEGREES
    this.renderer.angleMode(this.renderer.DEGREES)
  }

  debug(shape: Shape): void {
    console.log(shape)
  }

  show(shape: Shape): void {
    this.renderer['push']()
    shape.transform.forEach(t => this.showTransform(t))

    for(const [key, value] of Object.entries(shape.kwargs)) {
      (this.renderer as any)[key](value)
    }

    (this.renderer as any)[shape.tag](...Object.values(shape.attrs))
    shape.children.forEach(child => this.show(child))
    this.renderer['pop']()
  }

  showTransform(transform: Transformation): void {
    (this.renderer as any)[transform.tag](...Object.values(transform.attrs))
    transform.children.forEach(transform => {
      this.showTransform(transform)
    })
  }

}

export class SVGRenderer extends Renderer {
  renderer: Document
  namespace: string = "http://www.w3.org/2000/svg"
  
  constructor(renderer: Document) {
    super(renderer)
    this.renderer = renderer
  }

  show(shape: Shape): void {
    // cant show point in svg
    if(shape instanceof Point) return 

    
    const svg = this.renderer.createElementNS(this.namespace, "svg");
    svg.setAttribute("xmlns", this.namespace);
    svg.setAttribute("width", "100vw");
    svg.setAttribute("height", "100vh");
    // svg.setAttribute("viewBox", "-50 -50 100 100");

    // const parentGroup = this.renderer.createElementNS(this.namespace, "g")
    // parentGroup.setAttribute('transform', 'translate(-50%,-50%)') 

    const shapeElement = this.getSvgElement(shape)
    shapeElement.setAttribute('transform', `translate(-50%,-50%) ${shapeElement.getAttribute('transform')}`)
    // parentGroup.appendChild(shapeElement)



    svg.appendChild(shapeElement)

    document.body.appendChild(svg)
  }

  getSvgElement(shape: Shape): Element {
    console.log(shape.children.length)

    const shapeElement = this.renderer.createElementNS(this.namespace, shape.tag);
    for(const [key, value] of Object.entries(shape.attrs)) {
      shapeElement.setAttribute(key, value.toString())
    }
    for(const [key, value] of Object.entries(shape.kwargs)) {
      shapeElement.setAttribute(key, value.toString())
    }

    let transformString = shape.transform.map(t => {
      let transformString = `${t.tag}(${Object.values(t.attrs).join(',')})`
      let nestedTransforms = t.children.map(child => `${child.tag}(${Object.values(child.attrs).join(',')})`)
      return `${transformString} ${nestedTransforms.join(' ')}`
    }).join('')

    if(shape.children.length !== 0) { 
      console.log(shape.children)
      let groupElement = this.renderer.createElementNS(this.namespace, "g")
      groupElement.setAttribute('transform', transformString)
      groupElement.append(shapeElement)

      let children = shape.children.map(child => this.getSvgElement(child))
      groupElement.append(...children)

      console.log(groupElement)
      return groupElement
    }
    
    shapeElement.setAttribute('transform', transformString)
    console.log(shapeElement)
    return shapeElement
  
  }
}


// export function createCanvas(width: number, height: number, renderer: Renderer): void {
//   renderer.show()
// }

export function joy(): Joy {
  let joy = new Joy()
  return joy
}

export {
  
  map
}