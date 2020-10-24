import { Grid } from './grid.js';
class ManagerGame{
    constructor(){
        this.lives = 10;
        this.points = 0;
        this.pointsCurrGame = 0;
        this.numImg = 15;
        this.numCards = 4;
        this.step = 2;
    }
    
    init(){
        this.game = new Grid(this.numCards, this.step, this.checkAnswer.bind(this));
        this.printAllHearts();
        this.btnHolder();
        this.giveHeart();
    }

    printAllHearts(){
       const livesClass = document.querySelector(".lives");
        for(let i=0; i<this.lives/2; i++){
            for(let j=0; j<2; j++){
                const imgHeart = document.createElement('img');
                imgHeart.setAttribute('src', `./img/heart_${j}.png`);
                if(j==1){ 
                    imgHeart.setAttribute('class', 'heartMargin');
                }
                livesClass.appendChild(imgHeart);
            }
        }
        TweenMax.fromTo(livesClass, .5, {opacity: 0},{opacity: 1})
    }

    checkAnswer(check){
        if(check){
            this.givePoints();
            if(this.pointsCurrGame == this.numCards){
                this.pointsCurrGame = 0;
                this.gameDifficult();
                this.btn('next');
                this.giveHeart();
            }
        }else{
            this.delHearts();
        }
    }
    
    giveHeart(){
        if(this.lives<10){
            this.lives++;
            const livesClass = document.querySelector(".lives");
            const lastHeart = document.querySelector('.lives > img:last-child');
            const patt = /[0-9]/;
            let typeHeart = lastHeart.getAttribute('src').match(patt)[0];
            typeHeart==1 ? typeHeart=0: typeHeart=1;
            const imgHeart = document.createElement('img');
            imgHeart.setAttribute('src', `./img/heart_${typeHeart}.png`);
            if(typeHeart==1) {imgHeart.setAttribute('class', 'heartMargin');}
            livesClass.appendChild(imgHeart);
        }
    }

    delHearts(){
        const lastHearts = document.querySelectorAll(".lives img").length;
        document.querySelector(".lives img:last-child").remove();
        this.lives--;
        if(lastHearts<=1){
            this.gameOver();
        }
        
    }

    givePoints(){
        const pointsNumber = document.querySelector('.numPoints');
        this.points += this.step;
        this.pointsCurrGame += this.step;
        pointsNumber.textContent = this.points;
    }

    gameOver(){
        this.reset();
        this.printAllHearts();
        this.btn('gameOver');
    };

    delAllCards(){
        const grid = document.querySelector('.grid');
        TweenMax.to(grid, .5, {opacity:0, onComplete: ()=>{
            grid.innerHTML = '';
        }});
    }

    gameDifficult(){
        const maxNumCarsToThisStep = this.step*this.numImg;
        if(maxNumCarsToThisStep >= (this.numCards + this.step)){
            this.numCards += this.step;
        }else{
            this.step++;
            this.numCards = this.step * 2;
        }   
    }

    btnHolder(){
        const btnHolder = document.querySelector('.btnHolder');
        const btn = document.querySelector('.btnHolder > .btn');
        btn.addEventListener('click', ()=>{
            TweenMax.to(btnHolder, 1, {opacity: 0, top: `0`, onComplete: ()=>{
                this.game.init(this.numCards,this.step);
            }});
        })

        TweenMax.to(btnHolder, 1, {opacity: 1, top: `15%`, delay: .5, onComplete: () =>{
            this.delAllCards();
        }});
    }

    btn(type){
        const btnHolder = document.querySelector('.btnHolder');
        const btn = document.querySelector('.btnHolder > .btn');
        const textField = document.querySelector('.btnHolder > .txtBtnHolder');

        switch(type){
            case 'next':
                textField.textContent = 'Congratulations';
                btn.textContent = 'Next Level';
                break;
            case 'gameOver':
                textField.textContent = 'Game Over!';
                btn.textContent = 'Start New Game';
                break;
            default: 
                break;
        }

        TweenMax.to(btnHolder, 1, {opacity: 1, top: `15%`, delay: .5, onComplete: () =>{
            this.delAllCards();
        }});
    }

    reset(){
        this.lives = 10;
        this.points = 0;
        this.pointsCurrGame = 0;
        this.numImg = 15;
        this.numCards = 4;
        this.step = 2;
        document.querySelector('.numPoints').textContent = this.points;
    }
}

function initGame(){
    const startGame = new ManagerGame();
    startGame.init();
}

initGame();