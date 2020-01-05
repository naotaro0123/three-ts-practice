import * as THREE from 'three';

export default class OutGlow extends THREE.Object3D {
  private _sprite: THREE.Sprite;

  constructor() {
    super();

    let loader = new THREE.TextureLoader();
    let map = loader.load('../../images/Particle01.png');
    const material = new THREE.SpriteMaterial({
      map,
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
      opacity: 0.8,
      transparent: true
    });
    this._sprite = new THREE.Sprite(material);
    this._sprite.scale.multiplyScalar(11);
    this.add(this._sprite);
  }
}
