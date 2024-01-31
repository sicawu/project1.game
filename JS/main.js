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
        this.domElm.style.height = this.height + "vh";
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    }

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
        const maxJumpHeight = 50;  // Can jump up to half of the screen

        if (this.positionY + this.height < 100) {
            let newPositionY = this.positionY += 15;

            const jumpUp = setInterval(() => {
                if (newPositionY < this.positionY + maxJumpHeight) {
                    this.positionY += 0.1;
                    this.domElm.style.bottom = this.positionY + "vw";
                } else {
                    clearInterval(jumpUp);
                }
            }, 7000);
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
            }, 5000);
        }
    }
    getPositionX() { // for shooting
        return this.positionX;
    }
    getPositionY() { // for shooting
        return this.positionY;
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

class Goodies {
    constructor() {
        this.width = 3;
        this.height = 3;
        this.positionX = Math.random() * 60 + 30;
        this.positionY = 100;
        this.direction = Math.random() < 0.5 ? "downRight" : "downLeft";

        this.visible = true;
        this.domElm = null;
        this.createDomElement();
    }
    createDomElement() {
        this.domElm = document.createElement("div");

        this.domElm.setAttribute("id", "goodies");
        this.domElm.style.width = this.width + "vw";
        this.domElm.style.height = this.height + "vw";
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vw";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    }

    moveFromTop() {
        if (!this.visible) return; // avoids moving when not visible

        if (this.direction === "downRight") {
            if (this.positionX + this.width >= 100) {
                this.direction = "downLeft";
            } else {
                this.positionY -= 0.3;
                this.positionX += 0.2;
            }
        } else if (this.direction === "downLeft") {
            if (this.positionX <= 0) {
                this.direction = "downRight";
            } else {
                this.positionY -= 0.3;
                this.positionX -= 0.2;
            }
        }
        this.domElm.style.bottom = this.positionY + "vw";
        this.domElm.style.left = this.positionX + "vw";
    }
}



//////////////////////////////////////////////
/* Instantiate the Player & Obstacle Array */
/////////////////////////////////////////////
const player = new Player();
const obstacles = [];
const goodies = [];
// const shootingStars = [];

//////////////////////////////////////
/* Creating obstacles - setInterval */
//////////////////////////////////////
setInterval(() => {
    const newObstacle = new Obstacles();
    obstacles.push(newObstacle)
}, 1500)

setInterval(() => {
    obstacles.forEach((obstacleEvent) => {
        obstacleEvent.moveFromTop();
        // console.log(`There are ${obstacles.length} obstacles`)

        if (player.positionX < obstacleEvent.positionX + obstacleEvent.width &&
            player.positionX + player.width > obstacleEvent.positionX &&
            player.positionY < obstacleEvent.positionY + obstacleEvent.height &&
            player.height + player.positionY > obstacleEvent.positionY) {
            // console.log("collision detected")
            location.href = "gameover.html";
        }
    });
}, 30);


//////////////////////////////////////
/* Creating Goodies - setInterval */
//////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    const goodieCountElement = document.getElementById('goodieCount');
    // let collectedGoodies = 0;

    const collectedGoodies = 0;
    
    const addParagraph = document.createElement("p");
    addParagraph.textContent = "Collected Goodies: ${collectedGoodies}";
    goodieCountElement.appendChild(addParagraph);

    setInterval(() => {
        const newGoodie = new Goodies();
        goodies.push(newGoodie);
    }, 3000);

    setInterval(() => {
        goodies.forEach((goodieEvent, index) => {
            if (goodieEvent.visible) {
                goodieEvent.moveFromTop();
            }
            // console.log(`There are ${goodies.length} goodies`)

            if (player.positionX < goodieEvent.positionX + goodieEvent.width &&
                player.positionX + player.width > goodieEvent.positionX &&
                player.positionY < goodieEvent.positionY + goodieEvent.height &&
                player.height + player.positionY > goodieEvent.positionY) {
                // console.log("goodie collected");

                goodies.splice(index, 1); // SO it counts only once at collision
                collectedGoodies++;
                goodieEvent.visible = false; // hides element after collision
                // console.log(collectedGoodies)
            }
        });
        renderVisibleGoodies();
    }, 30);


///////////////////
///// Rendering //
//////////////////
    function renderVisibleGoodies() {
        const boardElm = document.getElementById("board");

        // Clear the board before rendering
        boardElm.innerHTML = ''; 

        boardElm.appendChild(player.domElm); // render the player

        goodies.forEach((goodieEvent) => {
            if (goodieEvent.visible) {
                boardElm.appendChild(goodieEvent.domElm);
            }
        });
        obstacles.forEach((obstacleEvent) => {   // Render obstacles (if needed)
            boardElm.appendChild(obstacleEvent.domElm);
        });
        

    } 
})


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
        }
    })






    /////////////////////
/* Shooting Class */
////////////////////

/*class ShootingStars {
   constructor (){
    this.radius = 2;
    this.domElm = null;

    this.createDomElement();
}
createDomElement() {
    this.domElm = document.createElement("div");

    this.shootingStarElement.className = 'shooting-star';

    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElm);
   }
   update() {   
    const playerPositionX = this.playerInstance.getPositionX();
    const playerPositionY = this.playerInstance.getPositionY();
    console.log(`Player's Position: X = ${playerPositionX}, Y = ${playerPositionY}`);
   }
   shoot(){
    const shootingStar = new ShootingStars();
   }
   
      /*
    constructor(position, velocity){
    this.position = position;
    this.velocity = velocity;
    this.radius = 5
   } 
   draw () {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
    c.closePath()
    c.fillStyle = 'white'
    c.fill()
   }
   update () {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
   }
}
*/


    
    /*
    function animate () {
        for (let i = shootingStars.length -1; i >= 0; i--){
            const shootingStarSolo = shootingStars[i];
            shootingStarSolo.update()
        }
    }
    */
/*
} else if (event.code === 'Space') {
    shootingStars.push(new ShootingStars({
        position: {
            x: player.positionX,
            y: player.positionY
        },
        velocity: {
            x: 1,
            y: 0,
        }
    }));
    shootingStars.update();
    shootingStars.shoot();

/*else if (event.code === 'ArrowDown') {
    console.log("down");
    player.moveDown(); 
} */

