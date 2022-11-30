import "../public/index.css";
import Stars from "./Stars";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GUI } from "dat.gui";
import * as THREE from "three";
import ThirdPersonCamera from "./Camera";
import { RepeatWrapping } from "three";

async function PlaneScene() {
  const scene = new THREE.Scene();
  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    5,
    2000
  );

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

  const geometry = new THREE.SphereGeometry(
    1000,
    10,
    10,
    Math.PI * 0.75,
    Math.PI * 1.5
  );

  new THREE.TextureLoader().load("smoke.webp", (texture) => {
    texture.wrapS = texture.wrapT = RepeatWrapping;

    texture.repeat.set(0.95, 0.95);
    const material = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      color: new THREE.Color(0x3b0db7),
      opacity: 0.7,
      side: THREE.BackSide,
    });
    const concaveMesh = new THREE.Mesh(geometry, material);
    concaveMesh.position.setZ(0);
    concaveMesh.position.setY(0);
    scene.add(concaveMesh);
  });

  const gui = new GUI();

  const cameraFolder = gui.addFolder("Camera");
  const planeFolder = gui.addFolder("Plane");
  cameraFolder.add(camera.position, "z", 0, 1000);
  cameraFolder.add(camera.position, "x", 0, 1000);
  cameraFolder.add(camera.position, "y", 0, 1000);
  cameraFolder.add(camera.position, "z", 0, 1000);
  cameraFolder.add(camera.rotation, "x", 0, Math.PI * 2);
  cameraFolder.add(camera.rotation, "y", 0, Math.PI * 2);
  cameraFolder.add(camera.rotation, "z", 0, Math.PI * 2);

  // cameraFolder.open();

  camera.position.setY(10);
  camera.position.setZ(200);

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
        airplane = gltf.scene;
        gltf.scene.scale.set(0.25, 0.25, 0.25);
        gltf.scene.remove();
        gltf.scene.position.setX(-42.25);
        gltf.scene.position.setY(-10);
        // planeFolder.add(gltf.scene.position, "x", -84.5, 0);
        // planeFolder.add(gltf.scene.position, "y", -20, 20);
        // planeFolder.add(gltf.scene.position, "z", -10, 10);
        // planeFolder.add(gltf.scene.rotation, "x", 0, Math.PI * 2);
        // planeFolder.add(gltf.scene.rotation, "z", 0, Math.PI * 2);
        gltf.scene.rotateOnAxis(new THREE.Vector3(0, 1), Math.PI / 2);
        scene.add(airplane);
      })
    )
  );
  // Particles

  const galaxyMeshes = new Stars(1000).starMeshes;

  galaxyMeshes.forEach((mesh) => {
    scene.add(mesh.init());
  });

  const size = 1000;
  const divisions = 10;

  // const gridHelper = new THREE.GridHelper(size, divisions);
  // scene.add(gridHelper);
  // document.addEventListener("mousemove", onMouseMove, false);

  renderer.setClearColor(new THREE.Color(0x050010));
  const scrollContainer = document.getElementById("scroll-container");
  scrollContainer?.scroll({ behavior: "smooth" });
  let scrollPercent = 0;
  let oldScrollTop = 0;
  if (scrollContainer)
    scrollContainer.addEventListener("scroll", (event) => {
      event.preventDefault();
      const { scrollHeight, scrollTop } = scrollContainer;

      scrollPercent = Math.floor((scrollTop / scrollHeight) * 100);
      if (airplane) scene.remove(airplane);

      galaxyMeshes.forEach((mesh) =>
        mesh.updateParticles(oldScrollTop < scrollTop)
      );
      oldScrollTop = scrollTop;
    });

  const rendering = function () {
    requestAnimationFrame(rendering);
    // Constantly rotate boo
    // if (airplane) camera.lookAt(airplane?.position);

    renderer.render(scene, camera);
  };
  rendering();
}

PlaneScene();
