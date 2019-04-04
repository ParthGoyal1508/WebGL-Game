// / <reference path="webgl.d.ts" />

let nplayer = class {
    constructor(gl,pos) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        this.width = 0.07 * 5;
        this.length = 0.4 * 5;
        this.height = 0.03 * 5;
        this.head_width = 0.05 * 5;
        this.head_length = 0.1 * 5;
        this.arm_width = 0.03 * 10;
        this.shorten = -0.15 * 5;
        this.length_arm = 0.25 * 5;

        this.flag = true;

        this.positions = [
            -this.width, -this.shorten,  this.height,
            this.width, -this.shorten,  this.height,
            this.width,  this.length,  this.height,
            -this.width,  this.length,  this.height,
            -this.width, -this.shorten,  -this.height,
            this.width, -this.shorten,  -this.height,
            this.width,  this.length,  -this.height,
            -this.width,  this.length,  -this.height,
            -this.width, -this.shorten, this.height,
            -this.width, -this.shorten, -this.height,
            -this.width, this.length, -this.height,
            -this.width, this.length, this.height,
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
            this.width,-this.shorten,this.height,
            this.width-0.07*5,-this.shorten,this.height,
            this.width,this.shorten,-10*this.height,
            this.width-0.07*5,this.shorten,-10*this.height,
            -this.width,-this.shorten,this.height,
            -this.width+0.07*5,-this.shorten,this.height,
            -this.width,this.shorten,10*this.height,
            -this.width+0.07*5,this.shorten,10*this.height,
            this.width,-this.shorten,this.height,
            this.width-0.07*5,-this.shorten,this.height,
            this.width,this.shorten,10*this.height,
            this.width-0.07*5,this.shorten,10*this.height,
            -this.width,-this.shorten,this.height,
            -this.width+0.07*5,-this.shorten,this.height,
            -this.width,this.shorten,-10*this.height,
            -this.width+0.07*5,this.shorten,-10*this.height,
            ];
        this.rotation = 0;
        this.pos = pos;

        // Now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // JavaScript array, then use it to fill the current buffer.

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        
        // Now set up the texture coordinates for the faces.

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
            //head
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
            //arm
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
            //arm
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
            //legs
            0.0,0.0,1.0,0.0,
            1.0,1.0,0.0,1.0,
            0.0,0.0,1.0,0.0,
            1.0,1.0,0.0,1.0,
            0.0,0.0,1.0,0.0,
            1.0,1.0,0.0,1.0,
            0.0,0.0,1.0,0.0,
            1.0,1.0,0.0,1.0,
          ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),gl.STATIC_DRAW);
        
        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.

        const indices = [
            0,  1,  2,      0,  2,  3,    
            4,  5,  6,      4,  6,  7,
            8,  9,  10,     8,  10, 11,
            12, 13, 14,     12, 14, 15,
            16, 17, 18,     16, 18, 19,
            20, 21, 22,     20, 22, 23, 
            24, 25, 26,     24, 26, 27,
            28, 29, 30,     28, 30, 31,
            32, 33, 34,     32, 34, 35,
            36, 37, 38,     36, 38, 39,
            40, 41, 42,     40, 42, 43,
            44, 45, 46,     44, 46, 47, 
            48, 49, 50,     48, 50, 51,    
            52, 53, 54,     52, 54, 55,
            56, 57, 58,     56, 58, 59,
            60, 61, 62,     60, 62, 63,
            64, 65, 66,     64, 66, 67,
            68, 69, 70,     68, 70, 71,
            72, 73, 74,     72, 74, 75,
            76, 77, 78,     76, 78, 79,
            80, 81, 82,     80, 82, 83,
            84, 85, 86,     84, 86, 87,
            88, 89, 90,     88, 90, 91,
            92, 93, 94,     92, 94, 95,
            96, 97, 98,     96, 98, 99,
            100,101,102,    100,102,103, 
            104,105,106,    104,106,107,
            108,109,110,    108,110,111,      
            ];

        // Now send the element array to GL

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            textureCoord: textureCoordBuffer,
            indices: indexBuffer,
        }

        this.texture_back = loadTexture(gl, 'cloth.jpeg');
        this.texture_hair = loadTexture(gl, 'hair.png');
        this.texture_arm = loadTexture(gl, 'skin.png');
        this.texture_leg = loadTexture(gl, 'jake.jpeg');
    }

    drawCube(gl, projectionMatrix, programInfo, deltaTime) {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );
        

        if(boostapply){
            this.pos[1] = 0 ; 
        }
        else
            this.rotation = 0;

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

        // Tell WebGL how to pull out the texture coordinates from
        // the texture coordinate buffer into the textureCoord attribute.
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

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        // Specify the texture to map onto the faces.

        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture_back);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
  
        gl.bindTexture(gl.TEXTURE_2D, this.texture_hair);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 72);
  
        gl.bindTexture(gl.TEXTURE_2D, this.texture_arm);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT,144 );
  
        gl.bindTexture(gl.TEXTURE_2D, this.texture_arm);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 216);

        if(this.flag){
            gl.bindTexture(gl.TEXTURE_2D, this.texture_leg);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 288);
        
            gl.bindTexture(gl.TEXTURE_2D, this.texture_leg);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 300);
        }

        if(!this.flag){
            gl.bindTexture(gl.TEXTURE_2D, this.texture_leg);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 312);
        
            gl.bindTexture(gl.TEXTURE_2D, this.texture_leg);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 324);
        }
      
       
        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0)


    }
};


let police = class {
    constructor(gl,pos) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        this.width = 0.07 * 5;
        this.length = 0.4 * 5;
        this.height = 0.03 * 5;
        this.head_width = 0.05 * 5;
        this.head_length = 0.1 * 5;
        this.arm_width = 0.03 * 10;
        this.shorten = -0.15 * 5;
        this.length_arm = 0.25 * 5;

        this.flag = true;

        this.positions = [
            -this.width, -this.shorten,  this.height,
            this.width, -this.shorten,  this.height,
            this.width,  this.length,  this.height,
            -this.width,  this.length,  this.height,
            -this.width, -this.shorten,  -this.height,
            this.width, -this.shorten,  -this.height,
            this.width,  this.length,  -this.height,
            -this.width,  this.length,  -this.height,
            -this.width, -this.shorten, this.height,
            -this.width, -this.shorten, -this.height,
            -this.width, this.length, -this.height,
            -this.width, this.length, this.height,
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
            this.width,-this.shorten,this.height,
            this.width-0.07*5,-this.shorten,this.height,
            this.width,this.shorten,-10*this.height,
            this.width-0.07*5,this.shorten,-10*this.height,
            -this.width,-this.shorten,this.height,
            -this.width+0.07*5,-this.shorten,this.height,
            -this.width,this.shorten,10*this.height,
            -this.width+0.07*5,this.shorten,10*this.height,
            this.width,-this.shorten,this.height,
            this.width-0.07*5,-this.shorten,this.height,
            this.width,this.shorten,10*this.height,
            this.width-0.07*5,this.shorten,10*this.height,
            -this.width,-this.shorten,this.height,
            -this.width+0.07*5,-this.shorten,this.height,
            -this.width,this.shorten,-10*this.height,
            -this.width+0.07*5,this.shorten,-10*this.height,
            ];
        this.rotation = 0;
        this.pos = pos;

        // Now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // JavaScript array, then use it to fill the current buffer.

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        
        // Now set up the texture coordinates for the faces.

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
            //head
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
            //arm
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
            //arm
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
            //legs
            0.0,0.0,1.0,0.0,
            1.0,1.0,0.0,1.0,
            0.0,0.0,1.0,0.0,
            1.0,1.0,0.0,1.0,
            0.0,0.0,1.0,0.0,
            1.0,1.0,0.0,1.0,
            0.0,0.0,1.0,0.0,
            1.0,1.0,0.0,1.0,
          ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),gl.STATIC_DRAW);
        
        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.

        const indices = [
            0,  1,  2,      0,  2,  3,    
            4,  5,  6,      4,  6,  7,
            8,  9,  10,     8,  10, 11,
            12, 13, 14,     12, 14, 15,
            16, 17, 18,     16, 18, 19,
            20, 21, 22,     20, 22, 23, 
            24, 25, 26,     24, 26, 27,
            28, 29, 30,     28, 30, 31,
            32, 33, 34,     32, 34, 35,
            36, 37, 38,     36, 38, 39,
            40, 41, 42,     40, 42, 43,
            44, 45, 46,     44, 46, 47, 
            48, 49, 50,     48, 50, 51,    
            52, 53, 54,     52, 54, 55,
            56, 57, 58,     56, 58, 59,
            60, 61, 62,     60, 62, 63,
            64, 65, 66,     64, 66, 67,
            68, 69, 70,     68, 70, 71,
            72, 73, 74,     72, 74, 75,
            76, 77, 78,     76, 78, 79,
            80, 81, 82,     80, 82, 83,
            84, 85, 86,     84, 86, 87,
            88, 89, 90,     88, 90, 91,
            92, 93, 94,     92, 94, 95,
            96, 97, 98,     96, 98, 99,
            100,101,102,    100,102,103, 
            104,105,106,    104,106,107,
            108,109,110,    108,110,111,        
            ];

        // Now send the element array to GL

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            textureCoord: textureCoordBuffer,
            indices: indexBuffer,
        }

        this.texture_back = loadTexture(gl, 'police.jpg');
        this.texture_hair = loadTexture(gl, 'hair.png');
        this.texture_arm = loadTexture(gl, 'skin.png');
        this.texture_leg = loadTexture(gl, 'police1.jpg');
    }

    drawCube(gl, projectionMatrix, programInfo, deltaTime) {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );
        
        // this.rotation = 90;


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

        // Tell WebGL how to pull out the texture coordinates from
        // the texture coordinate buffer into the textureCoord attribute.
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

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        // Specify the texture to map onto the faces.

        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture_back);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
  
        gl.bindTexture(gl.TEXTURE_2D, this.texture_hair);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 72);
  
        gl.bindTexture(gl.TEXTURE_2D, this.texture_arm);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT,144 );
  
        gl.bindTexture(gl.TEXTURE_2D, this.texture_arm);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 216);

        if(this.flag){
            gl.bindTexture(gl.TEXTURE_2D, this.texture_leg);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 288);
        
            gl.bindTexture(gl.TEXTURE_2D, this.texture_leg);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 300);
        }

        if(!this.flag){
            gl.bindTexture(gl.TEXTURE_2D, this.texture_leg);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 312);
        
            gl.bindTexture(gl.TEXTURE_2D, this.texture_leg);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 324);
        }
      
       
        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0)


    }
};

