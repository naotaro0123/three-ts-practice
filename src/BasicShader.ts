import * as THREE from 'three';
const vertexShader = require('./shader/basicVertexShader.vert');
const fragmentShader = require('./shader/basicFragmentShader.frag');

class BasicShader {
  private _width: number;
  private _height: number;
  private _renderer: THREE.WebGLRenderer;
  private _camera: THREE.OrthographicCamera;
  private _scene: THREE.Scene;
  private _mesh: THREE.Mesh;

  constructor() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setSize(this._width, this._height);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this._renderer.domElement);

    this._camera = new THREE.OrthographicCamera(-1, 1, 1, 0, -1);
    this._scene = new THREE.Scene();

    const geo = new THREE.PlaneGeometry(2, 2, 1, 1);
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      wireframe: false
    });

    this._mesh = new THREE.Mesh(geo, mat);
    this._scene.add(this._mesh);
    this.render();
  }

  render() {
    requestAnimationFrame(() => this.render());

    this._renderer.render(this._scene, this._camera);
  }
}

export default BasicShader;
