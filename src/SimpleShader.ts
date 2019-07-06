import * as THREE from 'three';
const Stats = require('stats.js');
const vertexShaderSource = require('./shader/vertexShader.vert');
const fragmentShaderSource = require('./shader/fragmentShader.frag');

// referer https://qiita.com/watabo_shi/items/c0d4ef11cba6f21189ed
// referer https://github.com/watab0shi/threejs-workshop/tree/master/src

interface Uniform {
  uAspect: {
    value: number;
  };
  uTime: {
    value: number;
  };
  uMouse: {
    value: THREE.Vector2;
  };
  uRadius: {
    value: number;
  };
}

class SimpleShader {
  private _width: number;
  private _height: number;
  private _renderer: THREE.WebGLRenderer;
  private _camera: THREE.OrthographicCamera;
  private _scene: THREE.Scene;
  private _geo: THREE.PlaneGeometry;
  private _mouse: THREE.Vector2;
  private _tagetRadius = 0.005;
  private _uniforms: Uniform;
  private _mesh: THREE.Mesh;
  private stats: Stats;

  constructor() {
    this.stats = new Stats();
    this.stats.showPanel(1);
    document.body.appendChild(this.stats.dom);

    this._width = window.innerWidth;
    this._height = window.innerWidth;
    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setSize(this._width, this._height);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this._renderer.domElement);

    this._camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);
    this._scene = new THREE.Scene();

    this._geo = new THREE.PlaneGeometry(2, 2, 1, 1);
    this._mouse = new THREE.Vector2(0.5, 0.5);
    this._uniforms = {
      uAspect: {
        value: this._width / this._height
      },
      uTime: {
        value: 0.0
      },
      uMouse: {
        value: new THREE.Vector2(0.5, 0.5)
      },
      uRadius: {
        value: this._tagetRadius
      }
    };

    const mat = new THREE.ShaderMaterial({
      uniforms: this._uniforms,
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource
    });
    this._mesh = new THREE.Mesh(this._geo, mat);
    this._scene.add(this._mesh);
    this.render();
  }

  render() {
    requestAnimationFrame(() => this.render());

    this.stats.begin();

    const sec = performance.now() / 1000;
    this._uniforms.uTime.value = sec;
    this._uniforms.uMouse.value.lerp(this._mouse, 0.2);
    this._uniforms.uRadius.value += (this._tagetRadius - this._uniforms.uRadius.value) * 0.2;
    this._renderer.render(this._scene, this._camera);

    this.stats.end();
  }

  mouseMoved(x, y) {
    this._mouse.x = x / this._width;
    this._mouse.y = 1.0 - y / this._height;
  }

  mousePressed(x, y) {
    this.mouseMoved(x, y);
    this._tagetRadius = 0.25;
  }

  mouseReleased(x, y) {
    this.mouseMoved(x, y);
    this._tagetRadius = 0.005;
  }
}

export default SimpleShader;
