import "../public/index.css";
import Galaxy from "./galaxy";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import * as THREE from "three";

async function PlaneScene() {
  const scene = new THREE.Scene();
  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1200
  );

  camera.position.z = 100;
  camera.position.y = 10;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor("#00000");
  renderer.setSize(window.innerWidth, window.innerHeight);
  const parentCanvas = document.querySelector("body");
  if (parentCanvas) parentCanvas.appendChild(renderer.domElement);
  // Make Canvas Responsive
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  //light

  const directionalLight = new THREE.DirectionalLight(undefined, 2);
  directionalLight.position.set(0, 5, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;

  console.log(directionalLight);
  const lightHolder = new THREE.Group();
  lightHolder.add(directionalLight);
  scene.add(lightHolder);

  // Object Load
  const loader = new GLTFLoader();
  let airplane: THREE.Group | null = null;
  await new Promise((res) =>
    res(
      loader.load("BB_Paper_Plane.gltf", function (gltf) {
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.x += gltf.scene.position.x - center.x;
        gltf.scene.position.y += gltf.scene.position.y - center.y;
        gltf.scene.position.z += gltf.scene.position.z - center.z;
        airplane = gltf.scene;
        gltf.scene.scale.set(0.5, 0.5, 0.5);
        gltf.scene.rotation.y = Math.PI / 2;
        scene.add(gltf.scene);
      })
    )
  );
  // Particles

  const video = document.getElementById("video");
  if (video) {
    const texture = new THREE.VideoTexture(video as HTMLVideoElement);
    const material = new THREE.SpriteMaterial({
      map: texture,
    });

    const sprite = new THREE.Sprite(material);

    sprite.scale.set(100, 100, 100);
    scene.add(sprite);
  }

  const galaxyMeshes = new Galaxy(500).galaxyMeshes;

  galaxyMeshes.forEach((mesh) => scene.add(mesh.init()));

  let [mouseX, mouseY]: number[] = [0, 0];
  function onMouseMove(event: MouseEvent) {
    event.preventDefault();
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;

    camera.position.x += (mouseX - camera.position.x) * 0.001;
    camera.position.y += (-mouseY - camera.position.y) * 0.001;
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  document.addEventListener("mousemove", onMouseMove, false);

  console.log(camera);
  const rendering = function () {
    requestAnimationFrame(rendering);
    // Constantly rotate boo
    if (airplane) camera.lookAt(airplane?.position);
    galaxyMeshes.forEach((mesh) => mesh.updateParticles());

    renderer.render(scene, camera);
  };
  rendering();
}

PlaneScene();
