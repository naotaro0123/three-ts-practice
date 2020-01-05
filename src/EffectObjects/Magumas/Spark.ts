import * as THREE from 'three';

export default class Spark extends THREE.Object3D {
  private _geometry: THREE.PlaneBufferGeometry;
  private _map: THREE.Texture;
  private _material: THREE.Material;
  private _mesh: THREE.Mesh;

  private _speed = Math.random() * 0.2 + 0.2;
  private _opacity = 0.5;

  constructor() {
    super();

    this._geometry = new THREE.PlaneBufferGeometry(0.15, 2);
    let loader = new THREE.TextureLoader();
    this._map = loader.load('../../images/Burst01.png');
    this._map.wrapS = this._map.wrapT = THREE.RepeatWrapping;

    this._material = new THREE.MeshBasicMaterial({
      map: this._map,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: this._opacity
    });

    this._mesh = new THREE.Mesh(
      this._geometry,
      this._material
    );
    this._mesh.position.y = Math.random() * 5;
    this._mesh.rotation.y = Math.random() * 2;
    this.add(this._mesh);
  }

  public update() {
    this._mesh.position.y -= this._speed;
    const m = (this._mesh.material as THREE.Material);
    m.opacity -= 0.05;
    if (this._mesh.position.y < 0) {
      this._mesh.position.y = 6;
      m.opacity = this._opacity;
    }
  }
}
