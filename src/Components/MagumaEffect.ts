import * as THREE from 'three';
import Camera from '../EffectObjects/Camera';
import Plane from '../EffectObjects/Plane';
import MagmaFlare from '../EffectObjects/Magumas/MagmaFlare';

class MagumaEffect {
  private readonly _scene: THREE.Scene;
  private readonly _camera: Camera;
  private _renderer: THREE.WebGLRenderer;
  private _frame = 0;
  private _magmaFlare: MagmaFlare;

  constructor() {
    this._scene = new THREE.Scene();
    this._camera = Camera.getInstance();

    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    this._renderer.setClearColor(0x000000);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._resize();
    document.body.appendChild(this._renderer.domElement);

    let plane = new Plane();
    plane.position.y = -3;
    this._scene.add(plane);

    this._magmaFlare = new MagmaFlare();
    this._scene.add(this._magmaFlare);

    this._tick();

    window.addEventListener('resize', () => this._resize());
  }

  _resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this._renderer.domElement.setAttribute('width', String(width));
    this._renderer.domElement.setAttribute('height', String(height));
    this._renderer.setSize(width, height);
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
  }

  _tick() {
    requestAnimationFrame(() => this._tick());

    this._frame++;
    this._camera.update();
    this._magmaFlare.update();

    // fps 30
    if (this._frame % 2) {
      return;
    }

    this._renderer.render(this._scene, this._camera);
  }
}
export default MagumaEffect;
