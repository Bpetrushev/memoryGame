import { Card } from './card.js';

class Grid{
    constructor(size, numEqual, checkAnswer){
        this.size = size;
        this.numEqual = numEqual || 2;
        this.cards = [];
        this.numImg = 14;
        this.checkAnswer = checkAnswer;
        this.activeOpen = {
            active: 0,
            open: [],
        };
        this.freeImg = [];
    }

    init(size, numEqual){
        if(size){
            this.size = size;
        }
        if(numEqual){
            this.numEqual = numEqual;
        }
        
        this.reset();
        this.renderCards(this.size, this.numEqual);
    }

    renderCards(size, numEqual){
        //get random img (can't repeat)
        const getRandom = () => {
            const num = this.freeImg[Math.floor(Math.random() * this.freeImg.length)];
            this.freeImg = this.freeImg.filter(el => el!=num);
            return num;
        };

        //shuffle all elements in array
        const shuffle = (arr) => {
            let currentIndex = arr.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
              temporaryValue = arr[currentIndex];
              arr[currentIndex] = arr[randomIndex];
              arr[randomIndex] = temporaryValue;
            }
            return arr;
          }

        //generate all cards
        for(let i=0; i<size; i+=numEqual){
            const value = getRandom();
            this.cards[i] = new Card(value);
            for(let j=1; j<numEqual; j++){
                this.cards[i+j] = new Card(value);
            }
        }

        //Print all cars
        this.cards = shuffle(this.cards);
        this.cards.forEach(el => {
            el.init();
        });

        //start animation and event listener
        this.rotateGridElements();
    }

    rotateGridElements(){
        //run animation to show all cards
        const grid = document.querySelector('.grid');
        TweenMax.fromTo(grid, 1, {opacity: 0},{opacity: 1})
        this.cards.forEach((el, i) => {
            TweenMax.to(el.cardOut, 0.4, {rotationY: '180deg', delay:1 + 1*i});
            TweenMax.to(el.cardOut, 0.4, {rotationY: '0deg', delay: 1 + 1*i + 1});

            setTimeout(() => {
                el.cardOut.addEventListener('click', (e) => {
                    if(this.activeOpen.active < this.numEqual){
                        el.clickEvent(e,this.activeOpen, this.numEqual, this.checkAnswer);
                    }
                })
            }
            ,(1 + 1*this.cards.length-1 + 1 + 0.5)*1000);

        });
    }

    

    reset(){
        for(let i=0; i<this.numImg+1; i++){
            this.freeImg.push(i);
        }
        this.activeOpen.active = 0;
        this.activeOpen.open = [];
        this.cards = [];
    }


}

export {Grid};