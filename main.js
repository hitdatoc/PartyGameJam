//Global Variables

var WINDOW_WIDTH = window.innerWidth;
var WINDOW_HEIGHT = window.innerHeight;

var game, graphics;


//Sprites
var clicker;

//Game Currency
var money = 0;

//Debug Text
var debugText;

//Create GameState
var gameState = {
	preload: function() {
		//Set Game to Fullscreen
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		//Load Assets
		game.load.image('clicker', 'tempClicker.png');
	},

	create: function() {

		//Set Background Color
		game.stage.backgroundColor = '#1d1d1d';

		//Initialize Clicker
		this.clickerInit();

		//Debug Text
		debugText = game.add.text(0, 0, "Money: 0", { font: "16px Arial", fill: "#ffffff", align: "center" } );
	},

	udpate: function() {

	},

	clickerInit: function() {
		clicker = game.add.sprite(WINDOW_WIDTH-100, WINDOW_HEIGHT-100, 'clicker');
		clicker.anchor.setTo(0.5, 0.5);
		clicker.inputEnabled = true;
		clicker.events.onInputDown.add(this.clickerPressed, this);
	},

	clickerPressed: function() {
		money++;
		debugText.text = "Money: " + money;
	}
}

//Initialize Phaser and Game
game = new Phaser.Game('100%', '100%');
game.state.add('main', gameState);
game.state.start('main');