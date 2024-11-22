import { Circle, Ellipse, Line, Point, Rectangle, Rotate, Scale, Transformation, Translate } from "./joy";
import { P5Renderer, SVGRenderer } from "./renderer";
import { map } from "./utils";
declare function point({ x, y, ...kwargs }?: {
    x?: number | undefined;
    y?: number | undefined;
}): Point;
declare function circle({ x, y, r, ...kwargs }?: {
    x?: number | undefined;
    y?: number | undefined;
    r?: number | undefined;
}): Circle;
declare function rectangle({ x, y, w, h, ...kwargs }?: {
    x?: number | undefined;
    y?: number | undefined;
    w?: number | undefined;
    h?: number | undefined;
}): Rectangle;
declare function ellipse({ x, y, w, h, ...kwargs }?: {
    x?: number | undefined;
    y?: number | undefined;
    w?: number | undefined;
    h?: number | undefined;
}): Ellipse;
declare function line({ x1, y1, x2, y2, l, ...kwargs }?: {
    x1?: number | undefined;
    y1?: number | undefined;
    x2?: number | undefined;
    y2?: number | undefined;
    l?: undefined;
}): Line;
declare function translate({ x, y }?: {
    x?: number;
    y?: number;
}): Translate;
declare function rotate({ angle }?: {
    angle?: number;
}): Rotate;
declare function scale({ x, y }?: {
    x?: number;
    y?: number;
}): Scale;
declare function repeat({ n, transform, }: {
    n: number;
    transform: Transformation | ((index: number) => Transformation);
}): Transformation[];
export { point, circle, rectangle, ellipse, line, translate, rotate, scale, repeat, map, SVGRenderer, P5Renderer, };
