import * as THREE from 'three';
import {VRButton} from 'three/examples/jsm/webxr/VRButton';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {getLetterPosition, letterToPosition} from "./utils/utils";
import Animator2D from "./utils/animator";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

const coin = new Promise<THREE.Group<THREE.Object3DEventMap>>((resolve, reject) => {
    new GLTFLoader().load('models/coin.glb', (gltf) => resolve(gltf.scene), undefined, reject);
});

const animator = new Animator2D();

function setupScene() {
    new GLTFLoader().load('models/board.glb', function (board) {
        scene.add(board.scene);
    }, undefined, console.error);

    coin.then((coinObject) => {
        coinObject.scale.set(0.5, 1, 0.5);
        scene.add(coinObject);
    });

    const hLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hLight.position.set(0, 200, 0);
    scene.add(hLight);
}

function setup() {
    renderer.xr.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));

    setupScene();
    renderer.setAnimationLoop(animate);
}

function nextQuestion() {
    const question = prompt("Enter a question");
    if(question) {
        animator.setText(question);
    }
}

function animate() {
    if (!renderer.xr.isPresenting || animator.isDone()) return;

    renderer.render(scene, camera);
    const newPosition = animator.step();
    coin.then((it) => it.position.set(newPosition.x, 0, newPosition.y));

    if(animator.isDone()) {
        nextQuestion();
    }
}


setup();
nextQuestion();



