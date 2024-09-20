let emojis=['😀','👍','😍','😍','🤣','☎️','👌','👍','😒','👌','❤️','☎️','🤣','😒','😀','❤️'];
let resetBtn = document.querySelector(".reset");
let Winner =document.querySelector(".messagebox");
let time = document.querySelector(".time");
let newBtn = document.querySelector(".newgame");
let first=null;
let second=null;
let matched=0;
let score=0
const cards = document.querySelectorAll('.card');

const updatescore =()=> {
   document.querySelector('.score').innerHTML=`Score: ${score}` ;
}

const disablecards = ()=>{
    cards.forEach(card =>{
        card.disabled = true;
    });
}

const showWinner = (message) =>{
    time.innerText= ` ${message} ${score}`;
    // time.innerText = message;
    Winner.style.display="block";
}
const hideWinner = () => {
    Winner.style.display="none";
}

cards.forEach((card,index) =>{
    card.addEventListener('click', function() {
        if(!card.classList.contains('hidden')){
            card.textContent = emojis[index];
            score++;
            updatescore();
            if (first === null){
                first=card;
            }
            else if( second === null && card != first){
                second=card;
                if( first.textContent === second.textContent ){
                    first.classList.add('hidden');
                    second.classList.add('hidden');
                    matched++;
                    if(matched==emojis.length/2){
                        // alert('Congratulation! you win 😊');
                        showWinner(`Your Score: `);
                        disablecards();
                        // console.log("winner");
                        matched=0;
                    }
                    first=null;
                    second=null;
                }
                else{
                    setTimeout(()=>{
                    first.textContent='';
                    second.textContent='';
                    first=null;
                    second=null;
                } , 500);
            }
        }
    }
    });
});

const reset = () => {
    score =0;
    updatescore();
    hideWinner();
    for( let i=emojis.length-1; i>0; i--){
        const j= Math.floor(Math.random() * (i+1));
        [emojis[i],emojis[j]]=[emojis[j],emojis[i]]
    }
    cards.forEach(card =>{
        card.textContent='';
        card.classList.remove('hidden');
    });
}

resetBtn.addEventListener('click', reset);
newBtn.addEventListener('click', reset);

