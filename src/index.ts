import {
  Circle,
  Ellipse,
  Line,
  Point,
  Rectangle,
  Repeat,
  Rotate,
  Scale,
  Transformation,
  Translate,
} from "./joy";
import { P5Renderer, SVGRenderer } from "./renderer";
import { map } from "./utils";

function point({ x = 0, y = 0, ...kwargs } = {}) {
  return new Point(x, y, kwargs);
}

function circle({ x = 0, y = 0, r = 100, ...kwargs } = {}) {
  return new Circle(new Point((x = x), (y = y)), r, kwargs);
}

function rectangle({ x = 0, y = 0, w = 200, h = 100, ...kwargs } = {}) {
  return new Rectangle(new Point((x = x), (y = y)), w, h, kwargs);
}

function ellipse({ x = 0, y = 0, w = 200, h = 100, ...kwargs } = {}) {
  return new Ellipse(new Point((x = x), (y = y)), w, h, kwargs);
}

function line({
  x1 = -100,
  y1 = 0,
  x2 = 100,
  y2 = 0,
  l = undefined,
  ...kwargs
} = {}) {
  if (l !== undefined) {
    return new Line(new Point(-l / 2, 0), new Point(l / 2, 0), kwargs);
  }
  return new Line(new Point(x1, y1), new Point(x2, y2), kwargs);
}

function translate({ x = 0, y = 0 } = { x: 0, y: 0 }) {
  return new Translate(x, y);
}

function rotate({ angle = 0 } = { angle: 0 }) {
  return new Rotate(angle);
}

function scale({ x = 1, y = 1 } = { x: 1, y: 1 }) {
  return new Scale(x, y);
}

function repeat({
  n,
  transform,
}: {
  n: number;
  transform: Transformation | ((index: number) => Transformation);
}) {
  let transforms = Array(n)
    .fill(0)
    .map((_, i) => {
      let tr: Transformation;

      if (typeof transform === "function") {
        tr = transform(i);
      } else {
        tr = transform;
      }
      let t = transform instanceof Transformation ? new Repeat(i + 1, tr) : tr;

      return t;
    });

  return transforms;
}

export {
  point,
  circle,
  rectangle,
  ellipse,
  line,
  translate,
  rotate,
  scale,
  repeat,
  map,

  P5Renderer,
  SVGRenderer,
};
