function createCube(sx, sy, sz, nx, ny, nz) {
    if (sx === undefined) sx = 1.0;
    if (sy === undefined) sy = sx;
    if (sz === undefined) sz = sx;

    if (nx === undefined) nx = 1.0;
    if (ny === undefined) ny = nx;
    if (nz === undefined) nz = nx;

    var x = sx / 2;
    var y = sy / 2;
    var z = sz / 2;

    var numVertices = (nx + 1) * (ny + 1) * 2 + (nx + 1) * (nz + 1) * 2 + (nz + 1) * (ny + 1) * 2;

    var vertexIndex = 0;
    var positions = [];
    var normals = [];
    var uvs = [];
    var cells = [];

    function makePlane(u, v, w, su, sv, nu, nv, pw, flipu, flipv) {
        var vertShift = vertexIndex;
        for(var j=0; j<=nv; j++) {
            for(var i=0; i<=nu; i++) {
                var vert = positions[vertexIndex] = [0,0,0];
                vert[u] = (-su/2 + i*su/nu) * flipu;
                vert[v] = (-sv/2 + j*sv/nv) * flipv;
                vert[w] = pw

                var normal = normals[vertexIndex] = [0,0,0];
                normal[u] = 0
                normal[v] = 0
                normal[w] = pw/Math.abs(pw);

                var texCoord = uvs[vertexIndex] = [0,0];
                texCoord[0] = i/nu;
                texCoord[1] = 1.0 - j/nv;

                ++vertexIndex;
            }
        }

        for(var j=0; j<nv; j++) {
            for(var i=0; i<nu; i++) {
                var n = vertShift + j * (nu + 1) + i
                cells.push([n, n + nu  + 1, n + nu + 2]);
                cells.push([n, n + nu + 2, n + 1]);
            }
        }
    }

     makePlane(0, 1, 2, sx, sy, nx, ny,  sz/2,  1, -1); //front
     makePlane(0, 1, 2, sx, sy, nx, ny, -sz/2, -1, -1); //back
     makePlane(2, 1, 0, sz, sy, nz, ny, -sx/2,  1, -1); //left
     makePlane(2, 1, 0, sz, sy, nz, ny,  sx/2, -1, -1); //right
     makePlane(0, 2, 1, sx, sz, nx, nz,  sy/2,  1,  1); //top
     makePlane(0, 2, 1, sx, sz, nx, nz, -sy/2,  1, -1); //bottom

    return {
        positions: positions,
        normals: normals,
        uvs: uvs,
        cells: cells
    }
}

module.exports = createCube;
