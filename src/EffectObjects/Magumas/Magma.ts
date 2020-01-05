import * as THREE from 'three';

export default class Magma extends THREE.Object3D {
  private _geometry: THREE.SphereBufferGeometry;
  private _map: THREE.Texture;
  private _material: THREE.MeshBasicMaterial;
  private _mesh: THREE.Mesh;

  constructor() {
    super();

    this._geometry = new THREE.SphereBufferGeometry(2, 20, 20);
    let loader = new THREE.TextureLoader();
    this._map = loader.load('../../images/magma.png');
    this._map.wrapS = this._map.wrapT = THREE.RepeatWrapping;
    this._material = new THREE.MeshBasicMaterial({
      map: this._map
    });
    this._mesh = new THREE.Mesh(
      this._geometry,
      this._material
    );
    this.add(this._mesh);
  }

  public update() {
    if (this._map) {
      this._map.offset.x += 0.007;
      this._map.offset.y += 0.008;
    }
  }
}
