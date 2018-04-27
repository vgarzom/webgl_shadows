function initShadowShaders() {
    //Inicializamos el programa de shaders para el dibujado de sombras
    var shadowFragmentShader = getShader(gl, "shadow-shader-fs");
    var shadowVertexShader = getShader(gl, "shadow-shader-vs");

    app.shadowShaderProgram = gl.createProgram();
    gl.attachShader(app.shadowShaderProgram, shadowVertexShader);
    gl.attachShader(app.shadowShaderProgram, shadowFragmentShader);
    gl.linkProgram(app.shadowShaderProgram);

    if (!gl.getProgramParameter(app.shadowShaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shadow shaders");
    }

    gl.useProgram(app.shadowShaderProgram);
}

function initShadowProgramInfo() {
    app.shadowProgramInfo = {
        program: app.shadowShaderProgram,
        attribLocations: {
            position: gl.getAttribLocation(app.shadowShaderProgram, 'a_Position')
        },
        uniformLocations: {
            mvpMatrix: gl.getUniformLocation(app.shadowShaderProgram, 'u_MvpMatrix'),
            projectionMatrix: gl.getUniformLocation(app.shadowShaderProgram, 'uProjectionMatrix')
        }
    };
}

function initFramebufferObject() {
    var texture, depthBuffer;
    var framebuffer = gl.createFramebuffer();

    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

    framebuffer.texture = texture;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    return framebuffer;
}