class Card{
    constructor(value){
        this.value = value;
        this.img = `memory${value}.png`;
    }

    init(){
        this.render();
    }

    render(){
        const grid = document.querySelector('.grid');

        this.cardHolder = document.createElement('div');
        this.cardHolder.className = 'card-holder';

        this.cardOut = document.createElement('div');
        this.cardOut.className = 'card-out';
        this.cardOut.style.content = `url('./img/question.png')`;

        this.cardIn = document.createElement('div');
        this.cardIn.className = 'card-in';
        this.cardIn.style.content = `url('./img/${this.img}')`;

        this.cardHolder.appendChild(this.cardOut);
        this.cardHolder.appendChild(this.cardIn);
        grid.appendChild(this.cardHolder);
    }

    clickEvent(e, obj, step, checkAnswer){
        obj.active++;
        obj.open.push(this);
        TweenMax.to(e.target, 0.3, {rotationY: '180deg'});
        if(obj.open.length == step){
            const value = obj.open[0].value;
            const allEqual = obj.open.every( el => el.value==value);
            if(allEqual){
                for(let i=0; i<obj.open.length; i++){
                    obj.open[i].cardIn.classList.add('card-correct');
                    
                }
                    obj.active = 0;
                    obj.open = [];
                    checkAnswer(true);
            } else {
                obj.open.forEach(el => {
                    TweenMax.to(el.cardOut, 0.3, {rotationY: '0deg', delay: 1,onComplete: () => {
                    obj.active--;
                    obj.open.shift();
                    }});
                });
                checkAnswer(false);
            }     
        }
    }
}

export {Card};