// Type definitions for ogl 0.0.4
// Project: https://github.com/oframe/ogl
// Definitions by: Hanyue Zhou <https://github.com/AOMIDORI>
// TypeScript Version: 3.7

declare module 'ogl' {
  export class Transform {
    constructor(): Transform;
    children: Mesh[];
  };
  export class Mesh {
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
    gl: WebGL2RenderingContext | any;
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
    addHeight(): void;
  };
}
