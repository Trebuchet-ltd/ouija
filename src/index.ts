import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { letterPositions } from './utils/utils';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
let coinObject; // To store the loaded coin


camera.position.set(0, 1, 5);

const word = "Rohit".toUpperCase();
let currentIndex = 0;
const constantY = 0.1; // Y remains constant

function setupScene() {
    new GLTFLoader().load('models/board.glb', function (board) {
        board.scene.rotation.y = Math.PI;
        scene.add(board.scene);
    }, undefined, console.error);

    new GLTFLoader().load('models/coin.glb', function (gltf) {
        coinObject = gltf.scene;
        coinObject.position.set(letterPositions[word[0]].x, constantY, letterPositions[word[0]].z);
        coinObject.scale.set(0.5, 0.5, 0.5);
        scene.add(coinObject);
    }, undefined, function (error) {
        console.error("Failed to load the coin model:", error);
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

function animate() {
    if (!renderer.xr.isPresenting) return;

    renderer.render(scene, camera);
}

function moveCoinToNextLetter() {
    if (currentIndex >= word.length - 1) {
        console.log("Reached the end of the word.");
        return;
    }

    currentIndex++;
    const nextLetter = word[currentIndex];
    const targetX = letterPositions[nextLetter].x;
    const targetZ = letterPositions[nextLetter].z;

    if (coinObject) {
        moveCoinSmoothly(coinObject, targetX, constantY, targetZ);
    } else {
        console.error("Coin object is not available.");
    }
}

function moveCoinSmoothly(coin, targetX, targetY, targetZ) {
    const dx = (targetX - coin.position.x) * 0.1;
    const dz = (targetZ - coin.position.z) * 0.1;

    if (Math.abs(dx) > 0.001 || Math.abs(dz) > 0.001) {
        coin.position.x += dx;
        coin.position.z += dz;
        requestAnimationFrame(() => moveCoinSmoothly(coin, targetX, targetY, targetZ));
    } else {
        coin.position.set(targetX, targetY, targetZ);
        if (currentIndex < word.length - 1) {
            setTimeout(moveCoinToNextLetter, 2000);  // Wait 5 seconds before moving to the next letter
        }
    }
}

setup();
setTimeout(moveCoinToNextLetter, 2000);  // Start moving after 5 seconds to allow setup to complete
