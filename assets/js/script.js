// LISTENERS
document.addEventListener( 'keydown', keyPush );

// canvas
const canvas = document.querySelector( "canvas" );
const ctx = canvas.getContext( "2d" );
const scoreTitle = document.querySelector( '#scoreText' )

ctx.fillStyle = "darkviolet";
ctx.fillRect( 0, 0, canvas.width, canvas.height );

// player
const tileSize = 30;
let snakePosX = 0;
let snakePosY = canvas.height / 2;
let snakeSpeed = tileSize;
let velocityX = 0;
let velocityY = 0;

let tail = []
let snakeLength = 1

// game
let gameIsRunning = true
let score = 0;
const tileCountX = canvas.width / tileSize
const tileCountY = canvas.height / tileSize


// food
let foodPosX = 0
let foodPosY = 0



ctx.fillStyle = 'white'
ctx.fillRect( snakePosX, snakePosY, tileSize, tileSize )


// loop
function gameLoop() {

    if( gameIsRunning ) {

        drawStuff();
        moveStuff();
    
        setTimeout( gameLoop, 1000/10 );
    }
}

resetFood()
gameLoop()


/**
 *  DRAW EVERYTHING
 */
function drawStuff() {
    // background
    rectangle( 'darkviolet', 0, 0, canvas.width, canvas.height );

    
    // gird
    drawGrid()

    // tail
    tail.forEach( snakePart => {
        rectangle( '#fff', snakePart.x, snakePart.y, tileSize, tileSize )
    } )

    rectangle( 'green', foodPosX, foodPosY, tileSize, tileSize )

    // snake
    rectangle( 'white', snakePosX, snakePosY, tileSize, tileSize );
}

function drawGrid() {
    for( let i = 0; i < tileCountX; i++ ) {
        for( let j = 0; j < tileCountY; j++ ) {

            rectangle( "darkblue", tileSize * i, tileSize * j, tileSize-1, tileSize-1 )
        }
    }
}

// draw rectangle
function rectangle( color, x, y, width, height ) {
    ctx.fillStyle = color
    ctx.fillRect( x, y, width, height )

}

/**
 *  MOVE EVERYTHING
 */
function moveStuff() {
    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;


    // wall collision
    if( snakePosX > canvas.width - tileSize ) {
        snakePosX = 0;
    }
    if( snakePosX < 0 ) {
        snakePosX = canvas.width;
    }
    if( snakePosY > canvas.height-tileSize ) {
        snakePosY = 0;
    }
    if( snakePosY < 0 ) {
        console.log(canvas.height)
        snakePosY = canvas.height;
    }

    // snake colilision == GAME OVER!!
    tail.forEach( ( snakePart, index ) => {
        if( index !== 0 ) {

            if( snakePosX === snakePart.x && snakePosY === snakePart.y ) {
                gameOver()
                
            }
        }
    } )

    // tail
    tail.push( {x: snakePosX, y:snakePosY} )

    // forget earliest parts of snake
    tail = tail.slice( -1 * snakeLength )

    // food collision
    if( snakePosX == foodPosX && snakePosY == foodPosY ) {
        resetFood()
        score++;
        snakeLength++
        scoreTitle.textContent = score

        
    }
    
}

function resetFood() {
    foodPosX = Math.floor( Math.random() * tileCountX ) * tileSize 
    foodPosY = Math.floor( Math.random() * tileCountY ) * tileSize 
}

function keyPush(event) {
    switch( event.key ) {
        case 'ArrowUp':
            if( velocityY != 1 ) {

                velocityX = 0;
                velocityY = -1;
            }
            break;
        case 'ArrowDown':
            if( velocityY != -1 ) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case 'ArrowRight':
            if( velocityX != -1 ) {

                velocityX = 1;
                velocityY = 0;
            }
            break;
        case 'ArrowLeft':
            if( velocityX != 1 ) {

                velocityX = -1;
                velocityY = 0;
            }
            break;
        default:
            restartGame()
            break;
        

    }
}


function restartGame() {
    location.reload()
}


// Keypress other than arrows restarts the game
function gameOver() {
    scoreTitle.textContent = `GAME OVER! Final score: ${score}`
    gameIsRunning = false
}