/**
 * Created by GV Sharma on 9/16/2016.
 */
var camera, scene, renderer;
var cameraControls;

var clock = new THREE.Clock();

function fillScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x808080, 2000, 4000);
    var ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
    var light = new THREE.DirectionalLight(0xffffff, 0.7);
    light.position.set(200, 500, 500);
    scene.add(light);
    createDrinkingBird();
}

function createDrinkingBird() {
    var headMaterial = new THREE.MeshLambertMaterial();
    headMaterial.color.r = 104 / 255;
    headMaterial.color.g = 1 / 255;
    headMaterial.color.b = 1 / 255;

    var hatMaterial = new THREE.MeshLambertMaterial();
    hatMaterial.color.r = 24 / 255;
    hatMaterial.color.g = 38 / 255;
    hatMaterial.color.b = 77 / 255;

    var bodyMaterial = new THREE.MeshLambertMaterial();
    // bodyMaterial.setRGB(91 / 255, 86 / 255, 169 / 255);
    hatMaterial.color.r = 91 / 255;
    hatMaterial.color.g = 86 / 255;
    hatMaterial.color.b = 169 / 255;

    var legMaterial = new THREE.MeshLambertMaterial();
    legMaterial.color.setHex(0xada79b);

    var footMaterial = new THREE.MeshLambertMaterial({color: 0x960f0b});

    var sphere, cylinder, cube;
    var bevelRadius = 0.9;

    cube = new THREE.Mesh(new THREE.CubeGeometry(20 + 64 + 110, 4, 2 * 77 + 12, bevelRadius), footMaterial);
    cube.position.x = -45;
    cube.position.y = 4 / 2;
    cube.position.z = 0;
    scene.add(cube);

    cube = new THREE.Mesh(new THREE.CubeGeometry(20 + 64 + 110, 52, 6, bevelRadius), footMaterial);
    cube.position.x = -45;
    cube.position.y = 52 / 2;
    cube.position.z = 77 + 6 / 2;
    scene.add(cube);

    cube = new THREE.Mesh(new THREE.CubeGeometry(20 + 64 + 110, 52, 6, bevelRadius), footMaterial);
    cube.position.x = -45;
    cube.position.y = 52 / 2;
    cube.position.z = -77 + 6 / 2;
    scene.add(cube);

    cube = new THREE.Mesh(new THREE.CubeGeometry(64, 104, 6, bevelRadius), footMaterial);
    cube.position.x = 0;
    cube.position.y = 104;
    cube.position.z = 77 + 6 / 2;
    scene.add(cube);

    cube = new THREE.Mesh(new THREE.CubeGeometry(64, 104, 6, bevelRadius), footMaterial);
    cube.position.x = 0;
    cube.position.y = 104;
    cube.position.z = -77 + 6 / 2;
    scene.add(cube);

    cube = new THREE.Mesh(new THREE.CubeGeometry(64, 282 + 4, 4, bevelRadius), legMaterial);
    cube.position.x = 0;
    cube.position.y = 104 + 282 / 2 - 2;
    cube.position.z = 77 + 6 / 2;
    scene.add(cube);

    cube = new THREE.Mesh(new THREE.CubeGeometry(64, 282 + 4, 4, bevelRadius), legMaterial);
    cube.position.x = 0;
    cube.position.y = 104 + 282 / 2 - 2;
    cube.position.z = -77 + 6 / 2;
    scene.add(cube);

    sphere = new THREE.Mesh(new THREE.SphereGeometry(116 / 2, 32, 16), bodyMaterial);
    sphere.position.x = 0;
    sphere.position.y = 160;
    sphere.position.z = 0;
    scene.add(sphere);

    cylinder = new THREE.Mesh(new THREE.CylinderGeometry(24 / 2, 24 / 2, 390, 32), bodyMaterial);
    cylinder.position.x = 0;
    cylinder.position.y = 160 + 390 / 2;
    cylinder.position.z = 0;
    scene.add(cylinder);

    sphere = new THREE.Mesh(
        new THREE.SphereGeometry(104 / 2, 32, 16), headMaterial);
    sphere.position.x = 0;
    sphere.position.y = 160 + 390;
    sphere.position.z = 0;
    scene.add(sphere);

    cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(142 / 2, 142 / 2, 10, 32), hatMaterial);
    cylinder.position.x = 0;
    cylinder.position.y = 160 + 390 + 40 + 10 / 2;
    cylinder.position.z = 0;
    scene.add(cylinder);

    cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(80 / 2, 80 / 2, 70, 32), hatMaterial);
    cylinder.position.x = 0;
    cylinder.position.y = 160 + 390 + 40 + 10 + 70 / 2;
    cylinder.position.z = 0;
    scene.add(cylinder);

    addToDOM();
}

function init() {
    var width = 894;
    var height = 494;
    var ratio = width / height;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(width, height);

    camera = new THREE.PerspectiveCamera(45, ratio, 1, 4000);
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(-480, 659, -619);
    cameraControls.target.set(4, 301, 92);

    fillScene();
}

function addToDOM() {
    document.body.appendChild(renderer.domElement);
    console.log("addToDOM");
    animate();
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

function render() {
    var delta = clock.getDelta();
    cameraControls.update(delta);

    renderer.render(scene, camera);
}

try {
    init();
} catch (e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    console.log(errorReport + e);
}