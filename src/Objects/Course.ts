import * as THREE from 'three';

export const MAX_FRAME = 360;
class Course extends THREE.Object3D {
  private _points: THREE.Vector3[] = [];

  get points() {
    return this._points;
  }

  constructor() {
    super();

    let radius = 5;
    for (let i = 0; i <= MAX_FRAME; i++) {
      let rad = (i * Math.PI) / 180;
      let sin = Math.sin(rad * 3);
      let x = radius * Math.cos(rad) * 2 + sin * 2;
      let y = radius * Math.sin(rad) + sin * 3;
      this._points.push(new THREE.Vector3(x, y, 0));
    }

    const material = new THREE.LineBasicMaterial({
      color: 0xff0000
    });
    const geometry = new THREE.Geometry();
    geometry.vertices = this._points;

    const line = new THREE.Line(geometry, material);
    this.add(line);
  }
}

export default Course;
