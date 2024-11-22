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
export declare class Shape {
    tag: ShapeType;
    attrs: PointAttributes | CircleAttributes | EllipseAttributes | RectangleAttributes | LineAttributes;
    kwargs: any;
    transform: Transformation[];
    children: (Shape | Transformation)[];
    repeatChildren: Shape[];
    /**
     * Creates an instance of Shape.
     *
     * @param tag - The name of the shape.
     * @param attrs - The attributes required for drawing the shape.
     * @param kwargs - The styling information to be used before drawing the shape.
     * @param children - Other shapes that are drawn relative to the current instance of Shape.
     */
    constructor(tag: ShapeType, attrs: PointAttributes | CircleAttributes | EllipseAttributes | RectangleAttributes | LineAttributes, kwargs?: {}, children?: (Shape | Transformation)[], repeatChildren?: Shape[]);
    /**
     * Returns a clone of the current Shape instance with new styling information if available.
     *
     * @param newKwargs - Key value pairs to provide styling information for a shape. eg { fill: 'red', stroke: 'blue' }.
     * @returns A new instance of Shape.
     */
    clone(newKwargs?: {}): Shape;
    /**
     * Adds a child shape to the current Shape instance.
     *
     * @param shape - A child shape.
     * @returns The current instance of Shape for chaining.
     */
    add(shape: Shape): this;
    /**
     * Converts the current object to a string representation.
     *
     * The string representation includes:
     * - The tag and attributes of the object.
     * - The transformations applied to the object.
     * - The string representations of the object's children.
     *
     * @returns {String} A string representation of the object.
     */
    toString(): String;
    /**
     * Applies a Translate transformation to the current Shape instance.
     *
     * @param x - Amount to translate along the positive x-axis. Defaults to `0`.
     * @param y - Amount to translate along the positive y-axis. Defaults to `0`.
     * @returns The current instance of Shape for chaining.
     */
    translate({ x, y }: {
        x?: number | undefined;
        y?: number | undefined;
    }): this;
    /**
     * Applies a Rotate transformation to the current Shape instance.
     *
     * @param angle - Amount to rotate clockwise in degrees. Defaults to `0`.
     * @returns The current instance of Shape for chaining.
     */
    rotate({ angle }: {
        angle?: number | undefined;
    }): this;
    /**
     * Applies a Scale transformation to the current Shape instance.
     *
     * @param x - Amount to scale along the positive x-axis. Defaults to `1`.
     * @param y - Amount to scale along the positive y-axis. Defaults to `1`.
     * @returns The current instance of Shape for chaining.
     */
    scale({ x, y }: {
        x?: number | undefined;
        y?: number | undefined;
    }): this;
    /**
     * Repeats the current shape `n` times by applying `transform` iteratively.
     *
     *
     * @param n - A positive integer representing the number of times a shape is to be repeated.
     * @param transform - An instance of Transformation that is applied every time the shape is repeated.
     * @returns The current instance of Shape for chaining.
     */
    repeat({ n, transform, }: {
        n: number;
        transform: Transformation | Transformation[] | ((index: number) => TransformationWithStyle) | ((index: number) => Transformation | Transformation[]);
    }): this;
}
type TransformationWithStyle = {
    transform: Transformation;
    style: any;
};
/**
 * Represents a Point shape.
 */
export declare class Point extends Shape {
    x: number;
    y: number;
    /**
     * Creates an instance of Point.
     *
     * @param x - The x-coordinate of the point. Defaults to `0`.
     * @param y - The y-coordinate of the point. Defaults to `0`.
     * @param kwargs
     */
    constructor(x?: number, y?: number, kwargs?: {});
    /**
     * Checks if the Point passed as the parameter is equal to the current instance.
     *
     * @param p - An instance of Point.
     * @returns A boolean representing whether the current Point instance has the same attributes as the parameter.
     */
    equals(p: Point): boolean;
    /**
     * Returns a string representation of Point.
     *
     * @returns A string with the name of the shape and its' attributes.
     */
    toString(): string;
}
/**
 * Represents a Circle shape.
 */
export declare class Circle extends Shape {
    center: Point;
    radius: number;
    /**
     * Creates an instance of Circle.
     *
     * @param center - The position of the center of the circle. Defaults to `(0, 0)`.
     * @param radius - The radius of the circle. Defaults to `100`.
     * @param style - The style information for displaying the circle. Defaults to no styling or `{}`.
     */
    constructor(center?: Point, radius?: number, style?: {});
}
/**
 * Represents an Ellipse shape.
 */
export declare class Ellipse extends Shape {
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
    constructor(center?: Point, width?: number, height?: number, style?: {});
}
/**
 * Represents a Rectangle shape.
 */
export declare class Rectangle extends Shape {
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
    constructor(center?: Point, width?: number, height?: number, style?: {});
}
/**
 * Represents a Line shape.
 */
export declare class Line extends Shape {
    start: Point;
    end: Point;
    /**
     * Creates an instance of Line.
     *
     * @param start - The first point of the line segment. Defaults to `(-100, 0)`.
     * @param end - The second point of the line segment. Defaults to `(100, 0)`
     * @param kwargs - The style information for displaying the rectangle. Defaults to no styling or `{}`.
     */
    constructor(start?: Point, end?: Point, kwargs?: {});
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
export declare class Transformation {
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
    constructor(tag: string, attrs: TranslateAttributes | RotateAttributes | ScaleAttributes, children?: Transformation[]);
    /**
     * Converts the current object to a string representation.
     *
     * The string representation includes:
     * - The tag and attributes of the object.
     * - The string representations of the object's children.
     *
     * @returns {String} A string representation of the object.
     */
    toString(): String;
    /**
     * Adds a Translate transformation to the current transformation.
     *
     * @param x - The amount to translate along the positive x-axis. Defaults to `0`.
     * @param y - The amount to translate along the positive y-axis. Defaults to `0`.
     * @returns The current instance of Transformation for chaining.
     */
    translate({ x, y }: {
        x?: number | undefined;
        y?: number | undefined;
    }): this;
    /**
     * Adds a Rotate transformation to the current transformation.
     *
     * @param angle - The amount to rotate clockwise in degrees. Defaults to `0`.
     * @returns The current instance of Transformation for chaining.
     */
    rotate({ angle }: {
        angle?: number | undefined;
    }): this;
    /**
     * Adds a Scale transformation to the current transformation.
     *
     * @param x - The amount to scale in the positive x-axis. Defaults to `1`.
     * @param y - The amount to scale in the positive y-axis. Defaults to `1`.
     * @returns The current instance of Transformation for chaining.
     */
    scale({ x, y }: {
        x?: number | undefined;
        y?: number | undefined;
    }): this;
    repeat({ n, transform, }: {
        n: number;
        transform: Transformation | ((index: number) => Transformation);
    }): this;
}
/**
 * Represents a Translate transformation.
 */
export declare class Translate extends Transformation {
    x: number;
    y: number;
    /**
     * Creates an instance of Translate.
     *
     * @param x - The amount to translate along the positive x-axis. Defaults to `0`.
     * @param y - The amount to translate along the positive y-axis. Defaults to `0`.
     */
    constructor(x?: number, y?: number);
}
/**
 * Represents a Rotate transformation.
 */
export declare class Rotate extends Transformation {
    angle: number;
    /**
     * Creates an instance of Roate.
     *
     * @param angle - The amount to rotate clockwise in degrees. Defaults to `0`.
     */
    constructor(angle?: number);
}
/**
 * Represents a Scale transformation.
 */
export declare class Scale extends Transformation {
    x: number;
    y: number;
    /**
     * Creates an instance of Scale.
     *
     * @param x - The amount to scale in the positive x-axis. Defaults to `1`.
     * @param y - The amount to scale in the positive y-axis. Defaults to `1`.
     */
    constructor(x?: number, y?: number);
}
/**
 * Represents a Repeat transform.
 */
export declare class Repeat extends Transformation {
    constructor(n: number, transform: Transformation);
}
export {};
