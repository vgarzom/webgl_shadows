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

function drawTree(color){
    mvPushMatrix()
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.02, 0]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.3, 0.04, 0.3]);
      drawElement(app.buffers.cyl, null, false, [1.0,1.0,1.0,1.0]);
    mvPopMatrix();
    mvPushMatrix()
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.17, 0]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.06, 0.3, 0.06]);
      drawElement(app.buffers.cyl, null, false, [192.0 / 255.0, 154.0 / 255.0, 108.0 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix()
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.52, 0]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.4, 0.4, 0.4]);
      drawElement(app.buffers.sphere, null, false, color);
    mvPopMatrix();
    mvPushMatrix()
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.72, 0]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.3, 0.3, 0.3]);
      drawElement(app.buffers.sphere, null, false, color);
    mvPopMatrix();
    mvPushMatrix()
    mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.84, 0]);
    mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.2, 0.2, 0.2]);
    drawElement(app.buffers.sphere, null, false, color);
  mvPopMatrix();
  }
  
function drawPointLamp(){
    mvPushMatrix()
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.02, 0]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.3, 0.04, 0.3]);
      drawElement(app.buffers.cyl, null, false, [1.0,1.0,1.0,1.0]);
    mvPopMatrix();
    mvPushMatrix()
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.27, 0]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.06, 0.5, 0.06]);
      drawElement(app.buffers.cyl, null, false, [192.0 / 255.0, 154.0 / 255.0, 108.0 / 255.0, 1.0]);
    mvPopMatrix();
    mvPushMatrix()
      mat4.translate(app.modelViewMatrix, app.modelViewMatrix, [0, 0.52, 0]);
      mat4.scale(app.modelViewMatrix, app.modelViewMatrix, [0.3, 0.3, 0.3]);
      drawElement(app.buffers.sphere, null, false, [1.0,1.0,1.0,1.0]);
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
