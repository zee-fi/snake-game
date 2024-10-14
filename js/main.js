

class Player {
    constructor(){
        this.width = 1;
        this.height = 2;
        this.positionX = 35 - this.width / 2;
        this.positionY = 35 - this.height / 2;
        this.domElementPlayer = null;
        this.board = null;

        this.createPlayerElement();
    }

    createPlayerElement() {
        this.domElementPlayer = document.createElement("div");

        this.domElementPlayer.id = "player";
        this.domElementPlayer.style.width = this.width + "vw";
        this.domElementPlayer.style.height = this.height + "vh";
        this.domElementPlayer.style.left = this.positionX + "vw";
        this.domElementPlayer.style.bottom = this.positionY + "vh";

        this.board = document.getElementById("board");
        this.board.appendChild(this.domElementPlayer);
    }

    moveRight() {
        this.positionX++;
        this.domElementPlayer.style.left = this.positionX +"vw";
    }
    moveLeft() {
        this.positionX--;
        if (player.positionX < 0){
        console.log("game over");
        return
        }
        this.domElementPlayer.style.left = this.positionX +"vw";
    }
    moveUp() {
        this.positionY++;
        this.domElementPlayer.style.bottom = this.positionY +"vh";
    }
    moveDown() {
        this.positionY--;
        if (player.positionY < 0){
            console.log("game over");
            return
        }
        this.domElementPlayer.style.bottom = this.positionY +"vh";
    }
}

const player = new Player();


document.addEventListener('keydown', (e) => {
    if(e.code === 'ArrowLeft'){
        player.moveLeft();
    }
    else if(e.code === 'ArrowRight'){
        player.moveRight();
    }
    else if(e.code === 'ArrowUp'){
        player.moveUp();
    }
    else if(e.code === 'ArrowDown'){
        player.moveDown();
    }
})


/*function collisionWithBorder() {
    if (player.positionX < 0 ||
        player.positionY < 0
    ){
    console.log("game over")
    }
}*/





class Food {
    constructor(){
        this.width = 1;
        this.height = 2;
        this.positionX = 0;
        this.positionY = 0;
        this.domElementFood = null;
        this.board = null;

        this.createFoodElement();
    }

    createFoodElement() {
        this.domElementFood = document.createElement("div");

        this.domElementFood.className = "food";
        this.domElementFood.style.width = this.width + "vw";
        this.domElementFood.style.height = this.height + "vh";
        this.domElementFood.style.left = this.positionX + "vw";
        this.domElementFood.style.bottom = this.positionY + "vh";

        this.board = document.getElementById("board");
        this.board.appendChild(this.domElementFood);
    }

}

function createFoodAtRandom() {
    let randomDelay = Math.floor(Math.random() * (12000 - 5000 + 1)) + 5000;
    setTimeout(createFoodAtRandom, randomDelay);
    const food = new Food();
}

createFoodAtRandom();