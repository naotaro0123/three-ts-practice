import * as THREE from 'three';

class Truck extends THREE.Object3D {
  constructor() {
    super();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 6),
      new THREE.MeshPhongMaterial({
        color: 0xcccccc
      })
    );
    body.position.y = 3;
    this.add(body);

    const wheel1 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1, 1, 4, 10),
      new THREE.MeshPhongMaterial({
        color: 0xffff00
      })
    );
    wheel1.rotation.x = wheel1.rotation.z = (90 * Math.PI) / 180;
    wheel1.position.y = 1;
    wheel1.position.z = -2;
    this.add(wheel1);

    const wheel2 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(1, 1, 4, 10),
      new THREE.MeshPhongMaterial({
        color: 0xffff00
      })
    );
    wheel2.rotation.x = wheel2.rotation.z = (90 * Math.PI) / 180;
    wheel2.position.y = 1;
    wheel2.position.z = 2;
    this.add(wheel2);
  }

  update() {}
}

export default Truck;
