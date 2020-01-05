varying vec2 vUv;
varying float radius;
uniform vec2 offset;

void main() {
  vUv = uv + offset;
  radius = length(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
