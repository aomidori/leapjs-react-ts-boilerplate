export const vertex = /* glsl */ `
  precision highp float;
  precision highp int;
  attribute vec3 position;
  attribute vec3 normal;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform mat3 normalMatrix;
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragment = /* glsl */ `
  precision highp float;
  precision highp int;
  varying vec3 vNormal;
  void main() {
    vec3 normal = normalize(vNormal);
    float lighting = dot(normal, normalize(vec3(-0.3, 0.8, 0.6)));
    gl_FragColor.rgb = vec3(0.2, 0.8, 1.0) + lighting * 0.1;
    gl_FragColor.a = 1.0;
  }
`;