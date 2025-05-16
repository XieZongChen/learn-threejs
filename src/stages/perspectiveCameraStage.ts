import * as THREE from 'three';
import { BaseStage, type IStageBaseOptions } from './base';

export class PerspectiveCameraStage extends BaseStage {
  perspectiveCamera: THREE.PerspectiveCamera;
  constructor(option: IStageBaseOptions) {
    super(option);

    this.perspectiveCamera = new THREE.PerspectiveCamera(20, 16 / 9, 100, 300);
    const cameraHelper = new THREE.CameraHelper(this.perspectiveCamera);
    this.scene.add(cameraHelper);

    this.camera.position.set(200, 200, 200);
    this.camera.lookAt(0, 0, 0);
  }
  clear(): void {
    this.scene.remove(this.perspectiveCamera);
  }
}
