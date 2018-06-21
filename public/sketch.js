var socket = io.connect('http://localhost:3000');


function getColors(){
    return Math.floor(Math.random() * 255)
}

var col1 = getColors()
var col2 = getColors()
var col3 = getColors()



$(document).ready(function(){
    
    $('#user').text(`Connected as: ${socket.id}`)
    $('#sub').click(function(e){
        socket.emit('send-chat', $('#m').val());
        $('#m').val('').focus()
    })
    socket.on('rec-chat', function(msg){
        $('#msg').append($('<li>').text(msg));
      });

      socket.on('mouse', function(data){
        fill(data.col1, data.col2, data.col3);
        noStroke();
        ellipse(data.x, data.y, 15, 15);
      })
})
function setup(){
    var can = createCanvas(700,400)
    background(0)
    can.parent('draw-area')
}

function mouseDragged(){
    // fill(col1, col2, col3);
    fill(col1, col2, col3)
    noStroke();
    ellipse(mouseX, mouseY, 15, 15);
    sendMouse(mouseX, mouseY, col1, col2, col3)
  }
  
  function sendMouse(xpos, ypos, col1, col2, col3){
    console.log("sendMouse: " + xpos + " " + ypos);
    //send mouse coords to server
    var data = {
      x: xpos,
      y: ypos,
      col1: col1,
      col2: col2,
      col3: col3
    };
    socket.emit('mouse', data);
  }