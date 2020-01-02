import * as THREE from 'three';
import insideWorker from 'offscreen-canvas/inside-worker';

let workerMain: WorkerMain;

insideWorker(event => {
  if (event.data.canvas) {
    workerMain = new WorkerMain(event.data.canvas);
  } else if (event.data.type === 'resize') {
    workerMain.resize(
      event.data.width,
      event.data.height
    );
  }
});

class WorkerMain {
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private mesh: THREE.Mesh;

  constructor(offscreenCanvas) {
    offscreenCanvas.style = { width: 0, height: 0 };
    this.renderer = new THREE.WebGLRenderer({
      canvas: offscreenCanvas
    });
    this.renderer.setSize(
      offscreenCanvas.width,
      offscreenCanvas.height
    );

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      offscreenCanvas.width / offscreenCanvas.height,
      1, 10000
    );
    this.camera.position.set(0, 0, 50);
    this.camera.lookAt(0, 0, 0);
    const geometry = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 'red',
      wireframe: true
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.render();
  }

  render() {
    this.mesh.rotation.y += 0.05;
    this.mesh.rotation.x += 0.05;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
  }

  resize(width: number, height: number) {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
