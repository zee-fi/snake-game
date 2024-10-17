const grid = 24;
const board = document.getElementById("board");
let gameOver = false;

function gameEnd() {
    if (player.position[0].x < 1 || player.position[0].x > grid ||
        player.position[0].y < 1 || player.position[0].y > grid
    )
    return gameOver = true;
}


class Player {
    constructor() {
        this.speed = 3;
        this.position = [{ x: 12, y: 12 }]
        this.oldPosition = { x: 0, y: 0 };
        this.newPosition = { x: 0, y: 0 };
        this.newSize = 0;
        this.playerElement = [];
        this.playerGrowth = [{ x: this.position.x, y: this.position.y }];

        this.createPlayerElement();
    }

    createPlayerElement() {
        const playerElement = document.createElement("div");

        playerElement.className = "player";
        playerElement.style.gridColumnStart = this.position[0].x;
        playerElement.style.gridRowStart = this.position[0].y;

        this.board = document.getElementById("board");
        this.board.appendChild(playerElement);
    }

    movePlayer() {
    for (let i = this.position.length - 2; i >= 0; i--) {
        this.position[i + 1] = { x: this.position[i].x, y: this.position[i].y };
    }
    this.position[0].x += this.newPosition.x;
    this.position[0].y += this.newPosition.y;
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


    checkCollision() {
    const collision = this.position.some((element) => {
        return this.equalPositions(element, foodArr[0].position);
    })
    if (collision) {
        return true;
    }
    }

    equalPositions(position1, position2) {
        return position1.x === position2.x || position1.y === position2.y;
    }

    playerEats() {
         foodArr.forEach(() => {
                 foodArr[0].domElementFood.remove();  
                 foodArr.shift(); 
                 this.snakeGrowth(1);
                 })
     }
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
        this.position = [{ x: 12, y: 12 }]

        this.createFoodElement();
    }

    createFoodElement() {
        this.domElementFood = document.createElement("div");

        this.domElementFood.className = "food";
        this.domElementFood.style.gridColumnStartt = this.position[0].x;
        this.domElementFood.style.gridRowStart = this.position[0].y;

        this.board = document.getElementById("board");
        this.board.appendChild(this.domElementFood);
    }

    setRandomLocation () {
        this.position[0].x = Math.floor(Math.random() * grid);
        this.position[0].y = Math.floor(Math.random() * grid);
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



let lastRender = 0;

function gameLoop(currentTime) {
    if (gameOver) {
        if (confirm('You lost. Press OK to restart.')) {
            window.location = '/'
        }
        return
    }
    
    window.requestAnimationFrame(gameLoop);
    const sinceLastRender = (currentTime - lastRender) / 1000;
    if (sinceLastRender < 1 / player.speed) return;

    lastRender = currentTime;

    player.movePlayer();
}

window.requestAnimationFrame(gameLoop);



