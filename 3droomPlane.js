/**
 * Created by GV Sharma on 10/5/2016.
 */
var camera, scene, renderer;
var windowScale;
var clock = new THREE.Clock();
var cameraControls, effectController;
var windowWidth;
var windowHeight;

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

try {
    var width = 200;
    var height = 200;
    init();
    var loader = new THREE.TextureLoader();
    loader.load('resources/frontwall.jpg', function (texture) {
        var geometry = createCubeWithPlane(width, height);
        var material = new THREE.MeshBasicMaterial({
            map: texture, side: THREE.DoubleSide
        });
        var frontWallPlane = new THREE.Mesh(geometry, material);
        var position = getFrontWallPlanePosition();
        frontWallPlane.position.copy(position);
        frontWallPlane.rotation.z = 0;
        scene.add(frontWallPlane);
        addToDOM();
    })
    loader.load('resources/floor.jpg', function (texture) {
        var geometry = createFloorCubeWithPlane(width, depth);
        var material = new THREE.MeshBasicMaterial({
            map: texture, side: THREE.DoubleSide
        });
        var floorWallPlane = new THREE.Mesh(geometry, material);
        var position = getFloorWallPlanePosition();
        floorWallPlane.position.copy(position);
        floorWallPlane.rotation.x = Math.PI / 2;
        scene.add(floorWallPlane);
        addToDOM();
    })
    loader.load('resources/leftwall.jpg', function (texture) {
        var geometry = createLeftRightWithPlane(depth, height);
        var material = new THREE.MeshBasicMaterial({
            map: texture, side: THREE.DoubleSide
        });
        var leftWallPlane = new THREE.Mesh(geometry, material);
        var position = getLeftWallPlanePosition();
        leftWallPlane.position.copy(position);
        leftWallPlane.rotation.y = Math.PI / 2;
        scene.add(leftWallPlane);
        addToDOM();
    })
    loader.load('resources/rightwall.jpg', function (texture) {
        var geometry = createLeftRightWithPlane(depth, height);
        var material = new THREE.MeshBasicMaterial({
            map: texture, side: THREE.DoubleSide
        });
        var leftWallPlane = new THREE.Mesh(geometry, material);
        var position = getRightWallPlanePosition();
        leftWallPlane.position.copy(position);
        leftWallPlane.rotation.y = Math.PI / 2;
        scene.add(leftWallPlane);
        addToDOM();
    })
} catch (e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    console.log(errorReport + e);
}

function createCubeWithPlane(width, height) {
    // var geometry = new THREE.PlaneGeometry(width, height);
    // return geometry;
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(width, height, 0),
        new THREE.Vector3(width, -height, 0),
        new THREE.Vector3(-width, height, 0),
        new THREE.Vector3(-width, -height, 0)
    ];

    var uvs = [
        new THREE.Vector2(0, 1),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 0)
    ];
    var face = new THREE.Face3(0, 1, 2);
    var faceVertexUvs = [uvs[0], uvs[1], uvs[2]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(faceVertexUvs);

    var face = new THREE.Face3(2, 3, 1);
    var faceVertexUvs = [uvs[2], uvs[3], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(faceVertexUvs);

    geometry.vertices = vertices;
    geometry.mergeVertices();
    return geometry;
}

function createFloorCubeWithPlane(width, height) {
    // var geometry = new THREE.PlaneGeometry(width, height);
    // return geometry;
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(width, height, 0),
        new THREE.Vector3(width, -height, 0),
        new THREE.Vector3(-width, height, 0),
        new THREE.Vector3(-width, -height, 0)
    ];

    var uvs = [
        new THREE.Vector2(0, 1),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 0)
    ];
    var face = new THREE.Face3(0, 1, 2);
    var faceVertexUvs = [uvs[0], uvs[1], uvs[2]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(faceVertexUvs);

    var face = new THREE.Face3(2, 3, 1);
    var faceVertexUvs = [uvs[2], uvs[3], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(faceVertexUvs);

    geometry.vertices = vertices;
    geometry.mergeVertices();
    return geometry;
}

function createLeftRightWithPlane(depth, height) {
    // var geometry = new THREE.PlaneGeometry(width, height);
    // return geometry;
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(depth, height, 0),
        new THREE.Vector3(depth, -height, 0),
        new THREE.Vector3(-depth, height, 0),
        new THREE.Vector3(-depth, -height, 0)
    ];

    var uvs = [
        new THREE.Vector2(0, 1),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 0)
    ];
    var face = new THREE.Face3(0, 1, 2);
    var faceVertexUvs = [uvs[0], uvs[1], uvs[2]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(faceVertexUvs);

    var face = new THREE.Face3(2, 3, 1);
    var faceVertexUvs = [uvs[2], uvs[3], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(faceVertexUvs);

    geometry.vertices = vertices;
    geometry.mergeVertices();
    return geometry;
}

function getFrontWallPlanePosition() {
    var position = new THREE.Vector3();
    position.x = 0;
    position.y = height / 2;
    position.z = -depth;
    return position;
}

function getFloorWallPlanePosition() {
    var position = new THREE.Vector3();
    position.x = 0;
    position.y = -height / 2;
    position.z = 0;
    return position;
}

function getLeftWallPlanePosition() {
    var position = new THREE.Vector3();
    position.x = -width;
    position.y = height / 2;
    position.z = 0;
    return position;
}

function getRightWallPlanePosition() {
    var position = new THREE.Vector3();
    position.x = width;
    position.y = height / 2;
    position.z = 0;
    return position;
}