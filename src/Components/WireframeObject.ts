import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

export default function WireframeObject() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0x333333);
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(0, 0, -8);

  const scene = new THREE.Scene();
  const geometry = new THREE.SphereBufferGeometry(2, 6, 6);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ddff });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const wireframe = new THREE.WireframeGeometry(geometry);
  const line = new THREE.LineSegments(wireframe);
  line.material = new THREE.MeshBasicMaterial({
    opacity: 0.25,
    transparent: true
  });
  scene.add(line);

  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 2, -5);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  const controller = new TrackballControls(camera, renderer.domElement);
  controller.rotateSpeed = 4;

  tick();

  function tick() {
    controller.update();
    renderer.render(scene, camera);
    requestAnimationFrame(() => tick());
  }
}
