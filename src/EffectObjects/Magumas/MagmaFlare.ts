import * as THREE from 'three';
import Magma from './Magma';
import Aura from './Aura';
import InGlow from './InGlow';
import FlareEmitter from './FlareEmitter';
import SparkEmitter from './SparkEmitter';
import OutGlow from './OutGlow';

export default class MagmaFlare extends THREE.Object3D {
  private _magma: Magma;
  private _aura: Aura;
  private _inGlow: InGlow;
  private _flareEmitter: FlareEmitter;
  private _sparkEmitter: SparkEmitter;
  // 背景グロー
  private _outGlow: OutGlow;

  constructor() {
    super();

    this._magma = new Magma();
    this._aura = new Aura();
    this._inGlow = new InGlow();
    this._flareEmitter = new FlareEmitter();
    this._sparkEmitter = new SparkEmitter();
    this._outGlow = new OutGlow();

    this.add(this._magma);
    this.add(this._aura);
    this.add(this._inGlow);
    this.add(this._flareEmitter);
    this.add(this._sparkEmitter);
    this.add(this._outGlow);
  }

  public update() {
    this._magma.update();
    this._aura.update();
    this._flareEmitter.update();
    this._sparkEmitter.update();
  }
}
