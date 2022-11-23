import "../public/index.css";
import Galaxy from "./galaxy";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GUI } from "dat.gui";
import * as THREE from "three";
import ThirdPersonCamera from "./camera";

async function PlaneScene() {
  const scene = new THREE.Scene();
  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    2,
    1200
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

  // const galaxyGeometry = new THREE.PlaneGeometry();

  // galaxyGeometry.setAttribute(
  //   "position",
  //   new THREE.BufferAttribute(positionArray, 3)
  // );

  // const nebulaMesh = new THREE.Points(
  //   galaxyGeometry,
  //   new THREE.PointsMaterial({
  //     size: 100,
  //     transparent: true,
  //     map: new THREE.TextureLoader().load("smoke.webp"),
  //   })
  // );

  // scene.add(nebulaMesh);
  const positionArray = new Float32Array(1000 * 3);

  const geometry = new THREE.PlaneGeometry(10000, 10000);
  const material = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("smoke.webp"),
    transparent: true,
    color: new THREE.Color(0x3b0db7),
  });

  for (let i = 0; i < 1000; i++) {
    positionArray[i] = (Math.random() - 0.75) * 1000;
  }

  const plane = new THREE.Mesh(geometry, material);
  plane.position.setZ(-1000);
  scene.add(plane);

  const gui = new GUI();

  const cameraFolder = gui.addFolder("Camera");
  const planeFolder = gui.addFolder("Plane");
  // cameraFolder.add(camera.position, "z", 0, 1000);
  cameraFolder.add(camera.position, "x", 0, 1000);
  cameraFolder.add(camera.position, "y", 0, 1000);
  cameraFolder.add(camera.position, "z", 0, 1000);
  cameraFolder.add(camera.rotation, "x", 0, Math.PI * 2);
  cameraFolder.add(camera.rotation, "y", 0, Math.PI * 2);
  cameraFolder.add(camera.rotation, "z", 0, Math.PI * 2);

  cameraFolder.open();

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
        gltf.scene.scale.set(0.5, 0.5, 0.5);

        gltf.scene.position.setX(-42.25);
        gltf.scene.position.setY(-10);
        planeFolder.add(gltf.scene.position, "x", -84.5, 0);
        planeFolder.add(gltf.scene.position, "y", -20, 20);
        planeFolder.add(gltf.scene.position, "z", -10, 10);
        planeFolder.add(gltf.scene.rotation, "x", 0, Math.PI * 2);
        planeFolder.add(gltf.scene.rotation, "z", 0, Math.PI * 2);
        gltf.scene.rotateOnAxis(
          new THREE.Vector3(Math.sin(4) * 0.1, 1),
          Math.PI / 2
        );
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

  const galaxyMeshes = new Galaxy(2500).galaxyMeshes;

  galaxyMeshes.forEach((mesh) => {
    scene.add(mesh.init());
  });

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

  const size = 1000;
  const divisions = 10;

  // const gridHelper = new THREE.GridHelper(size, divisions);
  // scene.add(gridHelper);
  // document.addEventListener("mousemove", onMouseMove, false);

  const scrollContainer = document.getElementById("scroll-container");
  scrollContainer?.scroll({ behavior: "smooth" });
  let scrollPercent = 0;
  let oldScrollTop = 0;
  if (scrollContainer)
    scrollContainer.addEventListener("scroll", (event) => {
      event.preventDefault();
      const { scrollHeight, scrollTop } = scrollContainer;

      scrollPercent = Math.floor((scrollTop / scrollHeight) * 100);

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
