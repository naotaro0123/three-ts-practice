uniform vec3 viewVector;
varying float opacity;

void main() {
  vec3 nNomal = normalize(normal);
  vec3 nViewVec = normalize(viewVector);

  opacity = dot(nNomal, nViewVec);
  opacity = 1.0 - opacity;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
