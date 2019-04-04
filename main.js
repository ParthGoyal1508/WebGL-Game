var cubeRotation = 0.0;

main();

//
// Start here
//
var start_time;
var audio = new Audio('./gamestart.wav');
audio.play();

var left_track, mid_track, right_track;
var left_wall,right_wall;
var game_train;
var moving_train;
var jake;
var newjake;
var game_coin;
var game_boots;
var game_barricade;
var game_barricade2;
var game_boost;
var speed;

var map = {37 : false, 39 : false, 32 : false, 38 : false, 40:false, 98:false};
var flag = false;
var game_over = false;
var bootsapply = false;
var boostapply = false;
var legtime;
var policetime;
var coinscollect;
var lightning;
var lightningtime;
var cones;

var bootsget,bootsover;
var boostget,boostover;
var current;
var previousbarricade_collision;

onkeydown = onkeyup =  function (event) 
{
    map[event.keyCode] = event.type == 'keydown';
    if(event.type == 'keyup'){
      flag = false;
    }
}

var greyScale =false;
var fsSource,vsSource,shaderProgram,programInfo;

function shader(gl){
  // Fragment shader program
  if(!greyScale){
    fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;
  }
  else{
    fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      precision highp float;
      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
      float m = (gl_FragColor.r+gl_FragColor.g+gl_FragColor.b)/3.0;
      gl_FragColor = vec4(m,m,m,1.0);
    }
  `;
  }

  // Vertex shader program

    if(lightning){
      vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(1, 1, 1);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(2, 0, 2));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
    `
    }
    else{
      vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(1, 1, 1);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(-2, 0, 2));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
    `

    }
    ;


  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.

   programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };
}

function main() {

  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  start_time = Math.floor(Date.now() / 1000);
  lightningtime = start_time;
  policetime =start_time + 5;
  coinscollect = 0;

  lightning = true;
  mid_track = new cube(gl, [0, -10, -8]);
  right_track = new cube(gl, [8, -10, -8]);
  left_track = new cube(gl, [-8, -10, -8]);
  left_wall = new wall(gl,[-12,-10,-8]);
  right_wall = new wall(gl,[13,-10,-8]);
  game_train = [];
  for(var i=0;i<10;i++){
    game_train.push(new train(gl,[-8 + (i%3)*8 ,-4, -16 -700*i]));
  }
  moving_train = [];
  for(var i=0;i<10;i++){
    moving_train.push(new m_train(gl,[-8 + ((i+1)%3)*8,-4,-16-400-700*i]));
  }
  jake= new nplayer(gl,[0.0,-4.5,-9]);
  // cones= new cone(gl,[0.0,0,-9]);
  police = new police(gl,[0.0,-4.5,0]);
  legtime = Math.floor(Date.now() / 1000);
  // newjake = new initPlayer(gl,0,[0.0,0,-90]);
  game_coin = [];
  for(var j=0;j<10;j++){
    for(var i=0; i<10;i++){
      game_coin.push(new coin(gl, [0.0,-5,-36 - j*800 - i*15]));
      game_coin.push(new coin(gl, [8.0,-5,-36 - j*800 - i*15 - 300]));
      game_coin.push(new coin(gl, [-8.0,-5,-36 - j*800 - i*15 - 600]));
    } 
  }
  game_boots = [];
  for(var i=0;i<10;i++){
    game_boots.push(new boots(gl, [-8 + (i%3)*8,-5,-180 - i*200]));
  } 
  game_barricade = [];
  for (var i=0;i<6;i++)
    game_barricade.push(new barricade(gl, [-9+0.8+((i+1)%3)*8, -5,-100 - i*500]));
  game_barricade2 = [];
  for (var i=0;i<6;i++)
    game_barricade2.push(new barricade2(gl, [-9+0.8+((i+3)%3)*8, -5,-50 - i*300]));
  game_boost = [];
  for(var i=0;i<10;i++){
    game_boost.push(new boost(gl, [-8 + ((i+2)%3)*8,-5.5,-280 - i*300]));
  } 

  speed = 1;
  
  // look up the elements we want to affect
  var scoreElement = document.getElementById('score');
  var coinElement = document.getElementById('coin');

  // Create text nodes to save some time for the browser.
  var scoreNode = document.createTextNode('');
  var coinNode = document.createTextNode('');

  // Add those text nodes where they need to go
  scoreElement.appendChild(scoreNode);
  coinElement.appendChild(coinNode);

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  shader(gl);

  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    if(!game_over){
      now *= 0.001;  // convert to seconds
      const deltaTime = now - then;
      then = now;
      
      drawScene(gl, programInfo, deltaTime);
      
      requestAnimationFrame(render);
      current = Math.floor(Date.now() / 1000);
      input(gl);
      scoreNode.nodeValue = Math.ceil((current - start_time)*10);
      coinNode.nodeValue = coinscollect;
      tick_elements(gl);
      if(current-lightningtime == 5){
        lightning = !lightning;
        lightningtime = current;
        shader(gl);
      }
        
    }
  }
  requestAnimationFrame(render);
}

// Here's where we call the routine that builds all the
// objects we'll be drawing.
// const buffers = initBuffers(gl);


function move_forward(gl){
  current = Math.floor(Date.now() / 1000);
  if(current - legtime >= 1){
    jake.flag = !jake.flag;
    police.flag = !police.flag;
    legtime = current;
  }
  if(current <= policetime){
    police.pos[2] = jake.pos[2] +9;
  }
  else{
    police.pos[2] = jake.pos[2] + 15;
  }
  police.pos[0] = jake.pos[0];
  mid_track.pos[2] += speed;
  left_track.pos[2] += speed;
  right_track.pos[2] += speed;
  left_wall.pos[2] += speed;
  right_wall.pos[2] += speed;
  for(var i=0; i<game_train.length;i++)
    game_train[i].pos[2] += speed;
  for(var i=0;i<game_coin.length;i++)
    game_coin[i].pos[2] += speed;
  for(var i=0; i<moving_train.length;i++)
    moving_train[i].pos[2] += speed*3;
  for(var i=0; i<game_boots.length;i++)
    game_boots[i].pos[2] += speed;
  for(var i=0; i<game_boost.length;i++)
    game_boost[i].pos[2] += speed;
  for(var i=0; i<game_barricade.length;i++)
    game_barricade[i].pos[2] += speed;
  for(var i=0; i<game_barricade2.length;i++)
    game_barricade2[i].pos[2] += speed;
}



var flag_jump = false;

function jake_jump(){
  if(!boostapply){
    if(!bootsapply){
      if(jake.pos[1] >= -2)
      flag_jump = false;
      if(flag_jump == true){
        jake.pos[1] += 0.3;
      }
      else{
        if(jake.pos[1] > -4.5)
          jake.pos[1] -= 0.3;
        else
          jake.pos[1] = -4.5;
      }
    }
    if(bootsapply){
      if(jake.pos[1] >= 2)
      flag_jump = false;
      if(flag_jump == true){
        jake.pos[1] += 0.3;
      }
      else{
        if(jake.pos[1] > -4.5)
          jake.pos[1] -= 0.3;
        else
          jake.pos[1] = -4.5;
      }
    }
  }
}

function tick_elements(gl){
  move_forward(gl);
  jake_jump();
  detectcoin_collision();
  detectbarricade_collision();
  detecttrain_collision();
  detectboots_collision();
  bootscheck();
  detectboost_collision();
  boostcheck();
  tonechange();
}

function tonechange(){
  current = Math.floor(Date.now() / 1000);
  if(current == start_time + 4){
    audio.pause();
    audio = new Audio('./themesong.mp3');
    audio.play();
  }
  if(mid_track.pos[2] >= 2520)
    gamewin();
}

function detectcollision(player,obj){
  if(Math.abs(player.pos[0] - obj.pos[0]) < ((2+obj.width)/2)){
    if(Math.abs(player.pos[1] -obj.pos[1]) < ((3+obj.height)/2)){
      if(Math.abs(player.pos[2] - obj.pos[2]) < ((0.5+obj.length)/2)){
        return true;
      }
    }
  }
}

function bootscheck(){
  current = Math.floor(Date.now() / 1000);
  if(current >bootsget && current <bootsover)
    bootsapply = true;
  else
   bootsapply = false;
}

function boostcheck(){
  current = Math.floor(Date.now() / 1000);
  if(current >boostget && current <boostover)
    boostapply = true;
  else
   boostapply = false;
}

function gameover(){
  audio.pause();
  game_over = true;
  document.getElementById('game').remove();
  var img = document.createElement('img');
  img.src = './gameover.jpg';
  img.alt = 'Game Over';
  img.height = '860';
  img.width = '1820';
  document.getElementById('main_body').appendChild(img);
}

function gamewin(){
  audio.pause();
  game_over = true;
  document.getElementById('game').remove();
  var img = document.createElement('img');
  img.src = './win.png';
  img.alt = 'Game win';
  img.height = '860';
  img.width = '1820';
  document.getElementById('main_body').appendChild(img);
}

function detectcoin_collision(){
  for(var i=0;i<game_coin.length;i++){
    if(detectcollision(jake,game_coin[i])){
      var audio2 = new Audio("./coin.wav");
      audio2.play();
      coinscollect += 1;
      game_coin.splice(i, 1);
    }
  }
}

function detectbarricade_collision(){
  current = Math.floor(Date.now() / 1000);
  for(var i=0;i<game_barricade.length;i++){
    if(detectcollision(jake,game_barricade[i])){
      if(current - previousbarricade_collision <= 5){
        gameover();
      }
      previousbarricade_collision = current;
      policetime = current + 5;
      var audio3 = new Audio("./collide.wav");
      audio.pause();
      audio3.play();
      audio.play();
    }
  }
  for(var i=0;i<game_barricade2.length;i++){
    if(detectcollision(jake,game_barricade2[i])){
      if(current - previousbarricade_collision <= 5){
        gameover();
      }
      previousbarricade_collision = current;
      policetime = current + 5;
      var audio3 = new Audio("./collide.wav");
      audio.pause();
      audio3.play();
      audio.play();
    }
  }
}

function detectboots_collision(){
  for(var i=0;i<game_boots.length;i++){
    if(detectcollision(jake,game_boots[i])){
      var audio4 = new Audio("./boots.wav");
      audio4.play();
      game_boots.splice(i, 1);
      bootsget = Math.floor(Date.now() / 1000);
      bootsover = bootsget + 5;
    }
  }
}

function detectboost_collision(){
  // console.log("detect");
  for(var i=0;i<game_boost.length;i++){
    if(detectcollision(jake,game_boost[i])){
      var audio4 = new Audio("./boots.wav");
      audio4.play();
      game_boost.splice(i, 1);
      boostget = Math.floor(Date.now() / 1000);
      boostover = boostget + 5;
    }
  }
}

function detecttrain_collision(){
  for(var i=0;i<game_train.length;i++){
    if(detectcollision(jake,game_train[i])){
      gameover();
    }
  }
  for(var i=0;i<moving_train.length;i++){
    if(detectcollision(jake,moving_train[i])){
      gameover();
    }
  }
}

function input(gl){
    if (map[37] && !flag)
    {
      if(jake.pos[0] > -7)
        jake.pos[0] -= 8;
      flag = true;
    }

    if (map[39] && !flag)
    {
      if(jake.pos[0] < 7)
        jake.pos[0] += 8;
      flag = true;
    }

    if (map[38] && !flag)
    { 
      flag = true;
      move_forward();
    }

    if (map[40] && !flag)
    { 
      flag = true;
      mid_track.pos[2] -=1;
      left_track.pos[2] -=1;
      right_track.pos[2] -=1;
      left_wall.pos[2] -=1;
      right_wall.pos[2] -=1;
    }

    if (map[32] && !flag){
      flag_jump = true;
      console.log("space\n");
      flag = true;
    }

    if (map[66] && !flag){
      console.log(greyScale);
      flag = true;
      greyScale = !greyScale;
      shader(gl);
    }
}

//
// Draw the scene.
//
function drawScene(gl, programInfo,buffers, texture, deltaTime) {
  if(greyScale){
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  }
  else{
    gl.clearColor(0.1, 0.9, 1.0, 1.0);  // Clear to black, fully opaque
  }
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
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

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 1000.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  var cameraMatrix = mat4.create();
  
  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(cameraMatrix, cameraMatrix, [0, 0, 10]);
  var cameraPosition = [
    cameraMatrix[12],
    cameraMatrix[13],
    cameraMatrix[14],
  ];
  // console.log(cameraMatrix);

  var up = [0, 1, 0];

  mat4.lookAt(cameraMatrix, cameraPosition, [0,0,0], up);

  var viewMatrix = cameraMatrix;//mat4.create();

  //mat4.invert(viewMatrix, cameraMatrix);

  var viewProjectionMatrix = mat4.create();

  mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

  draw(gl, viewProjectionMatrix, programInfo, deltaTime);

}

// function for drawing the objects
function draw(gl, viewProjectionMatrix, programInfo, deltaTime){
  mid_track.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  left_track.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  right_track.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  left_wall.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  right_wall.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i=0; i<game_train.length;i++)
    game_train[i].drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  jake.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  police.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  // cones.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  // newjake.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i=0; i<moving_train.length;i++)
    moving_train[i].drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i=0; i<game_coin.length;i++)
    game_coin[i].drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i=0; i<game_boots.length;i++)
    game_boots[i].drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
    for(var i=0; i<game_boost.length;i++)
    game_boost[i].drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i=0; i<game_barricade.length;i++)
    game_barricade[i].drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  for(var i=0; i<game_barricade2.length;i++)
    game_barricade2[i].drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

//
// Initialize a texture and load an image.
// When the image finished loading copy it into the texture.
//
function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  
  image.crossOrigin = "anonymous";
  
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       // No, it's not a power of 2. Turn off mips and set
       // wrapping to clamp to edge
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}