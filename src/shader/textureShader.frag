varying vec2 vUv;
uniform sampler2D uTex;
uniform float uPercent;
uniform float uTime;

void main() {
  vec3 color = texture2D(uTex, vUv).rgb;
  vec3 invert = 1. - color;
  color = mix(color, invert, uPercent);
  float shift = uPercent * .01;

  gl_FragColor = vec4(color, 1.0);
}
