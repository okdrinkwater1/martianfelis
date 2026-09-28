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

var pics= [
    { src: 'felis image/cat_smile.jpg', caption: 'felis number1'},
    { src: 'felis image/cat_tongue.jpg', caption: 'felis number2'},
    { src: 'felis image/cat_tongue2.jpg', caption:'felis number3'}

];

var gallery = document.getElementById("gallery");

if(gallery){
    var popup = document.getElementById('popup');
    var popup_img = document.getElementById("popup_img");
    var popup_caption = document.getElementById("popup_caption");

    pics.forEach(function(pic){
        var button = document.createElement("button");
        var img= document.createElement("img");
        img.src = pic.src;
        img.alt= pic.caption;
        button.appendChild(img);

        button.addEventListener("click", function (){
            popup_img.src = pic.src;
            popup_img.alt = pic.caption;
            popup_caption.textContent = pic.caption;
            popup.showModal();

        });
        gallery.appendChild(button);
    });

    document.getElementById("popup_close").addEventListener("click", function(){
        popup.close();

    });

    popup.addEventListener("click", function(e){
        if(e.target===popup){
            popup.close();
        }
    });
}

var form = document.getElementById("contact_form");

if(form){
  var formStatus= document.getElementById("form_status");
  form.addEventListener("submit", function(e){
    e.preventDefault();
    formStatus.textContent="sending";

    fetch(form.action, {
        method: "POST", 
        body: new FormData(form),
        headers: { Accept: "application/json"}
    })
    .then(function(response){
        if(response.ok) {
            formStatus.textContent = "sent!!";
            form.reset();
        } else {
            formStatus.textContent ='could not send, try again later';

        }
    })
    .catch(function(){
        formStatus.textContent = "could not send, check your internet";
    });
});
}