import * as THREE from 'three';
import Camera from '../Camera';
const vertexShader = require('../../Shaders/inClowShader.vert');
const fragmentShader = require('../../Shaders/inClowShader.frag');

export default class InGlow extends THREE.Object3D {
  private _geometry: THREE.SphereBufferGeometry;
  private _material: THREE.ShaderMaterial;
  private _mesh: THREE.Mesh;

  constructor() {
    super();

    this._geometry = new THREE.SphereBufferGeometry(2.07, 20, 20);
    let camera = Camera.getInstance();
    this._material = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: {
          value: new THREE.Color(0x96ecff)
        },
        viewVector: {
          value: camera.position
        }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    this._mesh = new THREE.Mesh(
      this._geometry,
      this._material
    );
    this.add(this._mesh);
  }
}
