import * as THREE from 'three';
import Camera from '../Objects/Camera';
import FlashLight from '../Objects/FlashLight';
import ParticleEmitter from '../Objects/ParticleEmitter';

class VectorIn {
  private width: number;
  private height: number;
  private renderer: THREE.WebGLRenderer;
  private camera: Camera;
  private scene: THREE.Scene;
  private flashLight: FlashLight;
  private particleEmitter: ParticleEmitter;

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new Camera();
    this.camera.position.set(10, 50, 10);

    this.scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    this.flashLight = new FlashLight();
    this.scene.add(this.flashLight);

    this.particleEmitter = new ParticleEmitter();
    this.scene.add(this.particleEmitter);

    this.tick();
  }

  tick() {
    requestAnimationFrame(() => this.tick());
    this.camera.update();

    this.flashLight.update();
    this.particleEmitter.update(
      this.flashLight.frontVector,
      this.flashLight.aperture
    );
    this.renderer.render(this.scene, this.camera);
  }
}

export default VectorIn;
