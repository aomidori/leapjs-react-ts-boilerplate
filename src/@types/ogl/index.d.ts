// Type definitions for ogl 0.0.4
// Project: https://github.com/oframe/ogl
// Definitions by: Hanyue Zhou <https://github.com/AOMIDORI>
// TypeScript Version: 3.7

declare module 'ogl' {
  export class Transform {
    constructor(): Transform;
    parent: any;
    children: Mesh[];
    visible: boolean;
    matrix: any;
    worldMatrix: any;
    position: any;
    rotation: any;
    up: any;
    quaternion: any;
  };
  export class Mesh extends Transform {
    constructor(gl: WebGL2RenderingContext, attr: any): Mesh;
    position: any;
    setParent(parent: any): void;
  };
  export class Program {
    constructor(gl: WebGL2RenderingContext, initParam: any): Program;
  };
  export class Texture extends any {};
  export class Geometry {
    constructor(gl: WebGL2RenderingContext, attr?: any): Geometry;
    getPositionArray(): any[];
    computeBoundingBox(array?: any): void;
  };
  export class Camera {
    constructor(gl: WebGL2RenderingContext, initParam: any): Camera;
    position: any;
    lookAt: any;
    perspective(perspective:Partial<{ near: number; far: number; fov: number; aspect: number; }>): Camera;
  };
  export class RenderTarget extends any {};
  export class Renderer {
    constructor(config: Partial<{
      canvas: any;
      width: number;
      height: number;
      dpr: number;
      alpha: boolean;
      depth: boolean;
      stencil: boolean;
      antialias: boolean;
      premultipliedAlpha: boolean;
      preserveDrawingBuffer: boolean;
      powerPreference: 'default' | string;
      autoClear: boolean;
      webgl: number;
    }> = {}): Renderer;
    gl: WebGL2RenderingContext;
    setSize(width: number, height: number): void;
    setViewPort(width: number, height: number): void;
    enable(id: string): void;
    setBlendFunc(): any;
    setBlendEquation(): any;
    setCullFace(): any;
    // TODO: fill up
    render(attr: Partial<{
      scene: Tramsform;
      camera: Camera;
      target: any;
      update: boolean;
      sort: boolean;
      frustumCull: boolean;
      clear: boolean;
    }>): void;
  }

  export class Cylinder extends Geometry {
    constructor(
      gl: WebGL2RenderingContext,
      data?: Partial<{
        radiusTop: number;
        radiusBottom: number,
        height: number,
        radialSegments: number,
        heightSegments: number,
        openEnded: boolean,
        thetaStart: number,
        thetaLength: number,
        attributes: { position?: any; normal?: any; uv?: any; index?: any; },
      }>,
    ): Cylinder;
    addHeight(): void;
  };

  /**
   * Math
   */
  class Array3 extends Array {
    constructor(x: number, y: number, z: number): Array3;
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): Array3;
    copy(v: Array3): Array3;
    add(va: number[], vb: number[]): Array3;
    sub(va: number[], vb: number[]): Array3;
    mutiply(v: number[]): Array3;
    divide(v: number[]): Array3;
    inverse(): Array3;
    len(): number;
    distance(v: number[]): number;
    //.... TODO
  };

  class Vec3 extends OGLArray {
    constructor(x: number, y: number, z: number): Euler;
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): Vec3;
    copy(v: Vec3): Vec3;
    reorder(order: string): Vec3;
    fromRotationMatrix(m: number[], order: string): Vec3;
    fromQuaternion(q: number[], order: string): Vec3;
  };

  export class Euler extends Array3 {
    constructor(x: number, y: number, z: number, order: string): Euler;
  };
  export class Mat4 extends Array {
    constructor(
      m00?: number, m01?: number, m02?: number, m03?: number,
      m10?: number, m11?: number, m12?: number, m13?: number,
      m20?: number, m21?: number, m22?: number, m23?: number,
      m30?: number, m31?: number, m32?: number, m33?: number,
    ): Mat4;
    getRotation(): any;
    getTranslation(pos: any): any;
  };
  export class Mat3 extends Array {
    constructor(
      m00?: number, m01?: number, m02?: number,
      m10?: number, m11?: number, m12?: number,
      m20?: number, m21?: number, m22?: number,
    ): Mat3;
    fromMatrix4(m: Mat4): Mat3;
  };
}
