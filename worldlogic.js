
function drawWorld() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  app.fieldOfView = degToRad(45);
  app.zNear = 1.0;
  app.zFar = 100.0;


  app.modelViewMatrix = mat4.create();
  //--------------------------------------------------------------------------------
  //Preparamos la matriz de proyección para genearar el mapa de sombras
  app.depthShadow.mvpMatrix = mat4.create();
  /*
  mat4.perspective(app.depthShadow.mvpMatrix,
    app.fieldOfView,
    OFFSCREEN_WIDTH / OFFSCREEN_HEIGHT,
    app.zNear,
    app.zFar);
*/
mat4.ortho(app.depthShadow.mvpMatrix,
-20,20,-20,20, app.zNear, app.zFar);
    //mat4.lookAt(app.depthShadow.mvpMatrix, app.lights.directionalLight.direction, [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

  mat4.translate(app.depthShadow.mvpMatrix,     // destination matrix
    app.depthShadow.mvpMatrix,     // matrix to translate
    [0, 0.0, -app.camera.zoom]);  // amount to translate

  mat4.rotate(app.depthShadow.mvpMatrix,  // destination matrix
    app.depthShadow.mvpMatrix,  // matrix to rotate
    degToRad(app.camera.zoom * app.dayTime - 90),     // amount to rotate in radians
    [1, 0, 0]);       // axis to rotate around (X)

  //--------------------------------------------------------------------------------
  // Preparamos la matriz de perspectiva para dibujar normalmente
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  app.projectionMatrix = mat4.create();
  mat4.perspective(app.projectionMatrix,
    app.fieldOfView,
    aspect,
    app.zNear,
    app.zFar);


  mat4.translate(app.projectionMatrix,     // destination matrix
    app.projectionMatrix,     // matrix to translate
    [0, 0.0, -app.camera.zoom]);  // amount to translate

  mat4.rotate(app.projectionMatrix,  // destination matrix
    app.projectionMatrix,  // matrix to rotate
    app.camera.y,     // amount to rotate in radians
    [0, 1, 0]);       // axis to rotate around (X)

  mat4.rotate(app.projectionMatrix,  // destination matrix
    app.projectionMatrix,  // matrix to rotate
    app.camera.x,     // amount to rotate in radians
    [1, 0, 0]);       // axis to rotate around (X)

  //Reiniciamos el vector de luces puntuales
  //app.lights.pointLights = [];

  //Fijamos las variables de las luces
  gl.uniform4f(app.programInfo.lightLocations.directionalLight.color, app.lights.directionalLight.color[0], app.lights.directionalLight.color[1], app.lights.directionalLight.color[2], app.lights.directionalLight.color[3]);
  gl.uniform3f(app.programInfo.lightLocations.directionalLight.direction, app.lights.directionalLight.direction[0], app.lights.directionalLight.direction[1], app.lights.directionalLight.direction[2]);
  gl.uniform1f(app.programInfo.lightLocations.directionalLight.intensity, app.lights.directionalLight.intensity);
  gl.uniform3f(app.programInfo.lightLocations.ambientLight, app.lights.ambientLight[0], app.lights.ambientLight[1], app.lights.ambientLight[2]);

  app.normalMatrix = mat4.create();

  setDataForDrawingShadows();
  drawWorldObjects();

  setDataForDrawingColors()
  
  mvPushMatrix();
  var sposition = app.lights.directionalLight.direction;
  sposition = [app.camera.zoom * 0.75 * sposition[0], app.camera.zoom * 0.75* sposition[1], app.camera.zoom *0.75* sposition[2]];
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, sposition);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.5, 0.5, 0.5]);
  drawElement(app.buffers.sphere, app.texture.bricks, false, app.lights.ambientLight);
  mvPopMatrix();

  drawWorldObjects();
  //---------------------------------------------------------------------------
  updateTruck();
  updateDayTime();
  //app.dayTime = 8.5;
  updateAmbientalLight();
  updateDirectionalLightPosition();
  updatePointLights();
  updateSpotLights();
}

function updateDayTime() {
  app.dayTime += 0.5*app.deltaTime;
  if (app.dayTime >= 24) {
    app.dayTime = 0;
  }
}

function updateDirectionalLightPosition() {
  app.lights.directionalLight.direction = [0,
    Math.sin(degToRad(app.camera.zoom * app.dayTime - 90)),
    Math.cos(degToRad(app.camera.zoom * app.dayTime - 90))];
}

function updateAmbientalLight() {
  if (app.dayTime > 0 && app.dayTime <= 7) {
    app.lights.ambientLight = calculateIntermediateColors(0, 7, [0.0, 0.1, 0.5], [0.8, 0.8, 0.8]);
  } else if (app.dayTime > 7 && app.dayTime <= 16.5) {
    app.lights.ambientLight = calculateIntermediateColors(7, 16.5, [0.8, 0.8, 0.8], [130 / 255, 112 / 255, 35 / 255]);
  } else if (app.dayTime > 16.7 && app.dayTime <= 19) {
    app.lights.ambientLight = calculateIntermediateColors(16.5, 19, [130 / 255, 112 / 255, 35 / 255], [0.0, 0.1, 0.5]);
  } else if (app.dayTime > 19 && app.dayTime <= 24) {
    app.lights.ambientLight = [0.0, 0.1, 0.5];
  }
}

function updateTruck() {
  app.truck.y = 0.26;
  app.truck.z = -0.0;
  app.truck.x -= app.truck.speed;

  if (app.truck.x < -5.8) {
    app.truck.x = 5.8;
  }
}

function updatePointLights() {
  for (var i = 0; i < app.lights.pointLights.length; i++) {
    var intensity = app.lights.pointLights[i].intensity;
    if (app.dayTime > 7 && app.dayTime < 19.5) {
      intensity = 0.0;
    }
    var pl = app.programInfo.lightLocations.pointLights[i];
    gl.uniform1f(pl.intensity, intensity);
    gl.uniform4f(pl.color, app.lights.pointLights[i].color[0], app.lights.pointLights[i].color[1], app.lights.pointLights[i].color[2], app.lights.pointLights[i].color[3]);
    gl.uniform3f(pl.position, app.lights.pointLights[i].position[0], app.lights.pointLights[i].position[1], app.lights.pointLights[i].position[2]);
  }
}

function updateSpotLights() {
  for (var i = 0; i < app.lights.spotLights.length; i++) {
    var intensity = app.lights.spotLights[i].intensity;
    if (app.dayTime > 7 && app.dayTime < 19.5) {
      intensity = 0.0;
    }
    var pl = app.programInfo.lightLocations.spotLights[i];
    var light = app.lights.spotLights[i];
    gl.uniform1f(pl.intensity, intensity);
    gl.uniform4f(pl.color, light.color[0], light.color[1], light.color[2], light.color[3]);
    gl.uniform3f(pl.position, light.position[0], light.position[1], light.position[2]);
    gl.uniform3f(pl.direction, light.direction[0], light.direction[1], light.direction[2]);
    gl.uniform1f(pl.exponent, light.exponent);
    gl.uniform1f(pl.cutoff, light.cutoff);
  }
}

function drawWorldObjects() {
  //Dibuamos el cubo de base
  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0.0, 0.0, 0.0]);  // amount to translate
  mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [12, 0.5, 8]);
  drawElement(app.buffers.cube, app.depthShadow.fbo, false, [141.0 / 255.0, 198.0 / 255.0, 93.0 / 255.0, 1.0]);
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

  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-0.0269, 0.26, 2.3496]);  // amount to translate
  drawPoliceStation();
  mvPopMatrix();

  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [3.8663, 0.26, 2.3496]);  // amount to translate
  drawRestaurant();
  mvPopMatrix();

  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-3.92, 0.26, 2.3633]);  // amount to translate
  drawPark();
  mvPopMatrix();

  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-1.8333, 0.26, -0.8]);  // amount to translate
  drawStreetLight([0, -1, 0.3]);
  mvPopMatrix();

  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [5.5, 0.26, -0.8]);  // amount to translate
  drawStreetLight([0, -1, 0.3]);
  mvPopMatrix();

  mvPushMatrix();

  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [1.8333, 0.26, 0.8]);  // amount to translate
  mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(180), [0, 1, 0]);
  drawStreetLight([0, -1, -0.3]);
  mvPopMatrix();

  mvPushMatrix();

  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [-5.5, 0.26, 0.8]);  // amount to translate
  mat4.rotate(app.modelViewMatrix, app.modelViewMatrix, degToRad(180), [0, 1, 0]);
  drawStreetLight([0, -1, -0.3]);
  mvPopMatrix();

  mvPushMatrix();
  mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [app.truck.x, app.truck.y, app.truck.z]);  // amount to translate
  drawTruck();
  mvPopMatrix();

}

app.drawScene = drawWorld;
