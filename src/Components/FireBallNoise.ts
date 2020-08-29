import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
const vertexShader = require('../Shaders/fireBallNoiseShader.vert');
const fragmentShader = require('../Shaders/fireBallNoiseShader.frag');

class FireBallNoise {
  private width: number;
  private height: number;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.Camera;
  private scene: THREE.Scene;
  private mesh: THREE.Mesh;
  private material: THREE.ShaderMaterial;
  private controller: TrackballControls;
  private start = Date.now();

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      30,
      this.width / this.height,
      1,
      10000
    );
    this.camera.position.set(0, 0, 100);

    this.scene = new THREE.Scene();

    this.controller = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    this.controller.noPan = true;
    this.controller.rotateSpeed = 2;
    this.controller.minDistance = 200;
    this.controller.maxDistance = 1000;

    this.createMesh();
    this.tick();
  }

  createMesh() {
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        tExplosion: {
          value: THREE.ImageUtils.loadTexture('../images/explosion.png')
        },
        time: {
          value: 0.0
        }
      }
    });

    this.mesh = new THREE.Mesh(
      new THREE.IcosahedronBufferGeometry(20, 4),
      this.material
    );
    this.scene.add(this.mesh);

    const plane = new THREE.GridHelper(1000, 20);
    plane.position.y = -80;
    this.scene.add(plane);
  }

  tick() {
    requestAnimationFrame(() => this.tick());
    this.controller.update();
    this.material.uniforms['time'].value = 0.00025 * (Date.now() - this.start);
    this.renderer.render(this.scene, this.camera);
  }
}

export default FireBallNoise;
