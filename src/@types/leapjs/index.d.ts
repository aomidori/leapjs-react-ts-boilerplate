// Type definitions for leapjs 0.6.0
// Project: https://github.com/leapmotion/leapjs
// Definitions by: Hanyue Zhou <https://github.com/AOMIDORI>
// TypeScript Version: 3.7

type Vec3 = [number, number, number];
type Matrix3x3 = [number, number, number, number, number, number, number, number, number];

declare module 'leapjs' {
  type ZoneType = 'none' | 'hovering' | 'touching';

  /**
   * ------------------------------- *
   *              Bone               *
   * ------------------------------- *
   */
  export interface Bone {
    basis: [number, number];
    length: number;
    center(): Vec3;
    nextJoint: any;
    prevJoint: any;
    type: 'left' | 'right';
    width: number;
    [k: string]: any;
  }

  /**
   * ------------------------------- *
   *           Pointable             *
   * ------------------------------- *
   */
  export interface Pointable {
    constructor(): Pointable;
    direction: Vec3;
    frame: Frame;
    hand: Hand;
    id: string;
    extended: boolean;
    finger: boolean;
    tool: boolean;
    valid: boolean;
    length: any;
    stabilizedTipPosition: any;
    timeVisible: any;
    tipPosition: any;
    tipVelocity: any;
    touchDistance: number; // [-1, 1]
    touchZone: ZoneType;
    width: number;
    /**
    ZONE_HOVERING: number;
    ZONE_NONE: number;
    ZONE_TOUCHING: number; */
  }

  export interface Finger extends Pointable {
    bones: Bone[];
    carpPosition: Vec3;
    dipPosition: Vec3;
    distal: Bone;
    medial: Bone;
    mcpPosition: Vec3;
    metacarpal: Bone;
    pipPosition: Vec3;
    proximal: Bone;
    type: number; // int
    positions: Vec3[];
  }

  /**
   * ------------------------------- *
   *             Hand                *
   * ------------------------------- *
   */
  export interface Hand {
    new(): Hand;
    id: string;
    arm: any;
    confidence: number;  // [0, 1]
    direction: Vec3;
    fingers: Finger[];
    grabStrength: number; // [0, 1]
    thumb: Finger;
    indexFinger: Finger;
    middleFinger: Finger;
    ringFinger: Finger;
    pinky: Finger;
    // palmNormal: a unit direction vector.
    // The normal vector to the palm. 
    // If your hand is flat, this vector will point downward,
    // or “out” of the front surface of your palm.
    palmNormal: Vec3;
    palmPosition: Vec3;
    // palmVelocity: The rate of change of the palm position in mm/s.
    palmVelocity: Vec3;
    palmWidth: number;
    pinchStrength: number;
    pointables: Pointable[];
    sphereCenter: Vec3;
    sphereRadius: number; // in mm
    stabilizedPalmPosition: Vec3;
    timeVisible: number;
    tools?: Pointable[];
    type: 'left' | 'right';
    valid: boolean;
    finger: (id: number) => Pointable;
    pitch: () => number; // pitch angle: 0-pi rad
    roll: () => number; // roll angle
    rotationAngle: (sinceFrame: Frame, axis: Vec3) => number;
    rotationAxis: (sinceFrame: Frame) => Vec3;
    rotationMatrix: (sinceFrame: Frame) => Matrix3x3;
    scaleFactor: (sinceFrame: Frame) => number;
    toString: () => string;
  }

  /**
   * ------------------------------- *
   *            Frame                *
   * ------------------------------- *
   */
  interface Frame {
    valid: boolean;
    hands: Hand[];
    fingers: Finger[];
    tools: Pointable[];
    gestures: any[];
    pointables: any[];
    pointable: any;
    finger: any;
    hand: any;
    toString: any;
    dump: any;
    rotationAngle: any;
    rotationMatrix: Matrix3m3;
    rotationAxis: any;
    scaleFactor: any;
    translation: any;
  };

  /**
   * ------------------------------- *
   *            Controller           *
   * ------------------------------- *
   */
  export class Controller {
    new(): Controller;
    [K in string]: any;
    connection: any;
    connect: any;
    inNode: any;
    animationFrameRequested: boolean;
    onAnimationFrame: (timestamp: number) => any;
    suppressAnimationLoop: boolean;
    loopWhileDisconnected: boolean;
    frameEventName: string;
    useAllPlugins: boolean;
    history: any;
    lastFrame: Frame;
    lastValidFrame: Frame;
    lastConnectionFrame: Frame;
    accumulatedGestures: any[]
    checkVersion: boolean;
    connectionType: any;
    connection: {
      opts: any;
      host: string;
      port: number;
      scheme: string;
      protocolVersionVerified: boolean;
      background: any;
      optimizeHMD: any;
      socket: WebSocket;
    };
    streamingCount: number;
    devices: any;
    plugins: any;
  };

  export function loop(callback: (f: Frame) => any): any;
}
