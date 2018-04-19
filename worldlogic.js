
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
    [0, 0.0, -15]);  // amount to translate

  mat4.rotate(app.projectionMatrix,  // destination matrix
    app.projectionMatrix,  // matrix to rotate
    app.camera.x,     // amount to rotate in radians
    [1, 0 , 0]);       // axis to rotate around (X)



  app.modelViewMatrix = mat4.create();

  app.normalMatrix = mat4.create();
  mat4.invert(app.normalMatrix, app.modelViewMatrix);
  mat4.transpose(app.normalMatrix, app.normalMatrix);


  //Dibuamos el cubo de base
  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.0, 0.0, 0.0]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [12, 0.5, 8]);
  drawElement(app.buffers.cube, app.texture.bricks, false, [141.0 / 255.0, 198.0 / 255.0, 93.0 / 255.0, 1.0]);
  mvPopMatrix();

  // Con las siguientes líneas vamos a dibujar las vías
  drawStreet();

  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [1.6275, 0.26, -2.4185]);  // amount to translate
  drawHospital();
  mvPopMatrix();

  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [4.4447, 0.26, -2.4185]);  // amount to translate
  drawRadioStation();
  mvPopMatrix();

  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-3.3087, 0.26, -2.4185]);  // amount to translate
  drawGasStation();
  mvPopMatrix();


  app.cubeRotation += app.deltaTime;
  updateDirectionalLightPosition();
}

function updateDirectionalLightPosition() {
  app.lights.directionalLight.direction = [3 * Math.cos(0.1 * app.cubeRotation), 
                                           3 * Math.sin(0.1 * app.cubeRotation), 
                                           3 * Math.sin(0.1 * app.cubeRotation)];
}

function drawGasStation() {
  mvPushMatrix()
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [4.7589, 0.02, 2.564]);
  drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
  mvPopMatrix();

  mvPushMatrix(); //Dibujo del edificio
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [1.2248, 0.51, -0.0066]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.3146, 1, 1.6338]);
  drawElement(app.buffers.cube, app.texture.restaurant, true);
  mvPopMatrix();

  mvPushMatrix(); //Techo gris
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.0247, 1.1019, -0.0085]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [4.0666, 0.1838, 1.8459]);
  drawElement(app.buffers.cube, null, false, [209/255, 209/255, 209/255, 1.0]);
  mvPopMatrix();

  mvPushMatrix(); //Bordes techo blanco izquierda
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-2.1001, 1.1019, 0]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.1838, 0.25, 1.8289]);
  drawElement(app.buffers.cube, null, false, [1, 1, 1, 1.0]);
  mvPopMatrix();

  mvPushMatrix(); //Bordes techo blanco derecha
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [2.1001, 1.1019, 0]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.1838, 0.25, 1.8289]);
  drawElement(app.buffers.cube, null, false, [1, 1, 1, 1.0]);
  mvPopMatrix(); 
  
  mvPushMatrix(); //Bordes techo blanco frente
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 1.1019, 1.0063]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [4.384, 0.25, 0.1838]);
  drawElement(app.buffers.cube, null, false, [1, 1, 1, 1.0]);
  mvPopMatrix(); 

  mvPushMatrix(); //Bordes techo blanco atras
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 1.1019, -1.0063]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [4.384, 0.25, 0.1838]);
  drawElement(app.buffers.cube, null, false, [1, 1, 1, 1.0]);
  mvPopMatrix(); 

  //Columnas negras
  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.6161, 0.51, -0.4963]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.12, 1, 0.12]);
  drawElement(app.buffers.cube, null, false, [61/255, 61/255, 61/255, 1.0]);
  mvPopMatrix(); 

  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.51, -0.4963]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.12, 1, 0.12]);
  drawElement(app.buffers.cube, null, false, [61/255, 61/255, 61/255, 1.0]);
  mvPopMatrix(); 

  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.6161, 0.51, 0.4963]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.12, 1, 0.12]);
  drawElement(app.buffers.cube, null, false, [61/255, 61/255, 61/255, 1.0]);
  mvPopMatrix(); 

  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.51, 0.4963]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.12, 1, 0.12]);
  drawElement(app.buffers.cube, null, false, [61/255, 61/255, 61/255, 1.0]);
  mvPopMatrix(); 

  //Maquinas
  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.2678, 0.26, 0]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.2222, 0.5, 0.2222]);
  drawElement(app.buffers.cube, app.texture.gas_machine, true);
  mvPopMatrix(); 

  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.3113, 0.26, 0]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.2222, 0.5, 0.2222]);
  drawElement(app.buffers.cube, app.texture.gas_machine, true);
  mvPopMatrix(); 

}

function drawHospital() {
  mvPushMatrix()
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [3.255, 0.02, 2.564]);
  drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
  mvPopMatrix();

  mvPushMatrix(); //Dibujo del edificio
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.3639, 0.86, -0.2213]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.6679, 1.7, 1.4203]);
  drawElement(app.buffers.cube, app.texture.hospital, true);
  mvPopMatrix();
  mvPushMatrix(); //Dibujo del edificio
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.46, 0.86, 0.6773]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.1, 0.04, 0.377]);
  drawElement(app.buffers.cube, null, false, [236.0 / 255.0, 83.0 / 255.0, 83.0 / 255.0, 1.0]);
  mvPopMatrix();
  mvPushMatrix(); //Dibujo de la silla
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.7612, 0.01, 0.2]);
    drawChair();
  mvPopMatrix();
  mvPushMatrix(); //Dibujo de la silla
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.7612, 0.01, -0.6]);
    drawChair();
  mvPopMatrix();
  //Dibujamos los árboles
  mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.2, 0.02, 0.8]);
    drawTree([102/255, 155/255, 65/255, 1.0]);
  mvPopMatrix();
  mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.2, 0.02, -0.8]);
    drawPointLamp();
  mvPopMatrix();
}

function drawRadioStation() {
  mvPushMatrix()
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [2.3795, 0.02, 2.564]);
  drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
  mvPopMatrix();

  mvPushMatrix(); //Dibujo del edificio
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.3, 0.86, -0.0921]);
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.162, 1.7, 1.162]);
  drawElement(app.buffers.cube, app.texture.radiostation, true);
  mvPopMatrix();
  
  for (var i = 0; i < 4; i++){
    mvPushMatrix();
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.0, 0.02, 0.8-i*0.5451]);
      drawTree([102/255, 155/255, 65/255, 1.0]);
    mvPopMatrix();
  }
}

app.drawScene = drawWorld;
