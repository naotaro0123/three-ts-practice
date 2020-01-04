import * as THREE from 'three';
import { TweenMax, Bounce } from 'gsap';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

class TweenMaxSimple {
  private width: number;
  private height: number;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.Camera;
  private scene: THREE.Scene;
  private controller: TrackballControls;
  private sphere: THREE.Mesh;

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
    this.controller.rotateSpeed = 2;
    this.controller.minDistance = 200;
    this.controller.maxDistance = 1000;

    this.createMesh();
    this.tweenAnimation();
    this.tick();
  }

  createMesh() {
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(70, 20, 20),
      new THREE.MeshBasicMaterial({
        color: 0x66ff66,
        wireframe: true
      })
    );
    this.scene.add(this.sphere);

    const plane = new THREE.GridHelper(1000, 20);
    plane.position.y = -80;
    this.scene.add(plane);
  }

  tweenAnimation() {
    const durationTime = 3;
    TweenMax.fromTo(
      this.sphere.position,
      durationTime,
      {
        y: 300
      },
      {
        y: 0,
        ease: Bounce.easeOut
      }
    );
    TweenMax.to(this.sphere.position, durationTime, {
      x: -200,
      delay: durationTime
    });
    TweenMax.to(this.sphere.rotation, durationTime, {
      z: 5,
      delay: durationTime
    });
  }

  tick() {
    requestAnimationFrame(() => this.tick());
    this.controller.update();
    this.renderer.render(this.scene, this.camera);
  }
}

export default TweenMaxSimple;
