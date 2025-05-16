import * as THREE from 'three';
import { Group } from '@tweenjs/tween.js';
import type GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

export interface IStageBaseOptions {
  scene: THREE.Scene; // 当前显示的场景
  camera: THREE.PerspectiveCamera; // 摄像机
  tweenGroup: Group; // 动画组
  GUI: GUI; // GUI 控件
}

export abstract class BaseStage {
  scene: THREE.Scene; // 当前显示的场景
  camera: THREE.PerspectiveCamera; // 摄像机
  tweenGroup: Group; // 动画组
  GUI: GUI; // GUI 控件
  constructor({ scene, camera, tweenGroup, GUI }: IStageBaseOptions) {
    this.scene = scene;
    this.camera = camera;
    this.tweenGroup = tweenGroup;
    this.GUI = GUI;
  }
  abstract clear(): void;
}
