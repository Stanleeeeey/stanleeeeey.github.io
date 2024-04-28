let word;
let lang = "eng";
let user_ans = [];
let life = 10;

const hanging = {
    9: `
    <br>
    <br>
    <br>
    |<br>
    |<br>
    `,
    8:`
    <br>
    |<br>
    |<br>
    |<br>
    |<br>
    `,
    7:`
    &nbsp;__<br>
    |<br>
    |<br>
    |<br>
    |<br>
    `,
    6:`
    &nbsp;__<br>
    |&ensp;&ensp;|<br>
    |<br>
    |<br>
    |<br>
    `,
    5:`
    &nbsp;__<br>
    |&ensp;&ensp;|<br>
    |&ensp;&nbsp;O<br>
    |<br>
    |<br>
    `,
    4:`
    &nbsp;__<br>
    |&ensp;&ensp;|<br>
    |&ensp;&nbspO<br>
    |&ensp;&ensp;|<br>
    |<br>
    `,
    3:`
    &nbsp;__<br>
    |&ensp;&ensp;|<br>
    |&ensp;&nbsp;O<br>
    |&ensp;/|<br>
    |<br>
    `,
    2:`
    &nbsp;__<br>
    |&ensp;&ensp;|<br>
    |&ensp;&nbsp;O<br>
    |&ensp;/|⧵<br>
    |<br>
    `,
    1:`
    &nbsp;__<br>
    |&ensp;&ensp;|<br>
    |&ensp;&nbsp;O<br>
    |&ensp;/|⧵<br>
    |&ensp;/<br>`,
    0:`
    &nbsp;__<br>
    |&ensp;&ensp;|<br>
    |&ensp;&nbsp;O<br>
    |&ensp;/|⧵<br>
    |&ensp;/&nbsp;⧵<br>
    `

}

function show(){
    x = document.getElementById('remlang');
    if(x.style.display == "none"){
        x.style.display = 'block';
    }else{
        x.style.display = "none"
    }
}

function changeLang(x){
    lang = x;
    document.getElementById('curlang').innerHTML = x;
    remlang = document.getElementById('remlang');
    remlang.style.display = 'none';
    Newword()
}

fetch('https://random-word-api.herokuapp.com/languages')
    .then((ans)=> (ans.json()))
    .then((data)=>{


        remlang = document.getElementById('remlang');
        remlang.style.display = 'none';
        
        data.map(function(x){
            let i  = document.createElement("button");
            i.innerHTML = x;
            
            
            i.onclick = function() {
                document.getElementById('curlang').innerHTML = x;
                lang = x;
                remlang.style.display = 'none';
                Newword()
            };

            remlang.appendChild(i)
        })
    });

function set_ans(){
    user_ans = [];
    for(let i = 0; i<word.length; i++){
        user_ans.push('_');
    }
}

async function Newword(){
    document.getElementById('word').innerHTML = "";
    document.getElementById('hangman').innerHTML = '<br><br><br><br><br>';
    if(lang == "eng"){
    await fetch('https://random-word-api.herokuapp.com/word')
        .then((ans)=>(ans.json()))
        .then((data)=>{
            word=data[0].toLowerCase();
            document.getElementById('word').innerHTML = "_ ".repeat(word.length);   
            set_ans(); 
            document.getElementById('word').innerHTML = user_ans.join(' ')
            //if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                //y = document.getElementById("text");
                //y.click();
                //y.focus();
                //prompt();
                

                
            //}

            })


    }else {
        fetch('https://random-word-api.herokuapp.com/word?lang='+lang)
        .then((ans)=>(ans.json()))
        .then((data)=>{
            word=data[0].toLowerCase();
            
            
            set_ans();
            document.getElementById('word').innerHTML = user_ans.join(' ')
            //prompt();
            })
    }

   
    life = 10;
    document.getElementById('life').innerHTML = life

    
}


addEventListener('keypress', (event)=>{
    

    let key = String.fromCharCode(event.keyCode);
    if(word.includes(key)){

        for(let i = 0; i<word.length; i++){
            if(word.charAt(i) == key){
                user_ans[i] = key;
            }
        }
        document.getElementById('word').innerHTML = user_ans.join(" ")
        if(user_ans.join('') == word){
            setTimeout(() => {  alert('YOU WON!!');
            Newword();
         }, 500);
            
            
        }
    }else if(life>0){
        life-=1;
        document.getElementById('life').innerHTML = life
        document.getElementById('hangman').innerHTML = hanging[life]
        
        if(life == 0){
            setTimeout(() => { 
                alert("GAME OVER!! word was " + word);
                Newword()
            }, 500);

        }

    }
})





