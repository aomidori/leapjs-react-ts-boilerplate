import * as LEAP from 'leapjs';

import {
  Renderer, Camera, Transform, Program, Mesh, Cylinder,
} from 'ogl';

import { vertex, fragment } from './shaders';

export class ViewManager {
  canvas        : HTMLCanvasElement | null;

  /** LEAP */
  leapController: LEAP.Controller = new LEAP.Controller();

  /** OGL */
  renderer!     : Renderer;
  scene!        : Transform;
  program!      : Program;
  camera!       : Camera;

  /** SCENE ATTRIBUTES */
  CAMERA_INITIAL_ATTR = {
    fov: 45,
    aspect: window.innerWidth / window.innerHeight, 
    near: 1,
    far: 1000 // leap range: 25 - 600
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.leapController.connect();
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
    this.renderer = new Renderer({dpr: 2, canvas: this.canvas});
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
    this.camera = new Camera(gl, this.CAMERA_INITIAL_ATTR);
    this.camera.position.set(0, 40, 40);
    this.camera.lookAt([0, 0, 0]);
    (gl as any).clearColor(1, 1, 1, 1);

    window.addEventListener('resize', this.onResize, false);
    this.onResize();
    const render = () => {
      if (!this.renderer) {
        return;
      }
      requestAnimationFrame(render);
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
    if (!this.renderer || !hand.valid) {
      return;
    }
    this.scene.children = [];
    const gl = this.renderer.gl;

    hand.fingers.forEach((finger) => {
      // if finger.touchZone === 'hovering' {}
      if (finger.valid && finger.touchZone === 'hovering') {
        finger.bones.forEach((bone) => {
          const geometry = new Cylinder(gl, {
            radiusTop: 1,
            radiusBottom: 1,
            height: bone.length,
          });
          const mesh = new Mesh(gl, { geometry, program: this.program });
          const position = bone.center().map(v => v / 10.0);
          mesh.position.set(...position);
          mesh.rotation.fromRotationMatrix(bone.matrix());
          mesh.setParent(this.scene);
        });
      }
    });
    console.log( this.scene.children.length);
  }

  dispose() {}
}
