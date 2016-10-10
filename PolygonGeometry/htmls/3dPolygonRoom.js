/**
 * Created by GV Sharma on 10/10/2016.
 */
var camera, scene, renderer;
var clock = new THREE.Clock();
var cameraControls, effectController;
var windowWidth;
var windowHeight;
var loader = new THREE.TextureLoader();


function init() {
    scene = new THREE.Scene();
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    camera = new THREE.PerspectiveCamera(70, windowWidth / windowHeight, 1, 10000);
    camera.position.set(0, 0, 1000);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
    renderer.setSize(windowWidth, windowHeight);

    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}

function addToDOM() {
    document.body.appendChild(renderer.domElement);
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
    loader.load('../resources/frontwall.jpg', function (texture) {
        var material = new THREE.MeshBasicMaterial({
            map: texture, side: THREE.DoubleSide
        });
        var geometryArr = new PolygonGeometry(6, 200, 200);
        for (var i = 0; i < geometryArr.length; i++) {
            var geometry = geometryArr[i];
            var polygon = new THREE.Mesh(geometry, material);
            scene.add(polygon);
            addToDOM();
        }
    });
} catch (e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    console.log(errorReport + e);
}