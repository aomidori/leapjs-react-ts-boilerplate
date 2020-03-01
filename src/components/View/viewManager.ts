import * as LEAP from 'leapjs';

import {
  Renderer, Camera, Transform, Program, Mesh, Cylinder,
} from 'ogl';

import { vertex, fragment } from './shaders';

export class ViewManager {
  canvas: HTMLCanvasElement | null;
  leapController = new LEAP.Controller();

  renderer!: Renderer;
  scene!:    Transform;
  program!: Program;
  camera!: Camera;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.leapController.connect();
    console.log(this.leapController);
  }

  init() {
    console.log('init');
    LEAP.loop((frame: LEAP.Frame) => {
      if (!frame.valid) { return; }
      frame.hands.forEach(hand => this.renderHand(hand));
    });

    // Init scene
    this.startRender();
  }

  startRender() {
    this.renderer = new Renderer({dpr: 2});
    this.scene = new Transform();
    if (!this.renderer) {
      return;
    }
    const gl = this.renderer.gl;
    this.program = new Program(gl, {
      vertex,
      fragment,
      cullFace: null,
    });
    // gl.clearColor(1, 1, 1, 1);
    this.camera = new Camera(gl, {fov: 35});
    this.camera.position.set(0, 1, 7);
    this.camera.lookAt([0, 0, 0]);
    gl.clearColor(1, 1, 1, 1);

    const cylinderGeometry = new Cylinder(gl);
    const cylinder = new Mesh(gl, { geometry: cylinderGeometry, program: this.program });
    cylinder.position.set(-1.3, 0, 0);
    cylinder.setParent(this.scene);

    window.addEventListener('resize', this.onResize, false);
    this.onResize();
    const render = () => {
      if (!this.renderer) {
        return;
      }
      requestAnimationFrame(render);
      console.log(this.scene.children);
      this.renderer.render({ scene: this.scene, camera: this.camera });
    }
    requestAnimationFrame(render);
  }

  onResize() {
    if (!this.renderer) {
      return;
    }
    const gl = this.renderer.gl;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.perspective({aspect: gl.canvas.width / gl.canvas.height});
  }

  renderHand(hand: LEAP.Hand) {
    if (!this.renderer) {
      return;
    }
    this.scene.children = [];
    const gl: any = this.renderer.gl;
    hand.fingers.forEach((finger) => {
      // if finger.touchZone === 'hovering' {}
      if (finger.valid && finger.touchZone === 'hovering') {
        finger.bones.forEach((bone) => {
          const geometry = new Cylinder(gl);
          const mesh = new Mesh(gl, { geometry, program: this.program });
          mesh.position.set(bone.center());
          mesh.setParent(this.scene);
        });
      }
    });
  }

  dispose() {}
}
