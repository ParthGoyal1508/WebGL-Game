// / <reference path="webgl.d.ts" />

let wall = class {
    constructor(gl, pos) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        this.positions =[];
        var i;
        var z_upper = 4.0;
        var z_lower = -28.0;

        for(i=0; i<80; i++ ){
            //front
            this.positions.push(-1.0,0.0,z_upper);
            this.positions.push(0.0,0.0,z_upper);
            this.positions.push(0.0,16.0,z_upper);
            this.positions.push(-1.0,16.0,z_upper);

            this.positions.push(-1.0,0.0,z_lower);
            this.positions.push(0.0,0.0,z_lower);
            this.positions.push(0.0,16.0,z_lower);
            this.positions.push(-1.0,16.0,z_lower);

            
            this.positions.push(-1.0,16.0,z_lower);
            this.positions.push(0.0,16.0,z_lower);
            this.positions.push(0.0,16.0,z_upper);
            this.positions.push(-1.0,16.0,z_upper);
            
            this.positions.push(-1.0,0.0,z_lower);
            this.positions.push(0.0,0.0,z_lower);
            this.positions.push(0.0,0.0,z_upper);
            this.positions.push(-1.0,0.0,z_upper);
            
            this.positions.push(-1.0,0.0,z_lower);
            this.positions.push(-1.0,16.0,z_lower);
            this.positions.push(-1.0,16.0,z_upper);
            this.positions.push(-1.0,0.0,z_upper);
            
            this.positions.push(0.0,0.0,z_lower);
            this.positions.push(0.0,16.0,z_lower);
            this.positions.push(0.0,16.0,z_upper);
            this.positions.push(0.0,0.0,z_upper);

            z_upper = z_upper - 32;
            z_lower = z_lower - 32;
        }
        // console.log(this.positions);
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
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Back
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Top
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Bottom
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Right
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Left
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
          ];
        
        for(i=0;i<79;i++){
            textureCoordinates.push(0.0,0.0);
            textureCoordinates.push(1.0,0.0);
            textureCoordinates.push(1.0,1.0);
            textureCoordinates.push(0.0,1.0);

            textureCoordinates.push(0.0,0.0);
            textureCoordinates.push(1.0,0.0);
            textureCoordinates.push(1.0,1.0);
            textureCoordinates.push(0.0,1.0);

            textureCoordinates.push(0.0,0.0);
            textureCoordinates.push(1.0,0.0);
            textureCoordinates.push(1.0,1.0);
            textureCoordinates.push(0.0,1.0);

            textureCoordinates.push(0.0,0.0);
            textureCoordinates.push(1.0,0.0);
            textureCoordinates.push(1.0,1.0);
            textureCoordinates.push(0.0,1.0);;

            textureCoordinates.push(0.0,0.0);
            textureCoordinates.push(1.0,0.0);
            textureCoordinates.push(1.0,1.0);
            textureCoordinates.push(0.0,1.0);

            textureCoordinates.push(0.0,0.0);
            textureCoordinates.push(1.0,0.0);
            textureCoordinates.push(1.0,1.0);
            textureCoordinates.push(0.0,1.0);
        }

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),gl.STATIC_DRAW);
        
        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.

        const indices = [
            0, 1, 2,    0, 2, 3, // front
            4, 5, 6,    4, 6, 7,
            8, 9, 10,   8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23, 
        ];

        for(i=0;i<79;i++){
            for(var j=0;j<36;j++)
                indices.push(indices[j]+24*(i+1));
        }

    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

    const vertexNormals = [
        // Front
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,

        // Back
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,

        // Top
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,

        // Bottom
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,

        // Left
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,

        // Right
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
    ];

    for(i=0;i<79;i++){
        vertexNormals.push(0.0,0.0,1.0);
        vertexNormals.push(0.0,0.0,1.0);
        vertexNormals.push(0.0,0.0,1.0);
        vertexNormals.push(0.0,0.0,1.0);

        vertexNormals.push(0.0,0.0,-1.0);
        vertexNormals.push(0.0,0.0,-1.0);
        vertexNormals.push(0.0,0.0,-1.0);
        vertexNormals.push(0.0,0.0,-1.0);

        vertexNormals.push(0.0,1.0,0.0);
        vertexNormals.push(0.0,1.0,0.0);
        vertexNormals.push(0.0,1.0,0.0);
        vertexNormals.push(0.0,1.0,0.0);

        vertexNormals.push(0.0,-1.0,0.0);
        vertexNormals.push(0.0,-1.0,0.0);
        vertexNormals.push(0.0,-1.0,0.0);
        vertexNormals.push(0.0,-1.0,0.0);

        vertexNormals.push(-1.0,0.0,0.0);
        vertexNormals.push(-1.0,0.0,0.0);
        vertexNormals.push(-1.0,0.0,0.0);
        vertexNormals.push(-1.0,0.0,0.0);

        vertexNormals.push(1.0,0.0,0.0);
        vertexNormals.push(1.0,0.0,0.0);
        vertexNormals.push(1.0,0.0,0.0);
        vertexNormals.push(1.0,0.0,0.0);
    }


  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                gl.STATIC_DRAW);

        // Now send the element array to GL

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            normal: normalBuffer,
            textureCoord: textureCoordBuffer,
            indices: indexBuffer,
        }

        this.texture = loadTexture(gl, 'wall2.jpg');
    }

    drawCube(gl, projectionMatrix, programInfo, deltaTime) {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );
        
        // this.rotation += 0.01;

        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [1, 1, 1]);

        const normalMatrix = mat4.create();
        mat4.invert(normalMatrix, modelViewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);

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

        // Tell WebGL how to pull out the normals from
        // the normal buffer into the vertexNormal attribute.
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.normal);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexNormal,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexNormal);
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

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.normalMatrix,
            false,
            normalMatrix);

        // Specify the texture to map onto the faces.

        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0)

        {
            const vertexCount = 36*80;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }
};

