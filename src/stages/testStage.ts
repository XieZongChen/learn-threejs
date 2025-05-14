import * as THREE from 'three';
import { BaseStage, type IStageBaseOptions } from './base';
import { Easing, Group, Tween } from '@tweenjs/tween.js';

export interface ITestStageOptions extends IStageBaseOptions {
  setMsg: (message: string) => void;
}

export class TestStage extends BaseStage {
  axesHelper: THREE.AxesHelper;
  directionalLight: THREE.DirectionalLight;
  ambientLight: THREE.AmbientLight;
  mesh: THREE.Group;
  setMsg: (message: string) => void;
  constructor(options: ITestStageOptions) {
    super(options);
    this.setMsg = options.setMsg;

    this.axesHelper = new THREE.AxesHelper(500);
    this.scene.add(this.axesHelper);

    this.directionalLight = new THREE.DirectionalLight(0xffffff);
    this.directionalLight.position.set(500, 400, 300);
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(this.ambientLight);

    this.mesh = new THREE.Group();
    this.initMesh();

    this.scene.add(this.mesh);
  }

  private initMesh() {
    this.mesh.add(this.createBox('red', 0));
    this.mesh.add(this.createBox('blue', 300));
    this.mesh.add(this.createBox('green', -300));
  }

  private createBox(color: string, x: number) {
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshPhongMaterial({
      color: color,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = x;
    mesh.name = color;
    return mesh;
  }

  clear() {
    this.scene.remove(this.axesHelper);
    this.scene.remove(this.directionalLight);
    this.scene.remove(this.ambientLight);
    this.scene.remove(this.mesh);
  }

  jumpBox = (color: string) => {
    const box = this.mesh.getObjectByName(color);
    if (!box) return;
    const tween = new Tween(box.position)
      .to(
        {
          ...box.position,
          y: 100,
        },
        1000
      )
      .easing(Easing.Quadratic.InOut)
      .repeat(0)
      .start()
      .onComplete(() => {
        this.tweenGroup.remove(tween);
        this.setMsg(color + '已经 jump 完成');
      });
    this.tweenGroup.add(tween);
  };
}
