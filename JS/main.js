class Player {
    constructor() {
        this.width = 4;
        this.height = 4;
        this.positionX = 30;
        this.positionY = 0;
        this.domElm = null;

        this.createDomElement();
    }
    createDomElement() {
        this.domElm = document.createElement("div");

        this.domElm.setAttribute("id", "player");
        this.domElm.style.width = this.width + "vw";
        this.domElm.style.height = this.height + "vw";
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vw";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    }

    /* Movement functions */
    moveRight() {
        if (this.positionX + this.width < 100) {
            this.positionX++;
            this.domElm.style.left = this.positionX + "vw";
        }
    }
    moveLeft() {
        if (this.positionX > 0) {
            this.positionX--;
            this.domElm.style.left = this.positionX + "vw";
        }
    }
    jump() {
        if (this.positionY + this.height < 50) {
            let newPositionY = this.positionY += 10;
            const gravityDown = setInterval(() => {
                if (newPositionY >= 0) {
                    newPositionY -= 0.2;
                    this.positionY = newPositionY;
                    this.domElm.style.bottom = this.positionY + "vw";
                } else {
                    clearInterval(gravityDown);
                }
            }, 0.05);
            setTimeout(() => {
                clearInterval(gravityDown);
            }, 3000);
        }
    }
    /*
    moveDown() {
        if (this.positionY > 0) {
            this.positionY--;
            this.domElm.style.bottom = this.positionY + "vw";
        }
    }
    */
}


/////////////////////
/* Obstacle Class */
////////////////////

class Obstacles {
    constructor() {
        this.width = 3;
        this.height = 3;
        this.positionX = Math.random() * 60 + 30;
        this.positionY = 100;
        this.direction = Math.random() < 0.5 ? "downRight" : "downLeft";

        this.domElm = null;

        this.createDomElement();
    }
    createDomElement() {
        this.domElm = document.createElement("div");

        this.domElm.setAttribute("id", "obstacles");
        this.domElm.style.width = this.width + "vw";
        this.domElm.style.height = this.height + "vw";
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vw";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    }

    moveFromTop() {
        if (this.direction === "downRight") {
            if (this.positionX + this.width >= 100) {
                this.direction = "downLeft";
            } else {
                this.positionY -= 0.5;
                this.positionX += 0.5;
            }
        } else if (this.direction === "downLeft") {
            if (this.positionX <= 0) {
                this.direction = "downRight";
            } else {
                this.positionY -= 0.5;
                this.positionX -= 0.5;
            }
        }
        this.domElm.style.bottom = this.positionY + "vw";
        this.domElm.style.left = this.positionX + "vw";
    }
}
/*
    moveFromTop () {
        this.positionY--;
        this.domElm.style.bottom = this.positionY + "vw";
    }

    moveFromLeft () {
        this.positionX++;
        this.domElm.style.left = this.positionX + "vw";
    }
*/

//////////////////////////////////////////////
/* Instantiate the Player & Obstacle Array */
/////////////////////////////////////////////
const player = new Player();
const obstacles = [];

//////////////////////////////////////
/* Creating obstacles - setInterval */
//////////////////////////////////////
setInterval(() => {
    const newObstacle = new Obstacles();
    obstacles.push(newObstacle)
}, 2000)

setInterval(() => {
    obstacles.forEach((obstacleEvent) => {
        obstacleEvent.moveFromTop();
        // console.log(`There are ${obstacles.length} obstacles`)

        if (player.positionX < obstacleEvent.positionX + obstacleEvent.width &&
            player.positionX + player.width > obstacleEvent.positionX &&
            player.positionY < obstacleEvent.positionY + obstacleEvent.height &&
            player.height + player.positionY > obstacleEvent.positionY) {
            console.log("collision detected")
        }
    });
}, 30);



///////////////////
/* EventListener */
///////////////////
document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
        console.log("left");
        player.moveLeft();
    } else if (event.code === 'ArrowRight') {
        console.log("right");
        player.moveRight();
    } else if (event.code === 'Space') {
        console.log("up");
        player.jump();
    } /*else if (event.code === 'ArrowDown') {
        console.log("down");
        player.moveDown(); */
});

