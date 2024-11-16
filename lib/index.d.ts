import p5 from "p5";
import { Circle, Ellipse, Line, Point, Rectangle, Repeat, Rotate, Scale, Shape, Transformation, Translate } from './joy';
import { map } from "./utils";
export declare class Joy {
    renderer: Renderer | undefined;
    constructor(renderer?: Renderer);
    point({ x, y, ...kwargs }?: {
        x?: number;
        y?: number;
    }): Point;
    circle({ x, y, r, ...kwargs }?: {
        x?: number;
        y?: number;
        r?: number;
    }): Circle;
    rectangle({ x, y, w, h, ...kwargs }?: {
        x?: number;
        y?: number;
        w?: number;
        h?: number;
    }): Rectangle;
    ellipse({ x, y, w, h, ...kwargs }?: {
        x?: number;
        y?: number;
        w?: number;
        h?: number;
    }): Ellipse;
    line({ x1, y1, x2, y2, ...kwargs }?: {
        x1?: number;
        y1?: number;
        x2?: number;
        y2?: number;
    }): Line;
    translate({ x, y }?: {
        x?: number;
        y?: number;
    }): Translate;
    rotate({ angle }?: {
        angle?: number;
    }): Rotate;
    scale({ x, y }?: {
        x?: number;
        y?: number;
    }): Scale;
    repeat({ n, transform, fnkwargs }: {
        n: number;
        transform: Transformation;
        fnkwargs: any;
    }): Repeat;
}
declare abstract class Renderer {
    renderer: any;
    constructor(renderer: any);
    show(shape: Shape): void;
    showTransform(transform: Transformation): void;
}
declare global {
    interface Window {
        p5: typeof p5;
    }
}
export declare class P5Renderer extends Renderer {
    renderer: any;
    constructor(renderer: typeof window.p5);
    debug(shape: Shape): void;
    show(shape: Shape): void;
    showTransform(transform: Transformation): void;
}
export declare class SVGRenderer extends Renderer {
    renderer: Document;
    namespace: string;
    constructor(renderer: Document);
    show(shape: Shape): void;
    getSvgElement(shape: Shape): Element;
}
export declare function joy(): Joy;
export { map };
