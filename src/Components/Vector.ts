import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
const RADIUS = 150;

class Vector {
  private width: number;
  private height: number;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.Camera;
  private scene: THREE.Scene;
  private controller: TrackballControls;
  private degree = 0;
  private frontVector = new THREE.Vector3(0, -1, 0);
  private sphere: THREE.Mesh;
  private helper: THREE.ArrowHelper;
  private centerhelper: THREE.ArrowHelper;

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      1,
      10000
    );
    this.camera.position.set(0, 0, -400);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.scene = new THREE.Scene();

    this.controller = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    this.controller.noPan = true;
    this.controller.minDistance = 200;
    this.controller.maxDistance = 1000;

    this.createMesh();
    this.tick();
  }

  createMesh() {
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(10),
      new THREE.MeshBasicMaterial({
        color: 0xcc0000,
        wireframe: true
      })
    );
    this.scene.add(this.sphere);

    this.helper = new THREE.ArrowHelper(
      this.frontVector,
      new THREE.Vector3(0, 0, 0),
      20
    );
    this.scene.add(this.helper);

    this.centerhelper = new THREE.ArrowHelper(
      this.frontVector,
      new THREE.Vector3(0, 0, 0),
      40
    );
    this.scene.add(this.centerhelper);

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(70, 20, 20),
      new THREE.MeshBasicMaterial({
        color: 0x666666,
        wireframe: true
      })
    );
    this.scene.add(earth);

    const plane = new THREE.GridHelper(1000, 20);
    plane.position.y = -80;
    this.scene.add(plane);
  }

  tick() {
    requestAnimationFrame(() => this.tick());
    this.degree -= 2;
    const oldPosition = this.sphere.position.clone();
    const newPosition = this.getCircularMotionPosition(this.degree);
    // oldPostion - newPositionで進んでいる方向のベクトルを算出
    this.frontVector = newPosition.clone().sub(oldPosition);
    // 単位ベクトルに変換
    this.frontVector = this.frontVector.normalize();

    this.sphere.position.copy(newPosition);
    this.helper.position.copy(newPosition);
    this.helper.setDirection(this.frontVector);

    // // 正面ベクトルに対して逆向きのベクトル
    // const backVector = this.frontVector.clone().negate();
    // const distance = 200;
    // // 逆向きベクトルを距離分引き伸ばす
    // backVector.multiplyScalar(distance);

    // // カメラ位置を算出
    // const cameraPosition = backVector.add(this.sphere.position);
    // this.camera.position.copy(cameraPosition);
    // this.camera.lookAt(this.sphere.position);

    // oldPostion + newPositionでsphereの位置ベクトルを算出
    this.frontVector = newPosition.clone().add(oldPosition);
    this.frontVector = this.frontVector.normalize();

    this.centerhelper.setDirection(this.frontVector);

    this.controller.update();
    this.renderer.render(this.scene, this.camera);
  }

  getCircularMotionPosition(degree: number): THREE.Vector3 {
    const rad = (degree * Math.PI) / 180;
    const x = RADIUS * Math.cos(rad);
    const y = (RADIUS * Math.sin(rad * 1.5)) / 7;
    const z = RADIUS * Math.sin(rad);
    return new THREE.Vector3(x, y, z);
  }
}

export default Vector;
