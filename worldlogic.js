
function drawWorld() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

  app.projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  app.fieldOfView = 45 * Math.PI / 180;
  app.zNear = 0.1;
  app.zFar = 100.0;
  mat4.perspective(app.projectionMatrix,
    app.fieldOfView,
    aspect,
    app.zNear,
    app.zFar);


  //Fijamos las variables de las luces
  gl.uniform3f(app.programInfo.lightLocations.directionalLight.color, app.lights.directionalLight.color[0], app.lights.directionalLight.color[1], app.lights.directionalLight.color[2]);
  gl.uniform3f(app.programInfo.lightLocations.directionalLight.direction, app.lights.directionalLight.direction[0], app.lights.directionalLight.direction[1], app.lights.directionalLight.direction[2]);
  gl.uniform3f(app.programInfo.lightLocations.ambientLight, app.lights.ambientLight[0], app.lights.ambientLight[1], app.lights.ambientLight[2]); 
  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  
  mat4.translate(app.projectionMatrix,     // destination matrix
    app.projectionMatrix,     // matrix to translate
    [0, 0.0, -20]);  // amount to translate
  
  mat4.rotate(app.projectionMatrix,  // destination matrix
    app.projectionMatrix,  // matrix to rotate
    0.5*app.cubeRotation,     // amount to rotate in radians
    [1, 0, 0]);       // axis to rotate around (X)



  app.modelViewMatrix = mat4.create();

  app.normalMatrix = mat4.create();
  mat4.invert(app.normalMatrix, app.modelViewMatrix);
  mat4.transpose(app.normalMatrix, app.normalMatrix);

  //Dibuamos el cubo de base
  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.0, 0.0, -0.0]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [6, 1, 3]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [141.0/255.0, 198.0/255.0, 93.0/255.0, 1.0]);
  mvPopMatrix();

  // Con las siguientes líneas vamos a dibujar las vías
  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.0, 1.0, -0.0]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [6, 0.1, 0.5]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0/255.0, 110.0/255.0, 110.0/255.0, 1.0]);
  mvPopMatrix();

  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.0, 1.0, -0.0]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [6, 0.1, 0.5]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0/255.0, 110.0/255.0, 110.0/255.0, 1.0]);
  mvPopMatrix();

  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [3.0, 1.0, -1.7]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [2.4, 0.1, 0.9]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0/255.0, 110.0/255.0, 110.0/255.0, 1.0]);
  mvPopMatrix();

  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-3.0, 1.0, -1.7]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [2.4, 0.1, 0.9]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0/255.0, 110.0/255.0, 110.0/255.0, 1.0]);
  mvPopMatrix();

  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [3.8, 1.0, 1.7]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.6, 0.1, 0.9]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0/255.0, 110.0/255.0, 110.0/255.0, 1.0]);
  mvPopMatrix();

  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.0, 1.0, 1.7]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.6, 0.1, 0.9]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [110.0/255.0, 110.0/255.0, 110.0/255.0, 1.0]);
  mvPopMatrix();

  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-3.8, 1.0, 1.7]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.6, 0.2, 0.9]);
    drawElement(app.buffers.cube, app.texture.bricks, false, [101.0/255.0, 154.0/255.0, 65.0/255.0, 1.0]);
  mvPopMatrix();

  //Dibujamos la estación de policias
  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.5, 1.9, 1.7]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.5, 0.8, 0.5]);
    drawElement(app.buffers.cube, app.texture.police, true);
  mvPopMatrix();

  //Dibujamos el restaurante al lado de la estación
  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [4.8, 1.6, 1.7]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.5, 0.5, 0.5]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0,1,0]);
    drawElement(app.buffers.cube, app.texture.restaurant, true);
  mvPopMatrix();

  //Dibujamos la estación de gasolina
  drawGasStation();

  app.cubeRotation += app.deltaTime;
  updateDirectionalLightPosition();
}

function updateDirectionalLightPosition(){
  app.lights.directionalLight.direction = [0.0, 3*Math.sin(0.1*app.cubeRotation), 3*Math.cos(0.1*app.cubeRotation)];
}

function drawGasStation(){
  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.8, 1.6, -1.7]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.5, 0.7, 0.6]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0,1,0]);
    drawElement(app.buffers.cube, app.texture.restaurant, true);
  mvPopMatrix();
  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-2.9, 2.3, -1.7]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.9, 0.02, 0.7]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0,1,0]);
    drawElement(app.buffers.cube, null, false, [0.3,0.3,0.3,1.0]);
  mvPopMatrix();
  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-2.9, 2.3, -2.4]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.85, 0.08, 0.08]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0,1,0]);
    drawElement(app.buffers.cube, null, false, [1.0,1.0,1.0,1.0]);
  mvPopMatrix();
  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-2.9, 2.3, -1.0]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.85, 0.08, 0.08]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0,1,0]);
    drawElement(app.buffers.cube, null, false, [1.0,1.0,1.0,1.0]);
  mvPopMatrix();
  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-4.7, 2.3, -1.7]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.08, 0.08, 0.7]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0,1,0]);
    drawElement(app.buffers.cube, null, false, [1.0,1.0,1.0,1.0]);
  mvPopMatrix();
  mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.1, 2.3, -1.7]);  // amount to translate
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.08, 0.08, 0.7]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0,1,0]);
    drawElement(app.buffers.cube, null, false, [1.0,1.0,1.0,1.0]);
  mvPopMatrix();
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-4.4, 1.6, -1.2]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.08, 0.7, 0.08]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0,1,0]);
    drawElement(app.buffers.cube, null, false, [0.1,0.1,0.1,1.0]);
  mvPopMatrix();
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-4.4, 1.6, -2.2]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.08, 0.7, 0.08]);
    mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0,1,0]);
    drawElement(app.buffers.cube, null, false, [0.1,0.1,0.1,1.0]);
  mvPopMatrix();
}


app.drawScene = drawWorld;
