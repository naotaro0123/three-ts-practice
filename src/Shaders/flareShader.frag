uniform sampler2D map;
uniform float opacity;
uniform float diameter;
uniform float innerRadius;
varying vec2 vUv;
varying float radius:
const float PI = 3.1415926;

void main() {
  vec4 tColor = texture2D(map, vUv);
  float ratio = (radius - innerRadius) / diameter;
  float opacity = opacity * sin(PI * ratio);
  vec4 baseColor = (tColor + vec4(0.0, 0.0, 0.3, 1.0));
  gl_FragColor = baseColor * vec4(1.0, 1.0, 1.0, opacity);
}
