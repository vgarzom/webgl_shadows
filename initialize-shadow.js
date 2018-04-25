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
            mvpMatrix: gl.getUniformLocation(app.shadowShaderProgram, 'u_MvpMatrix')
        }
    };
}