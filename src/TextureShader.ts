import * as THREE from 'three';
const vertexShader = require('./shader/textureShader.vert');
const fragmentShader = require('./shader/textureShader.frag');
const TEXTURE_PATH = './textures/beagle.jpg';

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
  uPercent: {
    value: number;
  };
  uFixAspect: {
    value: number;
  };
  uTex: {
    value: THREE.Texture;
  };
}

class TextureShader {
  private _width: number;
  private _height: number;
  private _renderer: THREE.WebGLRenderer;
  private _camera: THREE.OrthographicCamera;
  private _scene: THREE.Scene;
  private _mesh: THREE.Mesh;
  private _uniforms: Uniform;
  private _mouse: THREE.Vector2;
  private _targetPercent: number;

  constructor() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._targetPercent = 0.0;
    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setSize(this._width, this._height);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this._renderer.domElement);

    this._camera = new THREE.OrthographicCamera(-1, 1, 1, 0, -1);
    this._scene = new THREE.Scene();

    this._mouse = new THREE.Vector2(0.5, 0.5);
    const texture = this.loadTexture();
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
      uPercent: {
        value: this._targetPercent
      },
      uFixAspect: {
        value: this._height / this._width
      },
      uTex: {
        value: texture
      }
    };

    const geo = new THREE.PlaneGeometry(2, 2, 1, 1);
    const mat = new THREE.ShaderMaterial({
      uniforms: this._uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });
    this._mesh = new THREE.Mesh(geo, mat);
    this._scene.add(this._mesh);
    this.render();
  }

  loadTexture(): THREE.Texture {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(TEXTURE_PATH);
    return texture;
  }

  render() {
    requestAnimationFrame(() => this.render());

    const sec = performance.now() / 1000;
    this._uniforms.uTime.value = sec;
    this._uniforms.uMouse.value.lerp(this._mouse, 0.2);
    this._uniforms.uPercent.value += (this._targetPercent - this._uniforms.uPercent.value) * 0.1;
    this._renderer.render(this._scene, this._camera);
  }

  mouseMoved(x, y) {
    this._mouse.x = x / this._width;
    this._mouse.y = 1.0 - y / this._height;
  }

  mousePressed(x, y) {
    this.mouseMoved(x, y);
    this._targetPercent = 1.0;
  }

  mouseReleased(x, y) {
    this.mouseMoved(x, y);
    this._targetPercent = 0.0;
  }
}

export default TextureShader;
