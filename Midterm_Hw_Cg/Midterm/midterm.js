var canvas;
var gl;
var vPosition;
var program;

var letter1vertices, letter2vertices;
var buffer1, buffer2;

// TODO: define any global variables you need

var vColor;
var posX = 0.0;
var posY = 0.0;
var scaleX = 1.0;
var scaleY = 1.0;
var redSlider = 1.0;
var greenSlider = 0.0;
var blueSlider = 0.0;

window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Create geometry data
    letter1vertices = [
        vec2(-0.9 , -0.3 ),
        vec2(-0.8 , -0.3),
        vec2(-0.9 , 0.4 ),
        vec2(-0.8 , 0.4 ),
        
        vec2(-0.9  , -0.4 ),
        vec2(-0.9  , -0.3 ),
        vec2(-0.2 , -0.4 ),
        vec2(-0.2 , -0.3),
        
        vec2(-0.3  , -0.3),
        vec2(-0.2  , -0.3 ),
        vec2(-0.3  , 0.4 ),
        vec2(-0.2  , 0.4 )
        
        ];
    
        letter2vertices = [
        vec2(0.1  , 0.4 ),
        vec2(0.2 , 0.4 ),
        vec2(0.1  , -0.4),
        vec2(0.2 , -0.4 ),
        
        
        vec2(0.2  , -0.4 ),
        vec2(0.2  , -0.3 ),
        vec2(0.8 , -0.4 ),
        vec2(0.8 , -0.3 ),
        
        
        vec2(0.8  , 0.4 ),
        vec2(0.8  , 0.3 ),
        vec2(0.2 , 0.4 ),
        vec2(0.2 , 0.3 )
        
        
        ];
    // TODO: create vertex coordinates for your initial letters instead of these vertices

    // Load the data into the GPU		
    
    buffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter1vertices), gl.STATIC_DRAW );  
  
    buffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter2vertices), gl.STATIC_DRAW );      

    
    
    vColor = gl.getUniformLocation(program, "vColor"); 

    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);    

	document.getElementById("posX").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
        posX = (event.target.value );
    };    
    document.getElementById("posY").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
        posY = (event.target.value );
    };
    document.getElementById("scaleX").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
        scaleX = event.target.value;
    };
    document.getElementById("scaleY").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
        scaleY = event.target.value;
    };  
    document.getElementById("redSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        redSlider = event.target.value;
    };
    document.getElementById("greenSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        greenSlider = event.target.value;
    };
    document.getElementById("blueSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        blueSlider = event.target.value;
    };

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    // TODO: Send necessary uniform variables to shader and 
	
    gl.uniform4fv(vColor, vec4(redSlider, greenSlider, blueSlider, 1));
    // perform draw calls for drawing letters
	
    // bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    // draw triangle
	gl.uniform1f(gl.getUniformLocation(program, "posX"), posX);
    gl.uniform1f(gl.getUniformLocation(program, "posY"), posY);
    gl.uniform1f(gl.getUniformLocation(program, "scaleX"), scaleX);
    gl.uniform1f(gl.getUniformLocation(program, "scaleY"), scaleY);
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter1vertices.length);

    gl.uniform4fv(vColor, vec4(1 - redSlider, 1 - greenSlider, 1 - blueSlider, 1));
   
	// bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    // draw rectangle
	
	gl.uniform1f(gl.getUniformLocation(program, "posX"), posX);
    gl.uniform1f(gl.getUniformLocation(program, "posY"), posY);
    gl.uniform1f(gl.getUniformLocation(program, "scaleX"), scaleX);
    gl.uniform1f(gl.getUniformLocation(program, "scaleY"), scaleY);
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter2vertices.length);


    window.requestAnimFrame(render);
}
