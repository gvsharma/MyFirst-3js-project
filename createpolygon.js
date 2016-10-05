var camera, scene, renderer;
var windowScale;
var windowWidth;
var windowHeight;
var clock = new THREE.Clock();
var cameraControls, effectController;

//polygone with number of sides.
function PolygonGeometry(sides) {
    var geo = new THREE.Geometry();
    for (var pt = 0; pt < sides; pt++) {
        var angle = (Math.PI / 2) + (pt / sides) * 2 * Math.PI;
        var x = Math.cos(angle);
        var y = Math.sin(angle);

        console.log("Points " + pt + " : " + x + " and " + y + " with angle as " + angle);
        geo.vertices.push(new THREE.Vector3(x, y, 0.0));
        if (pt >= 2) {
            geo.faces.push(new THREE.Face3(0, pt - 1, pt));
        }
    }
    return geo;
}

function polygonWithLocation(sides, location) {
    var geo = new THREE.Geometry();
    for (var point = 0; point < sides; point++) {
        var angle = (Math.PI / 2) + (point / sides) * 2 * Math.PI;
        var x = Math.cos(angle) + location.x;
        var y = Math.sin(angle) + location.y;
        var z = Math.sin(angle) + location.z;

        geo.vertices.push(new THREE.Vector3(x, y, z));
    }

    for (var face = 0; face < sides - 2; face++) {
        geo.faces.push(new THREE.Face3(0, face + 1, face + 2));
    }
    return geo;
}

function polygonWithLocationAndRadious(sides, location, radious) {
    var geo = new THREE.Geometry();
    for (var point = 0; point < sides; point++) {
        var angle = (Math.PI / 2) + (point / sides) * 2 * Math.PI;
        var x = radious * Math.cos(angle) + location.x;
        var y = radious * Math.sin(angle) + location.y;
        var z = Math.sin(angle) + location.z;

        geo.vertices.push(new THREE.Vector3(x, y, z));
    }

    for (var face = 0; face < sides - 2; face++) {
        geo.faces.push(new THREE.Face3(0, face + 1, face + 2));
    }
    return geo;
}

function init() {
    windowScale = 8;
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvasRatio = windowWidth / windowHeight;
    scene = new THREE.Scene();
    var windowWidth1 = windowScale * canvasRatio;
    var windowHeight1 = windowScale;

    camera = new THREE.OrthographicCamera(windowWidth1 / -2, windowWidth1 / 2, windowHeight1 / 2, windowHeight1 / -2, 1, 100);

    camera.position.set(0, 0, 10);

    renderer = new THREE.WebGLRenderer({antialias: false});

    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);

    renderer.setSize(windowWidth, windowHeight);
    var location = new THREE.Vector3(2, 1, 5);
    var geo = polygonWithLocation(6, location);
    var material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.FrontSide});
    var mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);
    addToDOM();
}

function addToDOM() {
    document.body.appendChild(renderer.domElement);
    console.log("addToDOM");
    animate();
}


function render() {
    var delta = clock.getDelta();
    cameraControls.update(delta);
    renderer.render(scene, camera);
    console.log("Rendered");
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

// Main body of the script

try {
    init();
//	  showGrids();


} catch (e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
//	    $('#container').append(errorReport+e);
    console.log("error: " + errorReport + e);
}