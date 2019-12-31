import * as THREE from 'three';

class Camera extends THREE.PerspectiveCamera {
  constructor() {
    super(45, window.innerWidth / window.innerHeight, 10, 500);
  }

  update() {
    this.lookAt(new THREE.Vector3(0, 0, 0));
  }
}

export default Camera;
