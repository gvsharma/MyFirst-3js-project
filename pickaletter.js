/**
 * Created by GV Sharma on 9/20/2016.
 */
var path = "";

var camera, scene, renderer;
var cameraControls, effectController;
var clock = new THREE.Clock();

function SquareGeometry() {
    var geo = new THREE.Geometry();

    geo.vertices.push( new THREE.Vector3( 0.0, 0.0, 0.0 ) );
    geo.vertices.push( new THREE.Vector3( 1.0, 0.0, 0.0 ) );
    geo.vertices.push( new THREE.Vector3( 1.0, 1.0, 0.0 ) );
    geo.vertices.push( new THREE.Vector3( 0.0, 1.0, 0.0 ) );

    var uvs = [];
    uvs.push( new THREE.Vector2( 0.0, 0.0 ) );
    uvs.push( new THREE.Vector2( 1.0, 0.0 ) );
    uvs.push( new THREE.Vector2( 1.0, 1.0 ) );
    uvs.push( new THREE.Vector2( 0.0, 1.0 ) );

    geo.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geo.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[2] ] );
    geo.faces.push( new THREE.Face3( 0, 2, 3 ) );
    geo.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[2], uvs[3] ] );
    return geo;
}

function fillScene() {
    scene = new THREE.Scene();

    var myPolygon = new SquareGeometry();
    var myTexture = THREE.ImageUtils.loadTexture( path + 'frisbee.png' );
    var myPolygonMaterial = new THREE.MeshBasicMaterial( { map: myTexture } );
    var polygonObject = new THREE.Mesh( myPolygon, myPolygonMaterial );
    scene.add(polygonObject);
    setupGui();
}
function init() {
    var canvasWidth = 846;
    var canvasHeight = 494;
    // For grading the window is fixed in size; here's general code:
    //var canvasWidth = window.innerWidth;
    //var canvasHeight = window.innerHeight;
    var canvasRatio = canvasWidth / canvasHeight;

    // RENDERER
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    // renderer.setClearColorHex( 0xFFFFFF, 1.0 );

    // Camera: Y up, X right, Z up
    camera = new THREE.PerspectiveCamera( 1, canvasRatio, 50, 150 );
    camera.position.set( 0.5, 0.5, 100 );

    // CONTROLS
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0.5,0.5,0);
    fillScene();
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

function setupGui() {

    effectController = {

        alpha: 0.7,
        sred:   0xE5/255,
        sgreen: 0x33/255,
        sblue:  0x19/155,

        dred:   0xE5/255,
        dgreen: 0xE5/255,
        dblue:  0x66/255
    };

    addToDOM();
}

try {
    init();
} catch(e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    console.log(errorReport+e);
}