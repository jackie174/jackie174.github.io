// RotatingTriangle.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =`
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  uniform mat4 u_MvpMatrix;
  varying vec4 v_Color;
  void main() {
    gl_Position = u_MvpMatrix * a_Position;
    v_Color = a_Color;
  }`;

// Fragment shader program
var FSHADER_SOURCE =`
  precision mediump float;
  varying vec4 v_Color;
  void main() {
    gl_FragColor = v_Color;
  }`;

// Rotation angle (degrees/second)
var ANGLE_STEP = 45;
var gl;
var blue_vertices=new Float32Array([-1.0, 0.0, -1.0,  1.0, 0.0, -1.0,  1.0, 0.0, 1.0, -1.0, 0.0, 1.0]);
// Calculate the view projection matrix
var viewProjMatrix = new Matrix4();
var red = [2.0, 0.0, 0.0,  2.0, 0.0, 0.0,  2.0, 0.0, 0.0,  2.0, 0.0, 0.0];
var green = [0.0, 2.0, 0.0,  0.0, 2.0, 0.0,  0.0, 2.0, 0.0,  0.0, 2.0, 0.0];
var purple = [2.0, 0.0, 2.0, 2.0, 0.0, 2.0,2.0, 0.0, 2.0,2.0, 0.0, 2.0];
var blue = [0.0, 0.0, 2.0,  0.0, 0.0, 2.0,  0.0, 0.0, 2.0, 0.0, 0.0, 2.0];
var cyan = [0.0, 2.0, 2.0,  0.0, 2.0, 2.0,  0.0, 2.0, 2.0,  0.0, 2.0, 2.0];
var yellow = [2.0, 2.0, 0.0,  2.0, 2.0, 0.0,  2.0, 2.0, 0.0,  2.0, 2.0, 0.0];
var baseAxis=[2,0,0];
var xAxis=[2,0,0];
var yAxis=[0,2,0];
var zAxis=[0,0, 2];
var xRotate=45;
var n=6;
var blue_angle=0;
var red_angle=45;
var green_angle=45;
var purple_angle = 45;
var cayn_angle = 35;
var yellow_angle = 20;
var q1, q2, q3, q4, q5, q6;
var canvas;
var ANGLE_STEP = 3.0; 
function main() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  } 
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  // Get storage location of u_ModelMatrix
  var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  if (!u_MvpMatrix) { 
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }
  viewProjMatrix.setPerspective(50.0, canvas.width / canvas.height, 1.0, 100.0);
  // comment/uncomment from this line
  viewProjMatrix.lookAt(20,35,20, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
  viewProjMatrix.scale(3,3,3);
  document.onmousemove = function (ev){click(ev, gl, n, viewProjMatrix, u_MvpMatrix);};
  
  q1=new Square(blue_vertices,blue);
  q2=new Square(blue_vertices,red); 
  q3=new Square(blue_vertices,green);
  q4=new Square(blue_vertices,purple);
  q5=new Square(blue_vertices,cyan);
  q6=new Square(blue_vertices,yellow);

  // implement question 11
  // please comment line 75 - 85, uncomment line 90-100

  // viewProjMatrix.lookAt(20,40,-20, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
  // viewProjMatrix.scale(3,3,3)
  // document.onmousemove = function (ev){click(ev, gl, n, viewProjMatrix, u_MvpMatrix);};
  
  // q1=new Square(blue_vertices,blue);
  // q2=new Square(blue_vertices,purple);
  // q3=new Square(blue_vertices,cyan);
  // q4=new Square(blue_vertices,green);
  // q5=new Square(blue_vertices,red);
  // q6=new Square(blue_vertices,yellow);

  var q7 = new Square(blue_vertices, blue);
  q7.draw(gl, zAxis,viewProjMatrix, u_MvpMatrix); 

  //drawCube(gl,viewProjMatrix, u_MvpMatrix)
  
}
var temp= new Array();
var g_modelMatrix = new Matrix4();
var g_matrixStack = []; // Array for storing a matrix
function pushMatrix(m) { // Store the specified matrix to the array
  var m2 = new Matrix4(m);
  g_matrixStack.push(m2);
}

function popMatrix() { // Retrieve the matrix from the array
  return g_matrixStack.pop();
}
var lastX;
var rect = document.getElementsByClassName("arrow");
var rect=rect[0];
var rect1 = document.getElementsByClassName("line");
var rect2=rect1[0];
rect.addEventListener('mousedown', function(event) {
  if (event.which == 1) {
    lastX = event.pageX;
    addEventListener('mousemove', moved);
    event.preventDefault(); // Prevent selection
  }
});

function buttonPressed(event) {
  if (event.buttons == null)
    return event.which != 0;
  else
    return event.buttons != 0;
}
function moved(event) {
  if(!buttonPressed(event)) {
    removeEventListener('mousemove', moved);
  } else {
    var dist = event.pageX - lastX;
    var newWidth = Math.max(10, rect.offsetWidth + dist);
    if (newWidth<=550 && newWidth>30){
      rect.style.width = newWidth + 'px';
    rect2.style.width = newWidth-30 + 'px';
    }
    lastX = event.pageX;



  }
}
function click(ev, gl, n, viewProjMatrix, u_MvpMatrix){
  var x=ev.clientX;
  var y=ev.clientY;
  temp.push(x);
  
  if ( x>10 && x<lastX+30 && buttonPressed(ev)){
    if (x> temp[temp.length-2]){
      if(red_angle<90 ){red_angle +=ANGLE_STEP ;}
      if(green_angle<90){green_angle+=ANGLE_STEP;}
      if (purple_angle<90){purple_angle +=ANGLE_STEP; }
      if (cayn_angle<90){cayn_angle  = (cayn_angle+ANGLE_STEP)%360;}
      if (yellow_angle<90){yellow_angle= (yellow_angle+ ANGLE_STEP)%360; }
    }else{
      if(red_angle>=0 ){ red_angle -=ANGLE_STEP;}
      if(green_angle>= 0 ){green_angle-=ANGLE_STEP;}
      if (purple_angle>=0){purple_angle -=ANGLE_STEP; }
      if (cayn_angle>=0){cayn_angle  = (cayn_angle - ANGLE_STEP)%360;}
      if (yellow_angle>=0){yellow_angle= (yellow_angle- ANGLE_STEP)%360;}
    }
  }
  drawCube(gl,viewProjMatrix, u_MvpMatrix)
}
//caculate matrix to draw each square 
function drawCube(gl, viewProjMatrix, u_MvpMatrix){
  gl.clearColor(1,1,1,1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // draw blue 
    g_modelMatrix.setTranslate(0, 0,0);
    q1.draw(gl, baseAxis, viewProjMatrix, u_MvpMatrix);

    g_modelMatrix.translate(1, 0,0);  //move to line of intersection (red and blue)
    // draw red
    var axis=zAxis;
    pushMatrix(g_modelMatrix);
        g_modelMatrix.rotate(red_angle, axis[0],axis[1],axis[2]);
        g_modelMatrix.translate(1,0,0);
        q2.draw(gl, zAxis,viewProjMatrix, u_MvpMatrix); 

        g_modelMatrix.translate(1, 0,0);  //move to line of intersection (red and cayn)
        // draw cayn
        var axis=zAxis;
        g_modelMatrix.rotate(cayn_angle, axis[0],axis[1],axis[2]);
        g_modelMatrix.translate(1,0,0);
        q5.draw(gl, xAxis, viewProjMatrix, u_MvpMatrix);

        g_modelMatrix.translate(1, 0,0);  //move to line of intersection ( cayn and yellow)
        // draw yellow
        var axis=zAxis;
        g_modelMatrix.rotate(yellow_angle, axis[0],axis[1],axis[2]);
        g_modelMatrix.translate(1,0,0);
        q6.draw(gl,xAxis, viewProjMatrix, u_MvpMatrix); 
    g_modelMatrix=popMatrix();

    g_modelMatrix.translate(-1, 0,-1);   // move to line intersection (blue and green)
    // draw green
    var axis=xAxis;
    pushMatrix(g_modelMatrix);
        g_modelMatrix.rotate(green_angle, axis[0],axis[1],axis[2]);
        g_modelMatrix.translate(0,0,-1);
        q3.draw(gl, xAxis, viewProjMatrix, u_MvpMatrix); 
    g_modelMatrix=popMatrix();

    g_modelMatrix.translate(0, 0,2);   // move line to intersection (blue and purple)
    // draw purple
    var axis=xAxis;
    g_modelMatrix.rotate(-purple_angle, axis[0],axis[1],axis[2]);
    g_modelMatrix.translate(0,0,1);
    q4.draw(gl, xAxis, viewProjMatrix, u_MvpMatrix); 


}


