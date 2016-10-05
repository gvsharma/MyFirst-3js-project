/**
 * Created by GV Sharma on 9/19/2016.
 */
var camera, scene, renderer;
var cameraControls, effectController;
var clock = new THREE.Clock();
var gridX = true;
var gridY = false;
var gridZ = false;
var axes = true;
var ground = true;


function fillScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x808080, 2000, 4000);

    var ambientLight = new THREE.AmbientLight(0x222222);

    var light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(200, 400, 500);

    var light2 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light2.position.set(-500, 250, -200);

    scene.add(ambientLight);
    scene.add(light);
    scene.add(light2);

    var petalMaterial = new THREE.MeshLambertMaterial({color: 0xCC5920});
    var flowerHeight = 200;
    var petalLength = 120;
    var cylGeom = new THREE.CylinderGeometry(15, 0, petalLength, 32);
    var flower = new THREE.Object3D();

    for (var i = 0; i < 24; i++) {
        var cylinder = new THREE.Mesh(cylGeom, petalMaterial);
        cylinder.position.y = petalLength / 2;
        cylinder.scale.x = 0.25;
        cylinder.scale.z = 0.5;

        var petal = new THREE.Object3D();
        petal.add(cylinder);
        petal.rotation.z = (90 - 40) * Math.PI / 180;
        petal.rotation.y = (15 * i * Math.PI / 180);
        petal.position.y = flowerHeight;
        flower.add(petal);
    }

    var stamenMaterial = new THREE.MeshLambertMaterial({color: 0x333310});
    var stamen = new THREE.Mesh(
        new THREE.SphereGeometry(20, 32, 16), stamenMaterial);
    stamen.position.y = flowerHeight;
    flower.add(stamen);

    var stemMaterial = new THREE.MeshLambertMaterial({color: 0x339424});
    var stem = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 10, flowerHeight, 32), stemMaterial);
    stem.position.y = flowerHeight / 2;
    flower.add(stem);

    scene.add(flower);
    addToDOM();
}


function init() {
    var canvasWidth = 846;
    var canvasHeight = 494;
    var canvasRatio = canvasWidth / canvasHeight;

    renderer = new THREE.WebGLRenderer({antialias: false});
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);

    camera = new THREE.PerspectiveCamera(38, canvasRatio, 1, 10000);
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(-200, 400, 20);
    cameraControls.target.set(0, 150, 0);
    fillScene();
}

function addToDOM() {
    document.body.appendChild(renderer.domElement);
    console.log("addToDOM");
    setupGui();
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

function render() {
    var delta = clock.getDelta();
    cameraControls.update(delta);

    if (effectController.newGridX !== gridX || effectController.newGridY !== gridY || effectController.newGridZ !== gridZ || effectController.newGround !== ground || effectController.newAxes !== axes) {
        gridX = effectController.newGridX;
        gridY = effectController.newGridY;
        gridZ = effectController.newGridZ;
        ground = effectController.newGround;
        axes = effectController.newAxes;

        fillScene();
        drawHelpers();
    }

    renderer.render(scene, camera);
}


function setupGui() {

    effectController = {

        newGridX: gridX,
        newGridY: gridY,
        newGridZ: gridZ,
        newGround: ground,
        newAxes: axes

    };

    var gui = new DAT.GUI();
    // var h = gui.addFolder("Grid display");
    // h.add(effectController, "newGridX").name("Show XZ grid");
    // h.add(effectController, "newGridY").name("Show YZ grid");
    // h.add(effectController, "newGridZ").name("Show XY grid");
    // h.add(effectController, "newGround").name("Show ground");
    // h.add(effectController, "newAxes").name("Show axes");

    animate();
}

try {
    init();
} catch (e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    console.log(errorReport + e);
}
