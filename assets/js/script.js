// LISTENERS
document.addEventListener( 'keydown', keyPush );

// canvas
const canvas = document.querySelector( "canvas" );
const ctx = canvas.getContext( "2d" );

ctx.fillStyle = "darkviolet";
ctx.fillRect( 0, 0, canvas.width, canvas.height );

// player
const snakeSize = 50;
let snakePosX = 0;
let snakePosY = canvas.height / 2 - snakeSize / 2;
let snakeSpeed = 5;


ctx.fillStyle = 'white'
ctx.fillRect( snakePosX, snakePosY, snakeSize, snakeSize )


// loop
function gameLoop() {


    drawStuff();
    // moveStuff();

    

    requestAnimationFrame( gameLoop );
}
gameLoop()


/**
 *  DRAW EVERYTHING
 */
function drawStuff() {
    rectangle( 'darkviolet', 0, 0, canvas.width, canvas.height );
    rectangle( 'white', snakePosX, snakePosY, snakeSize, snakeSize );

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
    snakePosX += snakeSpeed;


    if( snakePosX > canvas.width ) {
        snakePosX = 0;
    }
}

function keyPush(event) {
    switch( event.key ) {
        case 'ArrowUp':
            snakePosY -= snakeSpeed;
            break;
        case 'ArrowDown':
            snakePosY += snakeSpeed;
            break;
        case 'ArrowRight':
            snakePosX += snakeSpeed;
            break;
        case 'ArrowLeft':
            snakePosX -= snakeSpeed;
            break;
        

    }
}