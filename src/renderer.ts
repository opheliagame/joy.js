import p5 from "p5";
import { Point, Shape, Transformation } from "./joy";

abstract class Renderer {
  renderer: any;

  constructor(renderer: any) {
    this.renderer = renderer;
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

  // TODO get instance of
  constructor(renderer: typeof window.p5) {
    super(renderer);
    this.renderer = window.self as any as p5;
    this.renderer.translate(this.renderer.width / 2, this.renderer.height / 2);

    // make rectMode CENTER
    this.renderer.rectMode(this.renderer.CENTER);

    // make angleMode DEGREES
    this.renderer.angleMode(this.renderer.DEGREES);

    // make ellipseMode RADIUS
    this.renderer.ellipseMode(this.renderer.RADIUS)
  }

  debug(shape: Shape): void {
    console.log(shape);
  }

  show(shape: Shape): void {
    this.renderer["push"]();

    shape.transform.forEach((t) => this.showTransform(t));

    for (const [key, value] of Object.entries(shape.kwargs)) {
      (this.renderer as any)[key](value);
    }

    (this.renderer as any)[shape.tag](...Object.values(shape.attrs));
    shape.children.forEach((child) => this.show(child));

    this.renderer["pop"]();
  }

  showTransform(transform: Transformation): void {
    (this.renderer as any)[transform.tag](...Object.values(transform.attrs));

    transform.children.forEach((transform) => {
      this.showTransform(transform);
    });
  }

  printDebug(shape: Shape) {
    let printString = "";
    printString += "push()";
    printString += "\n";

    printString += shape.transform
      .map((t) => this.printTransformDebug(t))
      .join("\n");

    for (const [key, value] of Object.entries(shape.kwargs)) {
      printString += `${key}(${value})\n`;
    }

    printString += `${shape.tag}(${Object.values(shape.attrs).join(", ")})\n`;

    printString += shape.children
      .map((child) => this.printDebug(child))
      .join("\n");

    printString += "pop()\n";

    return printString;
  }

  printTransformDebug(transform: Transformation) {
    let printString = "";

    printString += `${transform.tag}(${Object.values(transform.attrs).join(
      ", "
    )})\n`;

    printString += transform.children
      .map((transform) => {
        return this.printTransformDebug(transform);
      })
      .join("\n");

    return printString;
  }
}

export class SVGRenderer extends Renderer {
  renderer: Document;
  namespace: string = "http://www.w3.org/2000/svg";

  constructor(renderer: Document) {
    super(renderer);
    this.renderer = renderer;
  }

  show(shape: Shape): void {
    if (shape instanceof Point) return;

    const svg = this.renderer.createElementNS(this.namespace, "svg");
    svg.setAttribute("xmlns", this.namespace);
    svg.setAttribute("width", "100vw");
    svg.setAttribute("height", "100vh");
    svg.setAttribute("viewBox", "-200 -200 400 400")

    const shapeElement = this.getSvgElement(shape);
    shapeElement.setAttribute(
      "transform",
      `${shapeElement.getAttribute("transform")}`
    );

    svg.appendChild(shapeElement);

    document.body.appendChild(svg);
  }

  getSvgElement(shape: Shape): Element {
    const shapeElement = this.renderer.createElementNS(
      this.namespace,
      shape.tag
    );
    for (const [key, value] of Object.entries(shape.attrs)) {
      shapeElement.setAttribute(key, value.toString());
    }
    for (const [key, value] of Object.entries(shape.kwargs)) {
      shapeElement.setAttribute(key, (value as any).toString());
    }

    let transformString = shape.transform
      .map((t) => {
        let transformString = `${t.tag}(${Object.values(t.attrs).join(",")})`;
        let nestedTransforms = t.children.map(
          (child) => `${child.tag}(${Object.values(child.attrs).join(",")})`
        );
        return `${transformString} ${nestedTransforms.join(" ")}`;
      })
      .join("");

    if (shape.children.length !== 0) {
      let groupElement = this.renderer.createElementNS(this.namespace, "g");
      groupElement.setAttribute("transform", transformString);
      groupElement.append(shapeElement);

      let children = shape.children.map((child) => this.getSvgElement(child));
      groupElement.append(...children);

      return groupElement;
    }

    shapeElement.setAttribute("transform", transformString);
    return shapeElement;
  }
}
