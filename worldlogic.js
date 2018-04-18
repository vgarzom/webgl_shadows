
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
    [0, 0.0, -10]);  // amount to translate

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

  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-3.0, 1.0, -1.7]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [2.4, 0.1, 0.9]);
  drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
  mvPopMatrix();

  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [3.8, 1.0, 1.7]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.6, 0.1, 0.9]);
  drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
  mvPopMatrix();

  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.0, 1.0, 1.7]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.6, 0.1, 0.9]);
  drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
  mvPopMatrix();

  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-3.8, 1.0, 1.7]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.6, 0.2, 0.9]);
  drawElement(app.buffers.cube, app.texture.bricks, false, [101.0 / 255.0, 154.0 / 255.0, 65.0 / 255.0, 1.0]);
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
  mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0, 1, 0]);
  drawElement(app.buffers.cube, app.texture.restaurant, true);
  mvPopMatrix();

  //Dibujamos la estación de gasolina
  drawGasStation();

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
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.8, 1.6, -1.7]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.5, 0.7, 0.6]);
  mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0, 1, 0]);
  drawElement(app.buffers.cube, app.texture.restaurant, true);
  mvPopMatrix();
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-2.9, 2.3, -1.7]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.9, 0.02, 0.7]);
  mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0, 1, 0]);
  drawElement(app.buffers.cube, null, false, [0.3, 0.3, 0.3, 1.0]);
  mvPopMatrix();
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-2.9, 2.3, -2.4]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.85, 0.08, 0.08]);
  mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0, 1, 0]);
  drawElement(app.buffers.cube, null, false, [1.0, 1.0, 1.0, 1.0]);
  mvPopMatrix();
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-2.9, 2.3, -1.0]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1.85, 0.08, 0.08]);
  mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0, 1, 0]);
  drawElement(app.buffers.cube, null, false, [1.0, 1.0, 1.0, 1.0]);
  mvPopMatrix();
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-4.7, 2.3, -1.7]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.08, 0.08, 0.7]);
  mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0, 1, 0]);
  drawElement(app.buffers.cube, null, false, [1.0, 1.0, 1.0, 1.0]);
  mvPopMatrix();
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.1, 2.3, -1.7]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.08, 0.08, 0.7]);
  mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0, 1, 0]);
  drawElement(app.buffers.cube, null, false, [1.0, 1.0, 1.0, 1.0]);
  mvPopMatrix();
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-4.4, 1.6, -1.2]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.08, 0.7, 0.08]);
  mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0, 1, 0]);
  drawElement(app.buffers.cube, null, false, [0.1, 0.1, 0.1, 1.0]);
  mvPopMatrix();
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-4.4, 1.6, -2.2]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.08, 0.7, 0.08]);
  mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(-90), [0, 1, 0]);
  drawElement(app.buffers.cube, null, false, [0.1, 0.1, 0.1, 1.0]);
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
}

function drawChair() {
  mvPushMatrix();
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.0, 0.04, 0.0]);
    //Tablas inferiores
    mvPushMatrix();
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.055, 0.06, 0]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.09, 0.02, 0.5]);
      drawElement(app.buffers.cube, null, false, [216.0 / 255.0, 174.0 / 255.0, 172.0 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.055, 0.06, 0]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.09, 0.02, 0.5]);
      drawElement(app.buffers.cube, null, false, [216.0 / 255.0, 174.0 / 255.0, 172.0 / 255.0, 1.0]);
    mvPopMatrix();
    //Tablas espalda
    mvPushMatrix();
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.09, 0.13, 0]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.02, 0.09, 0.5]);
      drawElement(app.buffers.cube, null, false, [216.0 / 255.0, 174.0 / 255.0, 172.0 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.09, 0.24, 0]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.02, 0.09, 0.5]);
      drawElement(app.buffers.cube, null, false, [216.0 / 255.0, 174.0 / 255.0, 172.0 / 255.0, 1.0]);
    mvPopMatrix();
    //Dibujamos los cilindros
    //Patas traseras
    mvPushMatrix();
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.12, 0.1, 0.2]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.04, 0.3, 0.04]);
      drawElement(app.buffers.cyl, null, false, [61/ 255.0, 61 / 255.0, 61 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.12, 0.1, -0.2]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.04, 0.3, 0.04]);
      drawElement(app.buffers.cyl, null, false, [61/ 255.0, 61 / 255.0, 61 / 255.0, 1.0]);
    mvPopMatrix();
    //Patas delanteras
    mvPushMatrix();
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.06, 0.0, 0.2]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.04, 0.09, 0.04]);
      drawElement(app.buffers.cyl, null, false, [61/ 255.0, 61 / 255.0, 61 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix();
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.06, 0.0, -0.2]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.04, 0.09, 0.04]);
      drawElement(app.buffers.cyl, null, false, [61/ 255.0, 61 / 255.0, 61 / 255.0, 1.0]);
    mvPopMatrix();
  mvPopMatrix();
}

function drawStreet() {
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.0, 0.26, -0.0]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [12, 0.02, 1]);
  drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
  mvPopMatrix();
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-3.42, 0.26, -0.8183]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1, 0.02, 0.64]);
  drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
  mvPopMatrix();
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [2.2333, 0.26, -0.8183]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1, 0.02, 0.64]);
  drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
  mvPopMatrix();
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [4.6621, 0.26, -0.8183]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1, 0.02, 0.64]);
  drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
  mvPopMatrix();
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [4.0165, 0.26, 0.7838]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1, 0.02, 0.64]);
  drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
  mvPopMatrix();
  mvPushMatrix()
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.0046, 0.26, 0.7838]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [1, 0.02, 0.64]);
  drawElement(app.buffers.cube, app.texture.bricks, false, [110.0 / 255.0, 110.0 / 255.0, 110.0 / 255.0, 1.0]);
  mvPopMatrix();
}


app.drawScene = drawWorld;
