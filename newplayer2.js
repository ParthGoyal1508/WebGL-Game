// / <reference path="webgl.d.ts" />

let initPlayer= class{
    constructor(gl,flag,pos) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    // Now create an array of this.positions for the cube.
    this.width = 0.07
    this.length = 0.4
    this.height = 0.03
    this.head_width = 0.05;
    this.head_length = 0.1;
    this.arm_width = 0.03;
    this.shorten = -0.15
    this.length_arm = 0.25;
        
    this.positions = [
    // Front face

    -this.width, -this.shorten,  this.height,
    this.width, -this.shorten,  this.height,
    this.width,  this.length,  this.height,
    -this.width,  this.length,  this.height,
    // back face
    -this.width, -this.shorten,  -this.height,
    this.width, -this.shorten,  -this.height,
    this.width,  this.length,  -this.height,
    -this.width,  this.length,  -this.height,
    //
    -this.width, -this.shorten, this.height,
    -this.width, -this.shorten, -this.height,
    -this.width, this.length, -this.height,
    -this.width, this.length, this.height,
    //
    this.width, -this.shorten, this.height,
    this.width, -this.shorten, -this.height,
    this.width, this.length, -this.height,
    this.width, this.length, this.height,
    
    -this.width, this.length, this.height,
    -this.width, this.length, -this.height,
    this.width, this.length, -this.height,
    this.width, this.length, this.height,

    -this.width, -this.shorten, this.height,
    -this.width, -this.shorten, -this.height,
    this.width, -this.shorten, -this.height,
    this.width, -this.shorten, this.height,

    // head
    -this.head_width,this.length,this.height,
    this.head_width, this.length,this.height,
    this.head_width, this.length+this.head_length,this.height,
    -this.head_width,this.length+this.head_length,this.height,

    -this.head_width ,this.length,  -this.height,
    this.head_width ,this.length,  -this.height,
    this.head_width  ,this.length+this.head_length,  -this.height,
    -this.head_width  ,this.length+this.head_length,  -this.height,
    
    -this.head_width, this.length, this.height,
    -this.head_width, this.length, -this.height,
    -this.head_width, this.length+this.head_length, -this.height,
    -this.head_width, this.length+this.head_length, this.height,
    
    this.head_width, this.length, this.height,
    this.head_width, this.length, -this.height,
    this.head_width, this.length+this.head_length, -this.height,
    this.head_width, this.length+this.head_length, this.height,
    
    -this.head_width, this.length+this.head_length, this.height,
    -this.head_width, this.length+this.head_length, -this.height,
    this.head_width, this.length+this.head_length, -this.height,
    this.head_width, this.length+this.head_length, this.height,

    -this.head_width, this.length, this.height,
    -this.head_width, this.length, -this.height,
    this.head_width, this.length, -this.height,
    this.head_width, this.length, this.height,

    //arm right
    this.width,this.length_arm,this.height,
    this.width+this.arm_width,this.length_arm,this.height,
    this.width,this.length,this.height,
    this.width+this.arm_width,this.length,this.height,

    this.width,this.length_arm,-this.height,
    this.width+this.arm_width,this.length_arm,-this.height,
    this.width,this.length,-this.height,
    this.width+this.arm_width,this.length,-this.height,

    this.width,this.length_arm,this.height,
    this.width,this.length_arm,-this.height,
    this.width,this.length,this.height,
    this.width,this.length,-this.height,

    this.width+this.arm_width,this.length_arm,this.height,
    this.width+this.arm_width,this.length_arm,-this.height,
    this.width+this.arm_width,this.length,this.height,
    this.width+this.arm_width,this.length,-this.height,

    this.width,this.length_arm,this.height,
    this.width+this.arm_width,this.length_arm,this.height,
    this.width,this.length,this.height,
    this.width+this.arm_width,this.length,this.height,

    this.width,this.length_arm,-this.height,
    this.width+this.arm_width,this.length_arm,-this.height,
    this.width,this.length,-this.height,
    this.width+this.arm_width,this.length,-this.height,

    -this.width,this.length_arm,this.height,
    -this.width-this.arm_width,this.length_arm,this.height,
    -this.width,this.length,this.height,
    -this.width-this.arm_width,this.length,this.height,

    -this.width,this.length_arm,-this.height,
    -this.width-this.arm_width,this.length_arm,-this.height,
    -this.width,this.length,-this.height,
    -this.width-this.arm_width,this.length,-this.height,

    -this.width,this.length_arm,this.height,
    -this.width,this.length_arm,-this.height,
    -this.width,this.length,this.height,
    -this.width,this.length,-this.height,

    -this.width-this.arm_width,this.length_arm,this.height,
    -this.width-this.arm_width,this.length_arm,-this.height,
    -this.width-this.arm_width,this.length,this.height,
    -this.width-this.arm_width,this.length,-this.height,

    -this.width,this.length_arm,this.height,
    -this.width-this.arm_width,this.length_arm,this.height,
    -this.width,this.length,this.height,
    -this.width-this.arm_width,this.length,this.height,

    -this.width,this.length_arm,-this.height,
    -this.width-this.arm_width,this.length_arm,-this.height,
    -this.width,this.length,-this.height,
    -this.width-this.arm_width,this.length,-this.height,

    ];
      /////////////////////legs///////////////
  
      if(flag == 1)
      {
        this.positions.push(
            this.width,-this.shorten,this.height,
            this.width-0.07,-this.shorten,this.height,
            this.width,this.shorten,-10*this.height,
            this.width-0.07,this.shorten,-10*this.height,
        
            -this.width,-this.shorten,this.height,
            -this.width+0.07,-this.shorten,this.height,
            -this.width,this.shorten,10*this.height,
            -this.width+0.07,this.shorten,10*this.height,
          );
      }
      else
      {
          this.positions.push(
            this.width,-this.shorten,this.height,
            this.width-0.07,-this.shorten,this.height,
            this.width,this.shorten,10*this.height,
            this.width-0.07,this.shorten,10*this.height,
        
            -this.width,-this.shorten,this.height,
            -this.width+0.07,-this.shorten,this.height,
            -this.width,this.shorten,-10*this.height,
            -this.width+0.07,this.shorten,-10*this.height,
        
          );
      }
    this.pos = pos;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
  
  
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  
    const textureCoordinates = [
      // Front
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Back
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Top
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Bottom
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Right
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Left
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      ////head////////////
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Back
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Top
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Bottom
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Right
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Left
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      ////////arm/////////////
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Back
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Top
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Bottom
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Right
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Left
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      /////////////////////arm///////////////////
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Back
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Top
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Bottom
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Right
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      // Left
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      ///////legs//////
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
      ////leg/////////////
      0.0,0.0,1.0,0.0,
      1.0,1.0,0.0,1.0,
    ];
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                  gl.STATIC_DRAW);
  
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    
    const indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,
    8,  9,  10,     8,  10,  11,
    12, 13, 14,     12, 14, 15,
    16, 17, 18,     16, 18, 19,
    20, 21, 22,      20, 22, 23, 
    ////head//////
    24,  25,  26,      24,  26,  27,    // front
    28,  29,  30,      28,  30,  31,
    32,  33,  34,     32,  34,  35,
    36, 37, 38,     36, 38, 39,
    40, 41, 42,     40, 42, 43,
    44, 45, 46,      44, 46, 47, 
    //////arm//////////
    48,  49,  50,      48,  50,  51,    // front
    52,  53,  54,      52,  54,  55,
    56,  57,  58,     56,  58,  59,
    60, 61, 62,     60, 62, 63,
    64, 65, 66,     64, 66, 67,
    68, 69, 70,      68, 70, 71,
  ////////////////////right arm////////////
    72, 73, 74,     72, 74, 75,
    76, 77, 78,     76, 78, 79,
    80, 81, 82,     80, 82, 83,
    84, 85, 86,     84, 86, 87,
    88, 89, 90,     88, 90, 91,
    92, 93, 94,     92, 94, 95,
    /////legs/////////////////
    96, 97, 98,     96,98,99,
    100,101,102,    100,102,103,      
    ];
  
  
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);
  
    this.buffer = {
      position: this.positionBuffer,
      textureCoord: textureCoordBuffer,
      indices: indexBuffer,
    };
    this.texture_arms = loadTexture(gl, 'jake.jpeg');
    this.texture_back = loadTexture(gl, 'jake.jpeg');
    this.texture_hair = loadTexture(gl, 'jake.jpeg');
    this.texture_leg = loadTexture(gl, 'jake.jpeg');
}

  
  drawCube(gl,projectionMatrix, programInfo, deltaTime) {
  
    const modelViewMatrix = mat4.create();

    mat4.translate(modelViewMatrix,     // destination matrix
                   modelViewMatrix,     // matrix to translate
                   this.pos); 
    
    mat4.rotate(modelViewMatrix,
                modelViewMatrix,
                this.rotation,
                [1, 0, 0]);

    {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
    }
  
    {
      const numComponents = 2;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.textureCoord);
      gl.vertexAttribPointer(
          programInfo.attribLocations.textureCoord,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.textureCoord);
  }
  
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);
  
    gl.useProgram(programInfo.program);
  
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);
        gl.bindTexture(gl.TEXTURE_2D, this.texture_back);

        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
  
        {
        const vertexCount = 36*4+12;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
  
  }
}