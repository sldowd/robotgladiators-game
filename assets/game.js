//Game States
//"WIN" - Player has defeated all enemy-robots
//  * Fight all enemy robots
//  * Defeat each enemy-robot
// "LOSE" Player robot's health is zero or less

var fightOrSkip = function() {
    //ask player if they'd like to fight or skip
    var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
        
        //Conditional recursive function call
        if (!promptFight) {
            window.alert("You need to provide a valid answer! Please try again.");
            return fightOrSkip();
        }

        promptFight = promptFight.toLowerCase();

        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            //code to prompt store

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
                // subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);

                return true;
            
            }
        }
    return false;
};

//fight function defined here
var fight = function (enemy) {
    var isPlayerTurn = true;
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    while (playerInfo.health > 0 && enemy.health > 0) {
        //ask player if they'd like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
            //if true leave fight by breaking loop
            break;
        }

        //generate random damage value based on player's attack power

        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
        );

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + ' has died!');

            // award player money for winning
            playerInfo.money = playerInfo.money + 20;
            //code to prompt store

            // leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
        }

        // remove players's health by subtracting the amount set in the enemy.attack variable
        var damage = randomNumber(enemy.attack -3, enemy.attack);
        
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
        );

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + ' has died!');
            // leave while() loop if player is dead
            break;
        } else {
            window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
        }
        isPlayerTurn = !isPlayerTurn;
    }
};

// function to start new game
var startGame = function() {
    //reset player stats
    playerInfo.reset();
for (var i = 0; i < enemyInfo.length; i++) {
    console.log(playerInfo.health);
    if (playerInfo.health > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        //debugger;
        //pick new enemy based on the index of the enemy.names array
        var pickedEnemyObj = enemyInfo[i];

        //reset enemy health before starting new fight
        pickedEnemyObj.health = randomNumber(40, 60);

        //used debugger to pause script from running and check whats going on
        //debugger;

        //pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
        fight(pickedEnemyObj);

        //if we're not at the last enemy in the array we can shop
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
            //ask if player wants to shop before next round
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

            //if yes, take them to the store() function
            if (storeConfirm) {
                shop();
            }
        }
    }
    if (playerInfo.health <= 0) {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
}
    //play again
    endGame();
};
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
  
    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
      highScore = 0;
    }
    // if player have more money than the high score, player has new high score!
    if (playerInfo.money > highScore) {
      localStorage.setItem("highscore", playerInfo.money);
      localStorage.setItem("name", playerInfo.name);
  
      alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } 
    else {
      alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        //restartgame
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!")
    }
};
var shop = function() {
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store?\nPlease enter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
        );
        shopOptionPrompt = parseInt(shopOptionPrompt);
        switch(shopOptionPrompt) {
            case 1:
                playerInfo.refillHealth();
                break;
            case 2:
                playerInfo.upgradeAttack();
                break;
            case 3:
                window.alert("Leaving the store.");
                //function ends
                break;
            default:
                window.alert("You did not pick a valid option. Try again.");
                //call shop() again to force player to pick a valid option
                shop();
                break;
        }
};
//function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random () * (max - min + 1) + min);

    return value;
};

var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?")
    }
    console.log("Your robot is" + name);
    return name;
};

//game information variables
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth : function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack : function () {
        if (this.money >=7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
        }
}

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

//call startGame so game starts when page loads
//this should stay at the bottom of the page!
startGame();

//write endGame()
//--alert player of their status
//--ask if they want to play again
//--initiate startGame()

//After skip or battle win (and there are more enemies left)
//--ask player if they want to shop
//--if no continue as normal
//--if yes call shop()

//shop()
//--ask if player wants to refill health, upgrade attack, or leave the shop
//--if refill, subtract money and increase health
//--if upgrade, subtract money and increase attack
//--if leave, alert goodbye and exit fucntion
//--if any other invalid option call shop again