import * as THREE from 'three';
const PARTICLE_NUM = 3000;
const COLOR_LIST = [0xffff00, 0xffffdd, 0xffffff];
const RADIUS = 50;

class ParticleEmitter extends THREE.Object3D {
  private _particleStore: THREE.Sprite[];

  constructor() {
    super();

    this._particleStore = [];

    const loader = new THREE.TextureLoader();
    const texture = loader.load('../images/particle.png');

    for (let i = 0; i < PARTICLE_NUM; i++) {
      const particle = this.createParticle(texture);
      this.add(particle);
      this._particleStore.push(particle);
    }
  }

  private createParticle(texture: THREE.Texture) {
    const rand = Math.floor(Math.random() * COLOR_LIST.length);
    const color = COLOR_LIST[rand];

    const material = new THREE.SpriteMaterial({
      color,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.3
    });

    const sprite = new THREE.Sprite(material);

    const phi = ((Math.random() * 180 - 90) * Math.PI) / 180;
    const theta = (Math.random() * 360 * Math.PI) / 180;
    const radius = RADIUS;
    sprite.position.x = radius * Math.cos(phi) * Math.cos(theta) * -1;
    sprite.position.y = radius * Math.sin(phi);
    sprite.position.z = radius * Math.cos(phi) * Math.sin(theta);
    sprite.scale.multiplyScalar(Math.random() * 5 + 1);
    return sprite;
  }

  update(lightFrontVector: THREE.Vector3, aperture: number) {
    const target = lightFrontVector.clone();
    this._particleStore.map(particle => {
      const dot = particle.position
        .clone()
        .normalize()
        .dot(target);
      const tempAperture = 0.2;
      const numerator = dot - (1 - tempAperture);
      let opacity = numerator / aperture;
      opacity *= Math.random();
      particle.material.opacity = opacity;
    });
  }
}

export default ParticleEmitter;
