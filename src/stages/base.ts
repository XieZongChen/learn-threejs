import * as THREE from 'three';
import { Group } from '@tweenjs/tween.js';

export interface IStageBaseOptions {
  scene: THREE.Scene; // 当前显示的场景
  camera: THREE.PerspectiveCamera; // 摄像机
  tweenGroup: Group; // 动画组
}

export abstract class BaseStage {
  scene: THREE.Scene; // 当前显示的场景
  camera: THREE.PerspectiveCamera; // 摄像机
  tweenGroup: Group; // 动画组
  constructor({ scene, camera, tweenGroup }: IStageBaseOptions) {
    this.scene = scene;
    this.camera = camera;
    this.tweenGroup = tweenGroup;
  }
  abstract clear(): void;
}
