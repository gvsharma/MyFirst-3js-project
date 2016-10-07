/**
 * Created by GV Sharma on 10/6/2016.
 */
var camera, scene, renderer;
var windowScale;
var clock = new THREE.Clock();
var cameraControls, effectController;
var windowWidth;
var windowHeight;
var polygon;
var width = 200;
var height = 200;
var depth = 200;
var loader = new THREE.TextureLoader();
var wall1, wall2;

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
    // loader.load('resources/floor.jpg', function (texture) {
    //     var geometry = createFloorCubeWithPlane(width, depth);
    //     var material = new THREE.MeshBasicMaterial({
    //         map: texture, side: THREE.DoubleSide
    //     });
    //     var floorWallPlane = new THREE.Mesh(geometry, material);
    //     var position = getFloorWallPlanePosition();
    //     floorWallPlane.position.copy(position);
    //     floorWallPlane.rotation.x = Math.PI / 2;
    //     scene.add(floorWallPlane);
    //     addToDOM();
    // })

    createPlanes();

    // loader.load('resources/frontwall.jpg', function (texture) {
    //     var geometry = createFloorCubeWithPlane(width, depth);
    //     var material = new THREE.MeshBasicMaterial({
    //         map: texture, side: THREE.DoubleSide
    //     });
    //     wall1 = new THREE.Mesh(geometry, material);
    //     var position = getLeftWallPlanePosition();
    //     wall1.position.copy(position);
    //     wall1.rotation.y = Math.PI / 2;
    //     var location = new THREE.Vector3();
    //     location.x = wall1.position.x;
    //     location.y = wall1.position.y;
    //     calculatePlane(6, location);
    //     scene.add(wall1);
    //     addToDOM();
    // })
    // loader.load('resources/frontwall.jpg', function (texture) {
    //     var geometry = createFloorCubeWithPlane(width, depth);
    //     var material = new THREE.MeshBasicMaterial({
    //         map: texture, side: THREE.DoubleSide
    //     });
    //     wall2 = new THREE.Mesh(geometry, material);
    //     var position = getLeftWallPlanePosition();
    //     // wall2.position.copy(position);
    //     // wall2.position.z = wall2.position.z + wall1.position.z;
    //     wall2.position.x = position.x;
    //     wall2.position.y = position.y;
    //     wall2.position.z = position.z;
    //     wall2.rotation.y = Math.PI / 6;
    //     scene.add(wall2);
    //     addToDOM();
    // })
    // loader.load('resources/frontwall.jpg', function (texture) {
    //     var geometry = createRightWithPlane(depth, height);
    //     var material = new THREE.MeshBasicMaterial({
    //         map: texture, side: THREE.DoubleSide
    //     });
    //     var leftWallPlane = new THREE.Mesh(geometry, material);
    //     var position = getRightWallPlanePosition();
    //     leftWallPlane.position.copy(position);
    //     leftWallPlane.rotation.y = Math.PI / 2;
    //     scene.add(leftWallPlane);
    //     addToDOM();
    // })
} catch (e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    console.log(errorReport + e);
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

function calculatePlane(sides, location) {
    var geometry = new THREE.Geometry();
    for (var point = 0; point < sides; point++) {
        var angle = (Math.PI / 2) + (point / sides) * 2 * Math.PI;
        var x = Math.cos(angle) + location.x;
        var y = Math.sin(angle) + location.y;

        geometry.vertices.push(new THREE.Vector3(x, y, 0));
        console.log("Points: " + x + "," + y);
    }
}

function getFloorWallPlanePosition() {
    var position = new THREE.Vector3();
    position.x = 0;
    position.y = -height / 2;
    position.z = 0;
    return position;
}

function polygonWithLocation(sides, location) {
    var geometry = new THREE.Geometry();
    for (var point = 0; point < sides; point++) {
        var angle = (Math.PI / 2) + (point / sides) * 2 * Math.PI;
        var x = Math.cos(angle) + location.x;
        var y = Math.sin(angle) + location.y;

        geometry.vertices.push(new THREE.Vector3(x, y, 0));
    }

    for (var face = 0; face < sides - 2; face++) {
        geometry.faces.push(new THREE.Face3(0, face + 1, face + 2));
    }

    // var uvs = [
    //     new THREE.Vector2(0, 1),
    //     new THREE.Vector2(1, 1),
    //     new THREE.Vector2(0, 0),
    //     new THREE.Vector2(1, 0)
    // ];
    // var faceVertexUvs = [uvs[0], uvs[1], uvs[2]];
    // geometry.faceVertexUvs[0].push(faceVertexUvs);
    //
    // var faceVertexUvs = [uvs[2], uvs[3], uvs[1]];
    // geometry.faceVertexUvs[0].push(faceVertexUvs);

    return geometry;
}

function getLeftWallPlanePosition() {
    var position = new THREE.Vector3();
    position.x = -width;
    position.y = height / 2;
    position.z = 0;
    return position;
}

function createRightWithPlane(depth, height) {
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

function getRightWallPlanePosition() {
    var position = new THREE.Vector3();
    position.x = width;
    position.y = height / 2;
    position.z = 0;
    return position;
}

function getPolygone(sides, location) {
    var r = 100;
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
        console.log("Test: " + x + " : " + y + " : " + z);
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
            new THREE.Vector3((width ) + x, (height / 2) + y, z),
            new THREE.Vector3((width ) + x, -(height / 2) + y, z),
            new THREE.Vector3((width ) + prevX, (height / 2) + prevY, prevZ),
            new THREE.Vector3((width ) + prevX, -(height / 2) + prevY, prevZ)
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
        // var geometry = createFloorCubeWithPlane(width, depth);
        var material = new THREE.MeshBasicMaterial({
            map: texture, side: THREE.DoubleSide
        });
        var plane = new THREE.Mesh(geometry, material);
        // var position = getFloorWallPlanePosition();
        plane.position.copy(position);
        scene.add(plane);
        // console.log("Test Draw Plane: " + x + " : " + y +
        //     " Previous: " + prevX + " : " + prevY + " : " +
        //     " planeOrigin: " + position.x + ", " + position.y);
        addToDOM();
    })
}


