var gl;
var color, colorLoc;

window.onload = function init()
{
	
   var canvas = document.getElementById("gl-canvas");

   gl = WebGLUtils.setupWebGL(canvas);

   if (!gl) { alert ("WebGL isn't avaiable "); }
   
   const innerRadius = 0.2;   // r
   const outerRadius = 0.4;   // w

// Define the number of segments used to create the donut
   const numSegments = 32;
   const numVertices = numSegments * 2;
 
// Define the array of vertices for the donut
   const vertices = [];
   for (let i = 0; i <= numSegments; i++) {
       const theta = i * 2 * Math.PI / numSegments;   
       const x = Math.cos(theta);
       const y = Math.sin(theta);

       vertices.push(x * innerRadius, y * innerRadius, 0);
       vertices.push(x * outerRadius, y * outerRadius, 0);
}

// Define the array of indices for the triangle strips
   const indices = [];
   for (let i = 0; i <= numSegments; i++) {
       const i0 = i * 2;
       const i1 = (i * 2 + 1) % numVertices;
       const i2 = (i * 2 + 2) % numVertices;
       const i3 = (i * 2 + 3) % numVertices;

       indices.push(i0, i1, i2);
       indices.push(i1, i3, i2);
}

   //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
    // Load the data into the GPU    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,new Float32Array(vertices), gl.STATIC_DRAW );
	
	
	var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	

    render();


    function render() {
       gl.clear( gl.COLOR_BUFFER_BIT );
	   
	   //gl.drawArrays(gl.POINTS,0, indices.length);
	   
       gl.drawArrays(gl.TRIANGLE_STRIP, 0, indices.length); 
	   
	   
	   //gl.drawArrays(gl.LINE_STRIP, 0 , indices.length)
	   
}
}