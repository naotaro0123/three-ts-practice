varying vec2 vUv;
uniform float uAspect;
uniform float uTime;
uniform vec2  uMouse;
uniform float uRadius;

void main() {
  vec2 uv = vec2( vUv.x * uAspect, vUv.y );
  vec2 center = vec2( uMouse.x * uAspect, uMouse.y );
  float lightness = uRadius / length( uv - center );
  vec4 color = vec4( vec3( lightness ), 1.0 );

  color *= vec4( 0.2, 1.0, 0.5, 1.0 );
  gl_FragColor = color;
}
