![](thumb.png)

# primitive-cube

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A minimal cube geometry for 3D rendering, including normals, UVs and cell indices (faces).

## Usage

[![NPM](https://nodei.co/npm/primitive-cube.png)](https://www.npmjs.com/package/primitive-cube)

#### `mesh = createCube([sx, sy, sz])`

Parameters:  
`sx` - size x, defaults to 1  
`sy` - size y, defaults to `sx`
`sz` - size z, defaults to `sx`

## Example

```javascript
var createCube = require('primtivie-cube');
var cubeMesh = createCube(1);
```

`cube` will have the following structure:

```
{
  positions: [ [x, y, z], [x, y, z], ... ],
  cells: [ [a, b, c], [a, b, c], ... ],
  uvs: [ [u, v], [u, v], ... ],
  normals: [ [x, y, z], [x, y, z], ... ]
}
```

## Demo

Download or clone this repo and run:

```
cd demo
npm install
npm start
```

## License

MIT, see [LICENSE.md](http://github.com/vorg/primitive-cube/blob/master/LICENSE.md) for details.
