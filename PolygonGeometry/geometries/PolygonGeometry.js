/**
 * Created by GV Sharma on 10/09/2016.
 */

function PolygonGeometry(sides, radius, height) {
    //all vertices.
    var vertices = makePolygonVertices(sides, radius);
    var geometryArr = [];
    for (var i = 0; i < vertices.length; i++) {
        var x = vertices[i].x;
        var y = vertices[i].y;
        var z = vertices[i].z;
        if (i > 0) {
            var prevX = vertices[i - 1].x;
            var prevY = vertices[i - 1].y;
            var prevZ = vertices[i - 1].z;
            var geometry = buildPlane(i, x, y, z,
                prevX, prevY, prevZ, height);
            geometryArr[i - 1] = geometry;
        }
    }
    return geometryArr;
}
/**
 * make all vertices of polygon.
 * @param sides
 * @param radious
 * @returns {Array}
 */
function makePolygonVertices(sides, radius) {
    var vertices = [];
    for (var point = 1; point <= sides; point++) {
        var angle = (360 / sides) * point * (Math.PI / 180);
        var x = radius * Math.cos(angle);
        var z = radius * Math.sin(angle);

        var vertex = new THREE.Vector3();
        vertex.x = x;
        vertex.y = 0;
        vertex.z = z;
        vertices.push(vertex);
        if (point == sides) {
            var angle = (360 / sides) * (point + 1) * (Math.PI / 180);
            var x = radius * Math.cos(angle);
            var z = radius * Math.sin(angle);
            var vertex = new THREE.Vector3();
            vertex.x = x;
            vertex.y = 0;
            vertex.z = z;
            vertices.push(vertex);
        }
    }
    return vertices;
}

/**
 * build each polygon fae(plane).
 * @param i
 * @param x
 * @param y
 * @param z
 * @param prevX
 * @param prevY
 * @param prevZ
 */
function buildPlane(i, x, y, z, prevX, prevY, prevZ, height) {
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

    return geometry;
}

// PolygonGeometry.prototype = Object.create(PolygonGeometry.prototype);
// PolygonGeometry.prototype.constructor = PolygonGeometry;

// export {PolygonGeometry};