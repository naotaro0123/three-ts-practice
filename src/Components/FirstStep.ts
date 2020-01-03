import * as THREE from 'three';

export default function FirstStep() {
  let mouseX = 0;
  document.addEventListener('mousemove', event => {
    mouseX = event.pageX;
  });

  init();

  function init() {
    const width = 960;
    const height = 540;
    let rot = 0;

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
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, 1000);

    const geometry = new THREE.SphereGeometry(300, 30, 30);
    const material = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load('../images/earthmap1k.jpg')
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    createStarField();

    function createStarField() {
      const geometry = new THREE.Geometry();
      for (let i = 0; i < 1000; i++) {
        geometry.vertices.push(
          new THREE.Vector3(
            3000 * (Math.random() - 0.5),
            3000 * (Math.random() - 0.5),
            3000 * (Math.random() - 0.5)
          )
        );
        const material = new THREE.PointsMaterial({
          size: 10,
          color: 0xffffff
        });
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
      }
    }

    tick();

    function tick() {
      const targetRot = (mouseX / window.innerWidth) * 360;
      // イージングの公式 => 値 += (目標値 - 現在の値) * 減速値
      rot += (targetRot - rot) * 0.02;
      const radian = (rot * Math.PI) / 180;
      camera.position.x = 1000 * Math.sin(radian);
      camera.position.z = 1000 * Math.cos(radian);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
  }
}
