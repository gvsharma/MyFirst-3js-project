/**
 * Created by GV Sharma on 10/6/2016.
 */
var camera, scene, renderer;
var clock = new THREE.Clock();
var cameraControls, effectController;
var windowWidth;
var windowHeight;
var polygon;
var width = 200;
var height = 200;
var depth = 200;
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
    createPlanes();
} catch (e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    console.log(errorReport + e);
}

function getPolygone(sides, location) {
    var r = 200;
    var vertices = [];
    for (var point = 1; point <= sides; point++) {
        var angle = (360 / sides) * point * (Math.PI / 180);
        var x = r * Math.cos(angle);
        var z = r * Math.sin(angle);

        var vertex = new THREE.Vector3();
        vertex.x = x;
        vertex.y = 0;
        vertex.z = z;
        vertices.push(vertex);
        if (point == sides) {
            var angle = (360 / sides) * (point + 1) * (Math.PI / 180);
            var x = r * Math.cos(angle);
            var z = r * Math.sin(angle);
            var vertex = new THREE.Vector3();
            vertex.x = x;
            vertex.y = 0;
            vertex.z = z;
            vertices.push(vertex);
        }
    }
    return vertices;
}

function createPlanes() {
    var location = new THREE.Vector3(width, height, depth);
    //all vertices.
    var vertices = getPolygone(6, location);
    for (var i = 0; i < vertices.length; i++) {
        var x = vertices[i].x;
        var y = vertices[i].y;
        var z = vertices[i].z;
        // console.log("Test: " + x + " : " + y + " : " + z);
        if (i > 0) {
            var prevX = vertices[i - 1].x;
            var prevY = vertices[i - 1].y;
            var prevZ = vertices[i - 1].z;
            createSinglePlane3(i, x, y, z, prevX, prevY, prevZ);
        }
    }
}

function createSinglePlane3(i, x, y, z, prevX, prevY, prevZ) {
    loader.load('resources/frontwall.jpg', function (texture) {
        var geometry = new THREE.Geometry();
        var vertices = [
            new THREE.Vector3(x, (height / 2) + y, z),
            new THREE.Vector3(x, -(height / 2) + y, z),
            new THREE.Vector3(prevX, (height / 2) + prevY, prevZ),
            new THREE.Vector3(prevX, -(height / 2) + prevY, prevZ)
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

        var position = new THREE.Vector3();
        position.x = (x + prevX) / 2;
        position.y = (y + prevY) / 2;
        position.z = (z + prevZ) / 2;
        var material = new THREE.MeshBasicMaterial({
            map: texture, side: THREE.DoubleSide
        });
        var plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
        addToDOM();
    })
}


