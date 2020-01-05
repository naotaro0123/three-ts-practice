import * as THREE from 'three';
const vertexShader = require('../../Shaders/flareShader.vert');
const fragmentShader = require('../../Shaders/flareShader.frag');

export default class Flare extends THREE.Object3D {
  private _geometry: THREE.CylinderBufferGeometry;
  private _map: THREE.Texture;
  private _material: THREE.ShaderMaterial;
  private _mesh: THREE.Mesh;

  private _speed: number;
  private _offset: THREE.Vector2 = new THREE.Vector2();
  private _topRadius: number;
  private _bottomRadius: number;
  private _diameter: number;
  private _randomRatio = Math.random() + 1;

  constructor() {
    super();
    this._speed =Math.random() * 0.05 + 0.01;
    this._topRadius = 6;
    this._bottomRadius = 2;
    this._diameter = this._topRadius - this._bottomRadius;

    this._geometry = new THREE.CylinderBufferGeometry(this._topRadius, this._bottomRadius, 0, 30, 3, true);
    let loader = new THREE.TextureLoader();
    this._map = loader.load('../../images/aura3_type2.png');
    this._map.wrapS = this._map.wrapT = THREE.RepeatWrapping;
    this._map.repeat.set(10, 10);

    this._material = this.createMaterial();
    this._mesh = new THREE.Mesh(
      this._geometry,
      this._material
    );
    this.add(this._mesh);
  }

  private createMaterial(): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      uniforms: {
        map: {
          type: 't',
          value: this._map
        },
        offset: {
          type: 'v2',
          value: this._offset
        },
        opacity: {
          type: 'f',
          value: 0.15
        },
        innerRadius: {
          type: 'f',
          value: this._bottomRadius
        },
        diameter: {
          type: 'f',
          value: this._diameter
        }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true
    });
  }

  public update() {
    this._offset.x += 0.004 * this._randomRatio;
    this._offset.y -= 0.015 * this._randomRatio;
  }
}
