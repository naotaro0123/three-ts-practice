import * as THREE from 'three';
const vertexShader = require('../shader/basicShader.vert');
const fragmentShader = require('../shader/basicShader.frag');

class BasicShader {
  private width: number;
  private height: number;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.OrthographicCamera;
  private scene: THREE.Scene;
  private mesh: THREE.Mesh;

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, 0, -1);
    this.scene = new THREE.Scene();

    const geo = new THREE.PlaneGeometry(2, 2, 1, 1);
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      wireframe: false
    });

    this.mesh = new THREE.Mesh(geo, mat);
    this.scene.add(this.mesh);
    this.render();
  }

  render() {
    requestAnimationFrame(() => this.render());
    this.renderer.render(this.scene, this.camera);
  }
}

export default BasicShader;
