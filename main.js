//Global Variables

var WINDOW_WIDTH = window.innerWidth;
var WINDOW_HEIGHT = window.innerHeight;

var DARK_PURPLE = 0x663399;

var SECOND = 60;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;

var SLIDE_SPEED = 10;

var game, graphics;
var tileDistance = 700;

//Sprites
var clicker;
var danceFloor;
var upgradeTab;
var upgradeBox;
var upgradeWindow;

//Sprite Groups
var guestGroup;

//Statistics
var beer = 0;
var money = 0;
var people = 0;
var deltaBeer = 0;

//Time
var secondCounter = 0;
var minuteCounter = 0;

//Statistics UI
var upgradeWindowOpen = false;

//Upgrades
var upgradeList = [];

//Generate bitmap fonts using: http://kvazars.com/littera/
var beerText;
var moneyText;
var peopleText;

//Debug Text
var debugText;

//Default Upgrade
var defaultUpgrade = { 
	name: "Default Upgrade",
	cost: 1 ,
	viewable: true
};

//Create GameState
var gameState = {
	preload: function() {
		//Set Game to Fullscreen
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		//Initialize Graphics
		graphics = game.add.graphics(0,0);

		//Load Assets
		game.load.image('tempGuest', 'tempClicker.png');
		game.load.image('alienGuest', 'Alien.png');
		game.load.image('girlGuest', 'PartyHuman.png');
		game.load.image('clicker', 'beerClicker.png');
		game.load.image('danceFloor', 'Floor1.png');
		game.load.image('upgradeWindow', 'tempUpgradeWindow.png')
		game.load.image('upgradeTab', 'tempUpgradeTab.png');
	},

	create: function() {

		//Set Background Color
		game.stage.backgroundColor = '#1d1d1d';

		//Initialize
		this.drawClubFloor();
		this.upgradeInit();
		this.clickerInit();
		this.guestsInit();
		this.statisticsInit();

		//Debug Text
		debugText = game.add.text(0, 0, "Timer: 0", { font: "16px Arial", fill: "#ffffff", align: "center" } );
	},

	update: function() {
		//Time Based Functions
		this.minuteCount();
		this.peopleCount();
		this.moneyCount();

		//Upgrade Window
		this.drawUpgradeWindow();

		//Animate Guests
		this.animGuestDefault();
	},

	//------------------------------------------------------------------------------------------------------
	//Clicker Functions
	//------------------------------------------------------------------------------------------------------
	clickerInit: function() {
		clicker = game.add.sprite(WINDOW_WIDTH-150, WINDOW_HEIGHT-150, 'clicker');
		clicker.anchor.setTo(0.5, 0.5);
		clicker.scale.setTo(0.5, 0.5);
		clicker.inputEnabled = true;
		clicker.events.onInputDown.add(this.clickerDown, this);
		clicker.events.onInputUp.add(this.clickerUp, this);
	},

	clickerDown: function() {
		clicker.scale.setTo(0.525, 0.525);
	},

	clickerUp: function() {
		beer++;
		deltaBeer++;
		clicker.scale.setTo(0.5, 0.5);
		beerText.text = "Beer: " + beer;
	},

	//------------------------------------------------------------------------------------------------------

	//------------------------------------------------------------------------------------------------------
	//Statistics UI
	//------------------------------------------------------------------------------------------------------
	statisticsInit: function() {
		beerText = game.add.text(WINDOW_WIDTH-200, 50, "Beer: 0", { font: "16px Arial", fill: "#ffffff", align: "center" } );
		peopleText = game.add.text(WINDOW_WIDTH-200, 70, "Guests: 0", { font: "16px Arial", fill: "#ffffff", align: "center" } );
		moneyText = game.add.text(WINDOW_WIDTH-200, 90, "Money: 0", { font: "16px Arial", fill: "#ffffff", align: "center" } );		
	},
	//------------------------------------------------------------------------------------------------------

	//------------------------------------------------------------------------------------------------------
	//Statistics 
	//------------------------------------------------------------------------------------------------------
	minuteCount: function(){
		minuteCounter++;
		
		if(minuteCounter > MINUTE){
			minuteCounter = 0;
			this.peopleLoss(1); //Lose 1 guest per minute
		}
	},	

	peopleCount: function() {
		if(deltaBeer >= 10){
			this.peopleAdd(1);
			peopleText.text = "Guests: " + people;
			deltaBeer = 0;
		}
	},

	peopleAdd: function(more) {
		people = people + more;
		this.newGuest();
	},

	peopleLoss: function(loss) {
		people = people - loss;
		if(people < 0) { people = 0; }
		if(people > 0) { this.removeGuest(); }
		peopleText.text = "Guests: " + people;
	},

	moneyCount: function() {
		secondCounter++;
		//debugText.text = "Timer: " + secondCounter;

		if(secondCounter > SECOND){
			secondCounter = 0;
			this.moneyAdd(people);
		}
	},

	moneyAdd: function(more){
		money = money + more;
		moneyText.text = "Money: " + money;
	},
	//------------------------------------------------------------------------------------------------------

	//------------------------------------------------------------------------------------------------------
	//Guest Graphics
	//------------------------------------------------------------------------------------------------------
	guestsInit: function() {
		guestGroup = game.add.group();
	},

	newGuest: function() {
		var randomGuest = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
		var newGuest;
		if(randomGuest == 1){
			newGuest = guestGroup.create(Math.random() * WINDOW_WIDTH, Math.random() * WINDOW_HEIGHT, 'alienGuest');
		} else {
			newGuest = guestGroup.create(Math.random() * WINDOW_WIDTH, Math.random() * WINDOW_HEIGHT, 'girlGuest');
		}
		newGuest.scale.setTo(0.25,0.25);
		//var newGuest = guestGroup.create(Math.random() * WINDOW_WIDTH, Math.random() * WINDOW_HEIGHT, 'tempGuest');
		var max = 3;
		var min = 0;
		newGuest.animMovement = Math.floor(Math.random() * (max - min + 1)) + min;
		newGuest.animDelay = Math.floor(Math.random() * (max - min + 1)) + min;
	},

	removeGuest: function() {
		var leaveGuest = guestGroup.getRandom();
		guestGroup.remove(leaveGuest);
		leaveGuest.destroy();
	},

	animGuestDefault: function() {

		for(var i = 0; i < guestGroup.length; i++){
			var guest = guestGroup.getAt(i);

			if(guest.animDelay > 0){
				guest.animDelay = guest.animDelay - 1;
			} else {
				if(guest.animMovement == 0){
					guest.y = guest.y + 10;
					guest.animMovement = 1;
				} else if(guest.animMovement == 1){
					guest.y = guest.y - 10;
					guest.animMovement = 2;
				} else {
					guest.animMovement = 0;
				}
				var max = 3;
				var min = 0;
				guest.animDelay = Math.floor(Math.random() * (max - min + 1)) + min;
			}
			
		}
	},
	//------------------------------------------------------------------------------------------------------

	//------------------------------------------------------------------------------------------------------
	//Club Floor Graphics
	//------------------------------------------------------------------------------------------------------
	drawClubFloor: function() {
		//Basic Tile
		/**graphics.beginFill(DARK_PURPLE);
		graphics.moveTo(WINDOW_WIDTH/2, WINDOW_HEIGHT/2 - tileDistance);
		graphics.lineTo(WINDOW_WIDTH/2 + tileDistance, WINDOW_HEIGHT/2);
		graphics.lineTo(WINDOW_WIDTH/2, WINDOW_HEIGHT/2 + tileDistance);
		graphics.lineTo(WINDOW_WIDTH/2 - tileDistance, WINDOW_HEIGHT/2);
		graphics.lineTo(WINDOW_WIDTH/2, WINDOW_HEIGHT/2 - tileDistance);
		graphics.endFill();
		**/
		danceFloor = game.add.sprite(WINDOW_WIDTH/2, WINDOW_HEIGHT/2, 'danceFloor');
		danceFloor.anchor.setTo(0.5, 0.5);
	},
	//------------------------------------------------------------------------------------------------------

	//------------------------------------------------------------------------------------------------------
	//Upgrade Tab
	//------------------------------------------------------------------------------------------------------
	upgradeInit: function() {
		//Upgrade Window Init
		upgradeWindow = game.add.sprite(-265,50,'upgradeWindow');
		upgradeWindow.anchor.setTo(0,0);

		//Upgrade Tab Init
		upgradeTab = game.add.sprite(0,50,'upgradeTab');
		upgradeTab.anchor.setTo(0,0);
		upgradeTab.inputEnabled = true;
		upgradeTab.events.onInputUp.add(this.upgradeTabUp, this);
	},

	drawUpgradeWindow: function() {
		if(upgradeWindowOpen){
			//Open Upgrade window
			//Set Tab
			if(upgradeTab.x < 265){
				upgradeTab.x = upgradeTab.x + SLIDE_SPEED;
			}

			//Set Window
			if(upgradeWindow.x < 0){
				upgradeWindow.x = upgradeWindow.x + SLIDE_SPEED;
			}
		} else {
			//Close Upgrade Window
			//Set Tab
			if(upgradeTab.x > 0){
				upgradeTab.x = upgradeTab.x - SLIDE_SPEED;
			}

			//Set Window
			if(upgradeWindow.x > -265){
				upgradeWindow.x = upgradeWindow.x - SLIDE_SPEED;
			}
		}
	},

	upgradeTabUp: function() {
		upgradeWindowOpen = !upgradeWindowOpen;
		debugText.text = "Upgrade Window Open: " + upgradeWindowOpen;
	},

	//------------------------------------------------------------------------------------------------------
	//Upgrade Selections
	//------------------------------------------------------------------------------------------------------
	upgradeBoxInit: function() {

	},
	
	drawUpgrades: function() {

	},

	drawUpgradeBox: function() {

	}
}

//Initialize Phaser and Game
game = new Phaser.Game('100%', '100%');
game.state.add('main', gameState);
game.state.start('main');