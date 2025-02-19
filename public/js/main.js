const speed = 0.8;
let dots = [];
let retro_dot_color = "rgb(252, 8, 16)"
let dark_dot_color = "rgb(150, 150, 150)"

let color_scheme = "dark";
let dot_color = dark_dot_color;


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max- min) + min);
  }
  

function setup_main(){

    //set_color_mode();
    try{
        initialize_dots();
        set_canvas();
        draw_dots()
    }catch{
        console.log("no canvas to draw")
    }
}



function set_color_mode(){
    let decodedCookie = decodeURIComponent(document.cookie);
    
    if(decodedCookie.split("=")[1] === "retro"){
        RetroMode()
    }else{
        DarkMode();
    }
}


function set_canvas(){
    const canvas = document.getElementById("testing");
    const ctx = canvas.getContext("2d");

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initialize_dots(){
    dots = []
    for(let i = 0; i<window.innerWidth*5; i++){
        dots.push({
            x:getRandomInt(0, window.innerWidth),
            y:getRandomInt(0, window.innerHeight),
            speed: Math.random(),
        })
    }

    let blog_wrap = document.getElementById("blog")

    blog_wrap.addEventListener("scroll", (event) => {
        
        update_blog();
    })


}


function draw_dots(mousePos){
    const canvas = document.getElementById("testing");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = dot_color;
    dots.forEach((dot) => {
        ctx.fillRect(dot['x'] ,  dot['y']  , 1, 1 )
    })
                   
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function RetroMode(){
    color_scheme = "retro";
    dot_color = retro_dot_color;

    setCookie("mode", "retro", 90);
    draw_dots()
}

function DarkMode(){
    color_scheme = "dark";
    dot_color = dark_dot_color;
    console.log("dark-mode")

    setCookie("mode", "dark", 90);
    draw_dots()
}



function update_dots(mousePos){
    const canvas = document.getElementById("testing");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = dot_color;
    dots.forEach((dot) => {
        ctx.fillRect(dot['x'] + dot["speed"]*(dot['x'] - mousePos.x),  dot['y'] + dot["speed"]*(dot['y'] - mousePos.y) , 1, 1 )
    })
        

               
}

function fade_dots(){
    let scroll = window.scrollY;
    let height = document.body.scrollHeight;

    const canvas = document.getElementById("testing");

    canvas.style.opacity = (1 - scroll / height).toString();

}

function update_blog(){
    let posts = document.querySelectorAll(".post");
    let posts_elements = Array.prototype.map.call(posts, function(element){
        var bodyRect = document.body.getBoundingClientRect(),
        elemRect = element.getBoundingClientRect(),
        offset   = elemRect.top - bodyRect.top;
        

        //element.style.transform = `scale(${(window.innerHeight - elemRect.top) / (window.innerHeight) * 100}%)`;
        
    })
}



window.addEventListener('mousemove', (event) => {
    mousePos = { x: event.clientX, y: event.clientY };
    update_dots(mousePos);

  });

window.addEventListener("resize", (event) => {
    setup_main();

})


window.addEventListener("scroll", (event) => {
    
    fade_dots();
})

document.addEventListener('DOMContentLoaded', function () {

    setup_main();
    document.getElementById("retro").addEventListener("click", () => {RetroMode()})
    document.getElementById("dark").addEventListener("click", () => {DarkMode()})


});



setup_main()
document.getElementById("retro").addEventListener("click", () => {RetroMode()})
document.getElementById("dark").addEventListener("click", () => {DarkMode()})