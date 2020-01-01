import * as THREE from 'three';

const ROTATION_SPEED = 2.5;

class FlashLight extends THREE.Object3D {
  private _frontVector: THREE.Vector3;
  private _aperture: number;
  private _angle: number;

  constructor() {
    super();

    this._frontVector = new THREE.Vector3(0, 1, 0);
    this._aperture = 0.2;
    this._angle = 0;

    const handle = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1, 1, 3, 10),
      new THREE.MeshBasicMaterial({
        color: 0xcccccc
      })
    );
    handle.rotation.z = (-90 * Math.PI) / 180;
    this.add(handle);

    const head = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1.5, 1, 1.5, 10),
      new THREE.MeshBasicMaterial({
        color: 0xaaaaaa
      })
    );
    head.rotation.z = (-90 * Math.PI) / 180;
    head.position.x = 2;
    this.add(head);

    const loader = new THREE.TextureLoader();
    const beamTexture = loader.load('../images/beam.png');
    const beam = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(15, 0.5, 20, 40, 10, true),
      new THREE.MeshBasicMaterial({
        color: 0xffff55,
        opacity: 0.3,
        transparent: true,
        map: beamTexture,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      })
    );
    beam.rotation.z = (-90 * Math.PI) / 180;
    beam.position.x = 12;
    this.add(beam);
  }

  update() {
    this._angle += ROTATION_SPEED;
    const radian = (this._angle * Math.PI) / 180;
    this.rotation.z = radian;
    const x = Math.cos(radian);
    const y = Math.sin(radian);
    this._frontVector = new THREE.Vector3(x, y, 0);
  }

  get frontVector() {
    return this._frontVector;
  }
  get aperture() {
    return this._aperture;
  }
}

export default FlashLight;
