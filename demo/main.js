var Window       = require('pex-sys/Window');
var Mat4         = require('pex-math/Mat4');
var Vec3         = require('pex-math/Vec3');
var glslify      = require('glslify-promise');
var createCube   = require('../index.js');
var computeEdges = require('geom-edges');

Window.create({
    settings: {
        width: 1024,
        height: 576
    },
    resources: {
        vert: { glsl: glslify(__dirname + '/Material.vert') },
        frag: { glsl: glslify(__dirname + '/Material.frag') },
        solidColorVert: { glsl: glslify(__dirname + '/SolidColor.vert') },
        solidColorFrag: { glsl: glslify(__dirname + '/SolidColor.frag') }
    },
    init: function() {
        var ctx = this.getContext();

        this.model = Mat4.create();

        this.projection = Mat4.perspective(
            Mat4.create(),
            45,
            this.getAspectRatio(),
            0.001,
            10.0
        );

        this.view = Mat4.create();

        Mat4.lookAt(this.view, [0, 1, 3], [0, 0, 0], [0, 1, 0]);

        ctx.setProjectionMatrix(this.projection);
        ctx.setViewMatrix(this.view);
        ctx.setModelMatrix(this.model);

        var res = this.getResources();

        this.program = ctx.createProgram(res.vert, res.frag);
        this.solidColorProgram = ctx.createProgram(res.solidColorVert, res.solidColorFrag);

        var g = createCube(1,1,1,5,5,5);

        this.mesh = ctx.createMesh([
            { data: g.positions, location: ctx.ATTRIB_POSITION },
            { data: g.normals, location: ctx.ATTRIB_NORMAL },
            { data: g.uvs, location: ctx.ATTRIB_TEX_COORD_0 },
        ], { data: g.cells }, ctx.TRIANGLES);

        this.meshWireframe = ctx.createMesh([
            { data: g.positions, location: ctx.ATTRIB_POSITION },
        ], { data: computeEdges(g.cells) }, ctx.LINES);

        var img = new Uint8Array([
            0xff, 0xff, 0xff, 0xff, 0xcc, 0xcc, 0xcc, 0xff,
            0xcc, 0xcc, 0xcc, 0xff, 0xff, 0xff, 0xff, 0xff
        ]);

        this.tex = ctx.createTexture2D(img, 2, 2, {
          repeat: true,
          minFilter: ctx.NEAREST,
          magFilter: ctx.NEAREST
        })
    },

    draw: function() {
        var ctx = this.getContext();
        ctx.setClearColor(1, 1, 1, 1);
        ctx.clear(ctx.COLOR_BIT | ctx.DEPTH_BIT);
        ctx.setDepthTest(true);

        ctx.bindTexture(this.tex, 0);
        ctx.bindProgram(this.program);
        this.program.setUniform('uTexture', 0);

        Mat4.rotate(this.model, Math.PI/100, [0, 1, 0]);
        ctx.setModelMatrix(this.model);

        ctx.bindMesh(this.mesh);
        ctx.drawMesh();

        ctx.bindProgram(this.solidColorProgram);
        ctx.pushModelMatrix();
        ctx.scale([1.01,1.01,1.01])
        ctx.bindMesh(this.meshWireframe);
        ctx.drawMesh();
        ctx.popModelMatrix();
    }
})
