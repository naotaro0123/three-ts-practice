import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function RayCastSimple() {
  init();

  function init() {
    const width = 960;
    const height = 540;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    const renderer = new THREE.WebGLRenderer({
      canvas
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 500, 1000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const controls = new OrbitControls(camera, renderer.domElement);
    // 滑らかにカメラコントローラーを制御する
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const geometry = new THREE.BoxBufferGeometry(50, 50, 50);
    const meshList: THREE.Object3D[] = [];
    for (let i = 0; i < 200; i++) {
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 800;
      mesh.position.y = (Math.random() - 0.5) * 800;
      mesh.position.z = (Math.random() - 0.5) * 800;
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.rotation.z = Math.random() * 2 * Math.PI;
      scene.add(mesh);
      meshList.push(mesh);
    }
    const mouse = new THREE.Vector2();
    canvas.addEventListener('mousemove', handleMouseMove);

    function handleMouseMove(event: MouseEvent) {
      const element = event.currentTarget as HTMLElement;
      const x = event.clientX - element.offsetLeft;
      const y = event.clientY - element.offsetTop;
      const w = element.offsetWidth;
      const h = element.offsetHeight;

      // -1〜+1の範囲で現在のマウス座標を登録する
      mouse.x = (x / w) * 2 - 1;
      mouse.y = -(y / h) * 2 + 1;
    }

    const raycaster = new THREE.Raycaster();
    tick();

    function tick() {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshList);

      meshList.forEach((mesh: THREE.Mesh) => {
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (intersects.length > 0 && mesh === intersects[0].object) {
          material.color.setHex(0xff0000);
        } else {
          material.color.setHex(0xffffff);
        }
      });

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
  }
}
