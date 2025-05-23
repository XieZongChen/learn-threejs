import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from '@tweenjs/tween.js';
import type { BaseStage } from './stages/base';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

export class Graphical {
  private dom!: Element; // 渲染的 DOM 元素
  private domResizeObserver!: ResizeObserver; // DOM 元素大小变化观察者
  scene: THREE.Scene; // 当前显示的场景
  camera!: THREE.PerspectiveCamera; // 摄像机
  renderer: THREE.WebGLRenderer; // 渲染器
  //   renderClock: THREE.Clock; // 渲染时钟
  tweenGroup: TWEEN.Group; // 动画组
  orbitControls!: OrbitControls; // 控制器
  curStage?: BaseStage; // 当前场景
  GUI: GUI; // GUI 控件
  constructor() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.tweenGroup = new TWEEN.Group();
    this.GUI = new GUI();
  }

  initialize({ dom }: { dom: Element }) {
    this.dom = dom;
    const width = dom.clientWidth;
    const height = dom.clientHeight;

    this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    this.camera.position.set(500, 500, 500);
    this.camera.lookAt(0, 0, 0);

    this.domResize(width, height);

    this.dom.append(this.renderer.domElement);

    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );

    this.domResizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      this.domResize(width, height);
    });
    this.domResizeObserver.observe(this.dom);
    this.render();
  }

  private domResize(width: number, height: number) {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  private render = () => {
    if (this.tweenGroup.getAll().length) {
      this.tweenGroup.update();
    }
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render);
  };

  playStage(
    StageClass: new (args: any) => BaseStage,
    options: Record<string, any> = {}
  ) {
    const newStage = new StageClass({
      scene: this.scene,
      camera: this.camera,
      tweenGroup: this.tweenGroup,
      GUI: this.GUI,
      ...options,
    });
    this.curStage = newStage;
  }

  clearStage() {
    if (this.curStage) {
      this.curStage.clear();
      this.curStage = undefined;
    }
  }
}
