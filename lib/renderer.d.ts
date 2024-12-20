import p5 from "p5";
import { Shape, Transformation } from "./joy";
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
    printDebug(shape: Shape): string;
    printTransformDebug(transform: Transformation): string;
}
export declare class SVGRenderer extends Renderer {
    renderer: Document;
    namespace: string;
    constructor(renderer: Document);
    show(shape: Shape): void;
    getSvgElement(shape: Shape): Element;
}
export {};
