import * as THREE from 'three';

export enum Directions {
  left = 'left',
  right = 'right'
}

export default class Camera extends THREE.PerspectiveCamera {
  private static _instance: Camera;

  public static getInstance(): Camera {
    return Camera._instance || new Camera();
  }

  private _angle = 0;
  private _radius = 20;

  constructor() {
    super(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.position.set(this._radius, 4, 0);
    Camera._instance = this;
  }

  public rotate(direction: Directions) {
    if (direction === Directions.left) {
      this._angle -= 0.5;
    } else if (direction === Directions.right) {
      this._angle += 0.5;
    }
  }

  public update() {
    this._angle += 0.3;
    let lad = (this._angle * Math.PI) / 180;
    this.position.x = this._radius * Math.sin(lad);
    this.position.z = this._radius * Math.cos(lad);
    this.lookAt(new THREE.Vector3(0, 0, 0));
  }
}
