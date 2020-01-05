uniform vec3 glowColor;
varying float opacity;

void main() {
  gl_FragColor = vec4(glowColor, opacity);
}
