import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

const cities = [];
const citiesPoints = [
  [35, 139],
  [51.2838, 0],
  [39, -116],
  [34, 118],
  [-33, 151],
  [-23, -46],
  [1, 103],
  [90, 0],
  [-90, 0]
];

class Traiangle {
  private width: number;
  private height: number;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.Camera;
  private scene: THREE.Scene;
  private controller: TrackballControls;

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 2000);
    this.camera.position.set(-250, 0, -250);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.scene = new THREE.Scene();

    this.controller = new TrackballControls(this.camera, this.renderer.domElement);
    this.controller.noPan = true;
    this.controller.minDistance = 200;
    this.controller.maxDistance = 1000;

    this.createEarth();
    this.tick();
  }

  createEarth() {
    const texture = new THREE.TextureLoader().load('./images/ground.jpg');
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(100, 40, 40),
      new THREE.MeshBasicMaterial({ map: texture })
    );
    this.scene.add(earth);

    const japan = this.createPoint(0xff0000, 35, 139);
    this.scene.add(japan);

    citiesPoints.forEach((points, index) => {
      const latitude = points[0];
      const longitude = points[1];
      const point = this.createPoint(
        index === 0 ? 0xff0000 : latitude === 90 ? 0x0000ff : 0x00ff00,
        latitude,
        longitude
      );
      const line = this.createLine(japan.position, point.position);
      this.scene.add(line);
      this.scene.add(point);
      cities.push(point);
    });
  }

  createLine(startPoint: THREE.Vector3, endPoint: THREE.Vector3) {
    const geometry = new THREE.Geometry();
    geometry.vertices = this.getOrbitPoints(startPoint, endPoint, 15);
    return new THREE.Line(geometry, new THREE.LineBasicMaterial({ linewidth: 8, color: 0x00ffff }));
  }

  getOrbitPoints(startPos: THREE.Vector3, endPos: THREE.Vector3, segmentNum: number) {
    const vertices = [];
    const startVec = startPos.clone();
    const endVec = endPos.clone();
    // ２つのベクトルの回転軸
    const axis = startVec.clone().cross(endVec);
    // 軸ベクトルを単位ベクトルへ
    axis.normalize();
    // 二つのベクトルが織りなす角度
    const angle = startVec.angleTo(endVec);
    for (let i = 0; i < segmentNum; i++) {
      const q = new THREE.Quaternion();
      q.setFromAxisAngle(axis, (angle / segmentNum) * i);
      // ベクトルを回転させる
      const vertex = startVec.clone().applyQuaternion(q);
      vertices.push(vertex);
    }

    vertices.push(endVec);
    return vertices;
  }

  createPoint(color: any, latitude = 0, longitude = 0): THREE.Mesh {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(2),
      new THREE.MeshBasicMaterial({ color })
    );
    sphere.position.copy(this.translateGeoCoords(latitude, longitude, 100));
    return sphere;
  }

  translateGeoCoords(latitude: number, longitude: number, radius: number): THREE.Vector3 {
    const phi = (latitude * Math.PI) / 180;
    const theta = ((longitude - 180) * Math.PI) / 180;
    const x = -radius * Math.cos(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi);
    const z = radius * Math.cos(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  }

  tick() {
    requestAnimationFrame(() => this.tick());
    this.controller.update();
    this.renderer.render(this.scene, this.camera);
  }
}

export default Traiangle;
