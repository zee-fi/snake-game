const grid = 24;
let gameOver = false;


class Player {
    constructor() {
        this.speed = 3;
        this.position = [{ x: 12, y: 12 }]
        this.oldPosition = { x: 0, y: 0 };
        this.newPosition = { x: 0, y: 0 };
        this.newSize = 0;
        this.board = document.getElementById("board");
        this.playerElement = [];
        this.playerGrowth = [{ x: this.position.x, y: this.position.y }];

        this.createPlayerElement();
    }

    updatePlayer () {
        this.changePosition();
        this.movePlayer();
    }

    createPlayerElement() {
        const playerElement = document.createElement("div");

        playerElement.className = "player";
        playerElement.style.gridColumnStart = this.position[0].x;
        playerElement.style.gridRowStart = this.position[0].y;

        this.board.appendChild(playerElement);
        this.playerElement.push(playerElement);
    }

    growth(amount) {
        this.newSize += amount;
    }

    changePosition() {
        const oldPosition = this.position[this.position.length - 1]
        for (let i = 0; i < this.newSize; i++) {
            this.position.push({ x: oldPosition.x, y: oldPosition.y });
            this.createPlayerElement();

            /*for (let i=0; i<this.position.length; i++){
                this.playerElement[i].style.gridColumnStart = this.position[0].x;     
                this.playerElement[i].style.gridRowStart = this.position[0].y;  
            }*/
        }
        this.newSize = 0;
    }

    movePlayer() {
        for (let i = this.position.length - 1; i > 0; i--) {
            this.position[i] = { x: this.position[i-1].x, y: this.position[i-1].y };
        }
        this.position[0].x += this.newPosition.x;
        this.position[0].y += this.newPosition.y;
        
        this.updatePlayerElements();
       /* this.changePosition();
        this.updatePosition();
        checkCollision();*/
    }

    updatePlayerElements() {
        for (let i = 0; i < this.position.length; i++) {
            const segment = this.playerElement[i];
            segment.style.gridColumnStart = this.position[i].x;
            segment.style.gridRowStart = this.position[i].y;
        }
    }

    moveLeft() {
        this.newPosition = { x: -1, y: 0 };
    }
    moveRight() {
        this.newPosition = { x: 1, y: 0 };
    }
    moveUp() {
        this.newPosition = { x: 0, y: -1 };
    }
    moveDown() {
        this.newPosition = { x: 0, y: 1 };
    }

   /* updatePosition() {
        this.oldPosition = this.newPosition;
        return this.newPosition;
    }*/

}

const player = new Player();


document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        player.moveLeft();
    }
})

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') {
        player.moveRight();
    }
})

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
        player.moveUp();
    }
})

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowDown') {
        player.moveDown();
    }
})




class Food {
    constructor() {
        this.grid = 24;
        this.position = [{ 
            x: Math.floor(Math.random() * this.grid) +1, 
            y: Math.floor(Math.random() * this.grid) +1
        }]

        this.domElementFood = null;
        this.board = null;

        this.createFoodElement();
    }

    createFoodElement() {
        this.domElementFood = document.createElement("div");

        this.domElementFood.className = "food";
        this.domElementFood.style.gridColumnStart = this.position[0].x;
        this.domElementFood.style.gridRowStart = this.position[0].y;

        this.board = document.getElementById("board");
        this.board.appendChild(this.domElementFood);
    }

    equalPositions(position1, position2) {
        return position1.x === position2.x || position1.y === position2.y;
    }

}


const foodArr = [];


function createFoodAtRandom() {

    // generate new food
    const food = new Food();
    foodArr.push(food);

    // remove it, after a delay
    setTimeout(() => {
        const foodElement = foodArr.indexOf(food);
        if (foodElement > -1) {
            foodArr[0].domElementFood.remove(); // remove from the UI
            foodArr.shift(); // remove from the array
        }
    }, 10000)

    // keep generating new foods
    let randomDelay = Math.floor(Math.random() * (12000 - 5000 + 1)) + 5000;
    setTimeout(createFoodAtRandom, randomDelay);
}

createFoodAtRandom();


function checkCollision() {
    if (foodArr.length > 0) {
    const collision = player.position.some((element) => {
        return equalPositions(element, foodArr[0].position[0]);
    });
        if (collision) {
            playerEats();
        }
    }
}

function equalPositions(position1, position2) {
    return position1.x === position2.x && position1.y === position2.y;
}

function playerEats() {
    if (foodArr.length > 0){
            foodArr[0].domElementFood.remove();  
            foodArr.shift(); 
            player.growth(1);
            }
 }


 function gameEnd () {   
    const playerHead = player.position[0];
    return gridCollision(playerHead);
 }

 function gridCollision (playerHead) {
    if (player.position[0].x < 1 || player.position[0].x > grid ||
        player.position[0].y < 1 || player.position[0].y > grid)
        return true;
    else {
        return false;
    }
 }


let lastRender = 0;

function gameLoop(currentTime) {
    window.requestAnimationFrame(gameLoop);
    const sinceLastRender = (currentTime - lastRender) / 1000;
    if (sinceLastRender < 1 / player.speed) return;

    lastRender = currentTime;

    player.movePlayer();
    checkCollision();

    if (gameEnd()) {
        gameOver = true;
        if (confirm('Game over. Press OK to restart.')) {
            window.location = '/';
        }
    }
    if (gameOver) {
        return;
    }
}

window.requestAnimationFrame(gameLoop);



