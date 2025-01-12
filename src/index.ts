import {VRButton} from 'three/examples/jsm/webxr/VRButton';
import * as THREE from 'three';
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
const coin = new Promise<GLTF>((resolve, reject) =>
    new GLTFLoader().load('models/coin.glb', resolve, undefined, reject));

camera.position.set(0, 1, 5);  // Set the camera position to ensure it's not inside the cube

function setupScene() {
    const loader = new GLTFLoader();

    loader.load('models/board.glb', (board) => {
            board.scene.rotation.y = Math.PI;
            scene.add(board.scene)
        }, undefined,
        console.error);
    coin.then((coin) => {
        coin.scene.position.set(0, 0.1, 0);
        coin.scene.scale.set(0.5, 0.5, 0.5);
        scene.add(coin.scene);
    });

    const hLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hLight.position.set(0, 200, 0);
    scene.add(hLight);
}

function setup() {
    setupScene();

    renderer.xr.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));

    renderer.setAnimationLoop(animate);
}

function animate() {
    if (!renderer.xr.isPresenting) return;

    // Move coin
    coin.then((coin) => {
        coin.scene.position.x = (coin.scene.position.x + 0.001) % 0.5;
    });

    renderer.render(scene, camera);  // Always render, let Three.js handle the VR presentation check
}

setup();
