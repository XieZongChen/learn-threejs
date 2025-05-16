import * as THREE from 'three';
import { BaseStage, type IStageBaseOptions } from './base';

export class PerspectiveCameraStage extends BaseStage {
  perspectiveCamera: THREE.PerspectiveCamera;
  cameraHelper: THREE.CameraHelper;
  constructor(option: IStageBaseOptions) {
    super(option);

    this.perspectiveCamera = new THREE.PerspectiveCamera(20, 16 / 9, 100, 300);
    this.cameraHelper = new THREE.CameraHelper(this.perspectiveCamera);
    this.scene.add(this.cameraHelper);

    this.camera.position.set(500, 500, 500);
    this.camera.lookAt(0, 0, 0);

    this.createGUI();
  }

  private onGUIChange = () => {
    this.perspectiveCamera.updateProjectionMatrix();
    this.cameraHelper.update();
  };

  private createGUI = () => {
    this.GUI.add(this.perspectiveCamera, 'fov', [30, 60, 10]).onChange(
      this.onGUIChange
    );
    this.GUI.add(this.perspectiveCamera, 'aspect', {
      '16/9': 16 / 9,
      '4/3': 4 / 3,
    }).onChange(this.onGUIChange);
    this.GUI.add(this.perspectiveCamera, 'near', 0, 300).onChange(
      this.onGUIChange
    );
    this.GUI.add(this.perspectiveCamera, 'far', 300, 800).onChange(
      this.onGUIChange
    );
  };

  clear(): void {
    this.scene.remove(this.perspectiveCamera);
    this.GUI.destroy();
  }
}
