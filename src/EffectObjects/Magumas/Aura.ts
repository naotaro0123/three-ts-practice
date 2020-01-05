import * as THREE from 'three';

export default class Aura extends THREE.Object3D {
  private _geometry: THREE.SphereBufferGeometry;
  private _map: THREE.Texture;
  private _material: THREE.MeshBasicMaterial;
  private _mesh: THREE.Mesh;

  constructor() {
    super();

    this._geometry = new THREE.SphereBufferGeometry(2.05, 20, 20);
    let loader = new THREE.TextureLoader();
    this._map = loader.load('../../images/aura3_type2.png');
    this._map.wrapS = this._map.wrapT = THREE.RepeatWrapping;

    this._material = new THREE.MeshBasicMaterial({
      map: this._map,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    this._mesh = new THREE.Mesh(this._geometry, this._material);
    this.add(this._mesh);
  }

  public update() {
    this._map.offset.x -= 0.005;
    this._map.offset.y -= 0.005;
  }
}
