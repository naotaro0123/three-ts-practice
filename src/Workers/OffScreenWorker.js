// importScripts('../../node_modules/three/build/three.min.js');
importScripts(
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js'
);

class WorkerMain {
  constructor(offscreenCanvas, width, height) {
    offscreenCanvas.style = { width: 0, height: 0 };
    const renderer = new THREE.WebGLRenderer({
      canvas: offscreenCanvas
    });
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 0, 50);
    camera.lookAt(0, 0, 0);
    const geometry = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 'red',
      wireframe: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const render = () => {
      mesh.rotation.y += 0.05;
      mesh.rotation.x += 0.05;
      renderer.render(scene, camera);

      requestAnimationFrame(render);
    };
    render();
  }
}

onmessage = event => {
  const offscreenCanvas = event.data.canvas;
  new WorkerMain(offscreenCanvas, event.data.width, event.data.height);
};
