var VSHADER_SOURCE =`
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  varying vec4 u_FragColor;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjMatrix;
  void main() {
   gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
   u_FragColor = a_Color;
  }`;

var FSHADER_SOURCE =`
  precision mediump float;
  varying vec4 u_FragColor;
  void main(){
    gl_FragColor = u_FragColor;
  }`;
  //Selected Axis to do transforms
  function changeAxis() {
    var xAxis = document.getElementById("x-axis");
    var yAxis = document.getElementById("y-axis");
    var zAxis = document.getElementById("z-axis");
    if(xAxis.checked){
      kendoConsole.log("X");
      axis = [1,0,0];
    }
    if(yAxis.checked){
      kendoConsole.log("Y");
      axis = [0,1,0];
    }
    if(zAxis.checked){
      kendoConsole.log("Z");
      axis = [0,0,1];
    }
  }

  function changeView(view){selectedView = view;}
  //Deletes the selected surface and a button,
  function deleteObj(){
    g_points.splice(selectedIndex,1) ;
    g_colors.splice(selectedIndex,1) ;
    g_modelMatrixes.splice(selectedIndex,1) ;
    g_angles.splice(selectedIndex,1) ;
    g_translates.splice(selectedIndex,1) ;
    g_scales.splice(selectedIndex,1) ;
    deleteButtons();
    index--;
    createButtons();
    selectButton(0);

    //var objButton = document.getElementById("button"+index);
    //objButton.parentNode.removeChild(objButton);
  }

  function deleteButtons(){
    for(var i=0;i<=index;i++){
      var objButton = document.getElementById("button"+i);
      objButton.parentNode.removeChild(objButton);
    }
  }

  function createButtons(){
    for(var i=0;i<=index;i++){
      $('#buttons').append('<button onclick="selectButton(' + i + ')"id="button' + i + '" class="iconsBtn" type="button"><i class="fas fa-draw-polygon">Object '+i+'</i></button>');
    }
  }

  function sliderOnChangeTrans(e) {
    if(axis[0]==1){
      g_translates[selectedIndex][0]= e.value;
      //g_modelMatrixes[selectedIndex].translate(e.value,0,0);
    }else if (axis[1]==1){
      g_translates[selectedIndex][1]= e.value;
      //g_modelMatrixes[selectedIndex].translate(0,e.value,0);
    }else if (axis[2]==1){
      g_translates[selectedIndex][2]= e.value;
      //g_modelMatrixes[selectedIndex].translate(0,0,e.value);
    }
    var slider = $("#sliderTranslate").data('kendoSlider');
    //slider.value(0);
  }

  function sliderOnSlideTrans(e) {
    if(axis[0]==1){
      g_translates[selectedIndex][0]= e.value;
      //g_modelMatrixes[selectedIndex].translate(e.value,0,0);
    }else if (axis[1]==1){
      g_translates[selectedIndex][1]= e.value;
      //g_modelMatrixes[selectedIndex].translate(0,e.value,0);
    }else if (axis[2]==1){
      g_translates[selectedIndex][2]= e.value;
      //g_modelMatrixes[selectedIndex].translate(0,0,e.value);
    }
    var slider = $("#sliderTranslate").data('kendoSlider');
    //slider.value(0);
  }

  function sliderOnChangeRot(e) {
    if(axis[0]==1){
      g_angles[selectedIndex][0]= e.value;
      //g_modelMatrixes[selectedIndex].rotate(e.value,1,0,1);
    }else if (axis[1]==1){
      g_angles[selectedIndex][1]= e.value;
      //g_modelMatrixes[selectedIndex].rotate(e.value,0,1,0);
    }else if (axis[2]==1){
      g_angles[selectedIndex][2]= e.value;
      //g_modelMatrixes[selectedIndex].rotate(e.value,0,0,1);
    }
    var slider = $("#sliderRotate").data('kendoSlider');
    //slider.value(0);
  }
  function sliderOnSlideRot(e) {
    if(axis[0]==1){
      g_angles[selectedIndex][0]= e.value;
      //g_modelMatrixes[selectedIndex].rotate(e.value,1,0,1);
    }else if (axis[1]==1){
      g_angles[selectedIndex][1]= e.value;
      //g_modelMatrixes[selectedIndex].rotate(e.value,0,1,0);
    }else if (axis[2]==1){
      g_angles[selectedIndex][2]= e.value;
      //g_modelMatrixes[selectedIndex].rotate(e.value,0,0,1);
    }
    var slider = $("#sliderRotate").data('kendoSlider');
    //slider.value(0);
  }

  function sliderOnChangeSca(e) {
    if(axis[0]==1){
      g_scales[selectedIndex][0]= e.value;
      //g_modelMatrixes[selectedIndex].scale(e.value,1,1);
    }else if (axis[1]==1){
      g_scales[selectedIndex][1]= e.value;
      //g_modelMatrixes[selectedIndex].scale(1,e.value,1);
    }else if (axis[2]==1){
      g_scales[selectedIndex][2]= e.value;
      //g_modelMatrixes[selectedIndex].scale(1,1,e.value);
    }
    var slider = $("#sliderScale").data('kendoSlider');
    //slider.value(1);
  }

  function sliderOnSlideSca(e) {
    if(axis[0]==1){
      g_scales[selectedIndex][0]= e.value;
      //g_modelMatrixes[selectedIndex].scale(e.value,1,1);
    }else if (axis[1]==1){
      g_scales[selectedIndex][1]= e.value;
      //g_modelMatrixes[selectedIndex].scale(1,e.value,1);
    }else if (axis[2]==1){
      g_scales[selectedIndex][2]= e.value;
      //g_modelMatrixes[selectedIndex].scale(1,1,e.value);
    }
    var slider = $("#sliderScale").data('kendoSlider');
    //slider.value(1);
  }

  function sliderOnSlideZ(e){z = e.value;}
  function sliderOnChangeZ(e){z = e.value;}
  //gets Hexidecimal number and calculates its equivalent and returns a rgb value
  function hexToRgb(hex) {
      var aRgbHex = hex.match(/.{1,2}/g);
      var aRgb = [
      parseInt(aRgbHex[0], 16),
      parseInt(aRgbHex[1], 16),
      parseInt(aRgbHex[2], 16)
      ];
      return aRgb;
    }
  //changes colors of selected surface
  function changeColorObj(colorPicked){
      for(var i=0;i<g_points[selectedIndex].length;i+=3){
        g_colors[selectedIndex][i]=colorPicked[0]/255;
        g_colors[selectedIndex][i+1]=colorPicked[1]/255;
        g_colors[selectedIndex][i+2]=colorPicked[2]/255;
      }

  }
  //saves the selected index & Changes color of selected button
  function selectButton(ind){
    selectedIndex = ind;
    for(var i = 0; i<=index;i++){
      if(i==ind){
        var btn = $('#button'+i);
        btn.css("background-color",'#5564EB');
      }else{
        var btn = $('#button'+i);
        btn.css("background-color",'#FFFFFF');
      }
    }
  }

  $(document).ready(function() {
    $("#sliderTranslate").kendoSlider({
      change: sliderOnChangeTrans,
      slide: sliderOnSlideTrans,
      min: -1,
      max: 1,
      smallStep: 0.05,
      largeStep: 0.2,
      value: 0
    });


    $("#sliderRotate").kendoSlider({
      change: sliderOnChangeRot,
      slide: sliderOnSlideRot,
      min: -180,
      max: 180,
      smallStep: 10,
      largeStep: 60,
      value: 0
    });

    $("#sliderScale").kendoSlider({
      change: sliderOnChangeSca,
      slide: sliderOnSlideSca,
      min: 0,
      max: 3,
      smallStep: 0.2,
      largeStep: 0.5,
      value: 1
    });

    $("#sliderZ").kendoSlider({
      change: sliderOnChangeZ,
      slide: sliderOnSlideZ,
      min: -1,
      max: 1,
      smallStep: 0.05,
      largeStep: 0.2,
      value: 0
    });
    $("#color").change((ev) => {
        colorPicked = hexToRgb(ev.target.value.substring(1));
        changeColorObj(colorPicked);
        document.getElementById("color").value = "#000000";
    });


  });

var canvas;
var gl;
var index = 0;
var addIndex = false;
var selectedIndex = 0;
var selectedView = 0;
var z = 0.0;
var axis = [1,0,0];
var g_points = [];
var g_colors = [];
var g_modelMatrixes = [];
var g_angles = [[0,0,0]];
var g_translates = [[0,0,0]];
var g_scales = [[1,1,1]];
var colorPicked = [0.0,0.0,0.0];

function main(){
  canvas = document.getElementById('webgl');
  gl = getWebGLContext(canvas);

  if(!gl){
    console.log('Failed to get the WebGL context');
    return;
  }

  if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
    console.log('Failed to initialize shaders');
    return;
  }

  canvas.onmousedown = function(ev){ click(ev, gl, canvas); };
  canvas.oncontextmenu = function(ev){ rightClick(ev, gl); return false;};

  requestAnimationFrame(update,canvas);
}

//called everyframe
function update(){
  draw(gl);
  requestAnimationFrame(update,canvas);
}


function draw(gl){
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    setViewProjMatrices(gl);
    addGrid();
    g_modelMatrixes = createModelMatrixes();
    for(var i = 0; i < g_points.length; i++){
        var n = initVertexBuffers(gl, new Float32Array(g_points[i]), new Float32Array(g_colors[i]) , g_modelMatrixes[i]);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
    }
}


function initVertexBuffers(gl, vertices, colors, modelMatrix){
  var n = vertices.length/3;
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if(a_Position<0){
    console.log('Failed to get program for a_Position');
    return;
  }
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if(!u_ModelMatrix){ console.log('Failed to get location of u_ModelMatrix'); return;  }
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.DYNAMIC_DRAW);

  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0){
    console.log('Failed to get location of a_Color');
    return;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Color);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LESS);
  return n;
}

//Each click adds all the necessary space to save all the diferents transformations and colors for the vertex
function click(ev, gl, canvas) {
  if(event.buttons == 1){
    if(addIndex){
      index++;
      addIndex=false;
    }
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect() ;

    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

    if(g_points.length <= index){
      var arrayPoints = [];
      g_points.push(arrayPoints);
      var arrayColors = [];
      g_colors.push(arrayColors);
      var initialMatrix = InitialMatrix();
      g_modelMatrixes.push(initialMatrix);

      var angles = [];
      g_angles.push(angles);
      var trans = [];
      g_translates.push(trans);
      var sca = [];
      g_scales.push(sca);

    }
    g_points[index].push(x);
    g_points[index].push(y);
    g_points[index].push(z);

    g_translates[index].push(0);
    g_translates[index].push(0);
    g_translates[index].push(0);

    g_scales[index].push(1);
    g_scales[index].push(1);
    g_scales[index].push(1);

    g_angles[index].push(0);
    g_angles[index].push(0);
    g_angles[index].push(0);

    g_colors[index].push(0);
    g_colors[index].push(0);
    g_colors[index].push(0);
  }
}

function rightClick(ev, gl) {
  $('#buttons').append('<button onclick="selectButton(' + index + ')"id="button' + index + '" class="iconsBtn" type="button"><i class="fas fa-draw-polygon">Object '+index+'</i></button>');
  selectButton(0);
  addIndex=true;
}

//set View and Projection matrixes
function setViewProjMatrices(){
  var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if(!u_ViewMatrix){ console.log('Failed to get location of u_ViewMatrix'); return;  }
  var viewMatrix = setSelectedView(selectedView);
  //viewMatrix.setLookAt(0.0, 0.0, 1.5, 0.0,0.0,0.0, 0.0,1.0,0.0);
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
  var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
  if(!u_ProjMatrix){ console.log('Failed to get location of u_ProjMatrix'); return;  }
  var projMatrix = new Matrix4();
  projMatrix.setPerspective(60.0, 1, 0.1, 15);
  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
}


function createModelMatrixes(){
    for (var i = 0 ; i<=index;i++){
      var modelMatrix = new Matrix4();
      modelMatrix.setScale(g_scales[i][0],g_scales[i][1],g_scales[i][2]);
      modelMatrix.rotate(g_angles[i][0],1,0,0);
      modelMatrix.rotate(g_angles[i][1],0,1,0);
      modelMatrix.rotate(g_angles[i][2],0,0,1);
      modelMatrix.translate(g_translates[i][0],g_translates[i][1],g_translates[i][2]);
      g_modelMatrixes[i]=modelMatrix;
    }
    return g_modelMatrixes;
}

function InitialMatrix(){
  var modelMatrix = new Matrix4();
  modelMatrix.setScale(1,1,1);
  return modelMatrix;
}

//Selects predefined views to the scene
function setSelectedView(selectedView){
  var viewMatrix = new Matrix4();
  switch (selectedView) {
    case 0:
      viewMatrix.setLookAt(0.0, 0.0, 1.5, 0.0,0.0,0.0, 0.0,1.0,0.0);
      break;
    case 1:
      viewMatrix.setLookAt(0.0, 1.5, 1.5, 0.0,0.0,0.0, 0.0,1.0,0.0);
      break;
    case 2:
      viewMatrix.setLookAt(-1.5, 1.5, -1, 0.0,0.0,0.0, 0.0,1.0,0.0);
      break;
    case 3:
      viewMatrix.setLookAt(1.5, 1.5, -1,   0.0, 0.0, 0.0, 0.0,1.0,0.0);
      break;

    default:
      viewMatrix.setLookAt(0.0, 0.0, 1.5, 0.0,0.0,0.0, 0.0,1.0,0.0);
      break;
  }
  return viewMatrix;
}
//Creates Grid in scene
function addGrid(){
      for (var i = -0.5; i <= 0.5; i += 0.1) {
          for (var j = -0.5; j <= 0.5; j += 0.1) {
              var n = initVertexBuffers(gl, new Float32Array([i, 0, j, -i, 0, j, i, 0, j, i, 0, -j]), new Float32Array([0,0,0,0,0,0,0,0,0,0,0,0,0]),new Matrix4);
              gl.drawArrays(gl.LINES, 0, n);
          }
      }
}
