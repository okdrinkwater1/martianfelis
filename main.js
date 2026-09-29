var canvas =  document.getElementById("stars")
var ctx= canvas.getContext("2d");

var stars= [];
var speed_x=-0.5;
var speed_y=0.15;
function makestars(){
    canvas.width = window.innerWidth;
    canvas.height= window.innerHeight;
    stars=[];

    for(var i =0; i<150; i ++)
    {
        stars.push({
            x: Math.random()*canvas.width,
            y:Math.random()*canvas.height,
            size:Math.random()*2,
            color: Math.random() < 0.2 ? '#7bd62f' : 'white'
        });
    }
}

function movestars(){
    ctx.clearRect(0,0, canvas.width, canvas.height);

    stars.forEach(function(star){

        star.x+=speed_x*star.size;
        star.y+=speed_y *star.size;

        if(star.x <0) star.x= canvas.width;
        if(star.x> canvas.width) star.x=0;
        if(star.y<0) star.y= canvas.height;
        if(star.y> canvas.height) star.y=0;

        ctx.fillStyle= star.color;
        ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    requestAnimationFrame(movestars);
}

makestars();
movestars();
window.onresize= makestars;

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
            formStatus.textContent = "yay, your note sent";
            form.reset();
        } else {
            formStatus.textContent ='your note couldnt be sent :(';

        }
    })
    .catch(function(){
        formStatus.textContent = "your wifi sucks";
    });
});
}

var trick_treat= document.getElementById("trick_treat");
var spooky_el = document.getElementById("spooky");
var spooky_timer;
var less_motion= window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if(trick_treat){
    trick_treat.addEventListener("click", function(){
        var on = document.body.classList.toggle("spooky");
        trick_treat.textContent= on ? "trick or treat" : "trick or treat";

        clearInterval(spooky_timer);
        if(on && !less_motion){
            spooky_timer= setInterval(function(){
                var brightness= 0.75 + Math.random()*0.5;
                spooky_el.style.filter="brightness("+ brightness +") saturate(1.8)";
            }, 180);

        }else if(on){
            spooky_el.style.filter ="saturate(1.8)";
        } else {
            spooky_el.style.filter="";
        }
    });
}