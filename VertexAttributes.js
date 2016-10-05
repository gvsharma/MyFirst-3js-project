/**
 * Created by GV Sharma on 9/15/2016.
 */
var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
var windowScale;

function fillScene() {
    scene = new THREE.Scene();

    var material, mesh, geometry;

    material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors, side: THREE.DoubleSide});
    geometry = createTriangle();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    addToDOM();
}

function createTriangle() {
    var triangle = new THREE.Geometry();
    triangle.vertices.push(new THREE.Vector3(1, 1, 0));
    triangle.vertices.push(new THREE.Vector3(3, 1, 0));
    triangle.vertices.push(new THREE.Vector3(3, 3, 0));

    var face = new THREE.Face3(0, 1, 2);
    face.vertexColors[0] = new THREE.Color(0xff0000);
    face.vertexColors[1] = new THREE.Color(0x00ff00);
    face.vertexColors[2] = new THREE.Color(0x0000ff);
    triangle.faces.push(face);


    return triangle;
}

function init() {
    var width = 894;
    var height = 494;
    var ratio = width / height;
    windowScale = 12;
    var windowWidth = windowScale * canvasRatio;
    var windowHeight = windowScale;
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(width, height);

    camera = new THREE.PerspectiveCamera(55, ratio, 1, 4000);
    camera.position.set(100, 150, 130);

    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0, 0, 0);
    fillScene();
}

function render() {
    var delta = clock.getDelta();
    cameraControls.update(delta);

    renderer.render(scene, camera);
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

function addToDOM() {
    document.body.appendChild(renderer.domElement);
    console.log("addToDOM");
    animate();
}

try {
    init();
} catch (e) {
    console.log('error: ' + e);
}