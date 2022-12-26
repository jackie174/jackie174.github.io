function Square(v,c, axis){

    this.vertices = new Float32Array (v);
    this.squareColor= new Float32Array(c);
    // Indices of the vertices
    this.indices = new Uint8Array([ 0, 1, 2,   0,2,3]);

    this.vertexBuffer = initArrayBufferForLaterUse(this.vertices, 3, gl.FLOAT);
    this.squareColorBuffer = initArrayBufferForLaterUse(this.squareColor, 3, gl.FLOAT);
    
    this.a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    this.a_Color = gl.getAttribLocation(gl.program, "a_Color");
    this.num = this.indices.length;

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // Write the indices to the buffer object
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    
}
// Coordinate transformation matrix
var g_mvpMatrix = new Matrix4();
var g_matrixStack = []; // Array for storing a matrix
function pushMatrix(m) { // Store the specified matrix to the array
  var m2 = new Matrix4(m);
  g_matrixStack.push(m2);
}

function popMatrix() { // Retrieve the matrix from the array
  return g_matrixStack.pop();
}
Square.prototype = {
    
  draw: function(gl, axis, viewProjMatrix, u_MvpMatrix) {
    // Clear color and depth buffer
    //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    pushMatrix(g_modelMatrix);

      initAttributeVariable(this.a_Position, this.vertexBuffer);
      initAttributeVariable(this.a_Color, this.squareColorBuffer);

      g_mvpMatrix.set(viewProjMatrix);
      g_mvpMatrix.multiply(g_modelMatrix);
      /* var lightMatrix=new Matrix4();
      var lightPosition = new Float32Array ( [ 10.0 , 10.0, 15.5 ] ) ;
      var lx=lightPosition[0], ly=lightPosition[1], lz=lightPosition[2];
      var light= new Float32Array([
        3 * 1/ly + 1, -(lx/ly), 0, -3 * lx/ly,
        0,                   0, 0,       3/ly,
        3 * 1/ly + 1, -(lz/ly), 0, -3 * lz/ly,
        0,                -1/ly, 0,         1
      ]);
     
      lightMatrix.elements=light;
      g_mvpMatrix.multiply(lightMatrix) */
      
      gl.uniformMatrix4fv(u_MvpMatrix, false, g_mvpMatrix.elements);
      // Draw the square
      gl.drawElements(gl.TRIANGLES, this.num, gl.UNSIGNED_BYTE, 0);
    g_modelMatrix = popMatrix(); 
  }

    
}