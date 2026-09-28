var canvas =  document.getElementById("stars")
var ctx= canvas.getContext("2d");

function drawstars() {
    canvas.width= window.innerWidth;
    canvas.height = window.innerHeight;

    for(var i=0; i<150; i++){
        var x= Math.random() * canvas.width;
        var y= Math.random() * canvas.height;
        var size = Math.random()*2;
        ctx.fillStyle= Math.random() < 0.2 ? '#7bd62f': 'white';
        ctx.fillRect(x, y, size, size);

    }
}

drawstars();
window.onresize= drawstars;

