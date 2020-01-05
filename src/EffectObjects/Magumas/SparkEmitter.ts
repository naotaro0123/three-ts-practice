import * as THREE from 'three';
import Spark from './Spark';

export default class SparkEmitter extends THREE.Object3D {
  private _sparkList: Spark[] = [];
  private _sparkNum = 50;

  constructor() {
    super();

    let perAngle = 360 / this._sparkNum;
    for (let i = 0; i < this._sparkNum; i++) {
      let rad = perAngle * i * Math.PI / 180;
      let spark = new Spark();
      spark.rotation.x = 360 * Math.sin(rad);
      spark.rotation.z = rad;
      this.add(spark);
      this._sparkList.push(spark);
    }
  }

  public update() {
    this._sparkList.forEach(spark => {
      spark.update();
    })
  }
}
