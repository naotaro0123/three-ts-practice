import * as THREE from 'three';
import Camera from '../Objects/Camera';
import Course, { MAX_FRAME } from '../Objects/Course';
import Truck from '../Objects/Truck';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

class VectorOut {
  private width: number;
  private height: number;
  private renderer: THREE.WebGLRenderer;
  private camera: Camera;
  private scene: THREE.Scene;
  private course: Course;
  private truck: Truck;
  private frame: number;
  private controller: TrackballControls;

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new Camera();
    this.camera.position.set(10, 10, 30);

    this.scene = new THREE.Scene();
    this.frame = 0;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.scene.add(directionalLight);

    const gridHelper = new THREE.GridHelper(50, 30);
    gridHelper.position.y = -10;
    this.scene.add(gridHelper);

    this.course = new Course();
    this.scene.add(this.course);

    this.truck = new Truck();
    this.truck.scale.multiplyScalar(0.5);
    this.truck.position.copy(this.course.points[0]);
    this.scene.add(this.truck);

    this.controller = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    this.controller.noPan = true;
    this.controller.rotateSpeed = 10;
    this.controller.minDistance = 0;
    this.controller.maxDistance = 1000;

    this.tick();
  }

  tick(): void {
    requestAnimationFrame(() => this.tick());
    this.camera.update();
    this.frame++;
    if (this.frame > MAX_FRAME) {
      this.frame = 0;
    }

    const normal = this.getNormal(
      this.course.points[this.frame],
      this.course.points[this.frame + 1]
    );

    this.truck.position.copy(this.course.points[this.frame]);
    this.truck.up.set(normal.x, normal.y, normal.z);
    this.truck.lookAt(this.course.points[this.frame + 1]);
    this.controller.update();
    this.renderer.render(this.scene, this.camera);
  }

  getNormal(
    currentPoint: THREE.Vector3,
    nextPoint: THREE.Vector3
  ): THREE.Vector3 {
    const frontVec = currentPoint
      .clone()
      .sub(nextPoint)
      .normalize();
    const sideVec = new THREE.Vector3(0, 0, -1);
    const normalVec = frontVec.cross(sideVec);
    return normalVec;
  }
}

export default VectorOut;
