import { repeat } from ".";
export type ShapeType = "point" | "circle" | "ellipse" | "rect" | "line";

interface PointAttributes {
  x: number;
  y: number;
}
interface CircleAttributes {
  cx: number;
  cy: number;
  d: number;
}
interface EllipseAttributes {
  x: number;
  y: number;
  width: number;
  height: number;
  d: number;
}
interface RectangleAttributes {
  x: number;
  y: number;
  width: number;
  height: number;
}
interface LineAttributes {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * Represents a 2D shape.
 */
export class Shape {
  tag: ShapeType;
  attrs:
    | PointAttributes
    | CircleAttributes
    | EllipseAttributes
    | RectangleAttributes
    | LineAttributes;
  kwargs: any;
  transform: Transformation[];
  children: Shape[];
  repeatChildren: Shape[];

  /**
   * Creates an instance of Shape.
   *
   * @param tag - The name of the shape.
   * @param attrs - The attributes required for drawing the shape.
   * @param kwargs - The styling information to be used before drawing the shape.
   * @param children - Other shapes that are drawn relative to the current instance of Shape.
   */
  constructor(
    tag: ShapeType,
    attrs:
      | PointAttributes
      | CircleAttributes
      | EllipseAttributes
      | RectangleAttributes
      | LineAttributes,
    kwargs = {},
    children: Shape[] = [],
    repeatChildren: Shape[] = []
  ) {
    this.tag = tag;
    this.attrs = attrs;
    this.kwargs = kwargs;
    this.transform = [];
    this.children = children;
    this.repeatChildren = repeatChildren;
  }

  /**
   * Returns a clone of the current Shape instance with new styling information if available.
   *
   * @param newKwargs - Key value pairs to provide styling information for a shape. eg { fill: 'red', stroke: 'blue' }.
   * @returns A new instance of Shape.
   */
  clone(newKwargs = {}) {
    let shape = new Shape(this.tag, this.attrs, newKwargs, [...this.children]);
    return shape;
  }

  /**
   * Adds a child shape to the current Shape instance.
   *
   * @param shape - A child shape.
   * @returns The current instance of Shape for chaining.
   */
  add(shape: Shape) {
    this.children.push(shape);
    return this;
  }

  /**
   * Returns a string representation of Shape.
   *
   * @returns - A string with the name of the shape and its' attributes.
   */
  toString() {
    return `<${this.tag} ${this.attrs}>`;
  }

  /**
   * Applies a Translate transformation to the current Shape instance.
   *
   * @param x - Amount to translate along the positive x-axis. Defaults to `0`.
   * @param y - Amount to translate along the positive y-axis. Defaults to `0`.
   * @returns The current instance of Shape for chaining.
   */
  translate({ x = 0, y = 0 }) {
    let transform = new Translate(x, y);
    this.transform.push(transform);
    return this;
  }

  /**
   * Applies a Rotate transformation to the current Shape instance.
   *
   * @param angle - Amount to rotate clockwise in degrees. Defaults to `0`.
   * @returns The current instance of Shape for chaining.
   */
  rotate({ angle = 0 }) {
    let transform = new Rotate(angle);
    this.transform.push(transform);
    return this;
  }

  /**
   * Applies a Scale transformation to the current Shape instance.
   *
   * @param x - Amount to scale along the positive x-axis. Defaults to `1`.
   * @param y - Amount to scale along the positive y-axis. Defaults to `1`.
   * @returns The current instance of Shape for chaining.
   */
  scale({ x = 1, y = 1 }) {
    let transform = new Scale(x, y);
    this.transform.push(transform);
    return this;
  }

  /**
   * Repeats the current shape `n` times by applying `transform` iteratively.
   *
   *
   * @param n - A positive integer representing the number of times a shape is to be repeated.
   * @param transform - An instance of Transformation that is applied every time the shape is repeated.
   * @returns The current instance of Shape for chaining.
   */
  repeat({
    n,
    transform,
  }: {
    n: number;
    transform:
      | Transformation
      | Transformation[]
      | ((index: number) => TransformationWithStyle)
      | ((index: number) => Transformation | Transformation[]);
  }) {
    let c = this.clone();
    Array(n)
      .fill(0)
      .forEach((_, i) => {
        let tr: Transformation | Transformation[];
        let newKwargs: any = {};

        if (typeof transform === "function") {
          const result = transform(i);
          if (result instanceof Transformation || Array.isArray(result)) {
            tr = result;
            newKwargs = this.kwargs;
          } else {
            tr = result.transform;
            newKwargs = result.style || {};
          }
        } else {
          tr = transform;
          newKwargs = this.kwargs;
        }

        let t =
          transform instanceof Transformation && tr instanceof Transformation
            ? new Repeat(i + 1, tr)
            : tr;

        if (Array.isArray(t)) {
          for (let k = 0; k < t.length; k++) {
            let cn = c.clone(newKwargs);

            cn.transform.push(t[k]);
            this.children.push(cn);
          }
        } else {
          let cn = c.clone(newKwargs);
          cn.transform = [t];
          this.children.push(cn);
        }
      });
    return this;
  }
}

type TransformationWithStyle = {
  transform: Transformation;
  style: any;
};

/**
 * Represents a Point shape.
 */
export class Point extends Shape {
  x: number;
  y: number;

  /**
   * Creates an instance of Point.
   *
   * @param x - The x-coordinate of the point. Defaults to `0`.
   * @param y - The y-coordinate of the point. Defaults to `0`.
   * @param kwargs
   */
  constructor(x = 0, y = 0, kwargs = {}) {
    super("point", { x: x, y: y });
    this.x = x;
    this.y = y;
  }

  /**
   * Checks if the Point passed as the parameter is equal to the current instance.
   *
   * @param p - An instance of Point.
   * @returns A boolean representing whether the current Point instance has the same attributes as the parameter.
   */
  equals(p: Point) {
    return p instanceof Point && p.x === this.x && p.y === this.y;
  }

  /**
   * Returns a string representation of Point.
   *
   * @returns A string with the name of the shape and its' attributes.
   */
  toString() {
    return `Point(${this.x}, ${this.y})`;
  }
}

/**
 * Represents a Circle shape.
 */
export class Circle extends Shape {
  center: Point;
  radius: number;

  /**
   * Creates an instance of Circle.
   *
   * @param center - The position of the center of the circle. Defaults to `(0, 0)`.
   * @param radius - The radius of the circle. Defaults to `100`.
   * @param style - The style information for displaying the circle. Defaults to no styling or `{}`.
   */
  constructor(center = new Point(0, 0), radius = 100, style = {}) {
    super("circle", { cx: center.x, cy: center.y, d: radius * 2 }, style);
    this.center = center;
    this.radius = radius;
  }
}

/**
 * Represents an Ellipse shape.
 */
export class Ellipse extends Shape {
  center: Point;
  width: number;
  height: number;

  /**
   * Creates an instance of Ellipse.
   *
   * @param center - The position of the center of the ellipse. Defaults to `(0, 0)`.
   * @param width - The width of the ellipse. Defaults to `200`.
   * @param height - The height of the ellipse. Defaults to `100`.
   * @param style - The style information for displaying the ellipse. Defaults to no styling or `{}`.
   */
  constructor(center = new Point(0, 0), width = 200, height = 100, style = {}) {
    super(
      "ellipse",
      { x: center.x, y: center.y, width: width, height: height, d: 50 },
      style
    );
    this.center = center;
    this.width = width;
    this.height = height;
  }
}

/**
 * Represents a Rectangle shape.
 */
export class Rectangle extends Shape {
  center: Point;
  width: number;
  height: number;

  /**
   * Creates an instance of Rectangle.
   *
   * @param center - The position of the center of the rectangle. Defaults to `(0, 0)`.
   * @param width - The width of the rectangle. Defaults to `200`.
   * @param height - The height of the rectangle. Defaults to `100`.
   * @param style - The style information for displaying the rectangle. Defaults to no styling or `{}`.
   */
  constructor(center = new Point(0, 0), width = 200, height = 100, style = {}) {
    super(
      "rect",
      { x: center.x, y: center.y, width: width, height: height },
      style
    );
    this.center = center;
    this.width = width;
    this.height = height;
  }
}

/**
 * Represents a Line shape.
 */
export class Line extends Shape {
  start: Point;
  end: Point;

  /**
   * Creates an instance of Line.
   *
   * @param start - The first point of the line segment. Defaults to `(-100, 0)`.
   * @param end - The second point of the line segment. Defaults to `(100, 0)`
   * @param kwargs - The style information for displaying the rectangle. Defaults to no styling or `{}`.
   */
  constructor(
    start = new Point(-100, 0),
    end = new Point(100, 0),
    kwargs = {}
  ) {
    super("line", { x1: start.x, y1: start.y, x2: end.x, y2: end.y });
    this.start = start;
    this.end = end;
  }
}

interface TranslateAttributes {
  x: number;
  y: number;
}
interface RotateAttributes {
  angle: number;
}
interface ScaleAttributes {
  x: number;
  y: number;
}

/**
 * Represents a transformation that can be applied to a Shape.
 */
export class Transformation {
  tag: string;
  attrs: TranslateAttributes | RotateAttributes | ScaleAttributes;
  children: Transformation[];

  /**
   * Creates an instance of Transformation.
   *
   * @param tag - The name of the transformation.
   * @param attrs - The attributes required to apply the transformation.
   * @param children - Other transformations that are applied relative to the parent transformation.
   */
  constructor(
    tag: string,
    attrs: TranslateAttributes | RotateAttributes | ScaleAttributes,
    children: Transformation[] = []
  ) {
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
  }

  /**
   * Adds a Translate transformation to the current transformation.
   *
   * @param x - The amount to translate along the positive x-axis. Defaults to `0`.
   * @param y - The amount to translate along the positive y-axis. Defaults to `0`.
   * @returns The current instance of Transformation for chaining.
   */
  translate({ x = 0, y = 0 }) {
    let transform = new Translate(x, y);
    this.children.push(transform);
    return this;
  }

  /**
   * Adds a Rotate transformation to the current transformation.
   *
   * @param angle - The amount to rotate clockwise in degrees. Defaults to `0`.
   * @returns The current instance of Transformation for chaining.
   */
  rotate({ angle = 0 }) {
    let transform = new Rotate(angle);
    this.children.push(transform);
    return this;
  }

  /**
   * Adds a Scale transformation to the current transformation.
   *
   * @param x - The amount to scale in the positive x-axis. Defaults to `1`.
   * @param y - The amount to scale in the positive y-axis. Defaults to `1`.
   * @returns The current instance of Transformation for chaining.
   */
  scale({ x = 1, y = 1 }) {
    let transform = new Scale(x, y);
    this.children.push(transform);
    return this;
  }

  repeat({
    n,
    transform,
  }: {
    n: number;
    transform: Transformation | ((index: number) => Transformation);
  }) {
    let tr = repeat({ n, transform });
    if (tr instanceof Transformation) {
      this.children.push(tr);
    } else {
      this.children.push(...tr);
    }
    return this;
  }
}

/**
 * Represents a Translate transformation.
 */
export class Translate extends Transformation {
  x: number;
  y: number;

  /**
   * Creates an instance of Translate.
   *
   * @param x - The amount to translate along the positive x-axis. Defaults to `0`.
   * @param y - The amount to translate along the positive y-axis. Defaults to `0`.
   */
  constructor(x = 0, y = 0) {
    super("translate", { x: x, y: y });
    this.x = x;
    this.y = y;
  }
}

/**
 * Represents a Rotate transformation.
 */
export class Rotate extends Transformation {
  angle: number;

  /**
   * Creates an instance of Roate.
   *
   * @param angle - The amount to rotate clockwise in degrees. Defaults to `0`.
   */
  constructor(angle = 0) {
    super("rotate", { angle: -angle });
    this.angle = -angle;
  }
}

/**
 * Represents a Scale transformation.
 */
export class Scale extends Transformation {
  x: number;
  y: number;

  /**
   * Creates an instance of Scale.
   *
   * @param x - The amount to scale in the positive x-axis. Defaults to `1`.
   * @param y - The amount to scale in the positive y-axis. Defaults to `1`.
   */
  constructor(x = 1, y = 1) {
    super("scale", { x: x, y: y });
    this.x = x;
    this.y = y;
  }
}

/**
 * Represents a Repeat transform.
 */
export class Repeat extends Transformation {
  constructor(n: number, transform: Transformation) {
    let children: Transformation[] = [];
    // the parent transformation + n-1 child transforms
    for (let i = 0; i < n - 1; i++) {
      children = children.concat([transform, ...transform.children]);
    }
    super(transform.tag, transform.attrs, children);
  }
}
