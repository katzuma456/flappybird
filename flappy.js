// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'game', stateActions);
var score = -1;
var labelScore;
var player;
var pipes = []

/*
 * Loads all resources for the game and gives them names.
 */
function addPipeBlock(x,y){
    var block = game.add.sprite(x,y,"pipe");
    pipes.push(block);
    game.physics.arcade.enable(block);
    block.body.velocity.x = -200;
}
function preload() {
    game.load.image("player.Img","assets/diver.gif");

    game.load.image("background.Img","assets/oceanbackground.png");
    game.load.audio("point", "assets/point.ogg");
game.load.image("pipe", "assets/pipe.png");
}
function changeScore() {
    score = score + 1
    labelScore.setText(score.toString())
}

function generateBlock() {
    var gapStart = game.rnd.integerInRange(1,8);
    for(var count = 0; count < 12; count+=1){
        if(count != gapStart && count != gapStart + 1 && count != gapStart + 2 && count != gapStart + 3 && count != gapStart + 4){
            addPipeBlock(1000, count*50);
            //calculates a random position for the gap - var gapstart = game.rnd ...

        }
    }
     changeScore();
}


/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    //game.stage.setBackgroundColor("#5C007A");
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var background = game.add.image(0,0,"background.Img");
    background.width = 1000
    background.length = 600

    player = game.add.sprite(10,230, "player.Img");


    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump)


    labelScore = game.add.text(20,20, "0",
        {font : "30px Calibri", fill : "#FFFFFF"});

    generateBlock();
    game.physics.arcade.enable(player);
   //player.body.velocity.x = 50;
    player.body.gravity.y = 100;

var pipeInterval = 3;
    game.time.events
        .loop(pipeInterval*Phaser.Timer.SECOND,generateBlock);
}
function playerJump(){
    player.body.velocity.y = -75
    game.sound.play("point")
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
   for(var index=0; index < pipes.length; index++){
        game.physics.arcade
            .overlap(player,
            pipes[index],
            gameOver);
    }
if (player.y >= 600) {
    gameOver()
}
if (player.y <= 0){
    gameOver()
}
}

function gameOver(){
    location.reload();
}


    //alert("The position is: " + event.x + "," + event.y); position of click
    //game.add.sprite(event.x,event.y, "player.Img"); adds the player icon where you click




