/**
 * Created by GV Sharma on 9/13/2016.
 */

var camera, scene, renderer;
var windowScale;
var clock = new THREE.Clock();
var cameraControls, effectController;

function createTriangle() {
    var triangle = new THREE.Geometry();

    triangle.vertices.push(new THREE.Vector3(10, 50, 0));
    triangle.vertices.push(new THREE.Vector3(100, 50, 0));
    triangle.vertices.push(new THREE.Vector3(100, 120, 0));

    triangle.faces.push(new THREE.Face3(0, 1, 2));
    triangle.faceVertexUvs[0].push([
        new THREE.Vector2(0, 0.15),
        new THREE.Vector2(1, 0.15),
        new THREE.Vector2(1, 1)
    ]);

    return triangle;
}

function createSquare(x1, y1, x2, y2) {
    var square = new THREE.Geometry();

    square.vertices.push(new THREE.Vector3(x1, y1, 0));
    square.vertices.push(new THREE.Vector3(x2, y1, 0));
    square.vertices.push(new THREE.Vector3(x2, y2, 0));
    square.vertices.push(new THREE.Vector3(x1, y2, 0));

    square.faces.push(new THREE.Face3(0, 1, 2));
    square.faceVertexUvs[0].push([new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)]);

    square.faces.push(new THREE.Face3(0, 2, 3));
    square.faceVertexUvs[0].push([new THREE.Vector2(1, 1), new THREE.Vector2(1, 0), new THREE.Vector2(0, 0)]);
    return square;
}

function createSquare1(x1, y1, x2, y2) {
    var square = new THREE.Geometry();
    square.vertices.push(new THREE.Vector3(x1, y1, 0));
    square.vertices.push(new THREE.Vector3(x2, y1, 0));
    square.vertices.push(new THREE.Vector3(x2, y2, 0));
    square.vertices.push(new THREE.Vector3(x1, y2, 0));

    square.faces.push(new THREE.Face3(0, 1, 2));
    square.faceVertexUvs[0].push([new THREE.Vector2(0.1, 0.1), new THREE.Vector2(0.5, 0.1), new THREE.Vector2(0.5, 0.5)]);

    square.faces.push(new THREE.Face3(0, 2, 3));
    square.faceVertexUvs[0].push([new THREE.Vector2(0.1, 0.1), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.1, 0.5)]);
    return square;
}

function createSquare2(x1, y1, x2, y2) {
    var square = new THREE.Geometry();
    square.vertices.push(new THREE.Vector3(x1, y1, 0));
    square.vertices.push(new THREE.Vector3(x2, y1, 0));
    square.vertices.push(new THREE.Vector3(x2, y2, 0));
    square.vertices.push(new THREE.Vector3(x1, y2, 0));

    square.faces.push(new THREE.Face3(0, 1, 2));
    square.faceVertexUvs[0].push([new THREE.Vector2(0.5, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 0.5)]);

    square.faces.push(new THREE.Face3(0, 2, 3));
    square.faceVertexUvs[0].push([new THREE.Vector2(0.5, 0), new THREE.Vector2(1, 0.5), new THREE.Vector2(0.5, 0.5)]);
    return square;
}

function createSquare3(x1, y1, x2, y2) {
    var square = new THREE.Geometry();
    square.vertices.push(new THREE.Vector3(x1, y1, 0));
    square.vertices.push(new THREE.Vector3(x2, y1, 0));
    square.vertices.push(new THREE.Vector3(x2, y2, 0));
    square.vertices.push(new THREE.Vector3(x1, y2, 0));

    square.faces.push(new THREE.Face3(0, 1, 2));
    square.faceVertexUvs[0].push([new THREE.Vector2(0.5, 0.5), new THREE.Vector2(1, 0.5), new THREE.Vector2(1, 1)]);

    square.faces.push(new THREE.Face3(0, 2, 3));
    square.faceVertexUvs[0].push([new THREE.Vector2(0.5, 0.5), new THREE.Vector2(1, 1), new THREE.Vector2(0.5, 1)]);
    return square;
}

function createSquare4(x1, y1, x2, y2, face) {
    var square = new THREE.Geometry();
    square.vertices.push(new THREE.Vector3(x1, y1, 0));
    square.vertices.push(new THREE.Vector3(x2, y1, 0));
    square.vertices.push(new THREE.Vector3(x2, y2, 0));
    square.vertices.push(new THREE.Vector3(x1, y2, 0));

    square.faces.push(new THREE.Face3(0, 1, 2));
    var arr1 = getFaceLowerVertex(face);
    square.faceVertexUvs[0].push(arr1);

    square.faces.push(new THREE.Face3(0, 2, 3));
    var arr2 = getFaceUpperVertex(face);
    square.faceVertexUvs[0].push(arr2);
    return square;
}

function getFaceLowerVertex(face) {
    if (face == 1) {
        return [new THREE.Vector2(0.1, 0.1), new THREE.Vector2(0.5, 0.1), new THREE.Vector2(0.5, 0.5)];
    } else if (face == 2) {
        return [new THREE.Vector2(0.5, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 0.5)];
    } else if (face == 3) {
        return [new THREE.Vector2(0.5, 0.5), new THREE.Vector2(1, 0.5), new THREE.Vector2(1, 1)];
    } else if (face == 4) {
        return [new THREE.Vector2(0, 0.5), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.5, 1)];
    }
}

function getFaceUpperVertex(face) {
    if (face == 1) {
        return [new THREE.Vector2(0.1, 0.1), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.1, 0.5)];
    } else if (face == 2) {
        return [new THREE.Vector2(0.5, 0), new THREE.Vector2(1, 0.5), new THREE.Vector2(0.5, 0.5)];
    } else if (face == 3) {
        return [new THREE.Vector2(0.5, 0.5), new THREE.Vector2(1, 1), new THREE.Vector2(0.5, 1)];
    } else if (face == 4) {
        return [new THREE.Vector2(0, 0.5), new THREE.Vector2(0.5, 1), new THREE.Vector2(0, 1)];
    }
}

var windowWidth;
var windowHeight;

function init() {
    //var canvasHeight = 846;
    //var canvasWidth = 494;
    //var canvasRatio = canvasHeight / canvasWidth;
    scene = new THREE.Scene();
    //windowScale = 12;
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    //camera = new THREE.OrthographicCamera(windowWidth / -2, windowWidth / 2, windowHeight / 2, windowHeight / -2, 0, 40);
    // camera = new THREE.OrthographicCamera(0, windowWidth, windowHeight, 0, 0, 40);
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100000);
    camera.position.set(windowWidth, windowHeight, 200);
    camera.lookAt(scene.position);
    scene.add(camera);

    // var focus = new THREE.Vector3(0, 5, 0);
    // camera.position.x = focus.x;
    // camera.position.y = focus.y;
    // camera.position.z = 5;
    // camera.lookAt(focus);

    renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(windowWidth, windowHeight);

    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    //cameraControls.target.set(0, 600, 0);
    // renderer.setClearColorHex(0xffffff, 1.0);
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
    console.log("Rendered");
}


function createCircle() {
    var radius = 100;
    var segments = 32;
    var geometry = new THREE.CircleGeometry(radius, segments);
    // geometry.faces.push(new THREE.Face3(0, 1, 2));
    // geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0.5), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.5, 1)]);

    // var circlePoints = circle.extractPoints();
    // for (var i = 0; i < circlePoints.length; i++) {
    //     console.log("circle: " + i);
    // }

    return geometry;
}

function createMyCircle() {
    var geometry = new THREE.Geometry();
    var radius = 100;
    var segments = 50;
    geometry.vertices.push(new THREE.Vector3(0.5, 0.5, 0));
    for (var i = 1; i <= segments; i++) {
        var angle = (360 / segments) * i * (Math.PI / 180);
        console.log('loop');
        var x = radius * Math.cos(angle);
        var y = radius * Math.sin(angle);
        geometry.vertices.push(new THREE.Vector3(x, y, 0));
        if (i == segments) {
            var angle = (360 / segments) * (i + 1) * (Math.PI / 180);
            var x = radius * Math.cos(angle);
            var y = radius * Math.sin(angle);
            geometry.vertices.push(new THREE.Vector3(x, y, 0));
        }
    }


    for (var i = 1; i <= segments; i++) {
        var circleUVs = [];
        var xoffset = 0.5;
        var yoffset = 0.5;
        var circlewidth = 2 * radius;
        var circleheight = 2 * radius;

        if (i == segments) {
            geometry.faces.push(new THREE.Face3(0, i, 1));
            var vertex0 = geometry.vertices[0];
            var vertex1 = geometry.vertices[i];
            var vertex2 = geometry.vertices[1];
            var faceuv0 = new THREE.Vector2(xoffset + vertex0.x / circlewidth, yoffset + vertex0.y / circleheight);
            var faceuv1 = new THREE.Vector2(xoffset + vertex1.x / circlewidth, yoffset + vertex1.y / circleheight);
            var faceuv2 = new THREE.Vector2(xoffset + vertex2.x / circlewidth, yoffset + vertex2.y / circleheight);
            geometry.faceVertexUvs[0].push([faceuv0, faceuv1, faceuv2]);
        } else {
            geometry.faces.push(new THREE.Face3(0, i, i + 1));
            var vertex0 = geometry.vertices[0];
            var vertex1 = geometry.vertices[i];
            var vertex2 = geometry.vertices[i + 1];
            var faceuv0 = new THREE.Vector2(xoffset + vertex0.x / circlewidth, yoffset + vertex0.y / circleheight);
            var faceuv1 = new THREE.Vector2(xoffset + vertex1.x / circlewidth, yoffset + vertex1.y / circleheight);
            var faceuv2 = new THREE.Vector2(xoffset + vertex2.x / circlewidth, yoffset + vertex2.y / circleheight);
            geometry.faceVertexUvs[0].push([faceuv0, faceuv1, faceuv2]);
        }

        // if (i == 1) {
        //     var angle = (360 / segments) * i * (Math.PI / 180);
        //     var x = radius * Math.cos(angle);
        //     var y = radius * Math.sin(angle);
        //     circleUVs = [
        //         new THREE.Vector2(0.5, 0.5),
        //         new THREE.Vector2(x / radius, 0.5),
        //         new THREE.Vector2(x / radius, y / radius)
        //     ];
        //     console.log("uvs: " + "0.5, 0.5" + " : " +
        //         (x / radius) + "," + 0.5 + " : " +
        //         x / radius + "," + y / radius)
        // } else {
        //     var angle1 = (360 / segments) * (i - 1) * (Math.PI / 180);
        //     var oldX = radius * Math.cos(angle1);
        //     var oldY = radius * Math.sin(angle1);
        //     var angle = (360 / segments) * i * (Math.PI / 180);
        //     var x = radius * Math.cos(angle);
        //     var y = radius * Math.sin(angle);
        //     circleUVs = [
        //         new THREE.Vector2(0.5, 0.5),
        //         new THREE.Vector2(oldX / radius, oldY / radius),
        //         new THREE.Vector2(x / radius, y / radius)
        //     ];
        //     console.log("uvs: " + "0.5, 0.5" + " : " +
        //         oldX / radius + "," + oldY / radius + " : " +
        //         x / radius + "," + y / radius)
        // }
        //geometry.faceVertexUvs[0].push(circleUVs);
    }
    return geometry;
}

function createEllipse() {
    var geometry = new THREE.Geometry();
    var radius = 100;
    var segments = 50;
    geometry.vertices.push(new THREE.Vector3(0.5, 0.5, 0));
    for (var i = 1; i <= segments; i++) {
        var angle = (360 / segments) * i * (Math.PI / 180);
        console.log('loop');
        var x = 2 * radius * Math.cos(angle);
        var y = radius * Math.sin(angle);
        geometry.vertices.push(new THREE.Vector3(x, y, 0));
        if (i == segments) {
            var angle = (360 / segments) * (i + 1) * (Math.PI / 180);
            var x = radius * Math.cos(angle);
            var y = radius * Math.sin(angle);
            geometry.vertices.push(new THREE.Vector3(x, y, 0));
        }
    }
    for (var i = 1; i <= segments; i++) {
        var ellipseUVs = [];
        var xoffset = 0.5;
        var yoffset = 0.5;
        var ellipseWidth = 4 * radius;
        var ellipseHeight = 2 * radius;
        if (i == segments) {
            geometry.faces.push(new THREE.Face3(0, i, 1));
            var vertex0 = geometry.vertices[0];
            var vertex1 = geometry.vertices[i];
            var vertex2 = geometry.vertices[1];
            var faceuv0 = new THREE.Vector2(xoffset + vertex0.x / ellipseWidth, yoffset + vertex0.y / ellipseHeight);
            var faceuv1 = new THREE.Vector2(xoffset + vertex1.x / ellipseWidth, yoffset + vertex1.y / ellipseHeight);
            var faceuv2 = new THREE.Vector2(xoffset + vertex2.x / ellipseWidth, yoffset + vertex2.y / ellipseHeight);
            geometry.faceVertexUvs[0].push([faceuv0, faceuv1, faceuv2]);
        } else {
            geometry.faces.push(new THREE.Face3(0, i, i + 1));
            var vertex0 = geometry.vertices[0];
            var vertex1 = geometry.vertices[i];
            var vertex2 = geometry.vertices[i + 1];
            var faceuv0 = new THREE.Vector2(xoffset + vertex0.x / ellipseWidth, yoffset + vertex0.y / ellipseHeight);
            var faceuv1 = new THREE.Vector2(xoffset + vertex1.x / ellipseWidth, yoffset + vertex1.y / ellipseHeight);
            var faceuv2 = new THREE.Vector2(xoffset + vertex2.x / ellipseWidth, yoffset + vertex2.y / ellipseHeight);
            geometry.faceVertexUvs[0].push([faceuv0, faceuv1, faceuv2]);
        }
    }
    return geometry;
}

function createCube() {
    var geometry = new THREE.BoxGeometry(200, 200, 200, 50, 50, 50);
    // for (var i = 0; i < geometry.faces.length; i += 2) {
    //     var hex = Math.random() * 0xffffff;
    //     geometry.faces[i].color.setHex(hex);
    //     geometry.faces[i + 1].color.setHex(hex);
    // }

    return geometry;
}

function createMyCube() {
    var xoffset = 0.5;
    var yoffset = 0.5;
    var zoffset = 0.5;
    var cubeWidth = 2 * 100;
    var cubeHeight = 2 * 100;
    var cubeDepth = 2 * 100;
    var geometry = new THREE.Geometry();
    var vertices = [
        new THREE.Vector3(100, 100, 100),
        new THREE.Vector3(100, 100, -100),
        new THREE.Vector3(100, -100, 100),
        new THREE.Vector3(100, -100, -100),
        new THREE.Vector3(-100, 100, -100),
        new THREE.Vector3(-100, 100, 100),
        new THREE.Vector3(-100, -100, -100),
        new THREE.Vector3(-100, -100, 100)
    ];

    var uvs = [
        new THREE.Vector2(0, 1),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 0)
    ];
    //Right
    var face = new THREE.Face3(0, 2, 1);
    var facevertexuv = [uvs[0], uvs[2], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(facevertexuv);

    var face = new THREE.Face3(2, 3, 1);
    var facevertexuv = [uvs[2], uvs[3], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(facevertexuv);


    //Top
    var face = new THREE.Face3(5, 0, 4);
    var facevertexuv = [uvs[0], uvs[2], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(facevertexuv);

    var face = new THREE.Face3(0, 1, 4);
    var facevertexuv = [uvs[2], uvs[3], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(facevertexuv);

    //Left
    var face = new THREE.Face3(5, 7, 4);
    var facevertexuv = [uvs[0], uvs[2], uvs[1]];
    geometry.faces.push(face);
    geometry.faceVertexUvs[0].push(facevertexuv);

    var face = new THREE.Face3(7, 6, 4);
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

    // var faces = [
    //     new THREE.Face3(0, 2, 1),
    //     new THREE.Face3(2, 3, 1),
    //
    //     new THREE.Face3(4, 6, 5),
    //     new THREE.Face3(6, 7, 5),
    //     new THREE.Face3(4, 5, 1),
    //     new THREE.Face3(5, 0, 1),
    //     new THREE.Face3(7, 6, 2),
    //     new THREE.Face3(6, 3, 2),
    //     new THREE.Face3(5, 7, 0),
    //     new THREE.Face3(7, 2, 0),
    //     new THREE.Face3(1, 3, 4),
    //     new THREE.Face3(3, 6, 4),
    // ];

    // geometry.vertices = vertices;
    // geometry.faces = faces;
    // geometry.mergeVertices();

    // for (var i = 0; i < geometry.faces.length; i++) {
    //     var face = geometry.faces[i];
    //     var vertex0 = geometry.vertices[face.a];
    //     var vertex1 = geometry.vertices[face.b];
    //     var vertex2 = geometry.vertices[face.c];
    //
    //     if (i == 0 || i == 1 || i == 4 || i == 5) {
    //         //yz
    //         var faceuv0 = new THREE.Vector2(zoffset + (vertex0.z) / cubeDepth, yoffset + (vertex0.y) / cubeHeight);
    //         var faceuv1 = new THREE.Vector2(zoffset + (vertex1.z) / cubeDepth, yoffset + (vertex1.y) / cubeHeight);
    //         var faceuv2 = new THREE.Vector2(zoffset + (vertex2.z) / cubeDepth, yoffset + (vertex2.y) / cubeHeight);
    //         geometry.faceVertexUvs[0].push([faceuv0, faceuv1, faceuv2]);
    //     }
    //     else if (i == 2 || i == 3 || i == 6 || i == 7) {
    //         //xy
    //         var faceuv0 = new THREE.Vector2(xoffset + (vertex0.x) / cubeWidth, yoffset + (vertex0.y) / cubeHeight);
    //         var faceuv1 = new THREE.Vector2(xoffset + (vertex1.x) / cubeWidth, yoffset + (vertex1.y) / cubeHeight);
    //         var faceuv2 = new THREE.Vector2(xoffset + (vertex2.x) / cubeWidth, yoffset + (vertex2.y) / cubeHeight);
    //         geometry.faceVertexUvs[0].push([faceuv0, faceuv1, faceuv2]);
    //     }
    //     else {
    //         //xz
    //         var faceuv0 = new THREE.Vector2(xoffset + (vertex0.x) / cubeWidth, zoffset + (vertex0.z) / cubeDepth);
    //         var faceuv1 = new THREE.Vector2(xoffset + (vertex1.x) / cubeWidth, zoffset + (vertex1.z) / cubeDepth);
    //         var faceuv2 = new THREE.Vector2(xoffset + (vertex2.x) / cubeWidth, zoffset + (vertex2.z) / cubeDepth);
    //         geometry.faceVertexUvs[0].push([faceuv0, faceuv1, faceuv2]);
    //     }
    // }
    return geometry;
}

try {
    init();
    var loader = new THREE.TextureLoader();
    loader.load('test.png', function (texture) {

        // var triangleGeometry = createTriangle();
        // var triangleMaterial = new THREE.MeshBasicMaterial({map: texture, color: 0xFFFFFF, side: THREE.FrontSide});
        // var triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);
        // triangle.position.set(windowWidth / 2, windowHeight / 2, 0);
        // scene.add(triangle);

        // var x = windowWidth / 2;
        // var y = windowHeight / 3;
        // for (var i = 1; i <= 4; i++) {
        //     var squareMaterial = new THREE.MeshBasicMaterial({map: texture, color: 0xFFFFFF, side: THREE.FrontSide});
        //     var squareGeometry = createSquare4(x, y, x + 50, y, i);
        //     var squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
        //     scene.add(squareMesh);
        //     x = x + 50;
        //     y = y + 50;
        // }

        // var material = new THREE.MeshBasicMaterial({map: texture, color: 0xFFFFFF, side: THREE.FrontSide});
        // var geometry = createMyCircle();
        // var circle = new THREE.Mesh(geometry, material);
        // circle.position.set(windowWidth / 2, windowHeight / 2, 0);
        // scene.add(circle);

        // var material = new THREE.MeshBasicMaterial({map: texture, color: 0xFFFFFF, side: THREE.FrontSide});
        // var geometry = createEllipse();
        // var ellipse = new THREE.Mesh(geometry, material);
        // ellipse.position.set(windowWidth / 2, windowHeight / 2, 0);
        // scene.add(ellipse);

        var geometry = createMyCube();
        var material = new THREE.MeshBasicMaterial({
            map: texture, color: 0xFFFFFF, side: THREE.DoubleSide
        });
        cube = new THREE.Mesh(geometry, material);
        cube.position.x = windowWidth / 2;
        cube.position.y = windowHeight / 2;
        scene.add(cube);
        renderCube();
        addToDOM();
    });
} catch (e) {
    //some error might happened.
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    // $('#container').append(errorReport+e);
    console.log(errorReport + e);
}

function renderCube() {
    requestAnimationFrame(renderCube);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // cube.rotation.z += 0.01;
    renderer.render(scene, camera);
};
