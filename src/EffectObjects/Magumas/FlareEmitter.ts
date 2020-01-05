import * as THREE from 'three';
import Flare from './Flare';

export default class FlareEmitter extends THREE.Object3D {
  private _flareNum = 10;
  private _flareList: Flare[] = [];

  constructor() {
    super();

    let perAngle = 360 / this._flareNum;
    for (let i = 0; i < this._flareNum; i++) {
      let rad = perAngle * i * Math.PI / 180;
      let flare = new Flare();
      flare.position.x = rad;
      flare.position.y = rad;
      flare.position.z = rad / 2;
      this.add(flare);
      this._flareList.push(flare);
    }
  }

  public update() {
    this._flareList.forEach(flare => {
      flare.update();
    })
  }
}
