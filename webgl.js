function render(now) {
  now *= 0.001;  // convert to seconds
  app.deltaTime = now - app.then;
  app.then = now;
  app.drawScene();
  requestAnimationFrame(render);
}

function webGLStart() {
  //Indicamos donde se encuentran las texturas
  texturesBaseUrl = "textures/";
  //
  canvas = document.getElementById("mycanvas");
  initGL(canvas);
  //Inicializamos los shaders
  initShadowShaders();
  initShaders();
  //Inicializamos ambos programas, tanto para los shadows como para dibujar normal
  initShadowProgramInfo();
  initProgramInfo();

  //Inicializamos el framebuffer para la carga de la textura de sombras
  app.depthShadow.fbo = initFramebufferObject();

  initBuffers();
  initTextures();
  initInterfaceListeners();

  gl.clearColor(34.0/255.0, 63.0/255.0, 94.0/255.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  requestAnimationFrame(render);
}

window.onload = function(){
  webGLStart();
};
