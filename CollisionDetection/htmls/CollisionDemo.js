/**
 * Created by GV Sharma on 10/12/2016.
 */
var camera, scene, renderer;
var windowScale;
var clock = new THREE.Clock();
var controls, effectController;
var windowWidth;
var windowHeight;
var width = 50;
var height = 50;
var depth = 50;
var scope = this;
var vector = new THREE.Vector3();

var STATE = {NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, DOWN: 3, UP: 4, MOVE: 5};
var state = STATE.NONE;
var center = this.center;
var normalMatrix = new THREE.Matrix3();
var pointer = new THREE.Vector2();
var pointerOld = new THREE.Vector2();
var spherical = new THREE.Spherical();

var domElement = ( domElement !== undefined ) ? domElement : document;
var projector, mouse = {x: 0, y: 0}, INTERSECTED;

var frontWallPlane;

function init() {
    scene = new THREE.Scene();
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(windowWidth, windowHeight);
    document.body.appendChild(renderer.domElement);
    camera = new THREE.OrthographicCamera(0, windowWidth,
        windowHeight,
        0, 1, 1000);
    camera.position.set(0, 0, 100);
    scene.add(camera);

    // Create an event listener that resizes the renderer with the browser window.
    window.addEventListener('resize', function () {
        renderer.setSize(windowWidth, windowHeight);
        camera.aspect = windowWidth / windowHeight;
        camera.updateProjectionMatrix();
    });

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    projector = new THREE.Projector();
}

function printMousePos(event) {
    console.log("clientX: " + event.clientX +
        " - clientY: " + event.clientY);
}

function addToDOM() {
    document.body.appendChild(renderer.domElement);
    // document.addEventListener("click", printMousePos);
    // domElement.addEventListener('mousemove', onMouseMove, false);
    // domElement.addEventListener('mouseup', onMouseUp, false);
    // domElement.addEventListener('mousedown', onMouseDown, false);
    // domElement.addEventListener('dblclick', onMouseUp, false);
    // document.addEventListener('onmousemove', myFunction);
    renderer.domElement.addEventListener("mousemove", onDocumentMouseMove);

    animate();
}

function myFunction(e) {
    x = e.clientX;
    y = e.clientY;
    var coor = "Coordinates: (" + x + "," + y + ")";
    console.log("Test: " + coor);
    // document.getElementById("demo").innerHTML = coor
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
    // update();
}

function render() {
    var delta = clock.getDelta();
    //controls.update(delta);
    renderer.render(scene, camera);
    // console.log("Rendered");
}

function getFrontWall1PlanePosition() {
    var position = new THREE.Vector3();
    position.x = windowWidth / 3;
    position.y = windowHeight / 2;
    position.z = -depth;
    return position;
}

function getFrontWall2PlanePosition() {
    var position = new THREE.Vector3();
    position.x = 2 * windowWidth / 3;
    position.y = windowHeight / 2;
    position.z = -depth;
    return position;
}

function createCubeWithPlane(width, height) {
    // var geometry = new THREE.PlaneGeometry(width, height);
    // return geometry;
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(width / 2, height / 2, 0),
        new THREE.Vector3(width / 2, -height / 2, 0),
        new THREE.Vector3(-width / 2, height / 2, 0),
        new THREE.Vector3(-width / 2, -height / 2, 0)
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

try {
    init();
    var loader = new THREE.TextureLoader();
    loader.load('../resources/frontwall.jpg', function (texture) {
        var geometry = createCubeWithPlane(windowWidth / 4, windowHeight / 4);
        var material = new THREE.MeshBasicMaterial({
            color: 0xffffff, side: THREE.DoubleSide
        });
        frontWallPlane = new THREE.Mesh(geometry, material);
        var position = getFrontWall1PlanePosition();
        frontWallPlane.position.copy(position);
        // frontWallPlane.rotation.z = 0;
        scene.add(frontWallPlane);
        addToDOM();
    })

    loader.load('../resources/frontwall.jpg', function (texture) {
        var geometry = createCubeWithPlane(windowWidth / 4, windowHeight / 4);
        var material = new THREE.MeshBasicMaterial({
            map: texture, side: THREE.DoubleSide
        });
        var frontWallPlane1 = new THREE.Mesh(geometry, material);
        var position = getFrontWall2PlanePosition();
        frontWallPlane1.position.copy(position);
        frontWallPlane1.rotation.z = 0;
        scene.add(frontWallPlane1);
        addToDOM();
    })
} catch (e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    console.log(errorReport + e);
}

function onMouseDown(event) {
    if (scope.enabled === false) return;
    if (event.button === 0) {
        state = STATE.ROTATE;
    } else if (event.button === 1) {
        state = STATE.ZOOM;
    } else if (event.button === 2) {
        state = STATE.PAN;
    }
    state = STATE.DOWN;
    console.log("state: " + state);
    pointerOld.set(event.clientX, event.clientY);

    // domElement.addEventListener('mousemove', onMouseMove, false);
    domElement.addEventListener('mouseup', onMouseUp, false);
    domElement.addEventListener('mousedown', onMouseDown, false);
    // domElement.addEventListener('dblclick', onMouseUp, false);
}

function onMouseUp(event) {
    if (scope.enabled === false) return;
    if (event.button === 0) {
        state = STATE.ROTATE;
    } else if (event.button === 1) {
        state = STATE.ZOOM;
    } else if (event.button === 2) {
        state = STATE.PAN;
    }
    pointerOld.set(event.clientX, event.clientY);
    // domElement.addEventListener('mousemove', onMouseMove, false);
    domElement.addEventListener('mouseup', onMouseUp, false);
    domElement.addEventListener('mousedown', onMouseDown, false);
    // domElement.addEventListener('dblclick', onMouseUp, false);
    state = STATE.UP;
    console.log("state: " + state);
}

function onMouseMove(event) {
    pointerOld.set(event.clientX, event.clientY);
    state = STATE.MOVE;
    // domElement.addEventListener('mousemove', onMouseMove, false);
    domElement.addEventListener('mouseup', onMouseUp, false);
    domElement.addEventListener('mousedown', onMouseDown, false);
    console.log("state: " + state);
}

function onDocumentMouseMove(event) {
    // mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    // mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
    var x = event.clientX;
    var y = event.clientY;
    // console.log("Test: " + x + " : " + y);
    isPointExistsInRange(x, y);
}

function isPointExistsInRange(x, y) {


    var vertices = frontWallPlane.geometry.vertices;
    var exists = false;
    var x1, y1, x2, y2, x3, y3, x4, y4;
    //for (var i = 0; i < vertices.length; i++) {
    var vertex = vertices[0];//+,+
    x1 = (windowWidth / 3) + (vertex.x);
    y1 = (windowHeight / 2) + (vertex.y);
    var vertex = vertices[1];//+,-
    x2 = (windowWidth / 3) + (vertex.x);
    y2 = (windowHeight / 2) + (vertex.y);
    var vertex = vertices[2];//-,+
    x3 = (windowWidth / 3) + (vertex.x);
    y3 = (windowHeight / 2) + (vertex.y);
    var vertex = vertices[3];//-,-
    x4 = (windowWidth / 3) + (vertex.x);
    y4 = (windowHeight / 2) + (vertex.y);

    if ((x <= x2 && x >= x4) && (y <= y1 && y >= y4)) {
        console.log("true");
        frontWallPlane.material.color.setHex(0xff0000);
    } else {
        frontWallPlane.material.color.setHex(0xffffff);
        console.log("false");
    }
    //console.log("Rectangle Vertices: " + vertex.x + " : " + vertex.y + ", " + x + ", " + y + " : " + changedX + " : " + changedY);
}