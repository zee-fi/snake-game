let lastRender = 0;


class Player {
    constructor() {
        this.position = [ {x:12, y:12}]
        this.newSize = 0;
        this.playerElement = [];
        this.board = null;
        this.speed = 3;

        this.createPlayerElement();
    }

    createPlayerElement() {
        this.position.forEach((elm) => {
            const playerElement = document.createElement('div');

            playerElement.id = "player";
            playerElement.style.gridColumnStart = elm.x;
            playerElement.style.gridRowStart = elm.y;
            
            this.board = document.getElementById("board");
            this.board.appendChild(playerElement);
        })
        }

    snakeGrowth (amount) {
        this.newSize += amount;
    }
    
    addGrowth () {
        for (let i=0; i<this.newSnakeSize; i++) {
            this.player.push({...this.player[this.player.length -1]})
        }
        this.newSize = 0;
    }


    movePlayer () {
        for (let i=position.length -2; i>=0; i--) {
            position[i + 1] = { x: this.position[i].x, y: this.position[i.y]};
        }
    }


    checkCollision() {
        foodArr.forEach((foodInstance) => {
            if (
                this.positionX < foodInstance.positionX + foodInstance.width &&
                this.positionX + this.width > foodInstance.positionX &&
                this.positionY < foodInstance.positionY + foodInstance.height &&
                this.positionY + this.height > foodInstance.positionY
            ) {
                foodArr[0].domElementFood.remove();  
                foodArr.shift(); 
                this.width = this.width + 15;
                this.domElementPlayer.style.width = this.width + "px";
                }
            else if (
                this.positionX < foodInstance.positionX + foodInstance.width &&
                this.positionX + this.width > foodInstance.positionX &&
                this.positionY < foodInstance.positionY + foodInstance.height &&
                this.positionY + this.height > foodInstance.positionY 
            ) {
                foodArr[0].domElementFood.remove();  
                foodArr.shift(); 
                this.height = this.height + 15;
                this.domElementPlayer.style.height = this.height + "px";
                }
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
        this.width = 15;
        this.height = 15;
        this.positionX = Math.floor(Math.random() * (615 + 1));
        this.positionY = Math.floor(Math.random() * (615 + 1));
        this.domElementFood = null;
        this.board = null;

        this.createFoodElement();
    }

    createFoodElement() {
        this.domElementFood = document.createElement("div");

        this.domElementFood.className = "food";
        this.domElementFood.style.width = this.width + "px";
        this.domElementFood.style.height = this.height + "px";
        this.domElementFood.style.left = this.positionX + "px";
        this.domElementFood.style.bottom = this.positionY + "px";

        this.board = document.getElementById("board");
        this.board.appendChild(this.domElementFood);
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
        if (foodElement > -1){
            foodArr[0].domElementFood.remove(); // remove from the UI
            foodArr.shift(); // remove from the array
        }
    }, 10000)

    // keep generating new foods
    let randomDelay = Math.floor(Math.random() * (12000 - 5000 + 1)) + 5000;
    setTimeout(createFoodAtRandom, randomDelay);
}



createFoodAtRandom();


function gameLoop (currentTime){
    window.requestAnimationFrame(gameLoop);
    const sinceLastRender = (currentTime - lastRender) / 1000;
    if (sinceLastRender < 1 / player.speed) return;

    lastRender = currentTime; 
}

window.requestAnimationFrame(gameLoop);


