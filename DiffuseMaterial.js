/**
 * Created by GV Sharma on 9/15/2016.
 */
var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
var ambientLight, light;

function init() {
    var canvasWidth = 846;
    var canvasHeight = 494;
    var canvasRatio = canvasWidth / canvasHeight;

    camera = new THREE.PerspectiveCamera(45, canvasRatio, 1, 80000);
    camera.position.set(-300, 300, -1000);
    camera.lookAt(0, 0, 0);

    ambientLight = new THREE.AmbientLight(0xffffff);

    light = new THREE.DirectionalLight(0xffffff, 0.7);
    light.position.set((-800, 900, 300));

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0, 0, 0);

    fillScene()
}

function fillScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x808080, 2000, 4000);
    scene.add(camera);

    scene.add(ambientLight);
    scene.add(light);

    var ball = createBall();
    scene.add(ball);

    addToDOM()
}

function createBall() {
    // var material = new THREE.MeshBasicMaterial({color: 0x80FC66, shading: THREE.FlatShading});
    var material = new THREE.MeshLambertMaterial({color: 0x80FC66});
    var ka = 0.4;
    material.color.setRGB(material.color.r * ka, material.color.g * ka, material.color.b * ka);
    var geometry = new THREE.SphereGeometry(400, 64, 32);
    var sphere = new THREE.Mesh(geometry, material);
    return sphere;
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
    // $('#container').append(errorReport+e);
    console.log(errorReport + e);
}