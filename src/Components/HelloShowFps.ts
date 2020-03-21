import * as THREE from 'three';
import * as Stats from 'stats.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function HelloShowFps() {
  const canvas = document.createElement('canvas');
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);

  const stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(0, 0, 5);

  const geometry = new THREE.SphereBufferGeometry(1, 30, 30);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.update();
  orbitControls.addEventListener('change', tick);

  const transControls = new TransformControls(camera, renderer.domElement);
  transControls.addEventListener('change', tick);
  transControls.attach(mesh);

  transControls.addEventListener('dragging-changed', event => {
    orbitControls.enabled = !event.value;
  });
  scene.add(transControls);

  setShotrCutKey();

  function setShotrCutKey() {
    window.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 87: // W = translate
          transControls.setMode('translate');
          break;
        case 69: // E = rotate
          transControls.setMode('rotate');
          break;
        case 82: // R = scale
          transControls.setMode('scale');
          break;
      }
    });
  }

  tick();

  function tick() {
    stats.begin();
    mesh.rotation.y += 0.01;
    stats.end();
    renderer.render(scene, camera);
    renderer.setAnimationLoop(tick);
  }
}
