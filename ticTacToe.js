const board = document.querySelector('.board');
const restart = document.querySelector('.restart');
const message = document.querySelector('.message');
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let gameOn = true;
let p1 = "X";
let p2 = "0";
let p1Turn = true;
let choices = ['','','','','','','','',''];
const cells = [];

const turn = (cell, index) => {
    if(gameOn){
        if(cell.firstChild === null){
            if(p1Turn){
                const cat = document.createElement('img');
                cat.src = 'img/cat.png';
                cat.style.width = '100px';
                cell.appendChild(cat);
                cell.style.backgroundColor = 'whitesmoke';
                choices[index] = p1;
                if(isWinner()){
                    message.textContent = 'Cats Won';
                    message.style.display = 'block';
                    winnerImg('cat');
                    gameOn =false;
                }
                p1Turn = false;
            } else {
                const dog = document.createElement('img');
                dog.src = 'img/dog.png';
                dog.style.width = '100px';
                cell.appendChild(dog);
                cell.style.backgroundColor = 'whitesmoke';
                choices[index] = p2;
                if(isWinner()){
                    message.textContent = 'Dogs won';
                    message.style.display = 'block';
                    winnerImg('dog');
                    gameOn =false;
                }
                p1Turn = true;
            }
        }
        if(!choices.includes('') && !isWinner()){
            message.innerHTML = 'Tied!';
            message.style.display = 'block';
            message.style.fontSize = '15rem';
        }
    }
}
const winnerImg = (animal) => {
    if(animal === 'cat'){
        const catWins = document.createElement('div');
        catWins.style.display = 'flex';
        catWins.style.marginLeft = '100px';
        catWins.style.justifyContent = 'space-around';
        catWins.style.marginTop = '20px';
        const catW = document.createElement('img');
        catW.src = 'img/cat-w.png';
        catW.style.width = '120px';
        catW.style.marginLeft = '-50px';
        const dogL = document.createElement('img');
        dogL.src = 'img/dog-l.png';
        dogL.style.marginLeft = '-390px';
        dogL.style.width = '150px';
        dogL.style.height = '150px';
        catWins.appendChild(catW);
        catWins.appendChild(dogL);
        message.appendChild(catWins);
    }
    if(animal === 'dog'){
        const dogWins = document.createElement('div');
        dogWins.style.display = 'flex';
        dogWins.style.marginLeft = '100px';
        dogWins.style.justifyContent = 'space-around';
        catWins.style.marginTop = '20px';
        const dogW = document.createElement('img');
        dogW.src = 'img/dog-w.png';
        dogW.style.width = '150px';
        dogW.style.marginLeft = '-100px';
        const catL = document.createElement('img');
        catL.src = 'img/cat-l.png';
        catL.style.width = '150px';
        catL.style.height = '150px';
        catL.style.marginLeft = "-350px";
        dogWins.appendChild(dogW);
        dogWins.appendChild(catL);
        message.appendChild(dogWins);
    }
}

for(let i = 0; i < 9; i++){
    const newCell = document.createElement('div');
    newCell.classList.add("cell");
    newCell.addEventListener("click", ()=> turn(newCell, i));
    board.appendChild(newCell);
    cells.push(newCell);
}

const isWinner = ()=> {
    for(let winCom of winCombinations) {
        const win = [...winCom];
        if(choices[win[0]] && choices[win[0]] === choices[win[1]] && choices[win[0]] === choices[win[2]]){
            return true;
        }
    }
    return false;
}

restart.addEventListener('click', ()=>{
    cells.forEach(e => {
        e.textContent = '';
        e.style.backgroundColor = '';

    });
    choices.fill('');
    p1Turn = true;
    gameOn = true;
    message.style.display = 'none'
});


