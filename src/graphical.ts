import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface IGraphicalOptions {
    dom: Element;
}

export class Graphical {
    dom: Element; // 渲染的 DOM 元素
    domResizeObserver: ResizeObserver; // DOM 元素大小变化观察者
    curScene: THREE.Scene; // 当前显示的场景
    camera: THREE.PerspectiveCamera; // 摄像机
    renderer: THREE.WebGLRenderer; // 渲染器
    renderClock: THREE.Clock; // 渲染时钟
    orbitControls: OrbitControls; // 控制器

    constructor({ dom }: IGraphicalOptions) {
        this.dom = dom;
        this.domResizeObserver = new ResizeObserver(this.domResize)
        this.domResizeObserver.observe(this.dom);

        this.curScene = new THREE.Scene();

        const width = dom.clientWidth;
        const height = dom.clientHeight;
        this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
        this.camera.position.set(500, 500, 500);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);

        this.renderClock = new THREE.Clock();

        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);

        this.render()
    }

    private render() {
        this.renderer.render(this.curScene, this.camera);
        requestAnimationFrame(this.render);
    }

    private domResize(entries: ResizeObserverEntry[]) {
        const entry = entries[0];
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;

        this.renderer.setSize(width, height);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}