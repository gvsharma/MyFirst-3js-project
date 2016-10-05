/**
 * Created by GV Sharma on 10/3/2016.
 */
var camera, scene, renderer;
var windowScale;
var clock = new THREE.Clock();
var cameraControls, effectController;
var windowWidth;
var windowHeight;

var width = 200;
var height = 200;
var depth = 200;

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
    console.log("Rendered");
}

var frontWallCube;
var rightWallCube;
var leftWallCube;
var floorCube;
try {
    init();
    var loader = new THREE.TextureLoader();
    loader.load('resources/frontwall.jpg', function (texture) {
        var geometry = createCube(width, height, 1);
        var material = new THREE.MeshBasicMaterial({
            map: texture, color: 0xFFFFFF, side: THREE.DoubleSide
        });
        frontWallCube = new THREE.Mesh(geometry, material);
        var pos = getFrontWallPosition();
        frontWallCube.position.copy(pos);
        scene.add(frontWallCube);
        addToDOM();
    });
    loader.load('resources/floor.jpg', function (texture1) {
        var geometry = createCube(width, 1, depth);
        var material = new THREE.MeshBasicMaterial({
            map: texture1, color: 0xFFFFFF, side: THREE.DoubleSide
        });
        var floorCube = new THREE.Mesh(geometry, material);
        var pos = getFloorPosition();
        floorCube.position.copy(pos);
        scene.add(floorCube);
        addToDOM();
    });
    loader.load('resources/rightwall.jpg', function (texture) {
        var geometry = createCube(1, height, depth);
        var material = new THREE.MeshBasicMaterial({
            map: texture, color: 0xFFFFFF, side: THREE.DoubleSide
        });
        rightWallCube = new THREE.Mesh(geometry, material);
        var pos = getRightWallPosition();
        rightWallCube.position.copy(pos);
        scene.add(rightWallCube);
        addToDOM();
    });
    loader.load('resources/leftwall.jpg', function (texture) {
        var geometry = createCube(1, height, depth);
        var material = new THREE.MeshBasicMaterial({
            map: texture, color: 0xFFFFFF, side: THREE.DoubleSide
        });
        leftWallCube = new THREE.Mesh(geometry, material);
        var pos = getLeftWallPosition();
        leftWallCube.position.copy(pos);
        scene.add(leftWallCube);
        addToDOM();
    });
} catch (e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    console.log(errorReport + e);
}

function createCube(x, y, z) {
    var xoffset = 0.5;
    var yoffset = 0.5;
    var zoffset = 0.5;
    var cubeWidth = 2 * 100;
    var cubeHeight = 2 * 100;
    var cubeDepth = 2 * 100;
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(x, y, z),
        new THREE.Vector3(x, y, -z),
        new THREE.Vector3(x, -y, z),
        new THREE.Vector3(x, -y, -z),
        new THREE.Vector3(-x, y, -z),
        new THREE.Vector3(-x, y, z),
        new THREE.Vector3(-x, -y, -z),
        new THREE.Vector3(-x, -y, z)
    ];

    var uvs = [
        new THREE.Vector2(0, 1),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 0)
    ];

    //Left
    var face = new THREE.Face3(4, 6, 5);
    var facevertexuv = [uvs[0], uvs[2], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(facevertexuv);

    var face = new THREE.Face3(6, 7, 5);
    var facevertexuv = [uvs[2], uvs[3], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(facevertexuv);

    //Bottom
    var face = new THREE.Face3(6, 3, 7);
    var facevertexuv = [uvs[0], uvs[2], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(facevertexuv);

    var face = new THREE.Face3(3, 2, 7);
    var facevertexuv = [uvs[2], uvs[3], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(facevertexuv);

    //front
    var face = new THREE.Face3(5, 7, 0);
    var facevertexuv = [uvs[0], uvs[2], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(facevertexuv);

    var face = new THREE.Face3(7, 2, 0);
    var facevertexuv = [uvs[2], uvs[3], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(facevertexuv);

    //back
    var face = new THREE.Face3(1, 3, 4);
    var facevertexuv = [uvs[0], uvs[2], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(facevertexuv);

    var face = new THREE.Face3(3, 6, 4);
    var facevertexuv = [uvs[2], uvs[3], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(facevertexuv);

    geometry.vertices = vertices;
    geometry.mergeVertices();

    return geometry;
}

function getFrontWallPosition() {
    var position = new THREE.Vector3();
    position.x = 1;
    position.y = height / 2;
    position.z = -depth;
    return position;
}

function getFloorPosition() {
    var position = new THREE.Vector3();
    position.x = 1;
    position.y = -height / 2;
    position.z = 1;
    return position;
}

function getLeftWallPosition() {
    var position = new THREE.Vector3();
    position.x = -width;
    position.y = height / 2;
    position.z = 1;
    return position;
}

function getRightWallPosition() {
    var position = new THREE.Vector3();
    position.x = width;
    position.y = height / 2;
    position.z = 1;
    return position;
}
