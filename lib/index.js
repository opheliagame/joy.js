var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Circle, Ellipse, Line, Point, Rectangle, Repeat, Rotate, Scale, Translate } from './joy';
export class JoyP5 {
    constructor(renderer) {
        this.renderer = renderer;
    }
    point(_a = {}) {
        var { x = 0, y = 0 } = _a, kwargs = __rest(_a, ["x", "y"]);
        // Creates a Point with x and y coordinates.
        let drawable = new Point(x, y, kwargs);
        // drawable.show(this.renderer)
        return drawable;
    }
    circle(_a = {}) {
        var { x = 0, y = 0, r = 100 } = _a, kwargs = __rest(_a, ["x", "y", "r"]);
        let drawable = new Circle(new Point(x = x, y = y), r, kwargs);
        // TODO : possibly remove show in constructor because it stops chaining 
        // drawable.show(this.renderer)
        return drawable;
    }
    rectangle(_a = {}) {
        var { x = 0, y = 0, w = 200, h = 100 } = _a, kwargs = __rest(_a, ["x", "y", "w", "h"]);
        let drawable = new Rectangle(new Point(x = x, y = y), w, h, kwargs);
        // drawable.show(this.renderer)
        return drawable;
    }
    ellipse(_a = {}) {
        var { x = 0, y = 0, w = 200, h = 100 } = _a, kwargs = __rest(_a, ["x", "y", "w", "h"]);
        let drawable = new Ellipse(new Point(x = x, y = y), w, h, kwargs);
        // drawable.show(this.renderer)
        return drawable;
    }
    line(_a = {}) {
        var { x1 = -100, y1 = 0, x2 = 100, y2 = 0 } = _a, kwargs = __rest(_a, ["x1", "y1", "x2", "y2"]);
        let drawable = new Line(new Point(x1, y1), new Point(x2, y2), kwargs);
        // drawable.show(this.renderer)
        return drawable;
    }
    translate({ x = 0, y = 0 } = { x: 0, y: 0 }) {
        let drawable = new Translate(x, y);
        // drawable.show()
        return drawable;
    }
    rotate({ angle = 0 } = { angle: 0 }) {
        let drawable = new Rotate(angle);
        // drawable.show()
        return drawable;
    }
    scale({ x = 1, y = 1 } = { x: 1, y: 1 }) {
        let drawable = new Scale(x, y);
        // drawable.show()
        return drawable;
    }
    repeat({ n, transform, fnkwargs = null }) {
        let drawable = new Repeat(n, transform);
        return drawable;
    }
}
export class Drawable {
    show() { }
}
class P5Renderer {
    constructor(renderer) {
        this.renderer = renderer;
    }
    show() {
    }
}
export function initJoyP5() {
    // let renderer = new P5Renderer(p5)
    // init process
    let renderer1 = window.self;
    renderer1.translate(renderer1.width / 2, renderer1.height / 2);
    // make rectMode CENTER
    renderer1.rectMode(renderer1.CENTER);
    // make angleMode DEGREES
    renderer1.angleMode(renderer1.DEGREES);
    let joyP5 = new JoyP5();
    return joyP5;
}
